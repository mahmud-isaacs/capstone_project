<template>
  <div class="container">
      <form id="editItemForm" v-if="item" @submit.prevent="updateItem">
          <div class="mb-3">
              <img class="itemImg" :src="item.itemUrl" alt="" />
          </div>
          <div class="mb-3">
              <label for="editItemName" class="form-label">Item Name</label>
              <input v-model="item.itemName" type="text" class="form-control text-center" id="editItemName"
                  required />
          </div>
          <div class="mb-3">
              <label for="editItemDescription" class="form-label">Description</label>
              <input v-model="item.itemDescription" type="text" class="form-control text-center" id="editItemDescription"
                  required />
          </div>
          <div class="mb-3">
              <label for="editItemImage" class="form-label">Image URL</label>
              <input v-model="item.itemUrl" type="url" class="form-control text-center" id="editItemImage"
                  required />
          </div>
          <div class="mb-3">
              <label for="editItemPrice" class="form-label">Price</label>
              <input v-model="item.itemPrice" type="number" step="0.01" class="form-control text-center"
                  id="editItemPrice" required />
          </div>
          <div class="pb-3">
          <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
      </form>
      <div v-else>
          <Spinner />
      </div>
  </div>
</template>

<script>
import Spinner from "@/components/SpinnerComp.vue";

export default {
  data() {
      return {};
  },
  methods: {
      fetchItem() {
          this.$store.dispatch("fetchItem", this.$route.params.id);
      },
      updateItem() {
          this.$store
              .dispatch("updateItem", this.item)
              .then(() => {
                  this.$router.push("/admin");
              })
              .catch((err) => {
                  console.error("Failed to update item:", err);
              });
      },
  },
  computed: {
      item() {
          return this.$store.state.item;
      },
  },
  components: {
      Spinner,
  },
  mounted() {
      this.fetchItem();
  },
};
</script>

<style scoped>
img {
  width: 25rem;
}
.itemImg {
border: none;
-webkit-filter: drop-shadow(2px 2px 0 #e21861)
  drop-shadow(-2px -2px 0 #e21861);
filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}
</style>