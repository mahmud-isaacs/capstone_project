<template>
  <div class="container pb-4 restaurant-theme">
    <form id="addOrderForm" @submit.prevent="addOrder">
      <div class="mb-3">
        <label for="addProductQuantity" class="form-label">Quantity</label>
        <input v-model="order.quantity" type="text" class="form-control text-center" id="addOrderQuantity" required>
      </div>
      <div class="mb-3">
        <label for="addOrderPrice" class="form-label">Total Price</label>
        <input v-model="order.totalPrice" type="number" step="0.01" class="form-control text-center" id="addOrderPrice" required>
      </div>
      <div class="mb-3">
        <label for="addOrderStatus" class="form-label">Status</label>
        <input v-model="order.status" type="text" class="form-control text-center" id="addOrderStatus" required>
      </div>
      <div class="mb-3">
        <label for="addOrderTimeSlot" class="form-label">Time Slot</label>
        <input v-model="order.timeSlot" type="text" class="form-control text-center" id="addOrderTimeSlot" required>
      </div>    
      <div class="mb-3">
        <label for="addOrderDate" class="form-label">Date of Order</label>
        <input v-model="order.orderDate" type="text" class="form-control text-center" id="addOrderDate" required>
      </div>    
      <div class="mb-3">
        <label for="addOrderBookingDate" class="form-label">Booking Date</label>
        <input v-model="order.bookingDate" type="text" class="form-control text-center" id="addOrderBookingDate" required>
      </div>    
      <div class="mb-3">
        <label for="addOrderUserID" class="form-label">UserID</label>
        <input v-model="order.userID" type="text" class="form-control text-center" id="addOrderUserID" required>
      </div>    
      <div class="mb-3">
        <label for="addOrderItemID" class="form-label">ItemID</label>
        <input v-model="order.itemID" type="text" class="form-control text-center" id="addOrderItemID" required>
      </div>
      <div class="pb-3 text-center">
        <button type="submit" class="btn btn-custom">Add Order</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        quantity: '',
        totalPrice: null,
        status: '',
        timeSlot: '',
        orderDate: '',
        bookingDate: '',
        userID: '',
        itemID: '',
      }
    };
  },
  methods: {
    addOrder() {
      this.$store.dispatch('addOrder', this.order)
        .then(() => {
          this.$router.push('/admin');
        })
        .catch(err => {
          console.error("Failed to add order:", err);
        });
    },
  },
}
</script>

<style scoped>
.restaurant-theme {
  background-color: #F5F5F5; 
  font-family: 'Georgia', serif;
}

.form-control {
  border: 1px solid #6A7B4C; 
  border-radius: 0.25rem;
}

.btn-custom {
  background-color: #6A7B4C; 
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 1.1rem;
  border: none;
  transition: background-color 0.3s ease-in-out;
}

.btn-custom:hover {
  background-color: #829b61; 
}
</style>
