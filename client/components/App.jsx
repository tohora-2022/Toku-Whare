import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Whare from './Whare'
import UserProfile from './UserProfile'
import Aspect from './Aspect'
import { cacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchWhareData } from '../actions'

function App () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  cacheUser(useAuth0, user)

  useEffect(() => {
    if (user.token) {
      dispatch(fetchWhareData(user.token))
    }
  }, [user.token])

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Whare />}/>
            <Route path=":aspect" element={<Aspect />} />
            <Route path="userprofile" element={<UserProfile />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
