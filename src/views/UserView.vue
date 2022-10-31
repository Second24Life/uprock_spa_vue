<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../utils/firebaseConfig';


export default {
  name: "UserComponent",
  setup() {
    const store = useStore();
    const router = useRouter();

    auth.onAuthStateChanged(user => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    const signOut = async () => {
      await store.dispatch('logout');
      router.push('/');
    };

    const logIn = async () => {
      router.push('/login');
    };
    console.log(user);
    return { user, signOut, logIn };
  },
};
</script>

<template>
  <div v-if="user.authorized" class="container">
    <h2>Welcome, {{ user.data.displayName }}</h2>
    <div>You are logged in!</div>
    <button @click.prevent="signOut" class="btn btn-second">Log Out</button>
  </div>
  <div v-else class="container" role="alert">
    <h2>You are not logged in!</h2>
    <button @click.prevent="logIn" class="btn btn-second">Log In</button>
  </div>
</template>
