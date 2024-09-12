<template>
  <div class="container pb-4 restaurant-theme">
    <form id="editUserForm" v-if="user" @submit.prevent="updateUser">
      <div class="mb-3 text-center">
        <img class="prodImg rounded-circle border border-2 border-success" :src="user.userProfile" alt="">
      </div>
      <div class="mb-3">
        <label for="editUserFirstName" class="form-label">First Name</label>
        <input v-model="user.firstName" type="text" class="form-control rounded-pill" id="editUserName" required>
      </div>
      <div class="mb-3">
        <label for="editUserLastName" class="form-label">Last Name</label>
        <input v-model="user.lastName" type="text" class="form-control rounded-pill" id="editUserLastName" required>
      </div>
      <div class="mb-3">
        <label for="editUserAge" class="form-label">Age</label>
        <input v-model="user.userAge" type="number" class="form-control rounded-pill" id="editUserAge" required>
      </div>
      <div class="mb-3">
        <label for="editUserGender" class="form-label">Gender</label>
        <input v-model="user.gender" type="text" class="form-control rounded-pill" id="editUserGender" required>
      </div>
      <div class="mb-3">
        <label for="editUserRole" class="form-label">Role</label>
        <input v-model="user.userRole" type="text" class="form-control rounded-pill" id="editUserRole" required>
      </div>
      <div class="mb-3">
        <label for="editUserEmailAdd" class="form-label">Email Address</label>
        <input v-model="user.userAdd" type="email" class="form-control rounded-pill" id="editUserEmailAdd" required>
      </div>
      <div class="mb-3">
        <label for="editUserPass" class="form-label">User Password</label>
        <input v-model="user.userPass" type="text" class="form-control rounded-pill" id="editUserPass" required>
      </div>
      <div class="mb-3">
        <label for="editUserProfile" class="form-label">Profile Pic</label>
        <input v-model="user.userProfile" type="url" class="form-control rounded-pill" id="editUserProfile" required>
      </div>
      <div class="pb-3">
        <button type="submit" class="btn btn-custom w-100 mb-3">Save changes</button>
      </div>
    </form>
    <button v-if="user" @click="handleLogout" class="btn btn-danger w-100 mb-3">Logout</button>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'

export default {
  methods: {
    fetchUser() {
      this.$store.dispatch('fetchUser', this.$route.params?.id)
    },
    updateUser() {
      this.$store.dispatch('updateUser', this.user)
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => {
          console.error("Failed to update user:", err);
        });
    },
    async handleLogout() {
      try {
        await this.$store.dispatch('logout');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  components: {
    Spinner
  },
  mounted() {
    this.fetchUser();
  }
}
</script>

<style scoped>
.restaurant-theme {
  background-color: #F5F5F5; /* Light background for a clean look */
  font-family: 'Georgia', serif;
}

.prodImg {
  width: 15rem;
  border-radius: 50%;
  border: 2px solid #6A7B4C; /* Green border to match the theme */
}

.form-label {
  color: #6A7B4C; /* Greenish label color */
}

input.form-control {
  border: 2px solid #6A7B4C; /* Greenish border for inputs */
  padding: 0.75rem;
}

.btn-custom {
  background-color: #6A7B4C; /* Greenish button color */
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.1rem;
}

.btn-custom:hover {
  background-color: #829b61; /* Slightly lighter green for hover */
  color: white;
}

.btn-danger {
  background-color: #c0392b; /* Red button color for logout */
  font-weight: bold;
}

.btn-danger:hover {
  background-color: #e74c3c; /* Lighter red for hover */
}
</style>
