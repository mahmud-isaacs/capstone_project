import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';
import { toast } from 'vue3-toastify';
// import 'vue3-toastify/dist';
// import { register } from 'register-service-worker';
import { useCookies } from 'vue3-cookies';

const apiURL = "https://capstone-project-0qjg.onrender.com/"

export default createStore({
  state: {
    users: [],
    user: null,
    items: [],
    item: null,
    recentItem: null,
    orders: [],
    order: null,
  },
  getters: {
    user: (state) => state.user,
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, user) {
      state.user = user;
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
    setOrder(state, payload) {
      state.order = payload;
    },
    addOrder(state, payload) {
      state.orders.push(payload);
    },
    updateOrder(state, payload) {
      const index = state.orders.findIndex(order => order.orderID === payload.orderID);
      if (index !== -1) {
        state.orders.splice(index, 1, payload);
      }
    },
    deleteOrder(state, orderID) {
      state.orders = state.orders.filter(order => order.orderID !== orderID);
    },
    clearUser(state) {
      state.user = null;
    }
  },
  actions: {
    async fetchUsers({commit}){
      try {
        let { data, msg } = await axios.get(`${apiURL}users`);
        if (data.result){
          commit('setUsers', data.result);
          console.log(data);
        } else {
          toast.error(`${msg}`,{
            autoClose : 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
      },

      async fetchUser({ commit }, id) {
        try {
          const { data, msg } = await axios.get(`${apiURL}users/${id}`);
          if (data.result) {
            commit('setUser', data.result);
          } else {
            toast.error(`${msg}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      },
    async updateUser(context, payload){
      try {
        const { msg, err} = await (
          await axios.put(`${apiURL}users/${payload.id}`, payload)
        ).data;
        if  (msg) {
          context.dispatch("fetchUsers");
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    }  catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });  
     }
    },  
    async registerUser({ commit }, payload) {
      const { cookies } = useCookies();
      try {
        const { data } = await axios.post(`${apiURL}users/register`, payload);
        if (data.token) {
          commit('setUser', data.user);
          cookies.set('authToken', data.token, { expires: '7d' });
          router.push({ name: 'home' });
          toast.success('Registration successful!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(`${data.msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async login({ commit }, payload) {
      const { cookies } = useCookies();
      try {
        const { data } = await axios.post(`${apiURL}users/login`, payload);
        if (data.token) {
          commit('setUser', data.user);
          cookies.set('authToken', data.token, { expires: '7d' });
          router.push({ name: 'home' });
          toast.success('Login successful!', {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error(`${data.msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async logout({ commit }) {
      const { cookies } = useCookies();
      try {
        cookies.remove('authToken');
        commit('clearUser');
        router.push({ name: 'login' });
        toast.success('Logout successful!', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } catch (e) {
        toast.error('Logout failed.', {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async deleteUser(context, id) {
      try {
        const { msg, err } = await (
          await axios.delete(`${apiURL}users/delete/${id}`)
        ).data;
        if (msg) {
          context.dispatch("fetchUsers");
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
   }, 
   async fetchItems({ commit }) {
    try {
      const response = await axios.get(`${apiURL}items`);
      console.log(response);  // Log the entire response
      if (response.data) {
        commit("setItems", response.data.results || response.data); // Adjust based on the structure
      } else {
        toast.error(`${response.msg || 'Failed to fetch items'}`, {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error(error);  // Log the error
      toast.error(`${error.message}`, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  
  async fetchItem({ commit }, id) {
    try {
      const { data } = await axios.get(`${apiURL}items/${id}`);
      if (data) {

        commit('setItem', data);
        console.log(data);
      } else {
        toast.error('Failed to fetch item', {
          autoClose: 3000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
        async addItem(context, payload) {
          try {
            const { msg } = await (
              await axios.post(`${apiURL}items/addItem`, payload)
            ).data;
            if (msg) {
              context.dispatch("fetchItems");
              toast.success(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (e) {
            toast.error(`${e.message}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },
        async updateItem(context, payload) {
          console.log(payload);
          
          try {
            const { msg } = await (
              await axios.patch(`${apiURL}items/update/${payload.itemID}`, payload)
            ).data;
            if (msg) {
              context.dispatch("fetchItems");
              toast.success(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (e) {
            toast.error(`${e.message}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },
        async deleteItems(context, id) {
          try {
            const { msg } = await (
              await axios.delete(`${apiURL}items/delete/${id}`)
            ).data;
            if (msg) {
              context.dispatch("fetchItems");
              toast.success(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (e) {
            toast.error(`${e.message}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        }, 
        async fetchOrders({ commit }) {
          try {
            let { data, msg } = await axios.get(`${apiURL}orders`);
            if (data.results) {
              commit("setOrders", data.results);
            } else {
              toast.error(`${msg}`, {
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (error) {
            toast.error(`${error.message}`, {
              autoClose: 3000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },
        async fetchOrder({ commit }, id) {
          try {
            let { data, msg } = await axios.get(`${apiURL}orders/${id}`);
            if (data.result) {
              commit("setOrder", data.result);
            } else {
              toast.error(`${msg}`, {
                autoClose: 3000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (error) {
            toast.error(`${error.message}`, {
              autoClose: 3000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },
        async addOrder(context, payload) {
          try {
            const { msg, order } = await (await axios.post(`${apiURL}orders/add`, payload)).data;
            if (msg) {
              context.commit('addOrder', order);
              toast.success(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (e) {
            toast.error(`${e.message}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },
        async updateOrder(context, payload) {
          try {
            const { msg } = await (await axios.patch(`${apiURL}orders/update/${payload.orderID}`, payload)).data;
            if (msg) {
              context.dispatch("fetchOrders");
              toast.success(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (e) {
            toast.error(`${e.message}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },
        async deleteOrder(context, id) {
          try {
            const { msg } = await (await axios.delete(`${apiURL}orders/delete/${id}`)).data;
            if (msg) {
              context.dispatch("fetchOrders");
              toast.success(`${msg}`, {
                autoClose: 2000,
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }
          } catch (e) {
            toast.error(`${e.message}`, {
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        },   
  },
  modules: {
  }
})
