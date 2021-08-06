import { PATHS } from '../config'
import Home from '../containers/Home'
import NotFound from '../containers/NotFound'
import Profile from '../containers/Profile'
import Signin from '../containers/Signin'
import Signup from '../containers/Signup'
import Upload from '../containers/Upload'

const routes = [
    { exact: true, path: PATHS.HOME, component: Home },
    { exact: true, path: PATHS.PROFILE, component: Profile },
    { exact: true, path: PATHS.SIGNIN, component: Signin },
    { exact: true, path: PATHS.SIGNUP, component: Signup },
    { exact: true, path: PATHS.UPLOAD, component: Upload },
    { exact: true, path: "*", component: NotFound }
]

export default routes