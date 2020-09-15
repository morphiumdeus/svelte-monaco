import { writable } from 'svelte/store';
import * as Y from 'yjs'

import { WebsocketProvider } from 'y-websocket'

export const roomName = writable("")

export const activeFile = writable("main")

function createYdoc(){
  const { subscribe, set, update } = writable(new Y.Doc());

	return {
		subscribe,
    reset: () => {update(doc => new Y.Doc())},
	}
}
export const ydoc = writable(createYdoc())

export const websocketProvider = writable(null)