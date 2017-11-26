
import 'babel-polyfill'
import '@webcomponents/webcomponentsjs/webcomponents-hi-sd-ce.js'
import '@webcomponents/custom-elements/src/native-shim'
import 'normalize-css'
import choo from 'choo'
import log from 'choo-log'

import reducer from './reducers'
import router from './routes'
import './components/themes/theme'

const app = choo()
app.use(log())
app.use(reducer)
router(app)

app.mount('#root')

