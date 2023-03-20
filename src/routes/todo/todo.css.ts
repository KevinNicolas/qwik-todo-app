import { style } from "styled-vanilla-extract/qwik";

export const main = style({
  width: "100%",
  height: "100%",
  padding: "3em",
  display: "flex",
  "flex-direction": "column",
  "justify-content": "center",
  "align-items": "center",
});

export const taskList = style({
  display: "flex",
  "flex-direction": "column",
  width: "100%",
  "max-width": "600px",
  height: "fit-content",
  "max-height": "800px",
  gap: "2ch",
});
