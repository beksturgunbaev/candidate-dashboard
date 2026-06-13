import { getVerdictClass } from '@/helpers';
import { useNavigate } from 'react-router-dom';
import { useCandidatesPageModel } from './model';
import { TableVirtuoso } from 'react-virtuoso';

const VERDICTS = ['Все', 'ПОДХОДИТ', 'ЧАСТИЧНО', 'НЕ ПОДХОДИТ'] as const;

const CandidatesPage = () => {
    const navigate = useNavigate();

    const {
        candidates,
        totalCount,
        isLoading,
        isLargeMode,
        currentPage,
        totalPages,
        currentVerdict,
        currentSort,
        isVirtualView,
        searchInput,
        setSearchInput,
        handleVerdictChange,
        handleSortChange,
        handlePageChange,
        handleDatasetToggle,
        handleViewModeToggle,
        searchParamsString,
    } = useCandidatesPageModel();

    return (
        <div className="space-y-6 p-4 w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Кандидаты</h1>
                <span className="text-sm text-gray-500">Найдено результатов: {totalCount}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Поиск по ФИО кандидатов..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                    {VERDICTS.map((v) => (
                        <button
                            key={v}
                            onClick={() => handleVerdictChange(v)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentVerdict === v ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={currentSort}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="bg-gray-50 border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name">По имени</option>
                        <option value="exp">По опыту</option>
                    </select>
                </div>

                {/* УПРАВЛЕНИЕ МУТАЦИЕЙ ДАННЫХ И ОПТИМИЗАЦИЕЙ (Задание 5) */}
                <div className="flex flex-wrap items-center gap-4 border-t lg:border-t-0 lg:border-l pt-3 lg:pt-0 lg:pl-4 border-gray-200">
                    <select
                        value={isLargeMode ? 'large' : 'small'}
                        onChange={(e) => handleDatasetToggle(e.target.value === 'large')}
                        className="bg-gray-50 border border-gray-300 rounded-lg text-sm px-2 py-1.5 font-medium"
                    >
                        <option value="small">Данные: 25 шт</option>
                        <option value="large">Данные: 120 шт</option>
                    </select>

                    {isLargeMode && (
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            <input
                                type="checkbox"
                                checked={isVirtualView}
                                onChange={(e) => handleViewModeToggle(e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                            />
                            Виртуализация (react-virtuoso)
                        </label>
                    )}
                </div>
            </div>
            {isLoading ? (
                <div className="space-y-3 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-14 bg-gray-200 rounded-xl w-full" />
                    ))}
                </div>
            ) : candidates.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-400 text-3xl mb-2">🤷‍♂️</p>
                    <h3 className="text-sm font-bold text-gray-900">Никого не нашли</h3>
                    <p className="text-xs text-gray-500 mt-1">Попробуйте скорректировать ключевые слова или фильтр вердиктов.</p>
                </div>
            ) : isVirtualView ? (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden" style={{ height: 450 }}>
                    <TableVirtuoso
                        data={candidates}
                        // Фиксированная шапка таблицы
                        fixedHeaderContent={() => (
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">
                                <th className="py-3 px-5 bg-gray-50">ФИО</th>
                                <th className="py-3 px-5 bg-gray-50">Город</th>
                                <th className="py-3 px-5 bg-gray-50">Опыт</th>
                                <th className="py-3 px-5 bg-gray-50 text-right">Вердикт</th>
                            </tr>
                        )}
                        // Рендер ячеек внутри строки
                        itemContent={(_, c) => (
                            <>
                                <td className="py-3.5 px-5 font-semibold text-gray-900">{c.name}</td>
                                <td className="py-3.5 px-5 text-gray-500">{c.city}</td>
                                <td className="py-3.5 px-5 text-gray-600 font-medium">{c.total_exp}</td>
                                <td className="py-3.5 px-5 text-right">
                                    <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full border ${getVerdictClass(c.verdict)}`}>
                                        {c.verdict}
                                    </span>
                                </td>
                            </>
                        )}
                        // Кастомные компоненты с правильной типизацией без any
                        components={{
                            Table: (props) => (
                                <table {...props} className="w-full text-left border-collapse" />
                            ),
                            TableRow: (props) => {
                                // Извлекаем текущего кандидата из контекста строки virtuoso
                                const c = props.item;
                                return (
                                    <tr
                                        {...props}
                                        onClick={() => navigate(`/candidate/${c.id}`, { state: { from: searchParamsString } })}
                                        className="hover:bg-blue-50/40 transition-colors cursor-pointer border-b border-gray-100 text-sm"
                                    />
                                );
                            }
                        }}
                    />
                </div>
            ) : (
                <>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        {/* Десктопная Таблица */}
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-5">ФИО</th>
                                    <th className="py-3 px-5">Город</th>
                                    <th className="py-3 px-5">Общий опыт</th>
                                    <th className="py-3 px-5 text-right">Вердикт</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {candidates.map((c) => (
                                    <tr
                                        key={c.id}
                                        onClick={() => navigate(`/candidate/${c.id}`, { state: { from: searchParamsString } })}
                                        className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                                    >
                                        <td className="py-3.5 px-5 font-semibold text-gray-900">{c.name}</td>
                                        <td className="py-3.5 px-5 text-gray-500">{c.city}</td>
                                        <td className="py-3.5 px-5 text-gray-600 font-medium">{c.total_exp}</td>
                                        <td className="py-3.5 px-5 text-right">
                                            <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full border ${getVerdictClass(c.verdict)}`}>
                                                {c.verdict}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-1.5 mt-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Назад
                            </button>
                            {[...Array(totalPages)].map((_, idx) => {
                                const p = idx + 1;
                                return (
                                    <button
                                        key={p}
                                        onClick={() => handlePageChange(p)}
                                        className={`w-9 h-9 text-sm font-bold rounded-lg border transition-colors ${currentPage === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Вперед
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CandidatesPage;