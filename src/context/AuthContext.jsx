import { useMemo, useState } from 'react'
import AuthContext from './auth-context'
import {
  getCurrentUser,
  loginAccount,
  logoutAccount,
  registerAccount,
  updateProfileDetails,
} from '../utils/authStorage'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (payload) => {
        const nextUser = loginAccount(payload)
        setUser(nextUser)
      },
      signup: (payload) => {
        const nextUser = registerAccount(payload)
        setUser(nextUser)
      },
      logout: () => {
        logoutAccount()
        setUser(null)
      },
      updateProfile: (payload) => {
        const nextUser = updateProfileDetails(payload)
        setUser(nextUser)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
