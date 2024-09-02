<template>
    <div class="container">
      <h5>Items</h5>
      <input v-model="searchQuery" placeholder="Search Items..." class="form-control mb-3" />
      <div class="table-responsive" v-if="filteredItems.length">
        <table class="table table-items">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col" class="d-none d-md-table-cell">Description</th>
              <th scope="col" class="d-none d-md-table-cell">Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.itemID">
              <td>{{ item.itemID }}</td>
              <td>{{ item.itemName }}</td>
              <td class="d-none d-md-table-cell">{{ item.itemDescription }}</td>
              <td class="d-none d-md-table-cell">R{{ item.itemPrice }}</td>
              <td>
                <router-link :to="{ name: 'itemEdit', params: { id: item.itemID } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link>
              </td>
              <td>
                <button class="btn btn-sm" @click="deleteItem(item.itemID)"><i class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <Spinner v-if="loading" />
        <p v-else>No items found.</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p class="my-auto">Add Item</p>
        <router-link :to="{ name: 'itemAdd' }">
          <i class="bi-plus-square-fill mx-2"></i>
        </router-link>
      </div>
      <hr>
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
        return this.items.filter(item =>
          item.itemName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchItems() {
        this.loading = true;
        this.$store.dispatch('fetchItems')
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Failed to fetch items.';
            console.error(err);
          });
      },
      deleteItem(itemID) {
        if (confirm('Are you sure you want to delete this item?')) {
          this.$store.dispatch('deleteItem', itemID)
            .then(() => {
              this.fetchItems();
            })
            .catch(err => {
              console.error('Failed to delete item:', err);
            });
        }
      }
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchItems();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
  }
  
  .table-items th,
  .table-items td {
    white-space: nowrap;
    vertical-align: middle;
  }
  
  @media (max-width: 575px) {
    .table-items th,
    .table-items td {
      font-size: 0.8rem;
    }
  }
  
  i {
    font-size: 2rem;
    color: #e21861;
  }
  </style>