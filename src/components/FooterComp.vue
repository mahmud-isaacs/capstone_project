<template>
  <footer class="fixed-footer">
    <div class="footer-content">
      <div class="footer-text">
        <h6>&copy; Designed and Developed by <b>Mahmud Isaacs</b> |
        <span id="current-year"></span> | All rights reserved</h6>
      </div>
      <div class="footImg">
        <a href="https://github.com/mahmud-isaacs">
          <img class="gitHub" src="https://mahmud-isaacs.github.io/portfolio_hostedImages/images/GitHubLogo.png" alt="GitHub Logo">
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
  background-color: #6A7B4C; /* Matching the restaurant theme */
  text-align: center;
  padding: 20px 0;
  box-shadow: 0 -2px 5px #4A4A4A; /* Darker shadow for better contrast */
  position: static;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.footer-text {
  flex: 1;
  text-align: center;
  color: #F5F5F5; /* Light color for readability */
}

.footer-content a img {
  width: 50px;
  height: auto;
}

#current-year {
  font-size: 1.2rem;
  color: #F5F5F5; /* Light color for readability */
}

h6 {
  font-size: 1rem;
  color: #F5F5F5; /* Light color for readability */
}

.footImg {
  flex: 0 0 auto;
  padding: 10px;
}

.gitHub {
  width: 40px;
  height: auto;
}

@media screen and (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-text, .footImg {
    width: 100%;
    padding: 5px 0;
  }

  .gitHub {
    width: 30px;
  }
}

@media screen and (max-width: 300px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-text, .footImg {
    width: 100%;
    padding: 5px 0;
  }

  .gitHub {
    width: 25px;
  }

  h6 {
    font-size: 0.8rem;
  }

  #current-year {
    font-size: 1rem;
  }
}
</style>