<template>
  <div class="container pb-4 restaurant-theme">
    <div class="singleProduct">
      <div class="row justify-content-center" v-if="item">
        <div class="col-md-6 text-center">
          <img :src="item.itemUrl" loading="lazy" class="img-fluid prodImg" :alt="item.itemName">
        </div>
        <div class="col-md-6">
          <h5 class="card-title text-center">{{ item.itemName }}</h5>
          <p class="text-center">{{ item.itemDescription }}</p>
          <p class="lead text-center"><span class="text-success">Price</span>: R{{ item.itemPrice }}</p>
          <div class="text-center">
            <router-link to="/booking">
              <button class="btn btn-custom">Book</button>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'

export default {
  components: {
    Spinner,
  },
  methods: {
    fetchItem() {
      this.$store.dispatch('fetchItem', this.$route.params.id);
    }
  },
  computed: {
    item() {
      return this.$store.state.item;
    }
  },
  mounted() {
    this.fetchItem();
  }
}
</script>

<style scoped>
.restaurant-theme {
  background-color: #F5F5F5; 
  font-family: 'Georgia', serif;
}

.prodImg {
  width: 100%;
  max-width: 20rem;
  border: 2px solid #6A7B4C; 
  border-radius: 10px;
  -webkit-filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
}

.btn-custom {
  background-color: #6A7B4C; 
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.1rem;
  border: none;
  transition: background-color 0.3s ease-in-out;
}

.btn-custom:hover {
  background-color: #829b61; 
}
</style>
