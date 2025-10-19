import { render, screen } from "@testing-library/react";
import { userEvent } from "@vitest/browser/context";
import { DemoButton } from "./button";

describe("DemoButton", () => {
  let alertSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    alertSpy.mockRestore();
  });

  it("コンポーネントが正常にレンダリングされる", () => {
    render(<DemoButton />);

    expect(screen.getByText("Click me")).toBeDefined();
  });

  it("ボタンクリック時にconsole.logとalertが実行される", async () => {
    render(<DemoButton />);

    const button = screen.getByText("Click me");
    await userEvent.click(button);

    expect(alertSpy).toHaveBeenCalledWith("ܿボタンがクリックされました");
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  it("ボタンのプロパティが正しく設定されている", () => {
    render(<DemoButton />);

    const button = screen.getByText("Click me");
    expect(button.closest("button")).toBeDefined();
  });

  it("複数回クリックした場合も正しく動作する", async () => {
    render(<DemoButton />);

    const button = screen.getByText("Click me");
    await userEvent.click(button);
    await userEvent.click(button);

    expect(alertSpy).toHaveBeenCalledTimes(2);
  });
});
