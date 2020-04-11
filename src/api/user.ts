const LOGIN_ENDPOINT = "api/v1/login";
const LOGOUT_ENDPOINT = "api/v1/logout";
const SIGNUP_ENDPOINT = "api/v1/signup";

function makeRequest(endpoint: string, data: unknown) {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(data => {
        data.ok ? resolve() : reject();
      })
      .catch(() => {
        reject();
      });
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    fetch(LOGOUT_ENDPOINT, {
      method: "post"
    })
      .then(data => {
        data.ok ? resolve() : reject();
      })
      .catch(() => {
        reject();
      });
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function login(username: string, password: string) {
  return makeRequest(LOGIN_ENDPOINT, {
    username,
    password
  });
}

export function signup(
  username: string,
  password: string,
  beeminderUsername: string,
  beeminderAuthToken: string
) {
  return makeRequest(SIGNUP_ENDPOINT, {
    username,
    password,
    beeminderUsername,
    beeminderAuthToken
  });
}
