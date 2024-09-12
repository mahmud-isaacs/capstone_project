<template>
  <div class="container restaurant-theme">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card shadow-lg border-0 rounded-3">
          <div class="card-body p-5">
            <h3 class="card-title text-center mb-4">{{ user ? 'Welcome to Our Restaurant' : 'Login to Order Delicious Food' }}</h3>
            <form v-if="!user" @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  v-model="username"
                  type="text"
                  class="form-control rounded-pill"
                  id="username"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control rounded-pill"
                  id="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-custom w-100 mb-3">Login</button>
              <router-link to="/register" class="btn btn-link w-100 mb-3 text-decoration-none">New here? Register now</router-link>
            </form>
            <button v-if="user" @click="handleLogout" class="btn btn-danger w-100 mb-3">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogout() {
      try {
        this.logout();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    login() {
      this.$store.dispatch('login', {
        userName: this.username,
        userPass: this.password,
      });
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>

<style scoped>
.restaurant-theme {
  background-color: #F5F5F5; /* Light background to match restaurant theme */
  font-family: 'Georgia', serif;
}

.card {
  background-color: #ffffff; /* White background for a clean look */
  border: 1px solid #6A7B4C; /* Greenish border to match restaurant theme */
}

.card-title {
  color: #6A7B4C; /* Heading color */
  font-family: 'Archivo Black', sans-serif;
  font-size: 2rem;
}

.form-label {
  color: #4A4A4A; /* Dark text color for readability */
}

input {
  border: 2px solid #6A7B4C; /* Greenish border for input fields */
  padding: 0.75rem;
}

.btn-custom {
  background-color: #6A7B4C; /* Greenish button */
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.1rem;
}

.btn-custom:hover {
  background-color: #829b61; /* Slightly lighter hover state */
  color: white;
}

.btn-link {
  color: #6A7B4C; /* Matching link color */
  font-weight: bold;
}

.btn-link:hover {
  color: #829b61; /* Hover state for the link */
  text-decoration: underline;
}

.btn-danger {
  background-color: #c0392b; /* Red for the logout button */
  font-weight: bold;
}

.btn-danger:hover {
  background-color: #e74c3c; /* Slightly lighter red on hover */
}
</style>

  
  
  
  