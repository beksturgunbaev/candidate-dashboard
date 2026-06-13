import toast from 'react-hot-toast';
import React, { useState } from 'react';
import type { IStatusType } from '@/types';
import { useCandidatesStore } from '@/store';

// Словарь для человекочитаемых названий статусов
const STATUS_LABELS: Record<IStatusType, string> = {
    new: 'Новый',
    review: 'На рассмотрении',
    invited: 'Приглашён',
    rejected: 'Отклонён',
};

// Стили для цветовой индикации бордеров и текста самого селекта
const STATUS_STYLES: Record<IStatusType, string> = {
    new: 'bg-blue-50 text-blue-700 border-blue-300 focus:ring-blue-500',
    review: 'bg-purple-50 text-purple-700 border-purple-300 focus:ring-purple-500',
    invited: 'bg-green-50 text-green-700 border-green-300 focus:ring-green-500',
    rejected: 'bg-red-50 text-red-700 border-red-300 focus:ring-red-500',
};

interface StatusSelectorProps {
    candidateId: string;
    currentStatus: IStatusType;
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({ candidateId, currentStatus }) => {
    const changeStatusOptimistic = useCandidatesStore((state) => state.changeStatusOptimistic);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const nextStatus = e.target.value as IStatusType;

        // Предотвращаем повторный вызов, если кликнули на тот же статус
        if (nextStatus === currentStatus) return;

        setIsUpdating(true);

        // Вызываем оптимистичный экшен из Zustand
        await changeStatusOptimistic(
            candidateId,
            nextStatus,
            // 1. Коллбек Успеха (срабатывает мгновенно для UI)
            () => {
                toast.success(`Статус оптимистично изменен на "${STATUS_LABELS[nextStatus]}"`);
            },
            // 2. Коллбек Ошибки (срабатывает, если сервер вернул 500 и стейт откатился)
            (errorMessage) => {
                setIsUpdating(false);
                toast.error(`Ошибка: ${errorMessage}. Стейт успешно восстановлен!`, {
                    duration: 4000,
                    icon: '🔄',
                });
            }
        );

        // Запрос завершился (успешно или с ошибкой — не важно, снимаем лоадер)
        setIsUpdating(false);
    };

    return (
        <div className="flex flex-col gap-1.5 bg-white p-4 rounded-xl border border-gray-200 shadow-sm w-full">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>Статус кандидата</span>
                {isUpdating && (
                    <span className="text-blue-500 text-[10px] lowercase animate-pulse font-medium">
                        сохранение на сервере...
                    </span>
                )}
            </label>

            <div className="relative">
                <select
                    value={currentStatus}
                    onChange={handleChange}
                    disabled={isUpdating}
                    className={`w-full text-sm font-bold px-3 py-2 border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${STATUS_STYLES[currentStatus]}`}
                >
                    {(Object.keys(STATUS_LABELS) as IStatusType[]).map((key) => (
                        <option key={key} value={key} className="bg-white text-gray-900 font-medium">
                            {STATUS_LABELS[key]}
                        </option>
                    ))}
                </select>
                {/* Кастомная стрелочка для красивого UI */}
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-current opacity-70">
                    ▼
                </div>
            </div>
        </div>
    );
};