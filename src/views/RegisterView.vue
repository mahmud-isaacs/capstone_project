<template>
  <div class="container restaurant-theme">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card shadow-lg border-0 rounded-3">
          <div class="card-body p-5">
            <h3 class="card-title text-center mb-4">Register</h3>
            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input
                  v-model="user.firstName"
                  type="text"
                  class="form-control rounded-pill"
                  id="firstName"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  v-model="user.lastName"
                  type="text"
                  class="form-control rounded-pill"
                  id="lastName"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  v-model="user.userName"
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
                  v-model="user.userPass"
                  type="password"
                  class="form-control rounded-pill"
                  id="password"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input
                  v-model="user.userAge"
                  type="number"
                  class="form-control rounded-pill"
                  id="age"
                  placeholder="Enter your age"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <select
                  v-model="user.gender"
                  class="form-control rounded-pill"
                  id="gender"
                  required
                >
                  <option disabled value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input
                  v-model="user.userAdd"
                  type="text"
                  class="form-control rounded-pill"
                  id="address"
                  placeholder="Enter your address"
                  required
                />
              </div>
              <button type="submit" class="btn btn-custom w-100 mb-3">Register</button>
              <router-link to="/login" class="btn btn-link w-100 mb-3 text-decoration-none">Have an account? Log in</router-link>
            </form>
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
      user: {
        firstName: '',
        lastName: '',
        userName: '',
        userAge: null,
        userRole: 'user',
        userAdd: '',
        userPass: '',
        userProfile: 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png',
        gender: '' 
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        await this.$store.dispatch('registerUser', this.user);
        this.$router.push('/login');
      } catch (err) {
        console.error("Failed to register user:", err);
      }
    },
  }
}
</script>

<style scoped>
.restaurant-theme {
  background-color: #F5F5F5; 
  font-family: 'Georgia', serif;
}

.card {
  background-color: #ffffff;
  border: 1px solid #6A7B4C; 
}

.card-body {
  padding: 2rem;
}

.card-title {
  color: #6A7B4C; 
  font-family: 'Archivo Black', sans-serif;
  font-size: 2rem;
}

.form-label {
  color: #4A4A4A; 
}

input, select {
  border: 2px solid #6A7B4C;
  padding: 0.75rem;
}

.btn-custom {
  background-color: #6A7B4C; 
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.1rem;
}

.btn-custom:hover {
  background-color: #829b61; 
  color: white;
}

.btn-link {
  color: #6A7B4C;
  font-weight: bold;
}

.btn-link:hover {
  color: #829b61;
  text-decoration: underline;
}
</style>

  