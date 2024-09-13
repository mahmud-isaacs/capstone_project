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
          <p class="lead text-center"><span class="text-success">Price:</span> R{{ item.itemPrice }}</p>
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
  background-color: #FAF3E0;
  font-family: 'Georgia', serif;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.prodImg {
  width: 100%;
  max-width: 20rem;
  border: 3px solid #8C5E3C;
  border-radius: 10px;
  -webkit-filter: drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.2));
}

.btn-custom {
  background-color: #8C5E3C;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.2rem;
  border: none;
  padding: 0.75rem 2rem;
  transition: background-color 0.3s ease-in-out;
}

.btn-custom:hover {
  background-color: #6A3B1A;
}

h5.card-title {
  font-size: 1.5rem;
  color: #6A3B1A;
}

p.text-center {
  color: #333;
}

p.lead {
  font-size: 1.2rem;
  color: #6A7B4C;
}
</style>
