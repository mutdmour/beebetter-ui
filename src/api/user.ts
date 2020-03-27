const LOGIN_ENDPOINT = 'api/v1/login'
// const SIGNUP_ENDPOINT = '/signup'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function login(username: string, password: string) {
 return fetch(LOGIN_ENDPOINT, {
  method: 'post',
  body: JSON.stringify({
   username,
   password,
  }),
 })
}
