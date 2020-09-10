import { writable } from 'svelte/store';

export const editorText = writable(defaultUserScript())

export const websocketProvider = writable()

function defaultUserScript() {
  return `---
  name: Test
`;
}
