<template>
  <div class="container">
    <form id="addProductForm" @submit.prevent="addItem">
      <div class="mb-3">
        <label for="addProductName" class="form-label">Item Name</label>
        <input v-model="item.itemName" type="text" class="form-control text-center" id="addItemName" required>
      </div>
      <div class="mb-3">
        <label for="editItemDescription" class="form-label">item Description</label>
        <input v-model="item.itemDescription" type="text" class="form-control text-center" id="editItemDescription"
          required />
      </div>
      <div class="mb-3">
        <label for="addItemImage" class="form-label">Image URL</label>
        <input v-model="item.itemUrl" type="url" class="form-control text-center" id="addItemImage" required>
      </div>
      <div class="mb-3">
        <label for="addItemPrice" class="form-label">Price</label>
        <input v-model="item.itemPrice" type="number" step="0.01" class="form-control text-center" id="addItemPrice"
          required>
      </div>
      <div class="pb-3">
        <button type="submit" class="btn btn-primary">Save changes</button>
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
        amount: 0
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

<style scoped></style>