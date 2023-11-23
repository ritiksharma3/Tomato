import {memo,lazy,Suspense} from 'react'
import {Switch,Route} from 'react-router-dom'

// auth
const ConfirmMail = lazy(() => import('../views/dashboard/auth/confirm-mail'))
const LockScreen = lazy(() => import('../views/dashboard/auth/lock-screen'))
const Recoverpw = lazy(() => import('../views/dashboard/auth/recoverpw'))
const SignIn = lazy(() => import('../views/dashboard/auth/sign-in'))
const SignUp = lazy(() => import('../views/dashboard/auth/sign-up'))
// errors
const Error404 = lazy(() => import('../views/dashboard/errors/error404'))
const Error500 = lazy(() => import('../views/dashboard/errors/error500'))
const Maintenance = lazy(() => import('../views/dashboard/errors/maintenance'))

const SimpleRouter = memo(() => {
    return (
        <Suspense fallback={<div className="react-load"></div>}>
            <Switch>
                {/* auth */}
                <Route exact path="/default/auth/confirm-mail" component={ConfirmMail}/>
                <Route exact path="/default/auth/lock-screen"  component={LockScreen}/>
                <Route exact path="/default/auth/recoverpw"    component={Recoverpw}/>
                <Route exact path="/default/auth/sign-in"      component={SignIn}/>
                <Route exact path="/default/auth/sign-up"      component={SignUp}/> 
                 
                {/* error */}
                <Route exact path="/errors/error404"   component={Error404}/>  
                <Route exact path="/errors/error500"  component={Error500}/>
                <Route exact path="/errors/maintenance" component={Maintenance}/>
            </Switch>
        </Suspense>
    )
}
)

SimpleRouter.displayName="SimpleRouter"
export default SimpleRouter
