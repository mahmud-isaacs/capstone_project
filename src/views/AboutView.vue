<template>
  <container class="container-fluid">
    <div class="about-section">
      <h2 class="text-center">About Huis Course</h2>
      <div class="row pad">
        <div class="col-lg-4 text-center">
          <img src="https://mahmud-isaacs.github.io/capstone_hostedImages/chef.jpg" loading="lazy" class="img-thumbnail about-img" alt="Chef">
        </div>
        <div class="col-lg-4 d-flex align-items-center">
          <div class="about-container text-center">
            <p>
              At Huis Course, we specialize in bringing authentic Cape Malay dishes straight from our kitchen to your table. Whether you're planning a family event, working late, or just craving a homemade meal, our booking system makes it easy to place an order and choose a convenient time for collection. With a blend of traditional flavors and modern convenience, we ensure that delicious, hearty meals are always within reach.
              <br>
              <i><b>Homemade Goodness, Ready When You Are!</b></i>
            </p>
          </div>
        </div>
        <div class="col-lg-4 text-center">
          <img src="https://mahmud-isaacs.github.io/capstone_hostedImages/aboutfOOD.jpg" loading="lazy" class="img-thumbnail about-img" alt="Food">
        </div>
      </div>
    </div>
  </container>
</template>

<script>
export default {
}
</script>

<style scoped>
.about-section {
  background-color: #F5F5F5; /* Light background color to match the restaurant theme */
  padding: 30px 0;
}

h2 {
  font-family: "Archivo Black", sans-serif;
  font-size: 2rem;
  color: #6A7B4C; /* Restaurant theme color */
  margin-bottom: 20px;
}

.about-img {
  border: 2px solid #6A7B4C; /* Border to match the restaurant theme */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Slight shadow for depth */
  transition: transform 0.3s ease;
}

.about-img:hover {
  transform: scale(1.05); /* Slight zoom effect on hover */
}

.about-container {
  background-color: #ffffff; /* White background for text area */
  border: 1px solid #6A7B4C; /* Border to match the restaurant theme */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Slight shadow for depth */
}

p {
  font-size: 1rem;
  color: #4A4A4A; /* Dark color for readability */
}

i, b {
  color: #6A7B4C; /* Highlight color */
}

.pad {
  padding: 20px; /* Added padding for better spacing */
}

@media (max-width: 992px) {
  .about-img {
    width: 100%; /* Ensure images scale down on smaller screens */
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 20px 0;
  }

  h2 {
    font-size: 1.5rem; /* Adjust heading size for smaller screens */
  }

  p {
    font-size: 0.9rem; /* Adjust font size for smaller screens */
  }
}
</style>
