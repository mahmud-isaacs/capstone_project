<template>
  <div class="container-fluid">
    <div class="about-section">
      <h2 class="text-center animated-heading">Our Story: </h2>
      <div class="row pad">
        <div class="col-lg-4 text-center">
          <img src="https://mahmud-isaacs.github.io/capstone_hostedImages/chef.jpg" loading="lazy" class="img-thumbnail about-img hover-zoom" alt="Chef">
        </div>
        <div class="col-lg-4 d-flex align-items-center">
          <div class="about-container text-center">
            <p>
              At <b>Huis Course</b>, we bring the essence of home-cooked comfort to your doorstep. Specializing in authentic Cape Malay cuisine, our mission is to create dishes that remind you of family dinners, warm gatherings, and the rich flavors of traditional cooking.
              <br><br>
              Whether you're organizing a family event, working late, or simply craving a warm homemade meal, our seamless booking system makes it easy to order and choose a collection time that suits your schedule. We carefully prepare each meal with the freshest ingredients, ensuring that every bite is filled with the taste of love and care.
              <br><br>
              <i><b>Homemade Goodness, Ready When You Are!</b></i>
            </p>
          </div>
        </div>
        <div class="col-lg-4 text-center">
          <img src="https://mahmud-isaacs.github.io/capstone_hostedImages/aboutfOOD.jpg" loading="lazy" class="img-thumbnail about-img hover-zoom" alt="Food">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.about-section {
  background-color: #FAF3E0;
  padding: 40px 0;
  border-radius: 10px;
}

h2 {
  color: #8B4513;
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  animation: fadeInUp 1.5s ease-in-out;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.animated-heading {
  animation: fadeInUp 1.5s ease-in-out;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-img {
  border: 3px solid #6A7B4C;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
}

.about-img:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.about-container {
  background-color: #FFF8DC;
  border: 1px solid #8B4513;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #4A4A4A;
  font-family: 'Roboto', sans-serif;
}

i, b {
  color: #6A7B4C;
}

.pad {
  padding: 30px;
}

.hover-zoom {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-zoom:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

@media (max-width: 992px) {
  .about-img {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 20px 0;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>


