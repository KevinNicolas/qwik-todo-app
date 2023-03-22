import type { PropFunction, QwikMouseEvent } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import styles from "./button.module.css";

interface Props {
  onclick: PropFunction<(event: QwikMouseEvent<HTMLButtonElement, MouseEvent>, element: HTMLButtonElement) => void>;
  color?: string;
  textColor?: string;
  type?: "outline" | "text" | "full";
}

export const Button = component$(({ onclick, color = "var(--primary-color)", textColor = "white", type = "full" }: Props) => {
  return (
    <button class={[styles.button, styles[type]].join(" ")} style={{ "--color": color, "--text-color": textColor } as any} onClick$={onclick}>
      <Slot />
    </button>
  );
});
