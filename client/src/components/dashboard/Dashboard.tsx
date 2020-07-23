import React, { FC, useEffect } from 'react'

import { connect } from 'react-redux'
import { AppState } from '../../redux/configureStore'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../types/actions/app.actions'
import { bindActionCreators } from 'redux'
import { getProfile } from '../../redux/actions/profile'

export type DashboardProps = LinkStateToProps & LinkDispatchToProps & {}

const Dashboard: FC<DashboardProps> = ({ getProfile }) => {
   useEffect(() => {
      getProfile()
   }, [getProfile])

   return (
      <div>
         <p>Dashboard</p>
      </div>
   )
}

interface LinkStateToProps {}

interface LinkDispatchToProps {
   getProfile: () => void
}

const mapStateToProps = (state: AppState) => ({})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>) => ({
   getProfile: bindActionCreators(getProfile, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
