import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Самый простой мини-компонент заглушки для примера
const EmptyState = () => (
    <div>
        <h3>Никого не нашли</h3>
        <p>Попробуйте скорректировать фильтры</p>
    </div>
);

describe('Компонент заглушки списка', () => {

    it('Должен красиво выводить текст, если кандидатов 0', () => {
        // 1. Рендерим компонент в виртуальный браузер теста
        render(<EmptyState />);

        // 2. Ищем на экране (screen) нужную фразу
        const message = screen.getByText('Никого не нашли');

        // 3. Проверяем, что этот текст физически присутствует в HTML-документе
        expect(message).toBeInTheDocument();
    });

});