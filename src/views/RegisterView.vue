<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: "RegisterComponent",
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    const store = useStore();
    const router = useRouter();

    const register = async () => {
      try {
        await store.dispatch('register', {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        router.push('/');
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    };

    const signIn = () => {
      router.push('/login');
    }

    return { register, name, email, password, error, signIn };
  },
};
</script>

<template>
  <form @submit.prevent="register" class="container">
    <h2 class="form__title">Register</h2>
    <input
      id="name"
      type="name"
      class="form__control"
      name="name"
      value
      required
      autofocus
      v-model="name"
      placeholder="Name"
    />
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
      <button @click.prevent="signIn" class="btn btn-second">Sign in</button>
      <button type="submit" id="register_button" class="btn btn-success">Register</button>
    </div>

    <div class="error__wrapper">
      {{ error }}
    </div>
  </form>
</template>
