import { writable } from 'svelte/store';
import * as Y from 'yjs'

import { WebsocketProvider } from 'y-websocket'

export const roomName = writable("")

export const activeFile = writable("main")

function createYdoc(){
  const ydoc = new Y.Doc()
  const { subscribe, set, update } = writable(ydoc)

	return {
		subscribe,
    reset: () => {
      ydoc = new Y.Doc()
      update(doc => ydoc)
      console.log(ydoc, this);
    },
    getMap: (key) => ydoc.getMap(key)
	}
}
export const ydoc = writable(createYdoc())

export const websocketProvider = writable(null)