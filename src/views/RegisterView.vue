<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title text-center mb-4">Register</h3>
              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input v-model="firstName" type="text" class="form-control" id="firstName" placeholder="Enter first name" required />
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input v-model="lastName" type="text" class="form-control" id="lastName" placeholder="Enter last name" required />
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input v-model="username" type="text" class="form-control" id="username" placeholder="Enter username" required />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password" required />
                </div>
                <button type="submit" class="btn btn-primary w-100 mb-3">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      };
    },
    methods: {
      ...mapActions(['registerUser']),
      async handleRegister() {
        try {
          await this.registerUser({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.username,
            userPass: this.password
          });
          // Optionally reset form
          this.firstName = '';
          this.lastName = '';
          this.username = '';
          this.password = '';
        } catch (error) {
          // Handle any errors that occur during registration
          console.error('Registration error:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  