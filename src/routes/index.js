
import mainView from '../views/app'
import login from '../views/login.js' 

export default function (app) {
  //app.route('/signup')
  app.route('/login', login)
  app.route('/', mainView)
}

