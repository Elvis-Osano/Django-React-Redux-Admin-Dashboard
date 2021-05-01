import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  CREATED_SUCCESS,
  CREATED_FAIL,
  GOOGLE_AUTH_SUCCESS,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
  GOOGLE_AUTH_FAIL,
} from "./types";
import axios from "axios";

export const checkAuthentication = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        "http://localhost:8000/auth/jwt/verify/",
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};
export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        "http://localhost:8000/auth/users/me/",
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:8000/auth/jwt/create/",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(load_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const signup = (
  first_name,
  last_name,
  email,
  password,
  re_password
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password,
  });
  try {
    const res = await axios.post(
      "http://localhost:8000/auth/users/",
      body,
      config
    );
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};
export const googleAuth = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const details = {
      state: state,
      code: code,
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    try {
      const res = await axios.post(
        `http://localhost:8000/auth/o/google-oauth2/?${formBody}`,
        config
      );
      dispatch({
        type: GOOGLE_AUTH_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
    } catch (error) {
      dispatch({
        type: GOOGLE_AUTH_FAIL,
      });
    }
  }
};

export const facebookAuth = (state, code) => async (dispatch) => {
  if (state && code && !localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const details = {
      state: state,
      code: code,
    };
    const formBody = Object.keys(details)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");

    try {
      const res = await axios.post(
        `http://localhost:8000/auth/o/facebook/?${formBody}`,
        config
      );
      dispatch({
        type: FACEBOOK_AUTH_SUCCESS,
        payload: res.data,
      });
      dispatch(load_user());
    } catch (error) {
      console.log(error);
      dispatch({
        type: FACEBOOK_AUTH_FAIL,
      });
    }
  }
};
export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });
  try {
    await axios.post(
      "http://localhost:8000/auth/users/activation/",
      body,
      config
    );
    dispatch({
      type: ACTIVATION_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};
export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });

  try {
    await axios.post(
      "http://localhost:8000/auth/users/reset_password/",
      body,
      config
    );
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const reset_password_confirm = (
  uid,
  token,
  new_password,
  re_password
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token, new_password, re_password });

  try {
    await axios.post(
      "http://localhost:8000/auth/users/reset_password_confirm/",
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
export const createData = (name, sale) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, sale });

  try {
    await axios.post("http://localhost:8000/branch/", body, config);

    dispatch({
      type: CREATED_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATED_FAIL,
    });
  }
};
