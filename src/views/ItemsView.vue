<template>
  <div class="container pb-3">
    <div class="products">
      <h1 class="mb-2 text-start">Menu</h1>
      <div class="mb-3">
        <label for="sortOptions" class="form-label">Sort by:</label>
        <select v-model="sortOption" class="form-select" id="sortOptions">
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div class="row justify-content-center" v-if="sortedItems.length">
        <Card v-for="item in sortedItems" :key="item.itemID" data-aos="fade-up">
          <template #cardHeader>
            <img :src="item.itemUrl" loading="lazy"
              class="small-img img-fluid rounded mx-auto d-block card-img-top" :alt="item.itemName">
          </template>
          <template #cardBody>
            <h5 class="card-title">{{ item.itemName }}</h5>
            <p class="lead"><span class="text-success">Amount</span>: R{{ item.itemPrice }}</p>
            <div class="d-flex justify-content-between">
              <router-link :to="{ name: 'itemDetail', params: { id: item.itemID } }">
                <button class="btn btn-secondary">View</button>
              </router-link>
              <router-link to="/bookings">
                <button class="btn btn-primary">Book</button>
              </router-link>
            </div>
          </template>
        </Card>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue'
import Card from '@/components/CardComp.vue'

export default {
  data() {
    return {
      sortOption: 'name',
    };
  },
  computed: {
    sortedItems() {
      if (!this.items || !Array.isArray(this.items)) {
        return [];
      }
      return [...this.items].sort((a, b) => {
        if (this.sortOption === 'name') {
          return a.itemName.localeCompare(b.itemName);
        } else if (this.sortOption === 'price') {
          return a.itemPrice - b.itemPrice;
        }
        return 0;
      });
    },
    items() {
      return this.$store.state.items || [];
    }
  },
  methods: {
    getItems() {
      this.$store.dispatch('fetchItems');
    }
  },
  mounted() {
    this.getItems();
  },
  components: {
    Spinner,
    Card,
  },
};
</script>

<style scoped>
* {
  line-height: 1.5;
  font-size: 16px;
  letter-spacing: 0.05em;
}

.products {
  margin-top: 120px;
  width: 100%;
}

h1 {
  font-size: 2rem;
}

.card-img-top {
  width: 10rem;
}

i {
  font-size: 2rem;
  color: #e21861;
}

.small-img {
  width: 100%;
  max-width: 10rem;
}

.btn-primary {
  background-color: #e21861;
  border: none;
  transition: background-color 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #d11c5f;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  transition: background-color 0.3s ease-in-out;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>



