<template>
    <div class="container pb-4 edit-order-form">
      <form id="editOrderForm" v-if="order" @submit.prevent="updateOrder">
        <div class="mb-3">
          <label for="editQuantity" class="form-label">Quantity</label>
          <input v-model="order.quantity" type="number" class="form-control text-center" id="editQuantity" required>
        </div>
        <div class="mb-3">
          <label for="editTotalPrice" class="form-label">Total Price</label>
          <input v-model="order.totalPrice" type="number" class="form-control text-center" id="editTotalPrice" required>
        </div>
        <div class="mb-3">
          <label for="editStatus" class="form-label">Status</label>
          <input v-model="order.status" type="text" class="form-control text-center" id="editStatus" required>
        </div>
        <div class="mb-3">
          <label for="editTimeSlot" class="form-label">Time Slot</label>
          <input v-model="order.timeSlot" type="text" class="form-control text-center" id="editTimeSlot" required>
        </div>
        <div class="mb-3">
          <label for="editOrderDate" class="form-label">Order Date</label>
          <input v-model="order.orderDate" type="date" class="form-control text-center" id="editOrderDate" required>
        </div>
        <div class="mb-3">
          <label for="editBookingDate" class="form-label">Booking Date</label>
          <input v-model="order.bookingDate" type="date" class="form-control text-center" id="editBookingDate" required>
        </div>
        <div class="mb-3">
          <label for="editUserID" class="form-label">User ID</label>
          <input v-model="order.userID" type="number" class="form-control text-center" id="editUserID" required>
        </div>
        <div class="mb-3">
          <label for="editItemID" class="form-label">Item ID</label>
          <input v-model="order.itemID" type="number" class="form-control text-center" id="editItemID" required>
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
    methods: {
      fetchOrder() {
        this.$store.dispatch("fetchOrder", this.$route.params.id);
      },
      updateOrder() {
        this.$store
          .dispatch("updateOrder", this.order)
          .then(() => {
            this.$router.push("/admin");
          })
          .catch((err) => {
            console.error("Failed to update order:", err);
          });
      },
    },
    computed: {
      order() {
        return this.$store.state.order;
      },
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchOrder();
    },
  };
  </script>
  
  <style scoped>
  .edit-order-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #fafafa;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
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
    .edit-order-form {
      padding: 1rem;
    }
  
    .btn-primary {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
  }
  </style>
  