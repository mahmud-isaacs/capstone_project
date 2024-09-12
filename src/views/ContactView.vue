<template>
  <main id="contactPage">
    <div class="container">
      <h1 class="text-center contactMain">Contact Us</h1>
      <form action="https://formspree.io/f/xeojwarz" class="row g-3" method="POST" target="_blank">
        <div class="col-md-6 order-md-2">
          <label for="inputEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="inputEmail" name="Email" required placeholder="example@gmail.com">
          <label for="inputName" class="form-label">First Name</label>
          <input type="text" class="form-control" id="inputName" name="First Name" required>
          <label for="inputLastName" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="inputLastName" name="Last Name" required>
          <label for="inputMessage">Send Us A Message</label>
          <textarea class="form-control" name="message" placeholder="Type message here..." required></textarea>
          
          <br>
          <button class="submitBnt">Submit</button>
        </div>

        <!-- Image and Our Info Section -->
        <div class="col-md-6 order-md-1 text-center">
          <img src="https://mahmud-isaacs.github.io/capstone_hostedImages/food.jpg" class="img-thumbnail cont-img" alt="">
          <br><br>
          <h5 id="infoHeading">Our Info:</h5>
          <p id="infoPara">Phone: 076 499 1374</p>
          <p id="infoPara">Email: HuisCourse@gmail.com</p>
          <hr>
          <h5 id="infoHeading">Follow us:</h5>
          <div class="socialLinks">
            <a id="contactLink" href="https://www.instagram.com/" target="_blank">
              <img class="socialLogo" src="https://mahmud-isaacs.github.io/ecomHostedImages/inta.png" alt=""> @HuisCourse
            </a><br>
            <a id="contactLink" href="https://x.com/" target="_blank">
              <img class="socialLogo" src="https://mahmud-isaacs.github.io/ecomHostedImages/twitter.jpg" alt=""> @huis_course
            </a>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style scoped>
#contactPage {
  background-color: #fafafa; 
  padding: 2rem 0; 
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #fff; 
  border-radius: 12px; 
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); 
}

.contactMain {
  font-size: 2.5rem; 
  color: #c23c3c; 
  margin-bottom: 1.5rem; 
}

.form-label {
  color: #333; 
}

input, textarea {
  border-radius: 4px;
  border: 1px solid #ddd; 
  padding: 0.75rem;
  margin-bottom: 1rem; 
}

textarea {
  height: 150px; 
}

button.submitBnt {
  padding: 0.75rem 1.5rem;
  background-color: #c23c3c; 
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s; 
}

button.submitBnt:hover {
  background-color: #a22c2c; 
}

#infoHeading {
  font-size: 1.25rem;
  color: #333; 
  margin-top: 1rem; 
}

#infoPara {
  font-size: 1rem;
  color: #555; 
}

hr {
  border-top: 1px solid #ddd; 
  margin: 1.5rem 0; 
}

.socialLinks {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

#contactLink {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem; 
  color: #c23c3c; 
  text-decoration: none; 
}

#contactLink img {
  width: 24px;
  height: 24px;
  margin-right: 0.5rem; 
}

.socialLogo {
  object-fit: cover;
  mix-blend-mode: multiply;
}

.cont-img {
  max-width: 100%;
  border-radius: 12px; 
}
</style>
