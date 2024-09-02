<template>
    <div class="container">
      <h2>Select a Date and Time Slot</h2>
      <input type="date" v-model="selectedDate" @change="openDropdown" />
  
      <div v-if="showDropdown" class="dropdown">
        <label for="items">Select an item:</label>
        <select v-model="selectedItem" id="items">
          <option disabled value="">Select an item</option>
          <option v-for="item in items" :key="item.itemID" :value="item">{{ item.name }}</option>
        </select>
  
        <label for="timeSlots">Select a time slot:</label>
        <select v-model="selectedTimeSlot" id="timeSlots">
          <option disabled value="">Select a time slot</option>
          <option v-for="timeSlot in timeSlots" :key="timeSlot">{{ timeSlot }}</option>
        </select>
  
        <button @click="bookSlot">Book Slot</button>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        selectedDate: null,
        showDropdown: false,
        selectedItem: "",
        selectedTimeSlot: "",
        timeSlots: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
      };
    },
    computed: {
      ...mapState(['items'])  
    },
    created() {
      this.fetchItems();  
    },
    methods: {
      ...mapActions(['fetchItems']), 
      openDropdown() {
        if (this.selectedDate) {
          this.showDropdown = true;
        }
      },
      bookSlot() {
        if (this.selectedItem && this.selectedTimeSlot) {
          alert(`Booking confirmed for ${this.selectedItem.name} on ${this.selectedDate} at ${this.selectedTimeSlot}`);
          this.resetSelection();
        } else {
          alert("Please select an item and a time slot");
        }
      },
      resetSelection() {
        this.selectedDate = null;
        this.selectedItem = "";
        this.selectedTimeSlot = "";
        this.showDropdown = false;
      }
    }
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  
  
  