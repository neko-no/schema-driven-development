import { renderHook, act } from '@testing-library/react';
import { useButtonClick } from '.';

describe('useButtonClick', () => {
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

	it('handleClickが正しく定義されている', () => {
		const { result } = renderHook(() => useButtonClick());

		expect(result.current.handleClick).toBeDefined();
		expect(typeof result.current.handleClick).toBe('function');
	});

	it('handleClickを呼び出すとconsole.logとalertが実行される', () => {
		const { result } = renderHook(() => useButtonClick());

		act(() => {
			result.current.handleClick();
		});

		expect(consoleSpy).toHaveBeenCalledWith('ܿボタンがクリックされました');
		expect(alertSpy).toHaveBeenCalledWith('ܿボタンがクリックされました');
		expect(consoleSpy).toHaveBeenCalledTimes(1);
		expect(alertSpy).toHaveBeenCalledTimes(1);
	});

	it('handleClickは再レンダリング時に同じ参照を保持する（useCallback）', () => {
		const { result, rerender } = renderHook(() => useButtonClick());
		const firstHandleClick = result.current.handleClick;

		rerender();
		const secondHandleClick = result.current.handleClick;

		expect(firstHandleClick).toBe(secondHandleClick);
	});
});
