
const arrowSize = 10;

export default (self) => `
  :host {
    display: block;
  }

  :host li {
    font-size: 20px;
    color: var(--white-color, white);
    padding: 1em;
    margin: ${arrowSize * 2}px;
    list-style: none;
    background: var(--primary-color, darkblue);
    border-radius: 5px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
    position: relative;
    ${arrowHost(self.message.by != null)}
  }

  :host li:after {
    content: '';
    width: 0;
    height: 0;
    border: solid ${arrowSize}px transparent;
    position: absolute;
    top: 0;
    ${arrow(self.message.by != null)}
  }

  :host li b {
    font-size: 23px;
    padding-right: 5px;
  }
`

function arrowHost (other) {
  return other ?
    'border-top-left-radius: 0;' :
    'border-top-right-radius: 0;'
}

function arrow (other) {
  return other ? `
    border-right-color: var(--primary-color, darkblue);
    left: -${arrowSize * 2}px;
  ` : `
    border-left-color: var(--primary-color, darkblue);
    right: -${arrowSize * 2}px;
  `
}

