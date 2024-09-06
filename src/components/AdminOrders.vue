<template>
    <div class="container">
      <h5>Orders</h5>
      <input v-model="searchQuery" placeholder="Search by status..." class="form-control mb-3" />
      
      <div class="table-responsive" v-if="filteredOrders.length">
        <table class="table table-orders">
          <thead>
            <tr>
              <th scope="col">OrderId</th>
              <th scope="col">Quantity</th>
              <th scope="col" class="d-none d-md-table-cell">Total Price</th>
              <th scope="col" class="d-none d-md-table-cell">Status</th>
              <th scope="col" class="d-none d-md-table-cell">Time slot</th>
              <th scope="col" class="d-none d-md-table-cell">Date of order</th>
              <th scope="col" class="d-none d-md-table-cell">Booking date</th>
              <th scope="col" class="d-none d-md-table-cell">userID</th>
              <th scope="col" class="d-none d-md-table-cell">itemId</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.orderID">
              <td>{{ order.orderID }}</td>
              <td>{{ order.quantity }}</td>
              <td class="d-none d-md-table-cell">R{{ order.totalPrice }}</td>
              <td class="d-none d-md-table-cell">{{ order.status }}</td>
              <td class="d-none d-md-table-cell">{{ order.timeSlot }}</td>
              <td class="d-none d-md-table-cell">{{ order.orderDate }}</td>
              <td class="d-none d-md-table-cell">{{ order.bookingDate }}</td>
              <td class="d-none d-md-table-cell">{{ order.userID }}</td>
              <td class="d-none d-md-table-cell">{{ order.itemID }}</td>
              <td>
                <router-link :to="{ name: 'orderEdit', params: { id: order.orderID } }">
                  <button class="btn btn-sm"><i class="bi bi-pencil-square"></i></button>
                </router-link>
              </td>
              <td>
                <button class="btn btn-sm" @click="deleteOrder(order.orderID)"><i class="bi bi-trash-fill"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else>
        <Spinner v-if="loading" />
        <p v-else>No orders found.</p>
      </div>
      
      <div class="d-flex justify-content-center align-items-center">
        <p class="my-auto">Add order</p>
        <router-link :to="{ name: 'orderAdd' }">
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
      orders() {
        return this.$store.state.orders || [];
      },
      filteredOrders() {
        return this.orders.filter(order =>
          order.status && order.status.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchOrders() {
        this.loading = true;
        this.$store.dispatch('fetchOrders')
          .then(() => {
            this.loading = false;
          })
          .catch(err => {
            this.error = 'Failed to fetch orders.';
            console.error(err);
          });
      },
      deleteOrder(orderID) {
        if (confirm('Are you sure you want to delete this order?')) {
          this.$store.dispatch('deleteOrder', orderID)
            .then(() => {
              this.fetchOrders();
            })
            .catch(err => {
              console.error('Failed to delete order:', err);
            });
        }
      }
    },
    components: {
      Spinner,
    },
    mounted() {
      this.fetchOrders();
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 100%;
  }
  
  .table-orders th,
  .table-orders td {
    white-space: nowrap;
    vertical-align: middle;
  }
  
  @media (max-width: 575px) {
    .table-orders th,
    .table-orders td {
      font-size: 0.8rem;
    }
  }
  
  i {
    font-size: 2rem;
    color: #e21861;
  }
  </style>
  