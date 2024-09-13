<template>
  <div class="menu-container py-5">
    <div class="text-center mb-5">
      <h1 class="menu-heading">Our Menu</h1>

      <!-- Search by Item Name -->
      <div class="search-bar my-4">
        <label for="searchInput" class="form-label">Search by Item Name:</label>
        <input
          type="text"
          id="searchInput"
          v-model="searchQuery"
          class="form-control search-input"
          placeholder="Search for an item..."
        />
      </div>

      <div class="sort-options my-4">
        <label for="sortOptions" class="form-label">Sort by:</label>
        <select v-model="sortOption" class="form-select" id="sortOptions">
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
      </div>
    </div>

    <div class="row justify-content-center">
      <div v-if="filteredItems.length" class="col-lg-8">
        <div class="row gy-4">
          <Card v-for="item in filteredItems" :key="item.itemID" data-aos="fade-up" class="menu-card">
            <template #cardHeader>
              <img
                :src="item.itemUrl"
                loading="lazy"
                class="menu-item-img rounded"
                :alt="item.itemName"
              />
            </template>
            <template #cardBody>
              <h5 class="item-name">{{ item.itemName }}</h5>
              <p class="item-price">R{{ item.itemPrice }}</p>
              <div class="button-group d-flex justify-content-between">
                <router-link :to="{ name: 'itemDetail', params: { id: item.itemID } }">
                  <button class="btn btn-outline-secondary">View</button>
                </router-link>
                <router-link to="/booking">
                  <button class="btn btn-primary">Book</button>
                </router-link>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue';
import Card from '@/components/CardComp.vue';

export default {
  data() {
    return {
      sortOption: 'name',
      searchQuery: '', 
    };
  },
  computed: {
    filteredItems() {
      return this.sortedItems.filter(item =>
        item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    sortedItems() {
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
    },
  },
  methods: {
    getItems() {
      this.$store.dispatch('fetchItems');
    },
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
.menu-container {
  background-color: #FAF3E0;
  padding: 2rem 1rem;
  border-radius: 10px;
}

.menu-heading {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #8B4513;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1.5s ease-in-out;
}

.search-bar {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input {
  width: 80%;
  max-width: 500px;
  padding: 10px;
  border: 2px solid #8B4513;
  border-radius: 50px;
  background-color: #FFF8DC;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #6A7B4C;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.sort-options {
  display: inline-block;
  font-size: 1.2rem;
  color: #6A7B4C;
}

.menu-card {
  background-color: #FFF8DC;
  border: none;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.menu-item-img {
  width: 100%;
  max-width: 12rem;
  border-radius: 12px;
  border: 2px solid #8B4513;
  margin-bottom: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.menu-item-img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.item-name {
  font-size: 1.5rem;
  font-family: 'Playfair Display', serif;
  color: #8B4513;
  margin-bottom: 0.5rem;
}

.item-price {
  font-size: 1.3rem;
  color: #6A7B4C;
  margin-bottom: 1rem;
}

.button-group {
  margin-top: 1rem;
}

.btn-primary {
  background-color: #6A7B4C;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #5A6B4B;
}

.btn-outline-secondary {
  border-color: #6A7B4C;
  color: #6A7B4C;
}

.btn-outline-secondary:hover {
  background-color: #6A7B4C;
  color: white;
}

@media (max-width: 992px) {
  .search-input {
    width: 90%;
  }
}

@media (max-width: 768px) {
  .menu-container {
    padding: 1rem 0.5rem;
  }
  .search-input {
    width: 90%;
  }
  .menu-heading {
    font-size: 2rem;
  }
  .item-name {
    font-size: 1.3rem;
  }
  .item-price {
    font-size: 1.1rem;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>



