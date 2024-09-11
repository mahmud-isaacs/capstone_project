<template>
  <div class="container">
    <h2>Select a Date and Time Slot</h2>
    
    <input type="date" v-model="selectedDate" @change="openDropdown" />
    <div v-if="showDropdown" class="dropdown">
      <label for="items">Select an item:</label>
      <select v-model="selectedItem" id="items">
        <option disabled value="">Select an item</option>
        <option v-for="item in items" :key="item.itemID" :value="item">{{ item.itemName }}</option>
      </select>

      <label for="timeSlots">Select a time slot:</label>
      <select v-model="selectedTimeSlot" id="timeSlots">
        <option disabled value="">Select a time slot</option>
        <option v-for="timeSlot in timeSlots" :key="timeSlot">{{ timeSlot }}</option>
      </select>
      {{ selectedItem }}
      {{ selectedTimeSlot }}
      {{ selectedDate }}
      <button @click="addItem()">Confirm</button>
      <div v-if="selectedItems.length > 0">
        <h3>Your Order:</h3>
        <ul>
          <li v-for="(item, index) in selectedItems" :key="index">
            {{ item.itemName }} - {{ item.timeSlot }}
          </li>
        </ul>
      </div>
    </div>
    <button @click="goToOrders">View Orders</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
      showDropdown: false,
      selectedItem: null,
      selectedTimeSlot: "",
      timeSlots: ["14:00 PM - 15:00 PM", "15:00 PM - 16:00 PM", "19:00 PM - 20:00 PM", "20:00 PM - 21:00 PM", "21:00 PM - 22:00 PM"],
      selectedItems: []
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
      this.$store.dispatch('addOrder', {
        timeSlot: this.selectedTimeSlot,
        itemID: this.selectedItem.itemID,
        bookingDate: this.selectedDate
      });
      this.selectedItems.push({
        itemName: this.selectedItem.itemName,
        timeSlot: this.selectedTimeSlot
      });
      this.resetSelection();
    },
    resetSelection() {
      this.selectedItem = null;
      this.selectedTimeSlot = "";
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
  padding: 1rem;
  text-align: center;
}

.dropdown {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
}

select {
  margin: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: rgb(163, 120, 9);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: burlywood;
}
</style>




  
  
  