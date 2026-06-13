import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

interface Props {
    text: string;
}

// Упрощенный блок Summary для теста
const SummaryBlock = ({ text }: Props) => (
    <section>
        <h2>📝 Резюме (Summary)</h2>
        <p>{text}</p>
    </section>
);

describe('Блок резюме кандидата', () => {

    it('Должен отображать переданный текст резюме', () => {
        const testText = 'Фронтенд разработчик, опыт 3 года.';

        // Рендерим блок и передаем ему наш тестовый текст
        render(<SummaryBlock text={testText} />);

        // Проверяем, отобразился ли заголовок секции
        expect(screen.getByText('📝 Резюме (Summary)')).toBeInTheDocument();

        // Проверяем, отобразился ли переданный текст
        expect(screen.getByText(testText)).toBeInTheDocument();
    });

});