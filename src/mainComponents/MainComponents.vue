<template>
  <main class="main-content">
    <div class="container py-5">
      <slot></slot>
    </div>
  </main>
</template>

<script>
export default {
  name: "MainComponents"
};
</script>

<style scoped>

.main-content {
  min-height: 100vh;
  padding-top: 90px;
  background-color: var(--bg-page);
  transition: background-color var(--transition-base);
}

</style>