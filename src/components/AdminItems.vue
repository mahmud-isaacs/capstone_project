<template>
  <div class="container restaurant-booking">
    <h5 class="title">Items</h5>
    <input
      v-model="searchQuery"
      placeholder="Search items..."
      class="form-control mb-3 search-bar"
    />
    <div class="table-responsive" v-if="filteredItems.length">
      <table class="table table-items table-bordered">
        <thead>
          <tr class="table-header">
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col" class="d-none d-md-table-cell">Description</th>
            <th scope="col" class="d-none d-md-table-cell">Price</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.itemID" class="table-row">
            <td>{{ item.itemID }}</td>
            <td>{{ item.itemName }}</td>
            <td class="d-none d-md-table-cell">{{ item.itemDescription }}</td>
            <td class="d-none d-md-table-cell">R{{ item.itemPrice }}</td>
            <td>
              <router-link :to="{ name: 'itemEdit', params: { id: item.itemID } }">
                <button class="btn btn-sm action-btn edit-btn">
                  <i class="bi bi-pencil-square"></i>
                </button>
              </router-link>
            </td>
            <td>
              <button class="btn btn-sm action-btn delete-btn" @click="deleteItem(item.itemID)">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <Spinner v-if="loading" />
      <p v-else>No items found.</p>
    </div>
    <div class="d-flex justify-content-center align-items-center add-item-section">
      <p class="my-auto">Add Item</p>
      <router-link :to="{ name: 'itemAdd' }">
        <i class="bi bi-plus-square-fill mx-2"></i>
      </router-link>
    </div>
    <hr />
  </div>
</template>

<script>
import Spinner from '@/components/SpinnerComp.vue';

export default {
  data() {
    return {
      searchQuery: '',
      loading: false,
      error: null,
    };
  },
  computed: {
    items() {
      return this.$store.state.items || [];
    },
    filteredItems() {
      return this.items.filter((item) =>
        item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchItems() {
      this.loading = true;
      this.$store
        .dispatch('fetchItems')
        .then(() => {
          this.loading = false;
        })
        .catch((err) => {
          this.error = 'Failed to fetch items.';
          console.error(err);
        });
    },
    deleteItem(itemID) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.$store
          .dispatch('deleteItem', itemID)
          .then(() => {
            this.fetchItems();
          })
          .catch((err) => {
            console.error('Failed to delete item:', err);
          });
      }
    },
  },
  components: {
    Spinner,
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.container {
  max-width: 90%;
  margin: auto;
  background-color: #fff7f0; 
  padding: 20px;
  border-radius: 10px;
}

.title {
  font-family: 'Playfair Display', serif;
  color: #a52a2a;
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
}

.search-bar {
  border-radius: 30px;
  padding: 10px 20px;
  border: 1px solid #d4a373;
}

.table-items {
  background-color: white;
  font-family: 'Lora', serif;
}

.table-header {
  background-color: #e6b8a2;
  color: #6b4226;
  font-weight: bold;
}

.table-row {
  border-bottom: 1px solid #d4a373;
}

.action-btn {
  background-color: transparent;
  border: none;
  color: #d4a373;
}

.edit-btn:hover {
  color: #6b4226;
}

.delete-btn:hover {
  color: #a52a2a;
}

i {
  font-size: 1.5rem;
  color: #a52a2a;
}

.add-item-section {
  font-family: 'Lora', serif;
  color: #a52a2a;
}

.add-item-section i {
  color: #d4a373;
}

.add-item-section i:hover {
  color: #6b4226;
}

@media (max-width: 575px) {
  .table-items th,
  .table-items td {
    font-size: 0.9rem;
  }
}
</style>