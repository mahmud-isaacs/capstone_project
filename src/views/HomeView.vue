<template>
  <div class="container text-center">
    <div class="col-md-6 m-auto">
      <h1 class="animated-heading">Huis Course</h1>
      <h6 class="animated-subheading">Homemade Goodness, Ready When You Are!</h6>
      <div class="text-center mt-5">
        <img
          src="https://mahmud-isaacs.github.io/capstone_hostedImages/HuisCourse%20logo.jpg"
          class="img-thumbnail prodImg bg-transparent"
          alt="Huis Course Logo"
        />
      </div>
      <div class="row gx-5 justify-content-center mt-3">
        <div class="col-auto">
          <router-link to="/about">
            <button type="button" class="btn btn-lg mb-2">About</button>
          </router-link>
        </div>
        <div class="col-auto">
          <router-link to="/items">
            <button type="button" class="btn btn-lg">Menu</button>
          </router-link>
        </div>
      </div>
    </div>

    <h1 class="text-center mt-5">Our Menu</h1>
    <div v-if="items.length > 0">
      <div data-aos="fade-left" class="accordion accordion-flush" id="accordionExample">
        <div class="accordion-item bg-transparent with-blur-backdrop border-2 accMarg">
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="card-group card-group-scroll m-auto">
                <div
                  v-for="item in items"
                  id="cardBlockWidth"
                  class="card bg-transparent with-blur-backdrop border border-0"
                  :key="item.itemID"
                >
                <div class="container-fluid">
                    <router-link to="/items">
                      <img
                        id="imgSize"
                        :src="item.itemUrl"
                        class="img-fluid hover-zoom"
                        alt="image"
                      />
                    </router-link>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ item.itemName }}</h5>
                    <p class="lead">
                      <span class="text-success">Amount</span>: R{{ item.itemPrice }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>


<script>
import Spinner from "@/components/SpinnerComp.vue";
import { mapState } from "vuex";

export default {
  components: {
    Spinner,
  },
  computed: {
    ...mapState(['items']), 
  },
  mounted() {
    this.$store.dispatch("fetchItems"); 
  },
};
</script>

<style scoped>
.animated-heading {
  color: #8b4513; /* Homy brown color */
  font-family: 'Press Start 2P', cursive; /* Retro font */
  animation: bounce 2s infinite;
  text-align: center; /* Center the heading */
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.animated-subheading {
  color: #deb887; /* Homy beige color */
  font-size: 1.5rem; /* Slightly larger */
  font-family: 'Press Start 2P', cursive; /* Retro font */
  transition: color 0.3s ease-in-out;
  text-align: center; /* Center the subheading */
}

.animated-subheading:hover {
  color: #e21861; /* Hover color */
}

.prodImg {
  width: 20rem; /* Slightly smaller image */
  border: none;
  -webkit-filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
  filter: drop-shadow(2px 2px 0 #e21861) drop-shadow(-2px -2px 0 #e21861);
}

.hover-zoom {
  transition: transform 0.3s ease;
}

.hover-zoom:hover {
  transform: scale(1.1); /* Zoom in effect */
}

button {
  background-color: transparent;
  color: burlywood;
  border: 2px solid black;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

button:hover {
  background-color: #e21861;
  color: black;
  border-color: #e21861;
}

.card-body {
  color: black;
}

@media screen and (max-width: 768px) {
  .home {
    margin-top: 140px;
  }
}
</style>
