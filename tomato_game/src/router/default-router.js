// import {memo,lazy,Suspense} from 'react'
// import {Switch,Route} from 'react-router-dom'

// //TransitionGroup
// import {TransitionGroup,CSSTransition} from "react-transition-group";

// // Dashboard
// const Index = lazy(() => import('../views/index'))


// const DefaultRouter = memo(() => {
//     return (
//         <TransitionGroup>
//             <CSSTransition classNames="fadein" timeout={300}>
//                 <Suspense fallback={<div className="react-load"></div>}>
//                     <Switch>
//                         <Route path="/" exact component={Index} />
//                     </Switch>
//                 </Suspense>
//             </CSSTransition>
//         </TransitionGroup>
//     )
// }
// )

// DefaultRouter.displayName="DefaultRouter"
// export default DefaultRouter
