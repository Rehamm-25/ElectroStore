<template>
  <MainComponents>

    <div
      v-if="product"
      class="row justify-content-center"
    >

      <div class="col-md-5">

        <div class="image-box">

          <img
            :src="product.image"
            :alt="product.title"
            class="product-image"
          />

        </div>

      </div>


      <div class="col-md-6 mt-4 mt-md-0">

        <span class="badge category-badge mb-3">
          {{ product.category }}
        </span>


        <h1 class="product-title">
          {{ product.title }}
        </h1>


        <h5 class="brand">
          {{ product.brand }}
        </h5>


        <div class="rating">
          ⭐ {{ product.rating }}
        </div>


        <hr class="divider">


        <div class="mb-3">

          <span class="info-label">
            Price
          </span>

          <div class="price">
            {{ formatPrice(product.price) }}
          </div>

        </div>


        <div class="mb-4">

          <span class="info-label">
            Availability
          </span>

          <p
            :class="
              product.stock === 0
                ? 'out-of-stock'
                : 'stock'
            "
          >
            {{
              product.stock === 0
                ? "Out of stock"
                : `${product.stock} items available`
            }}
          </p>

        </div>


        <div class="mb-4">

          <h5 class="section-title">
            Description
          </h5>

          <p class="description">
            {{ product.description }}
          </p>

        </div>


        <div class="actions">

          <button
            class="btn cart-btn"
            @click="addToCart"
            :disabled="
              cartLoading ||
              product.stock === 0
            "
          >
            {{
              product.stock === 0
                ? "Out Of Stock"
                : cartLoading
                  ? "Adding..."
                  : isInCart
                    ? "Add Another To Cart"
                    : "Add To Cart"
            }}
          </button>


          <button
            class="btn wishlist-btn"
            :class="{ 'is-added': isAdded }"
            @click="addToWishlist"
            :disabled="
              isAdded ||
              wishlistLoading
            "
          >
            {{
              isAdded
                ? "Added To Wishlist"
                : wishlistLoading
                  ? "Adding..."
                  : "Add To Wishlist"
            }}
          </button>


          <button
            class="btn back-btn"
            @click="goBack"
          >
            Back
          </button>

        </div>

      </div>

    </div>


    <div
      v-else
      class="text-center not-found"
    >

      <h3>
        Product not found
      </h3>

      <p class="empty-text">
        The product you're looking for doesn't exist.
      </p>

      <router-link
        to="/"
        class="btn back-btn mt-3"
      >
        Back Home
      </router-link>

    </div>

  </MainComponents>
</template>


<script>
import api from "../api/axios";

import products from "../data/products.js";

import MainComponents from "../mainComponents/MainComponents.vue";

import { formatPrice } from "../utils/format";

import { showToast } from "../utils/toast";


export default {

  name: "ProductDetails",


  components: {
    MainComponents
  },


  emits: [
    "cart-updated"
  ],


  data() {

    return {

      product: null,

      wishlist: [],

      cart: [],

      wishlistLoading: false,

      cartLoading: false

    };

  },


  computed: {

    isAdded() {

      return this.wishlist.some(
        item =>
          Number(item.productId) ===
          Number(this.product?.id)
      );

    },


    isInCart() {

      return this.cart.some(
        item =>
          Number(item.productId) ===
          Number(this.product?.id)
      );

    }

  },


  async mounted() {

    const id =
      Number(this.$route.params.id);


    this.product =
      products.find(
        product =>
          Number(product.id) === id
      );


    if (!this.product) {
      return;
    }


    await Promise.all([
      this.getWishlist(),
      this.getCart()
    ]);

  },


  methods: {

    goBack() {

      if (
        window.history.state &&
        window.history.state.back
      ) {

        this.$router.back();

      } else {

        this.$router.push("/");

      }

    },


    async getWishlist() {

      try {

        const response =
          await api.get("/wishlist");


        this.wishlist =
          response.data;

      } catch (error) {

        console.error(
          "Error getting wishlist:",
          error
        );

        showToast(
          "Failed to load wishlist.",
          "error"
        );

      }

    },


    async addToWishlist() {

      if (
        !this.product ||
        this.isAdded ||
        this.wishlistLoading
      ) {
        return;
      }


      this.wishlistLoading = true;


      try {

        await api.post(
          "/wishlist",
          {
            productId:
              this.product.id
          }
        );


        await this.getWishlist();


        showToast(
          "Product added to wishlist."
        );

      } catch (error) {

        console.error(
          "Error adding product to wishlist:",
          error
        );


        showToast(
          "Failed to add product to wishlist.",
          "error"
        );

      } finally {

        this.wishlistLoading = false;

      }

    },


    async getCart() {

      try {

        const response =
          await api.get("/cart");


        this.cart =
          response.data;

      } catch (error) {

        console.error(
          "Error getting cart:",
          error
        );

        showToast(
          "Failed to load cart.",
          "error"
        );

      }

    },


    async addToCart() {

      if (
        !this.product ||
        this.cartLoading ||
        this.product.stock === 0
      ) {
        return;
      }


      this.cartLoading = true;


      try {

        const existingItem =
          this.cart.find(
            item =>
              Number(item.productId) ===
              Number(this.product.id)
          );


        if (existingItem) {

          const currentQuantity =
            Number(existingItem.quantity) || 0;


          const newQuantity =
            currentQuantity + 1;


          if (newQuantity > this.product.stock) {

            showToast(
              "No more stock available.",
              "error"
            );

            return;

          }


          await api.patch(
            `/cart/${existingItem.id}`,
            {
              quantity: newQuantity
            }
          );


          showToast(
            "Cart quantity increased."
          );

        }

        else {

          await api.post(
            "/cart",
            {
              productId:
                this.product.id,

              quantity: 1
            }
          );


          showToast(
            "Product added to cart."
          );

        }


        await this.getCart();


        this.$emit(
          "cart-updated"
        );

      } catch (error) {

        console.error(
          "Error adding product to cart:",
          error
        );


        showToast(
          "Failed to add product to cart.",
          "error"
        );

      } finally {

        this.cartLoading = false;

      }

    },


    formatPrice

  }

};
</script>


<style scoped>

.image-box {

  height: 440px;
  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;

}


.product-image {

  width: 100%;
  height: 100%;
  object-fit: contain;

}


.category-badge {

  background-color: var(--bg-surface-alt);
  color: var(--text-secondary);
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

}


.product-title {

  color: var(--text-heading);
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 8px;

}


.brand {

  color: var(--text-secondary);
  font-weight: 500;

}


.rating {

  margin-top: 14px;
  color: var(--text-primary);

}


.divider {

  border-color: var(--border-color);

}


.info-label {

  color: var(--text-secondary);
  font-size: 13px;

}


.price {

  color: var(--accent);
  font-size: 27px;
  font-weight: 700;
  margin-top: 3px;

}


.stock {

  color: var(--success);
  font-weight: 500;
  margin-top: 5px;

}


.out-of-stock {

  color: var(--danger);
  font-weight: 500;
  margin-top: 5px;

}


.section-title {

  color: var(--text-heading);
  font-weight: 600;

}


.description {

  color: var(--text-secondary);
  line-height: 1.7;

}


.actions {

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

}


.btn {

  border-radius: 8px;
  font-weight: 500;

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);

}


.cart-btn {

  background-color: var(--accent);
  border: 0.5px solid var(--accent);
  color: #ffffff;

}

.cart-btn:hover:not(:disabled) {

  background-color: var(--accent-hover);
  border-color: var(--accent-hover);

}

.cart-btn:disabled {

  opacity: 0.6;
  cursor: not-allowed;

}


.wishlist-btn {

  background-color: transparent;
  border: 0.5px solid var(--border-color);
  color: var(--text-primary);

}

.wishlist-btn:hover:not(:disabled) {

  border-color: var(--accent);
  color: var(--accent);

}

.wishlist-btn.is-added {

  background-color: var(--success);
  border-color: var(--success);
  color: #ffffff;

}

.wishlist-btn:disabled {

  cursor: not-allowed;

}


.back-btn {

  background-color: var(--text-heading);
  border: 0.5px solid var(--text-heading);
  color: var(--bg-surface);

}

.back-btn:hover {

  background-color: var(--accent);
  border-color: var(--accent);
  color: #ffffff;

}


.not-found {

  padding: 80px 20px;
  color: var(--text-primary);

}


.empty-text {

  color: var(--text-secondary);

}


@media (max-width: 576px) {

  .product-title {
    font-size: 28px;
  }

  .image-box {
    height: 340px;
  }

  .actions .btn {
    width: 100%;
  }

}

</style>