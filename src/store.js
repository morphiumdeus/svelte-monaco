import { writable } from 'svelte/store';

export const showEditor = writable(false);

function validateUrl(value) {
  // https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

let gistCSS = null;
let pathFromUrl = new URLSearchParams(document.location.search).get('path');
// e.g. 'https://gist.github.com/sw-yx/0e1d14276ef9d2608453fed3c7dfa4ec'

let _userScript = localStorage.getItem('userScript');
_userScript = _userScript ? JSON.parse(_userScript) : defaultUserScript();
let initUserScript = pathFromUrl || _userScript;
export const userScript = writable(initUserScript);

// special hacks to respond
userScript.subscribe((value) => {
  // try to resolve gist URL's
  if (gistCSS !== value && validateUrl(value)) {
    try {
      new URL(value);
      // if we get here, it is a valid url, we should try to fetch
      fetch(`/.netlify/functions/proxy?path=${value}`)
        .then((r) => console.log({ r }) || r.json())
        .then((data) => {
          // shape of data should be
          // {
          // 	data: {
          // 		files: {
          // 			'zengarden.css': {
          // 				'content': "YOURCSSHERE"
          // 			}
          // 		}
          // 	}
          // }

          if (
            data.files &&
            data.files['zengarden.css'] &&
            data.files['zengarden.css'].content
          ) {
            gistCSS = data.files['zengarden.css'].content;
            console.log({ gistCSS });
            userScript.set(gistCSS);
          }
        });
      return; // dont do the other stuff
    } catch (err) {
      // err doesnt matter
    }
  }

  // secret hack - to restore default css - type 'default'
  if (value === 'default') userScript.set(defaultUserScript());
  if (value) localStorage.setItem('userScript', JSON.stringify(value));
});

function defaultUserScript() {
  return `---
  name: Test
`;
}
