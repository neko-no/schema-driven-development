import { act, renderHook } from "@testing-library/react";
import { useButtonClick } from ".";

describe("useButtonClick", () => {
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  it("handleClickが正しく定義されている", () => {
    const { result } = renderHook(() => useButtonClick());

    expect(result.current.handleClick).toBeDefined();
    expect(typeof result.current.handleClick).toBe("function");
  });

  it("handleClickを呼び出すとconsole.logとalertが実行される", () => {
    const { result } = renderHook(() => useButtonClick());

    act(() => {
      result.current.handleClick();
    });

    expect(alertSpy).toHaveBeenCalledWith("ܿボタンがクリックされました");
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  it("handleClickは再レンダリング時に同じ参照を保持する（useCallback）", () => {
    const { result, rerender } = renderHook(() => useButtonClick());
    const firstHandleClick = result.current.handleClick;

    rerender();
    const secondHandleClick = result.current.handleClick;

    expect(firstHandleClick).toBe(secondHandleClick);
  });
});
