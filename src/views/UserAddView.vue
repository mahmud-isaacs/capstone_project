<template>
  <div class="container pb-4 restaurant-theme">
    <form id="addUserForm" @submit.prevent="registerUser">
      <div class="mb-3">
        <label for="addUserFirstName" class="form-label">First Name</label>
        <input v-model="user.firstName" type="text" class="form-control text-center" id="addUserFirstName" required>
      </div>
      <div class="mb-3">
        <label for="addUserLastName" class="form-label">Last Name</label>
        <input v-model="user.lastName" type="text" class="form-control text-center" id="addUserLastName" required>
      </div>
      <div class="mb-3">
        <label for="addUserName" class="form-label">Username</label>
        <input v-model="user.userName" type="text" class="form-control text-center" id="addUserName" required>
      </div>
      <div class="mb-3">
        <label for="addUserAge" class="form-label">Age</label>
        <input v-model="user.userAge" type="number" class="form-control text-center" id="addUserAge" required>
      </div>
      <div class="mb-3">
        <label for="editUserGender" class="form-label">Gender</label>
        <input v-model="user.gender" type="text" class="form-control text-center" id="editUserGender" required>
      </div>
      <div class="mb-3">
        <label for="addUserRole" class="form-label">Role</label>
        <input v-model="user.userRole" type="text" class="form-control text-center" id="addUserRole" required>
      </div>
      <div class="mb-3">
        <label for="addUserEmailAdd" class="form-label">Email Address</label>
        <input v-model="user.userAdd" type="email" class="form-control text-center" id="addUserEmailAdd" required>
      </div>
      <div class="mb-3">
        <label for="addUserPass" class="form-label">User Password</label>
        <input v-model="user.userPass" type="password" class="form-control text-center" id="addUserPass" required>
      </div>
      <div class="mb-3">
        <label for="addUserProfile" class="form-label">Profile Pic</label>
        <input v-model="user.userProfile" type="url" class="form-control text-center" id="addUserProfile">
      </div>
      <div class="pb-3 text-center">
        <button type="submit" class="btn btn-custom">Add User</button>
      </div>
    </form>
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
        userRole: '',
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
          this.$router.push('admin');
        })
        .catch(err => {
          console.error("Failed to add user:", err);
        });
    },
  }
}
</script>

<style scoped>
.restaurant-theme {
  background-color: #F5F5F5; /* Light background for consistency */
  font-family: 'Georgia', serif;
}

.form-control {
  border: 1px solid #6A7B4C; /* Green border to match the theme */
  border-radius: 0.25rem;
}

.btn-custom {
  background-color: #6A7B4C; /* Green button color to fit the theme */
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.1rem;
  border: none;
  transition: background-color 0.3s ease-in-out;
}

.btn-custom:hover {
  background-color: #829b61; /* Slightly lighter green for hover */
}
</style>
