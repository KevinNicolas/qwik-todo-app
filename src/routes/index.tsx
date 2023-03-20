import { component$ } from "@builder.io/qwik";
import { DocumentHead, Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center">
      <Link href="/todo">
        <span>Ir a todo</span>
      </Link>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Keep tracking",
  meta: [
    {
      name: "description",
      content: "Time tracking site",
    },
  ],
};
