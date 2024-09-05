<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-center mb-4">Register</h3>
            <form @submit.prevent="registerUser">
              <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input v-model="user.firstName" type="text" class="form-control" id="firstName" placeholder="Enter first name" required />
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input v-model="user.lastName" type="text" class="form-control" id="lastName" placeholder="Enter last name" required />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="user.userName" type="text" class="form-control" id="username" placeholder="Enter username" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="user.userPass" type="password" class="form-control" id="password" placeholder="Enter password" required />
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age</label>
                <input v-model="user.userAge" type="number" class="form-control" id="age" placeholder="Enter your age" required />
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label">Gender</label>
                <select v-model="user.gender" class="form-control" id="gender" required>
                  <option disabled value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input v-model="user.userAdd" type="text" class="form-control" id="address" placeholder="Enter your address" required />
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3">Register</button>
              <router-link to="/login" class="btn btn-link w-100 mb-3">Have an account? Log in</router-link>
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
        userProfile: 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png'
      }
    };
  },
  methods: {
    registerUser() {
      this.$store.dispatch('registerUser', this.user)
        .then(() => {
          this.$router.push('login');
        })
        .catch(err => {
          console.error("Failed to add user:", err);
        });
    },
  }
}
</script>

<style scoped>

</style>

  