
import {Component, tag, shadow, visual} from 'Component'

@tag('main-theme')
@shadow(false)
@visual(false)
export default class MainTheme extends Component {
  styles () {
    return `
      :root {
        --phablet-breakpoint: 480px;

        --primary-color:      #4897d8;
        --secondary-color:    #f8a055;
        --accent-color:       #fa6e59;
        --success-color:      #8CD790;
        --alternative-color:  #ffdb5c;
        --light-color:        #f4eade;
        --black-color:        #212121;
        --white-color:        #f5f5f5;
        --gray-color:         #9E9E9E;
        --dark-gray-color:    #757575;

        --primary-font: 'Didact Gothic', sans-serif;
        --secondary-font: 'Sacramento', cursive;

        --progress-bar-color: var(--secondary-color, orange);

        --fullscreen-form-view-border-width: 7px;
        --fullscreen-form-view-border-radius: 5px;

        --chtr-label-background: var(--primary-color, blue);
        
        --chtr-input-color: var(--dark-gray-color);
        --chtr-input-background-color: var(--white-color);
        --chtr-input-border-color: var(--dark-gray-color);
        --chtr-input-focus-color: var(--secondary-color);
        --chtr-input-focus-border-color: var(--secondary-color);

        --chtr-message-background-color: var(--success-color);
        --chtr-message-color: var(--white-color);
        --chtr-message-error-background-color: var(--accent-color);
        --chtr-message-error-color: var(--white-color);
      }

      html {
        font-family: 'Didact Gothic', sans-serif;
        font-size: 16px;
        background-color: var(--white-color, white);
        color: var(--dark-color, #333);
      }
    `
  }
}

