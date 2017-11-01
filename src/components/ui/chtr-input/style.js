
import {html} from 'lit-html'

export default (self) => html`<style>
  :host {
    display: block;
    overflow: hidden;
  }

  :host input {
    background: var(--chtr-input-background-color, white);
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 2px solid var(--chtr-input-border-color, #333);
    border-radius: 50px;
    height: 2em;
    line-height: 2em;
    padding: 0 1em;
    color: var(--chtr-input-color, #333);
  }

  :host input:focus {
    outline: 0;
    color: var(--chtr-input-focus-color, orange);
    border-color: var(--chtr-input-focus-border-color, orange);
  }
</style>`

