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
        <div id="menuCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div v-for="(item, index) in items" :key="item.itemID" :class="['carousel-item', { active: index === 0 }]">
              <div class="d-flex justify-content-center">
                <div class="card bg-transparent with-blur-backdrop border-0" style="width: 18rem;">
                  <router-link to="/items">
                  <img
                    :src="item.itemUrl"
                    class="card-img-top img-fluid hover-zoom"
                    :alt="item.itemName"
                  />
                  </router-link>
                  <div class="card-body">
                    <h5 class="card-title">{{ item.itemName }}</h5>
                    <p class="lead"><span class="text-success">Price</span>: R{{ item.itemPrice }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Carousel controls -->
          <button class="carousel-control-prev" type="button" data-bs-target="#menuCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#menuCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
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
  background-color: #F5F5DC; 
}

.container {
  background-color: #FAF3E0; 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
}

.animated-heading {
  color: #8b4513; 
  font-family: 'Playfair Display', serif; 
  font-size: 3rem;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 2px;
  animation: fadeIn 2s ease-in-out, float 4s ease-in-out infinite; 
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animated-subheading {
  color: #deb887;
  font-size: 1.8rem;
  font-family: 'Dancing Script', cursive; 
  text-align: center;
  margin-bottom: 30px;
  animation: fadeIn 2s ease-in-out 0.5s both, float 6s ease-in-out infinite; 
  transition: color 0.3s ease-in-out;
}

.animated-subheading:hover {
  color: #6A7B4C; 
}

.prodImg {
  width: 100%;
  max-width: 20rem;
  border: 3px solid #6A7B4C; 
  border-radius: 8px;
  margin-bottom: 20px;
}

.hover-zoom {
  transition: transform 0.3s ease;
}

.hover-zoom:hover {
  transform: scale(1.05);
}

.carousel-item img {
  border: 3px solid #6A7B4C;
  border-radius: 8px; 
  width: 100%;
  height: auto;
}

.carousel-item {
  transition: transform 0.5s ease-in-out;
}


.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(38%) sepia(35%) saturate(268%) hue-rotate(62deg) brightness(92%) contrast(81%);
}


.carousel-control-prev,
.carousel-control-next {
  background-color: rgba(106, 123, 76, 0.5); 
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.carousel-control-prev:hover .carousel-control-prev-icon,
.carousel-control-next:hover .carousel-control-next-icon {
  filter: invert(48%) sepia(55%) saturate(321%) hue-rotate(65deg) brightness(85%) contrast(93%);
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: rgba(130, 155, 97, 0.7); 
}

.btn-about, .btn-menu {
  background-color: #6A7B4C; 
  color: white;
  border: 2px solid #6A7B4C; 
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.btn-about:hover, .btn-menu:hover {
  background-color: #829b61; 
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
    font-size: 1.8rem;
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

@media screen and (min-width: 768px) and (max-width: 991px) {
  .container {
    padding: 15px;
  }
  .animated-heading {
    font-size: 2.4rem;
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
}
</style>

