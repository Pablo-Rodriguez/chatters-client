
import choo from 'choo'
import log from 'choo-log'

import reducer from './reducers/index'
import router from './routes'

const app = choo()
app.use(log())
app.use(reducer)
router(app)
app.mount('body')

