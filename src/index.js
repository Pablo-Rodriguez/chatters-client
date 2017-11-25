
import 'babel-polyfill'
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

