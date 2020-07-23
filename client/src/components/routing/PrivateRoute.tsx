import React, { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

import { connect } from 'react-redux'
import { AppState } from '../../redux/configureStore'

type PrivateRouteProps = LinkStateProps & {
   component: any
}

const PrivateRoute: FC<PrivateRouteProps & RouteProps> = ({
   component: Component,
   isAuthenticated,
   ...rest
}) => {
   return (
      <Route
         {...rest}
         render={props =>
            !isAuthenticated ? (
               <Redirect to='/login' />
            ) : (
               <Component {...props} />
            )
         }
      />
   )
}

interface LinkStateProps {
   isAuthenticated: boolean | null
}

const mapStateToProps = (state: AppState) => ({
   isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(PrivateRoute)
