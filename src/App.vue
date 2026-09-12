<template>
  <div>
    <HeadBar :cart="cart" />

    <ToastMessage />

    <ConfirmModal />

    <router-view
      :cart="cart"
      @cart-updated="getCart"
    />
  </div>
</template>

<script>
import api from "./api/axios";
import HeadBar from "./mainComponents/HeadBar.vue";
import ToastMessage from "./mainComponents/ToastMessage.vue";
import ConfirmModal from "./mainComponents/ConfirmModal.vue";

export default {
  name: "App",

  components: {
    HeadBar,
    ToastMessage,
    ConfirmModal
  },

  data() {
    return {
      cart: []
    };
  },

  mounted() {
    this.getCart();
  },

  methods: {
    async getCart() {
      try {
        const response = await api.get("/cart");

        this.cart = response.data;
      } catch (error) {
        console.error(
          "Error getting cart:",
          error
        );
      }
    }
  }
};
</script>