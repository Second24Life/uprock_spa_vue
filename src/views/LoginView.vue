<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: "LoginComponent",
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    const store = useStore();
    const router = useRouter();

    const login = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value,
        });
        router.push('/');
      } catch (err) {
        error.value = err.message;
      }
    };

    const register = () => {
      router.push('/register');
    };

    return { login, email, password, error, register };
  },
};
</script>

<template>
  <form @submit.prevent="login" class="container">
    <h2 class="form__title">Login</h2>
    <input
      id="email"
      type="email"
      class="form__control"
      name="email"
      value
      required
      autofocus
      v-model="email"
      placeholder="Email"
    />
    <input
      id="password"
      type="password"
      class="form__control"
      name="password"
      required
      v-model="password"
      placeholder="Password"
    />

    <div class="button__wrapper">
      <button @click.prevent="register" class="btn btn-second">Register</button>
      <button type="submit" class="btn btn-success" id="login_button">Sign in</button>
    </div>

    <div class="error__wrapper">
      {{ error }}
    </div>
  </form>
</template>
