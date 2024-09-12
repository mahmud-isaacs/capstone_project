<template>
  <div class="container pb-4 restaurant-theme">
    <form id="addProductForm" @submit.prevent="addItem">
      <div class="mb-3">
        <label for="addProductName" class="form-label">Item Name</label>
        <input v-model="item.itemName" type="text" class="form-control text-center" id="addProductName" required>
      </div>
      <div class="mb-3">
        <label for="editItemDescription" class="form-label">Item Description</label>
        <input v-model="item.itemDescription" type="text" class="form-control text-center" id="editItemDescription" required>
      </div>
      <div class="mb-3">
        <label for="addItemImage" class="form-label">Image URL</label>
        <input v-model="item.itemUrl" type="url" class="form-control text-center" id="addItemImage" required>
      </div>
      <div class="mb-3">
        <label for="addItemPrice" class="form-label">Price</label>
        <input v-model="item.itemPrice" type="number" step="0.01" class="form-control text-center" id="addItemPrice" required>
      </div>
      <div class="pb-3 text-center">
        <button type="submit" class="btn btn-custom">Add Item</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: {
        itemName: '',
        itemDescription: '',
        itemUrl: '',
        itemPrice: 0
      }
    };
  },
  methods: {
    addItem() {
      this.$store.dispatch('addItem', this.item)
        .then(() => {
          this.$router.push('/admin');
        })
        .catch(err => {
          console.error("Failed to add item:", err);
        });
    },
  },
}
</script>

<style scoped>
.restaurant-theme {
  background-color: #F5F5F5; /* Light background for consistency */
  font-family: 'Georgia', serif;
}

.form-control {
  border: 1px solid #6A7B4C; /* Green border to match the theme */
  border-radius: 0.25rem;
}

.btn-custom {
  background-color: #6A7B4C; /* Green button color to fit the theme */
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.1rem;
  border: none;
  transition: background-color 0.3s ease-in-out;
}

.btn-custom:hover {
  background-color: #829b61; /* Slightly lighter green for hover */
}
</style>
