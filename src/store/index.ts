import Vue from 'vue';
import Vuex from 'vuex';
import forms from './modules/forms';
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    forms,
    user,
  },
  strict: debug,
});
