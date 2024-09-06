<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">{{ user ? 'Welcome' : 'Login' }}</h3>
            <form v-if="!user" @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter username" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password" required />
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
              <router-link to="/register" class="btn btn-link w-100 mb-3">Register</router-link>
            </form>
            <button v-if="user" @click="handleLogout" class="btn btn-danger w-100 mb-3">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['login', 'logout']),
    async handleLogin() {
      try {
        await this.login({
          userName: this.username,
          userPass: this.password,
        });
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async handleLogout() {
      try {
        await this.logout();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  }
};
</script>
  
  <style scoped>
  
  </style>
  
  
  
  