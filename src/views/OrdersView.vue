<template>
  <div class="container">
    <h2>Your Orders</h2>
    <div v-if="userOrders">
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in this.$store.state.userOrders" :key="order">
            <td>{{ order.itemName }}</td>
            <td>{{ order.bookingDate }}</td>
            <td>{{ order.timeSlot }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import {useCookies} from 'vue3-cookies'

export default {
  computed: {
    
    userOrders() {
      console.log('Calculating userOrders with userID:', this.userID);
      return this.orders;
    },
    userID(){
      let {cookies} = useCookies()
      return cookies.get('user').id
    }
  },
  methods: {
    getItemName() {
      console.log(this.$store.state.userOrders)
      return this.$store.state.userOrders
    },
    start(){
      if (this.userID) {
      console.log('Fetching orders for userID:', this.userID);
      this.$store.dispatch('fetchUserOrders', this.userID)
        .then(() => {
          console.log('Orders fetched:', JSON.stringify(this.getItemName()));
        })
        .catch(error => console.error('Error fetching user orders:', error));
    }
  },
 
  },
  mounted() {
      this.start()
      this.getItemName()
    },
};
</script>




