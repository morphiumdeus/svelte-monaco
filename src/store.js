import { writable } from 'svelte/store';

export const editorText = writable(defaultUserScript());

function defaultUserScript() {
  return `---
  name: Test
`;
}
