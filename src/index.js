
import 'babel-polyfill'
import '@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js'
import '@webcomponents/custom-elements/src/native-shim'
import 'normalize-css'

import log from 'choo-log'
import nanoapp from './app'
import reducer from './reducers'
import router from './routes'
import './components/themes/theme'

const app = nanoapp()
app.use(log())
app.use(reducer)
router(app)
app.mount('#root')
app.start()

