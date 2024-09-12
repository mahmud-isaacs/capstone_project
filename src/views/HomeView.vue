<template>
  <main>
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
              <button type="button" class="btn btn-lg mb-2 btn-about">About</button>
            </router-link>
          </div>
          <div class="col-auto">
            <router-link to="/items">
              <button type="button" class="btn btn-lg btn-menu">Menu</button>
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
                        <span class="text-success">Price</span>: R{{ item.itemPrice }}
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
  </main>
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
main {
  background-color: #F5F5DC; /* Soft cream background for a cozy feel */
}

.container {
  background-color: #FAF3E0; /* Light cream background for the container */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Soft shadow for a gentle 3D effect */
}

.animated-heading {
  color: #8b4513; /* Chocolate color for warmth */
  font-family: 'Dancing Script', cursive; /* Friendly, cursive font */
  animation: bounce 2s infinite;
  text-align: center;
  margin-bottom: 20px;
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
  color: #deb887; /* Light brown color for contrast */
  font-size: 1.5rem;
  font-family: 'Dancing Script', cursive;
  transition: color 0.3s ease-in-out;
  text-align: center;
  margin-bottom: 30px;
}

.animated-subheading:hover {
  color: #6A7B4C;
}

.prodImg {
  width: 100%;
  max-width: 20rem;
  border: 3px solid #6A7B4C; /* Border matching the theme */
  border-radius: 8px;
  margin-bottom: 20px;
}

.hover-zoom {
  transition: transform 0.3s ease;
}

.hover-zoom:hover {
  transform: scale(1.05);
}

.btn-about, .btn-menu {
  background-color: #6A7B4C; /* Matching button color */
  color: white;
  border: 2px solid #6A7B4C; /* Border color matching button */
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.btn-about:hover, .btn-menu:hover {
  background-color: #829b61; /* Lighter green on hover */
  border-color: #829b61;
  color: black;
}

.card-body {
  color: black;
  padding: 15px;
}

.lead {
  font-size: 1.2rem;
}

@media screen and (max-width: 480px) {
  .container {
    padding: 8px;
  }
  .animated-heading {
    font-size: 1.5rem;
  }
  .animated-subheading {
    font-size: 1.2rem;
  }
  .prodImg {
    width: 100%;
    max-width: 100%;
  }
  button {
    font-size: 0.8rem;
    padding: 8px 16px;
  }
  .lead {
    font-size: 1rem;
  }
}

@media screen and (max-width: 767px) {
  .container {
    padding: 10px;
  }
  .animated-heading {
    font-size: 1.8rem;
  }
  .animated-subheading {
    font-size: 1.4rem;
  }
  .prodImg {
    width: 100%;
    max-width: 100%;
  }
  button {
    font-size: 0.9rem;
    padding: 10px 18px;
  }
  .lead {
    font-size: 1.1rem;
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .container {
    padding: 15px;
  }
  .animated-heading {
    font-size: 2rem;
  }
  .animated-subheading {
    font-size: 1.6rem;
  }
  .prodImg {
    width: 100%;
    max-width: 100%;
  }
  button {
    font-size: 1rem;
    padding: 12px 20px;
  }
  .lead {
    font-size: 1.2rem;
  }
}

@media screen and (min-width: 990px) and (max-width: 1300px) {
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  .col-md-6 {
    max-width: 100%;
    margin: 0 auto;
  }
  .animated-heading {
    font-size: 2.2rem;
  }
  .animated-subheading {
    font-size: 1.7rem;
  }
  .prodImg {
    max-width: 100%;
  }
  button {
    font-size: 1rem;
    padding: 12px 20px;
  }
  .card-body {
    padding: 15px;
  }
  .lead {
    font-size: 1.2rem;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1300px) {
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  .animated-heading {
    font-size: 2.5rem;
  }
  .animated-subheading {
    font-size: 1.8rem;
  }
  .prodImg {
    max-width: 100%;
  }
  button {
    font-size: 1.1rem;
    padding: 14px 24px;
  }
  .card-body {
    padding: 20px;
  }
  .lead {
    font-size: 1.3rem;
  }
}
</style>
