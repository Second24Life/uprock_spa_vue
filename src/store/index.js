import { createStore } from 'vuex';
import { auth } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const store = createStore({
  state: {
    user: {
      authorized: false,
      data: null,
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  mutations: {
    SET_USER(state, payload) {
      state.user.data = payload;
    },
    SET_AUTHORIZED(state, value) {
      state.user.authorized = value;
    },
  },
  actions: {
    async register(context, { email, password, name }) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        console.log(response.user);
        context.commit('SET_USER', response.user);
        response.user.displayName = name;
      } else {
        throw new Error('Unable to register user');
      }
    },

    async login(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit('SET_USER', response.user);
      } else {
        throw new Error('Login failed');
      }
    },

    async logout(context) {
      await signOut(auth);
      context.commit('SET_USER', null);
    },

    async fetchUser(context, user) {
      context.commit("SET_AUTHORIZED", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        context.commit("SET_USER", null);
      }
    },
  },
});

export default store;
