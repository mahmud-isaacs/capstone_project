<template>
  <div class="container">
    <div class="singleProduct">
      <div class="row justify-content-center" v-if="item">
        <div class="col-md-6 text-center">
          <img :src="item.itemUrl" loading="lazy" class="img-fluid prodImg" :alt="item.itemName">
        </div>
        <div class="col-md-6">
          <h5 class="card-title">{{ item.itemName }}</h5>
          <p>{{ item.itemDescription }}</p>
          <p class="lead"><span class="text-success">Price</span>: R{{ item.itemPrice }}</p>
          <!-- New Book Button -->
          <router-link to="/booking">
            <button class="btn btn-primary">Book</button>
          </router-link>
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
.prodImg {
  width: 100%;
  max-width: 20rem;
  border: none;
  -webkit-filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
  filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}

.btn-primary {
  background-color: #e21861;
  border: none;
  transition: background-color 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #d11c5f;
}
</style>


