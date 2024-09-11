<template>
  <nav class="navbar navbar-expand-lg custom-bg-green">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="/">
          <img class="imageLogo" src="https://mahmud-isaacs.github.io/capstone_hostedImages/HuisCourse%20logo.jpg" alt="Logo">
        </a>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active-link">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/items" active-class="active-link">Menu</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/booking" active-class="active-link">Book Now</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/orders" active-class="active-link">Orders</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin" active-class="active-link">Admin</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" active-class="active-link">Contact Us</router-link>
          </li>
        </ul>
        <!-- {{ typeof $cookies.get('authToken') }} -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if=" mase">
            <router-link :to="{ name: 'userDetail', params: { id: user.id } }">
              <img :src="user.userProfile" alt="Profile" class="profile-icon">
            </router-link>  
          </li>
          <li class="nav-item" v-else>
            <router-link :to="{ name: 'login' }" class="nav-link">
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
/*eslint-disable*/
import { useCookies } from 'vue3-cookies';
let {cookies} = useCookies()
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.userID !== null;
    },
    user() {
      this.$store.commit('setUser',cookies.get('user'))
      return this.$store.state.user; 
    },
    mase(){
      return typeof cookies.get('authToken') === 'string'
    }
  },
  methods: {
    async verify() {
      try {
        await this.$store.dispatch('verify');
      } catch (error) {
        console.error('Verification failed:', error.message);
      }
    }
  },
  async mounted() {
    await this.verify();
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

.custom-bg-green {
  background-color: #C4C5BA; 
}

.nav-link {
  color: #595f39;
  font-family: "Archivo Black", sans-serif;
  font-size: 0.7rem; 
  margin-left: 7rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #ffffff; 
}

.active-link {
  color: #ffffff;
}

.imageLogo {
  width: 40px;
}

.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;  
}
</style>


