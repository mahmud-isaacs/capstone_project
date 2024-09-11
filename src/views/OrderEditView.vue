<template>
    <div class="container">
        <form id="editOrderForm" v-if="order" @submit.prevent="updateOrder">
            <div class="mb-3">
                <label for="editQuantity" class="form-label">Quantity</label>
                <input v-model="order.quantity" type="text" class="form-control text-center" id="editQuantity"
                    required />
            </div>
            <div class="mb-3">
                <label for="editTotalPrice" class="form-label">Total Price</label>
                <input v-model="order.totalPrice" type="number" class="form-control text-center" id="editTotalPrice"
                    required />
            </div>
            <div class="mb-3">
                <label for="editStatus" class="form-label">Status</label>
                <input v-model="order.status" type="text" class="form-control text-center" id="editStatus"
                    required />
            </div>
            <div class="mb-3">
                <label for="editTimeSlot" class="form-label">Time slot</label>
                <input v-model="order.timeSlot" type="text" class="form-control text-center" id="editTimeSlot"
                    required />
            </div>
            <div class="mb-3">
                <label for="editOrderDate" class="form-label">Order Date</label>
                <input v-model="order.orderDate" type="text" step="0.01" class="form-control text-center"
                    id="editOrderDate" required />
            </div>
            <div class="mb-3">
                <label for="editBookingDate" class="form-label">Booking Date</label>
                <input v-model="order.bookingDate" type="text" step="0.01" class="form-control text-center"
                    id="editBookingDate" required />
            </div>
            <div class="mb-3">
                <label for="editUserID" class="form-label">User ID</label>
                <input v-model="order.userID" type="number" step="0.01" class="form-control text-center"
                    id="editItemPrice" required />
            </div>
            <div class="mb-3">
                <label for="editOrderDate" class="form-label">Item ID</label>
                <input v-model="order.itemID" type="number" step="0.01" class="form-control text-center"
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