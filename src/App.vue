<template>
  <NavBarComp/>
  <router-view />
  <FooterComp/>
</template>

<script>
// import { useCookies } from 'vue3-cookies';
// let {cookies} = useCookies()
import NavBarComp from './components/NavBarComp.vue'
import FooterComp from './components/FooterComp.vue'
export default {
  components: {
  NavBarComp,
  FooterComp
  },
  computed: {
    
    user() {

      
      return this.$store.state.user; 
    }
  },
  mounted(){
    if(this.user != null){
      // this.$store.commit('setUser',cookies.get('user'))

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
