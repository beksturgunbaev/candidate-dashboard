import { PATHS } from './paths';
import React, { Suspense } from 'react';
import Layout from '@/components/Layout';
import { createBrowserRouter } from 'react-router-dom';
import { CandidateDetailPage, CandidatesPage } from '@/pages';

// Вспомогательный компонент для оборачивания lazy-страниц в Suspense
const withSuspense = (Component: React.ComponentType) => (
    <Suspense fallback={'Loading...'}>
        <Component />
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: PATHS.ROOT,
        element: <Layout />,
        errorElement: 'Error Page', // Отлавливает упавшие рендеры во вложенных компонентах
        children: [
            {
                index: true, // Сработает при переходе на '/'
                element: withSuspense(CandidatesPage),
            },
            {
                path: `${PATHS.CANDIDATE_DETAIL}`,
                element: withSuspense(CandidateDetailPage),
            },
            {
                path: PATHS.NOT_FOUND,
                element: 'Not Found Page',
            },
        ],
    },
]);