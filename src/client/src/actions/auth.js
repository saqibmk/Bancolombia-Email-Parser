export const SHOW_AUTH_ALERT = "SHOW_AUTH_ALERT";
export const HIDE_AUTH_ALERT = "HIDE_AUTH_ALERT";
export const START_AUTH = "START_AUTH";
export const AUTH_FAILED = "AUTH_FAILED";
export const AUTH_SUCCESS = "AUTH_SUCCESS";

export const showAuthAlert = () => ({
  type: SHOW_AUTH_ALERT
});

export const hideAuthAlert = () => ({
  type: HIDE_AUTH_ALERT
});

export const startAuth = () => ({
  type: START_AUTH
});

export const authFailed = () => ({
  type: AUTH_FAILED
});

export const authSuccess = () => ({
  type: AUTH_SUCCESS
});

export const authenticate = code => {
  return dispatch => {
    dispatch(startAuth());
    fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw Error("Auth Failed");
        }
      })
      .then(results => results.json())
      .then(data => dispatch(authSuccess()))
      .catch(() => dispatch(authFailed()));
  };
};
