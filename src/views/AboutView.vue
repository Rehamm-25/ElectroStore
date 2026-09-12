<template>

  <MainComponents>

    <div class="about-page">

      <div class="text-center mb-5">

        <h1 class="about-title">
          ElectroStore
        </h1>

        <p class="about-subtitle">
          A Full Front-End E-Commerce Application
        </p>

      </div>


      <div class="about-section">

        <p class="about-text">
          ElectroStore is a complete front-end e-commerce
          web application built with Vue 3, simulating a
          real online electronics store — from browsing
          and filtering products, to managing a shopping
          cart and wishlist, all backed by a live REST API.
        </p>

      </div>


      <div class="about-section">

        <h3 class="section-heading">
          Key Features
        </h3>

        <div class="features-grid">

          <div class="feature-card">
            <div class="feature-icon">🔍</div>
            <h5>Smart Search & Filters</h5>
            <p>
              Live search across product name, brand, and
              category, combined with category filtering
              and multiple sorting options.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🛒</div>
            <h5>Full Cart Management</h5>
            <p>
              Add, update quantities, and remove items with
              real-time stock validation, subtotal
              calculation, and instant UI feedback.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">♡</div>
            <h5>Wishlist System</h5>
            <p>
              Save favorite products for later, synced live
              with the backend and reflected across every
              page instantly.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">📦</div>
            <h5>Stock-Aware UX</h5>
            <p>
              Out-of-stock products are automatically
              disabled, and quantity controls respect real
              inventory limits.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🔔</div>
            <h5>Centralized Notifications</h5>
            <p>
              A shared toast and confirmation-modal system
              built with Vue's reactivity, giving consistent
              feedback across the entire app.
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">🌗</div>
            <h5>Light & Dark Mode</h5>
            <p>
              A full theming system built on CSS variables,
              with a persistent user preference saved across
              sessions.
            </p>
          </div>

        </div>

      </div>


      <div class="about-section">

        <h3 class="section-heading">
          Built With
        </h3>

        <div class="tech-list">

          <span class="tech-badge">Vue 3</span>
          <span class="tech-badge">Vue Router</span>
          <span class="tech-badge">Axios</span>
          <span class="tech-badge">Bootstrap 5</span>
          <span class="tech-badge">REST API</span>
          <span class="tech-badge">JSON Server</span>

        </div>

      </div>


      <div class="about-section text-center">

        <p class="about-text">
          This project reflects a component-driven
          architecture with reusable UI patterns, clean
          state management, and attention to real-world
          details like loading states, error handling, and
          edge cases — the kind of care that goes into
          production-ready applications.
        </p>

      </div>

    </div>

  </MainComponents>

</template>


<script>

import MainComponents from "../mainComponents/MainComponents.vue";


export default {

  name: "AboutView",

  components: {
    MainComponents
  }

};

</script>


<style scoped>

.about-page {

  max-width: 900px;
  margin: 0 auto;

}


.about-title {

  font-size: 40px;
  font-weight: 700;
  color: var(--text-heading);

}


.about-subtitle {

  color: var(--text-secondary);
  font-size: 17px;

}


.about-section {

  margin-bottom: 45px;

}


.about-text {

  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.8;
  text-align: center;

}


.section-heading {

  color: var(--text-heading);
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;

}


.features-grid {

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 18px;

}


.feature-card {

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  padding: 24px 20px;
  border-radius: 14px;

  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);

}


.feature-card:hover {

  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);

}


.feature-icon {

  font-size: 26px;
  margin-bottom: 10px;

}


.feature-card h5 {

  color: var(--text-heading);
  font-weight: 600;
  margin-bottom: 8px;

}


.feature-card p {

  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 0;

}


.tech-list {

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

}


.tech-badge {

  background-color: var(--text-heading);
  color: var(--bg-surface);
  padding: 8px 18px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;

  transition: background-color var(--transition-fast);

}


.tech-badge:hover {

  background-color: var(--accent);

}


@media (max-width: 576px) {

  .about-title {
    font-size: 30px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

}

</style>