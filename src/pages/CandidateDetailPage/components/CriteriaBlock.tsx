import React from 'react';
import type { ICriteriaRating } from '@/types';

interface CriteriaBlockProps {
    criteria: [ICriteriaRating, string][];
    getCriteriaStyles: (rating: ICriteriaRating) => {
        bg: string; text: string; badge: string; label: string; icon: string;
    };
}

export const CriteriaBlock: React.FC<CriteriaBlockProps> = ({ criteria, getCriteriaStyles }) => (
    <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            📊 Критерии оценки
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {criteria.map(([rating, description], idx) => {
                const styles = getCriteriaStyles(rating);
                return (
                    <div key={idx} className={`p-3.5 rounded-xl border flex gap-3 ${styles.bg} ${styles.text}`}>
                        <span className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${styles.badge}`}>
                            {styles.icon}
                        </span>
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold uppercase tracking-wider opacity-75">{styles.label}</span>
                            <p className="text-sm font-medium leading-relaxed">{description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
);