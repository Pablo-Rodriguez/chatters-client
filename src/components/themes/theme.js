
import {Component, tag, shadow, visual} from 'Component'
import {html} from 'lit-html'

@tag('main-theme')
@shadow(false)
@visual(false)
class MainTheme extends Component {
  styles () {
    return html`
      <style>
        :root {
          --primary-color: red;
        }
      </style>
    `
  }
}

