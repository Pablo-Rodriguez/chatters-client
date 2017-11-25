
import mainView from '../views/app'
import login from '../views/login' 
import signup from '../views/signup'
import auth from '../middleware/auth'

export default function (app) {
  app.route('/', auth(mainView))
  app.route('/signup', signup)
  app.route('/login', login)
}

