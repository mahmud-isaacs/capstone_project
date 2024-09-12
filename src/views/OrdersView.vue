<template>
  <div class="container">
    <h2>Your Orders</h2>
    <div v-if="!userOrders || userOrders.length === 0">
      <p>You have no orders.</p>
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Booking Date</th>
            <th>Time Slot</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th> <!-- Added Actions column -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in userOrders" :key="order.id"> <!-- Assuming order has an id property -->
            <td>{{ order.itemName }}</td>
            <td>{{ order.bookingDate }}</td>
            <td>{{ order.timeSlot }}</td>
            <td>R{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
            <td>
              <button @click="deleteOrder(order.orderID)">Delete</button> <!-- Added delete button -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';

export default {
  computed: {
    userOrders() {
      return this.$store.state.userOrders;
    },
    userID() {
      let { cookies } = useCookies();
      return cookies.get('user')?.id;
    }
  },
  methods: {
    getItemName() {
      console.log(this.$store.state.userOrders);
      return this.$store.state.userOrders;
    },
    start() {
      if (this.userID) {
        console.log('Fetching orders for userID:', this.userID);
        this.$store.dispatch('fetchUserOrders', this.userID)
          .then(() => {
            console.log('Orders fetched:', JSON.stringify(this.getItemName()));
          })
          .catch(error => console.error('Error fetching user orders:', error));
      }
    },
    deleteOrder(orderID) {
      this.$store.dispatch('deleteOrder', orderID)
        .then(() => {
          console.log('Order deleted:', orderID);
        })
        .catch(error => console.error('Error deleting order:', error));
    }
  },
  mounted() {
    this.start();
    this.getItemName();
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: #f9f9f9; /* Light background for contrast */
  border-radius: 10px; /* Rounded corners for container */
}

h2 {
  font-family: "Archivo Black", sans-serif;
  color: #6A7B4C; /* Restaurant theme color */
  margin-bottom: 20px;
}

.table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #ccc;
  padding: 0.75rem;
  text-align: center;
}

.table th {
  background-color: #6A7B4C; /* Restaurant theme color */
  color: white;
}

.table td {
  background-color: #ffffff; /* Light background for table cells */
}

button {
  padding: 0.5rem 1rem;
  background-color: #F1C40F; /* Accent color for button */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #bc990d; /* Darker shade on hover */
}
</style>




