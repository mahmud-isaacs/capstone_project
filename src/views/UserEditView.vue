<template>
  <div class="container pb-4 edit-user-form">
    <form id="editUserForm" v-if="user" @submit.prevent="updateUser">
      <div class="mb-3">
        <img class="userImg" :src="user.userProfile" alt="User Profile">
      </div>
      <div class="mb-3">
        <label for="editUserFirstName" class="form-label">First Name</label>
        <input v-model="user.firstName" type="text" class="form-control text-center" id="editUserFirstName" required>
      </div>
      <div class="mb-3">
        <label for="editUserLastName" class="form-label">Last Name</label>
        <input v-model="user.lastName" type="text" class="form-control text-center" id="editUserLastName" required>
      </div>
      <div class="mb-3">
        <label for="editUserName" class="form-label">Username</label>
        <input v-model="user.userName" type="text" class="form-control text-center" id="editUserName" required>
      </div>
      <div class="mb-3">
        <label for="editUserAge" class="form-label">Age</label>
        <input v-model="user.userAge" type="number" class="form-control text-center" id="editUserAge" required>
      </div>
      <div class="mb-3">
        <label for="editUserGender" class="form-label">Gender</label>
        <input v-model="user.gender" type="text" class="form-control text-center" id="editUserGender" required>
      </div>
      <div class="mb-3">
        <label for="editUserRole" class="form-label">Role</label>
        <input v-model="user.userRole" type="text" class="form-control text-center" id="editUserRole" required>
      </div>
      <div class="mb-3">
        <label for="editUserEmailAdd" class="form-label">Email Address</label>
        <input v-model="user.userAdd" type="email" class="form-control text-center" id="editUserEmailAdd" required>
      </div>
      <div class="mb-3">
        <label for="editUserPass" class="form-label">User Password</label>
        <input v-model="password" type="password" class="form-control text-center" id="editUserPass">
      </div>
      <div class="mb-3">
        <label for="editUserProfile" class="form-label">Profile Pic</label>
        <input v-model="user.userProfile" type="url" class="form-control text-center" id="editUserProfile" required>
      </div>
      <div class="pb-3">
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
    </form>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'

export default {
  data() {
    return {
      password: '' 
    };
  },
  methods: {
    fetchUser() {
      this.$store.dispatch('fetchUser', this.$route.params.id)
    },
    updateUser() {
      const user = { ...this.user };
      if (this.password) {
        user.userPass = this.password;
      } else {
        delete user.userPass; 
      }
      
      this.$store.dispatch('updateUser', user)
        .then(() => {
          this.$router.push('/admin');
        })
        .catch(err => {
          console.error("Failed to update user:", err);
        });
    },
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
.edit-user-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.userImg {
  width: 15rem;
  border-radius: 50%;
  -webkit-filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
}

.form-control {
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.btn-primary {
  background-color: #6A7B4C;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #5A6B4B;
}

@media (max-width: 768px) {
  .edit-user-form {
    padding: 1rem;
  }

  .btn-primary {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}
</style>

