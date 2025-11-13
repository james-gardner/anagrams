import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AnagramForm from "../../app/components/AnagramForm";

describe("<AnagramForm />", () => {
  it("disables submit when empty and enables when text present", () => {
    render(<AnagramForm  isLoading={false} />);
    const btn = screen.getByRole("button", { name: /search/i });
    const input = screen.getByRole("textbox");
    expect(btn).toBeDisabled();

    fireEvent.change(input, { target: { value: "cheap" } });
    expect(btn).toBeEnabled();
  });

  it("calls onSubmit with trimmed value", () => {
    const onSubmit = vi.fn();
    render(<AnagramForm onSubmit={onSubmit}  isLoading={false} />);
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "  peach  " } });
    fireEvent.click(btn);

    expect(onSubmit).toHaveBeenCalledWith("peach");
  });

  it("calls onChange and allows parent to clear on empty", () => {
    const onChange = vi.fn();
    
    render(<AnagramForm onChange={onChange} isLoading={false} />);
    
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "cheap" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(onChange).toHaveBeenCalledWith("cheap");
    expect(onChange).toHaveBeenCalledWith("");
  });
});
