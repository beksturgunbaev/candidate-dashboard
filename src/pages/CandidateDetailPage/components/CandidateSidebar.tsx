import React from 'react';
import type { ICandidate } from '@/types';

export const CandidateSidebar: React.FC<{ candidate: ICandidate }> = ({ candidate }) => (
    <aside className="space-y-6">
        {/* Контакты */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Контакты</h3>
            <div className="space-y-3 text-sm font-medium text-gray-700">
                <div className="flex justify-between border-b pb-2 border-gray-100">
                    <span className="text-gray-400">Город:</span>
                    <span className="text-gray-900">{candidate.city}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-gray-100">
                    <span className="text-gray-400">Email:</span>
                    <a href={`mailto:${candidate.email}`} className="text-blue-600 hover:underline">{candidate.email}</a>
                </div>
                <div className="flex justify-between border-b pb-2 border-gray-100">
                    <span className="text-gray-400">Телефон:</span>
                    <span className="text-gray-900">{candidate.phone}</span>
                </div>
                <div className="flex justify-between pb-1">
                    <span className="text-gray-400">Telegram:</span>
                    <a href={`https://t.me/${candidate.tg.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        {candidate.tg}
                    </a>
                </div>
            </div>
        </div>

        {/* Основной Стек */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Технический стек</h3>
            <div className="flex flex-wrap gap-1.5">
                {candidate.stack.split(',').map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-md border border-gray-200">
                        {tech.trim()}
                    </span>
                ))}
            </div>
        </div>

        {/* Образование */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Образование</h3>
            <p className="text-sm font-semibold text-gray-900">{candidate.edu}</p>
        </div>
    </aside>
);