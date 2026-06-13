import type { IVerdictType } from '@/types';
import { useCandidatesStore } from '@/store';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 10;

// Локальный мини-хук для дебаунса прямо внутри модели
function useLocalDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export const useCandidatesPageModel = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Данные из Zustand стора
    const { candidates, totalCount, isLoading, isLargeMode, loadCandidates, setLargeMode } = useCandidatesStore();

    // 1. Чтение параметров из URL
    const page = parseInt(searchParams.get('page') || '1', 10);
    const search = searchParams.get('search') || '';
    const verdict = searchParams.get('verdict') || 'Все';
    const sortBy = searchParams.get('sortBy') || 'name';
    const viewMode = searchParams.get('view') || 'standard'; // 'standard' или 'virtual'

    // 2. Локальный стейт для мгновенного ввода в инпут
    const [searchInput, setSearchInput] = useState(search);
    const debouncedSearch = useLocalDebounce(searchInput, 300);

    // 3. Загрузка данных при изменении параметров URL
    useEffect(() => {
        loadCandidates({ verdict, search, page, limit: ITEMS_PER_PAGE });
    }, [verdict, search, page, loadCandidates]);

    // 4. Синхронизация дебаунса поиска с URL
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }
        params.set('page', '1'); // Сбрасываем на первую страницу при поиске
        setSearchParams(params);
    }, [debouncedSearch]);

    // 5. Обработчики изменений фильтров (Задание 1)
    const handleVerdictChange = (newVerdict: IVerdictType | 'Все') => {
        const params = new URLSearchParams(searchParams);
        if (newVerdict !== 'Все') {
            params.set('verdict', newVerdict);
        } else {
            params.delete('verdict');
        }
        params.set('page', '1');
        setSearchParams(params);
    };

    const handleSortChange = (newSort: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sortBy', newSort);
        setSearchParams(params);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params);
    };

    // 6. Управление режимами оптимизации (Задание 5)
    const handleDatasetToggle = (useLarge: boolean) => {
        setLargeMode(useLarge);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (!useLarge) {
            params.delete('view'); // Выключаем виртуализацию, если ушли на маленький мок
        }
        setSearchParams(params);
    };

    const handleViewModeToggle = (isVirtual: boolean) => {
        const params = new URLSearchParams(searchParams);
        if (isVirtual) {
            params.set('view', 'virtual');
        } else {
            params.delete('view');
        }
        setSearchParams(params);
    };

    // 7. Мемоизация сортировки тяжелого списка (Задание 5)
    const processedCandidates = useMemo(() => {
        const result = [...candidates];
        result.sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'exp') {
                const getExpValue = (str: string) => parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
                return getExpValue(b.total_exp) - getExpValue(a.total_exp);
            }
            return 0;
        });
        return result;
    }, [candidates, sortBy]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    // Вспомогательный UI-маппер для стилей вердикта
    const getVerdictClass = (v: string) => {
        switch (v) {
            case 'ПОДХОДИТ': return 'bg-green-50 text-green-700 border-green-200';
            case 'ЧАСТИЧНО': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'НЕ ПОДХОДИТ': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return {
        // Данные
        candidates: processedCandidates,
        totalCount,
        isLoading,
        isLargeMode,
        currentPage: page,
        totalPages,
        currentSort: sortBy,
        isVirtualView: viewMode === 'virtual',

        // Стейт инпута поиска
        searchInput,
        setSearchInput,

        // Функции / Хэндлеры
        handleVerdictChange,
        handleSortChange,
        handlePageChange,
        handleDatasetToggle,
        handleViewModeToggle,
        getVerdictClass,
        searchParamsString: searchParams.toString(),
    };
};