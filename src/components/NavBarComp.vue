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
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="mase">
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
  background-color: #8E8C6C; /* A more refined shade for a restaurant feel */
  border-bottom: 3px solid #6A7B4C; /* Add a bottom border for a subtle separation */
}

.navbar-toggler {
  border: none;
  outline: none;
}

.navbar-toggler-icon {
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"%3E%3Cpath stroke="rgb(255, 255, 255)" stroke-width="2" d="M5 8h20M5 15h20M5 22h20"/%3E%3C/svg%3E');
}

.nav-link {
  color: #F5F5F5; /* Light color for better contrast */
  font-family: "Archivo Black", sans-serif;
  font-size: 0.8rem; /* Slightly larger for readability */
  padding: 10px 15px; /* Increase padding for touch targets */
  transition: color 0.3s ease, background-color 0.3s ease;
}

.nav-link:hover {
  color: #F1C40F; /* Highlight color for hover */
  background-color: #6A7B4C; /* Subtle background change on hover */
  border-radius: 5px; /* Rounded corners for a softer look */
}

.active-link {
  color: #F1C40F; /* Highlight color for active links */
}

.imageLogo {
  width: 50px; /* Slightly larger logo */
}

.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;  
  border: 2px solid #F1C40F; /* Border around profile icon */
}

.navbar-nav {
  flex-direction: row;
}

.navbar-nav .nav-item {
  margin-bottom: 0;
}

@media (max-width: 992px) {
  .navbar-nav {
    text-align: center;
  }
  .navbar-nav .nav-item {
    margin-bottom: 1rem;
  }
  .navbar-nav .nav-link {
    margin-left: 0;
  }
  .imageLogo {
    width: 40px; /* Adjust size for tablets */
  }
  .profile-icon {
    width: 35px; /* Adjust size for tablets */
    height: 35px; /* Adjust size for tablets */
  }
}

@media (max-width: 768px) {
  .navbar-toggler {
    border: none;
  }
  .navbar-collapse {
    margin-top: 1rem;
  }
  .navbar-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .navbar-nav .nav-item {
    margin-bottom: 1rem;
  }
  .navbar-nav .nav-link {
    font-size: 1rem; /* Adjust font size for mobile */
    padding: 10px; /* Increase padding for touch targets */
  }
}
</style>


