import React from 'react';
import { useCandidateDetailModel } from './model';
import { CriteriaBlock } from './components/CriteriaBlock';
import { CandidateSidebar } from './components/CandidateSidebar';
import { StatusSelector } from './components/StatusSelector';

const CandidateDetailPage: React.FC = () => {
    const {
        candidate,
        isLoading,
        error,
        handleBack,
        getCriteriaStyles,
        getVerdictBadgeClass,
    } = useCandidateDetailModel();

    if (isLoading) {
        return (
            <div className="p-4 space-y-6 mx-full w-full animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-24" />
                <div className="h-24 bg-gray-200 rounded-xl w-full" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="h-64 bg-gray-200 rounded-xl lg:col-span-2" />
                    <div className="h-64 bg-gray-200 rounded-xl" />
                </div>
            </div>
        );
    }

    if (error || !candidate) {
        return (
            <div className="text-center py-24 w-full space-y-4">
                <p className="text-6xl">🔍</p>
                <h1 className="text-2xl font-bold text-gray-900">Кандидат не найден</h1>
                <p className="text-sm text-gray-500">Возможно, ссылка устарела или профиль кандидата был удален из базы данных.</p>
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold text-sm rounded-lg hover:bg-blue-700 transition-colors shadow"
                >
                    Вернуться к списку
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 max-w-full w-full">
            <button
                onClick={handleBack}
                className="group flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
                <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                Назад к списку
            </button>
            <header className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{candidate.name}</h1>
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${getVerdictBadgeClass(candidate.verdict)}`}>
                            {candidate.verdict}
                        </span>
                    </div>
                    <p className="text-gray-500 font-medium text-sm">{candidate.pos_label}</p>
                </div>
                <div className="text-sm text-gray-400 font-medium">
                    Опыт работы: <span className="text-gray-900 font-bold">{candidate.total_exp}</span>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            📝 Резюме (Summary)
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                            {candidate.summary}
                        </p>
                    </section>
                    <CriteriaBlock criteria={candidate.criteria} getCriteriaStyles={getCriteriaStyles} />
                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            ❓ Вопросы для собеседования
                        </h2>
                        <ul className="divide-y divide-gray-100 text-sm">
                            {candidate.questions.map((question, idx) => (
                                <li key={idx} className="py-3 flex gap-3 items-start font-medium text-gray-700">
                                    <span className="text-blue-500 font-bold shrink-0">{idx + 1}.</span>
                                    <span>{question}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            💼 Опыт работы
                        </h2>
                        <div className="relative border-l-2 border-gray-100 pl-4 ml-2 space-y-6">
                            {candidate.exp.map(([period, company, role, duration], idx) => (
                                <div key={idx} className="relative space-y-1">
                                    <span className="absolute -left-6.25 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow" />
                                    <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
                                        <span>{period}</span>
                                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{duration}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-950">{role}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{company}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="space-y-6">
                    <StatusSelector candidateId={candidate.id} currentStatus={candidate.status} />
                    <CandidateSidebar candidate={candidate} />
                </div>
            </div>
        </div>
    );
};

export default CandidateDetailPage;