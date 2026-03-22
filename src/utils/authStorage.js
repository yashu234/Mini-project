const ACCOUNTS_KEY = 'sss_accounts'
const CURRENT_USER_KEY = 'sss_current_user'

function safeParse(value, fallback) {
  if (!value) {
    return fallback
  }

  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

export function getAccounts() {
  return safeParse(localStorage.getItem(ACCOUNTS_KEY), [])
}

export function getCurrentUser() {
  return safeParse(localStorage.getItem(CURRENT_USER_KEY), null)
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

function toSafeUser(account) {
  return {
    name: account.name,
    email: account.email,
    department: account.department || 'Computer Science',
    semester: account.semester || 'Semester 4',
  }
}

export function registerAccount(payload) {
  const accounts = getAccounts()
  const normalizedEmail = payload.email.trim().toLowerCase()

  const exists = accounts.some((account) => account.email === normalizedEmail)
  if (exists) {
    throw new Error('An account already exists with this email.')
  }

  const account = {
    name: payload.name.trim(),
    email: normalizedEmail,
    password: payload.password,
    department: payload.department || 'Computer Science',
    semester: payload.semester || 'Semester 4',
  }

  const nextAccounts = [...accounts, account]
  saveAccounts(nextAccounts)

  const safeUser = toSafeUser(account)
  saveCurrentUser(safeUser)
  return safeUser
}

export function loginAccount({ email, password }) {
  const accounts = getAccounts()
  const normalizedEmail = email.trim().toLowerCase()

  const account = accounts.find(
    (item) => item.email === normalizedEmail && item.password === password,
  )

  if (!account) {
    throw new Error('Invalid email or password.')
  }

  const safeUser = toSafeUser(account)
  saveCurrentUser(safeUser)
  return safeUser
}

export function logoutAccount() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function updateProfileDetails(payload) {
  const currentUser = getCurrentUser()

  if (!currentUser?.email) {
    throw new Error('You need to login again before updating your profile.')
  }

  const accounts = getAccounts()
  const index = accounts.findIndex((account) => account.email === currentUser.email)

  if (index === -1) {
    throw new Error('Account not found. Please login again.')
  }

  const updatedAccount = {
    ...accounts[index],
    name: payload.name.trim(),
    department: payload.department.trim(),
    semester: payload.semester.trim(),
  }

  const nextAccounts = [...accounts]
  nextAccounts[index] = updatedAccount
  saveAccounts(nextAccounts)

  const safeUser = toSafeUser(updatedAccount)
  saveCurrentUser(safeUser)
  return safeUser
}
