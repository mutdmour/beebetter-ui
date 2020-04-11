/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Form, FormsState } from '../../index'
import { login, logout, signup } from "../../api/user";
import { ActionContext } from "vuex";
import { isUserIdCookieSet } from "../../utils/helpers";

declare interface UserState {
  loggedIn: boolean;
}

const state: UserState = {
  loggedIn: isUserIdCookieSet()
};

const getters = {
  isLoggedIn: (state: UserState): boolean => {
    return state.loggedIn;
  }
};

const actions = {
  login: (
    context: ActionContext<any, unknown>,
    loginDetails: { username: string; password: string }
  ) => {
    return new Promise((resolve, reject) => {
      login(loginDetails.username, loginDetails.password)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        })
        .finally(() => {
          context.commit("updateLogIn");
        });
    });
  },
  logout: (context: ActionContext<any, unknown>) => {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        })
        .finally(() => {
          context.commit("updateLogIn");
        });
    });
  },
  signup: (
    context: ActionContext<any, unknown>,
    details: {
      username: string;
      password: string;
      beeminderUsername: string;
      beeminderAuthToken: string;
    }
  ) => {
    return new Promise((resolve, reject) => {
      signup(
        details.username,
        details.password,
        details.beeminderUsername,
        details.beeminderAuthToken
      )
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        })
        .finally(() => {
          context.commit("updateLogIn");
        });
    });
  }
};

const mutations = {
  updateLogIn: (state: UserState) => {
    state.loggedIn = isUserIdCookieSet();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
