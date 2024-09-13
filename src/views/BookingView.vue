<template>
  <div class="container">
    <h2>Select a Date and Time Slot</h2>

    <input type="date" v-model="selectedDate" @change="openDropdown" class="date-input" />

    <div v-if="showDropdown" class="dropdown">
      <label for="items">Select an item:</label>
      <select v-model="selectedItem" id="items" class="form-select">
        <option disabled value="">Select an item</option>
        <option v-for="item in items" :key="item.itemID" :value="item">{{ item.itemName }}</option>
      </select>

      <label for="timeSlots">Select a time slot:</label>
      <select v-model="selectedTimeSlot" id="timeSlots" class="form-select">
        <option disabled value="">Select a time slot</option>
        <option v-for="timeSlot in timeSlots" :key="timeSlot">{{ timeSlot }}</option>
      </select>

      <label for="quantity">Quantity:</label>
      <input type="number" v-model.number="quantity" id="quantity" min="1" class="quantity-input" />

      <div class="order-summary">
        <p><strong>Selected Item:</strong> {{ selectedItem?.itemName || 'None' }}</p>
        <p><strong>Selected Time Slot:</strong> {{ selectedTimeSlot || 'None' }}</p>
        <p><strong>Selected Date:</strong> {{ selectedDate || 'None' }}</p>
        <p><strong>Quantity:</strong> {{ quantity }}</p>
        <p><strong>Total Price:</strong> {{ totalPrice.toFixed(2) }}</p>
      </div>

      <button @click="addItem" class="confirm-button">Confirm</button>

      <div v-if="selectedItems.length > 0" class="order-list">
        <h3>Your Order:</h3>
        <ul>
          <li v-for="(item, index) in selectedItems" :key="index">
            {{ item.itemName }} - {{ item.timeSlot }} - Quantity: {{ item.quantity }} - Total Price: {{ item.totalPrice.toFixed(2) }}
          </li>
        </ul>
      </div>
    </div>

    <button @click="goToOrders" class="view-orders">View Orders</button>
  </div>
</template>

<script>
import { toast } from "vue3-toastify"; 

export default {
  data() {
    return {
      selectedDate: null,
      showDropdown: false,
      selectedItem: null,
      selectedTimeSlot: "",
      timeSlots: [
        "14:00 PM - 15:00 PM",
        "15:00 PM - 16:00 PM",
        "19:00 PM - 20:00 PM",
        "20:00 PM - 21:00 PM",
        "21:00 PM - 22:00 PM"
      ],
      selectedItems: [],
      quantity: 1, 
      totalPrice: 0, 
      status: "Pending...", 
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      this.$store.dispatch('fetchItems');
    },
    openDropdown() {
      if (this.selectedDate) {
        this.showDropdown = true;
      }
    },
    addItem() {
      const user = this.$store.state.user;

      if (!user) {
        toast.error("User not logged in.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      }

      if (!this.selectedItem || !this.selectedTimeSlot || !this.selectedDate) {
        toast.error("Please select a date, item, and time slot.", {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
        return;
      }
      const itemPrice = this.selectedItem.itemPrice || 0;
      this.totalPrice = itemPrice * this.quantity;

      const orderDate = new Date().toISOString(); 

      this.$store.dispatch('addOrder', {
        timeSlot: this.selectedTimeSlot,
        itemID: this.selectedItem.itemID,
        bookingDate: this.selectedDate,
        orderDate: orderDate, 
        userID: user.id,
        quantity: this.quantity,
        totalPrice: this.totalPrice,
        status: this.status
      });

      this.selectedItems.push({
        itemName: this.selectedItem.itemName,
        timeSlot: this.selectedTimeSlot,
        quantity: this.quantity,
        totalPrice: this.totalPrice
      });

      this.resetSelection();
    },
    resetSelection() {
      this.selectedItem = null;
      this.selectedTimeSlot = "";
      this.quantity = 1; 
      this.totalPrice = 0;
    },
    goToOrders() {
      this.$router.push({ name: "orders" });
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem; 
  text-align: center;
  background-color: #f5f5f5; 
  border-radius: 12px; 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); 
}

h2 {
  font-size: 2rem; 
  color: #8B4513; 
  margin-bottom: 1.5rem; 
  font-family: 'Playfair Display', serif; 
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2); 
}

.date-input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
}

.dropdown {
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: #fff; 
  border: 1px solid #ddd; 
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
}

.form-select, .quantity-input {
  margin: 0.5rem 0; 
  padding: 0.75rem;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.confirm-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #8B4513; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; 
}

.confirm-button:hover {
  background-color: #6A3B1A; 
}

.order-summary, .order-list {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff; 
  border: 1px solid #ddd; 
  border-radius: 6px; 
}

.order-summary p, .order-list li {
  font-size: 1rem; 
  color: #333; 
}

.order-list ul {
  list-style-type: none;
  padding: 0;
}

.view-orders {
  background-color: #6A7B4C; 
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s; 
}

.view-orders:hover {
  background-color: #405121;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem; 
  }
  h2 {
    font-size: 1.5rem; 
  }
}
</style>
