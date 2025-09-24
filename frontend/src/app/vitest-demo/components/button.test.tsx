import { userEvent } from '@vitest/browser/context';
import { render, screen } from '@testing-library/react';
import { DemoButton } from './button';

describe('DemoButton', () => {
	let consoleSpy: ReturnType<typeof vi.spyOn>;
	let alertSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
		alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
	});

	afterEach(() => {
		consoleSpy.mockRestore();
		alertSpy.mockRestore();
	});

	it('コンポーネントが正常にレンダリングされる', () => {
		render(<DemoButton />);

		expect(screen.getByText('Click me')).toBeDefined();
	});

	it('ボタンクリック時にconsole.logとalertが実行される', async () => {
		render(<DemoButton />);

		const button = screen.getByText('Click me');
		await userEvent.click(button);

		expect(consoleSpy).toHaveBeenCalledWith('ܿボタンがクリックされました');
		expect(alertSpy).toHaveBeenCalledWith('ܿボタンがクリックされました');
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(alertSpy).toHaveBeenCalledTimes(1);
	});

	it('ボタンのプロパティが正しく設定されている', () => {
		render(<DemoButton />);

		const button = screen.getByText('Click me');
		expect(button.closest('button')).toBeDefined();
	});

	it('複数回クリックした場合も正しく動作する', async () => {
		render(<DemoButton />);

		const button = screen.getByText('Click me');
		await userEvent.click(button);
		await userEvent.click(button);

		expect(consoleSpy).toHaveBeenCalledTimes(2);
		expect(alertSpy).toHaveBeenCalledTimes(2);
	});
});
