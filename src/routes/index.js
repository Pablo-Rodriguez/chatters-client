
import mainView from '../views/app'
import login from '../views/login' 
import signup from '../views/signup'

export default function (app) {
  app.route('/', mainView)
  app.route('/signup', signup)
  app.route('/login', login)
}

