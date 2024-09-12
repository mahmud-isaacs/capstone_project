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

</style>
