<template>
    <div class="container edit-item-form">
      <form id="editItemForm" v-if="item" @submit.prevent="updateItem">
        <div class="mb-3">
          <img class="itemImg" :src="item.itemUrl" alt="" />
        </div>
        <div class="mb-3">
          <label for="editItemName" class="form-label">Item Name</label>
          <input v-model="item.itemName" type="text" class="form-control text-center" id="editItemName" required />
        </div>
        <div class="mb-3">
          <label for="editItemDescription" class="form-label">Description</label>
          <input v-model="item.itemDescription" type="text" class="form-control text-center" id="editItemDescription" required />
        </div>
        <div class="mb-3">
          <label for="editItemImage" class="form-label">Image URL</label>
          <input v-model="item.itemUrl" type="url" class="form-control text-center" id="editItemImage" required />
        </div>
        <div class="mb-3">
          <label for="editItemPrice" class="form-label">Price</label>
          <input v-model="item.itemPrice" type="number" step="0.01" class="form-control text-center" id="editItemPrice" required />
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
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fafafa;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 100%;
    max-width: 25rem;
  }
  
  .itemImg {
    border: none;
    -webkit-filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
  }
  
  .form-control {
    margin-top: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  .btn-primary {
    background-color: #6A7B4C;
    border: none;
    border-radius: 50px;
    color: white;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #5A6B4B;
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
  
    .btn-primary {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
  }
  </style>
  