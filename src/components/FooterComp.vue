<template>
  <footer class="fixed-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h6>&copy; <span id="current-year"></span> <b>Huis Course</b> | Designed and Developed by <b>Mahmud Isaacs</b></h6>
      </div>
      <div class="footer-section">
        <ul class="footer-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/about">About Us</router-link></li>
          <li><router-link to="/contact">Contact Us</router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <a href="https://www.instagram.com" target="_blank" rel="logo">
          <img src="https://mahmud-isaacs.github.io/ecomHostedImages/inta.png" alt="Instagram" class="footer-icon">
        </a>
        <a href="https://x.com/" target="_blank" rel="logo">
          <img src="https://mahmud-isaacs.github.io/ecomHostedImages/twitter.jpg" alt="Twitter" class="footer-icon">
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  mounted() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
  }
}
</script>

<style scoped>
.fixed-footer {
  bottom: 0;
  width: 100%;
  background-color: #6A7B4C; 
  color: #F5F5F5; 
  text-align: center;
  padding: 20px 0;
  box-shadow: 0 -2px 5px #4A4A4A; 
  position: static;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  margin: 0 10px;
}

.footer-text {
  text-align: center;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin: 5px 0;
}

.footer-links a {
  color: #F5F5F5; 
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #F1C40F;
}

.footer-icon {
  width: 35px; 
  height: auto;
  margin: 0 10px;
  background: transparent; 
  object-fit: cover;
  mix-blend-mode: multiply;
}

@media screen and (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-section {
    margin: 10px 0;
  }

  .footer-icon {
    width: 30px;
  }
}

@media screen and (max-width: 300px) {
  .footer-icon {
    width: 25px;
  }

  .footer-text h6 {
    font-size: 0.8rem;
  }
  
  #current-year {
    font-size: 1rem;
  }
}
</style>
