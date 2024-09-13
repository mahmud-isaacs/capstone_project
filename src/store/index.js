import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';
import { toast } from 'vue3-toastify';
import { useCookies } from 'vue3-cookies';

// const apiURL = "https://capstone-project-0qjg.onrender.com/";
const apiURL = "http://localhost:5001/";
axios.defaults.withCredentials = true
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}
axios.defaults.headers.Authorization = `Bearer ${getCookie('token')}`

export default createStore({
  state: {
    users: [],
    user: null,
    token: null,
    userID: null,
    items: [],
    item: null,
    recentItem: null,
    orders: [],
    order: null,
    userOrders:null,
    loggedIn: null,
    userAuth: false,
  },
  getters: {
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, user) {
      state.user = user
      state.userAuth = true
      
    },
    setUserID(state, userID) {
      state.userID = userID;
    },
    setItems(state, payload) {
      state.items = payload;
    },
    setItem(state, payload) {
      state.item = payload;
    },
    setOrders(state, payload) {
      state.orders = payload;
    },
    setUserOrders(state, payload) {
      state.userOrders = payload;
    },
    setOrder(state, payload) {
      state.order = payload;
    },
    addOrder(state, payload) {
      state.orders.push(payload);
    },
    updateUser(state, payload) {
      const index = state.users.findIndex(user => user.userID === payload.userID);
      if (index !== -1) {
        state.users.splice(index, 1, payload);
      }
    },
    deleteUser(state, userID) {
      state.users = state.users.filter(user => user.userID !== userID);
    },
    updateOrder(state, payload) {
      const index = state.orders.findIndex(order => order.orderID === payload.orderID);
      if (index !== -1) {
        state.orders.splice(index, 1, payload);
      }
    },
    updateItem(state, payload) {
      const index = state.items.findIndex(item => item.itemID === payload.itemID);
      if (index !== -1) {
        state.items.splice(index, 1, payload);
      }
    },
    deleteItem(state, itemID) {
      state.items = state.items.filter(item => item.itemID !== itemID);
    },
    deleteOrder(state, orderID) {
      state.orders = state.orders.filter(order => order.orderID !== orderID);
    },
    clearUser(state) {
      state.user = null;
    },
    logout(state) {
      state.user = null; 
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const { data } = await axios.get(`${apiURL}users`);
        if (data) {
          commit('setUsers', data.result || data);
        } else {
          toast.error('Failed to fetch users', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    
    async fetchUser({ commit }, id) {
      try {
        const { data } = await axios.get(`${apiURL}users/${id}`);
        if (data) {
          commit('setUser', data.result || data);
        } else {
          toast.error('Failed to fetch user', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async login({ commit }, payload) {
      const { cookies } = useCookies();
      console.log('Login payload:', payload);
      
      try {
        const response = await axios.post(`${apiURL}users/login`, payload);
        console.log('Full response object:', response); 
        
        const { data } = response; 
    
        if (data.token) {
          console.log('Login response data:', data); 
          commit('setUser', data.user); 
          cookies.set('user', data.user, { expires: '7d' }); 
          cookies.set('authToken', data.token, { expires: '7d' }); 
          axios.defaults.headers.Authorization = `Bearer ${data.token}`; 
          router.push({ name: 'home' }); 
          
          toast.success('Login successful!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(data.msg || 'Login failed', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        console.error('Login error:', e.message); 
        toast.error(`Error: ${e.response ? e.response.data.message : e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    
    
    async updateUser({ dispatch }, user) {
      try {
        const dataToSend = { ...user };
        if (!user.userPass) {
          delete dataToSend.userPass;
        }
    
        const { data } = await axios.patch(`${apiURL}users/update/${user.id}`, dataToSend);
        if (data.msg) {
          await dispatch("fetchUser", user.id);
          toast.success('User updated successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to update user', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async deleteUser({ dispatch }, id) {
      try {
        const { data } = await axios.delete(`${apiURL}users/delete/${id}`);
        if (data.msg) {
          dispatch("fetchUsers");
          toast.success('User deleted successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to delete user', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
  
    
    

    async verify({ commit }) {
      try {
        const { data } = await axios.get(`${apiURL}users/auth`);
        commit('setUserID', data.id); 
        commit('setUser', data); 
      } catch (error) {
        console.error('Verification failed:', error.message);
      }
    },
    
    

    async logout({ commit }) {
      const { cookies } = useCookies();
      try {
        cookies.remove('authToken');
        cookies.remove('user');
        delete axios.defaults.headers.Authorization;
        commit('clearUser');
        localStorage.removeItem('user');
        toast.success('Logout successful!', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
        router.push({ name: 'login' });
        
      } catch (e) {
        toast.error('Logout failed', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async registerUser({ dispatch }, user) {
      try {
        const { data } = await axios.post(`${apiURL}users/register`, user);
        
        if (data.success) {
          toast.success('Registration successful!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
          await dispatch('login', {
            userName: user.userName,
            userPass: user.userPass
          });
        } else {
          toast.error(data.msg || 'Registration failed', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
        console.error('Registration error:', error.message);
      }
    },
    

    async fetchItems({ commit }) {
      try {
        const response = await axios.get(`${apiURL}items`);
        if (response.data) {
          commit("setItems", response.data.results || response.data);
        } else {
          toast.error('Failed to fetch items', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    
    async fetchItem({ commit }, id) {
      try {
        const { data } = await axios.get(`${apiURL}items/${id}`);
        console.log(data);
        
        if (data) {
          commit('setItem', data);
        } else {
          toast.error('Failed to fetch item', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async updateItem({ dispatch }, payload) {
      try {
        const { data } = await axios.patch(`${apiURL}items/update/${payload.itemID}`, payload);
        if (data && data.success) { 
          dispatch("fetchItems");
          toast.success('Item updated successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to update item', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addItem({ dispatch }, payload) {
      try {
        const { data } = await axios.post(`${apiURL}items/addItem`, payload);
        if (data.msg) {
          dispatch("fetchItems");
          toast.success('item added successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to add item', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async deleteItem({ dispatch }, id) {
      try {
        const { data } = await axios.delete(`${apiURL}items/delete/${id}`);
        if (data.msg) {
          dispatch("fetchItems");
          toast.success('item deleted successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to delete item', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    
    async fetchOrders({ commit }) {
      try {
        const response = await axios.get(`${apiURL}orders`);
        if (response.data) {
          commit('setOrders', response.data.results || response.data);
        } else {
          toast.error('Failed to fetch orders', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    
    async fetchOrder({ commit }, id) {
      try {
        const { data } = await axios.get(`${apiURL}orders/${id}`);
        if (data) {
          commit("setOrder", data.result || data);
        } else {
          toast.error('Failed to fetch order', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },

    async fetchUserOrders({ commit }, userID) {
      try {
        const response = await axios.get(`${apiURL}orders/user/${userID}`);
        console.log(response.data.data);
        
        if (response.data) {
          commit('setUserOrders', response.data.data);
        } else {
          toast.error('Failed to fetch user orders', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (error) {
        toast.error(`Error: ${error.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    
    async addOrder({ commit }, payload) {
      console.log('Payload to be sent:', payload);
      try {
        const { data } = await axios.post(`${apiURL}orders/addOrder`, payload);
        console.log('Server response:', data);
        if (data.success || data.order) {
          commit('addOrder', data.order);
          toast.success('Order added successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to add order', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
  
    
    
    
    async updateOrder({ dispatch }, payload) {
      try {
        const { data } = await axios.patch(`${apiURL}orders/update/${payload.orderID}`, payload);
        if (data.msg) {
          dispatch("fetchOrders");
          toast.success('Order updated successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to update order', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    
    async deleteOrder({ dispatch }, id) {
      try {
        const { data } = await axios.delete(`${apiURL}orders/delete/${id}`);
        if (data.msg) {
          dispatch("fetchOrders");
          toast.success('Order deleted successfully!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error('Failed to delete order', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`Error: ${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
  },
  modules: {
  }
});