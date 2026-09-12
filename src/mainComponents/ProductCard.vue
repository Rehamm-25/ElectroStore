<template>
  <div
    class="card h-100 product-card"
    :class="{
      'expensive-product': product.price > 3000
    }"
  >

    <div class="image-wrap">
      <img
        :src="product.image"
        :alt="product.title"
        class="card-img-top product-image"
      />
    </div>


    <div class="card-body d-flex flex-column">

      <span class="badge category-badge mb-2 align-self-start">
        {{ product.category }}
      </span>


      <h5 class="card-title">
        {{ product.title }}
      </h5>


      <p class="brand-text mb-1">
        {{ product.brand }}
      </p>


      <p class="rating-text mb-2">
        ⭐ {{ product.rating }}
      </p>


      <p class="card-text description-text">
        {{ product.description }}
      </p>


      <p class="price-text">
        {{ formatPrice(product.price) }}
      </p>


      <p
        class="stock-text mb-3"
        :class="{ 'out': product.stock === 0 }"
      >
        {{
          product.stock === 0
            ? "Out of stock"
            : `${product.stock} items available`
        }}
      </p>


      <div class="mt-auto d-flex flex-wrap gap-2">

        <router-link
          :to="`/product/${product.id}`"
          class="btn btn-details"
        >
          Details
        </router-link>


        <button
          class="btn btn-wishlist"
          :class="{ 'is-added': isAdded(product.id) }"
          @click="addToWishlist"
          :disabled="
            isAdded(product.id) ||
            wishlistLoading
          "
        >
          {{
            isAdded(product.id)
              ? "Added"
              : wishlistLoading
                ? "Adding..."
                : "Add To Wishlist"
          }}
        </button>


        <button
          class="btn btn-cart"
          :class="{ 'is-in-cart': isInCart(product.id) }"
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
                : isInCart(product.id)
                  ? "In Cart"
                  : "Add To Cart"
          }}
        </button>

      </div>

    </div>

  </div>
</template>


<script>
import api from "../api/axios";
import { formatPrice } from "../utils/format";
import { showToast } from "../utils/toast";

export default {

  name: "ProductCard",


  props: {

    product: {
      type: Object,
      required: true
    },

    wishlist: {
      type: Array,
      default: () => []
    },

    cart: {
      type: Array,
      default: () => []
    }

  },


  emits: [
    "wishlist-updated",
    "cart-updated"
  ],


  data() {

    return {

      wishlistLoading: false,
      cartLoading: false

    };

  },


  methods: {

    isAdded(id) {

      return this.wishlist.some(
        item =>
          Number(item.productId) ===
          Number(id)
      );

    },


    async addToWishlist() {

      if (
        this.isAdded(this.product.id) ||
        this.wishlistLoading
      ) {
        return;
      }


      this.wishlistLoading = true;


      try {

        await api.post(
          "/wishlist",
          {
            productId: this.product.id
          }
        );


        showToast(
          "Product added to wishlist."
        );


        this.$emit(
          "wishlist-updated"
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


    isInCart(id) {

      return this.cart.some(
        item =>
          Number(item.productId) ===
          Number(id)
      );

    },


    async addToCart() {

      if (
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
              productId: this.product.id,
              quantity: 1
            }
          );


          showToast(
            "Product added to cart."
          );

        }


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

.product-card {

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;

  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);

}


.product-card:hover {

  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);

}


.image-wrap {

  background-color: var(--bg-surface-alt);
  transition: background-color var(--transition-base);

}


.product-image {

  height: 220px;
  object-fit: contain;
  padding: 22px;

}


.card-body {

  padding: 20px;

}


.category-badge {

  background-color: var(--bg-surface-alt);
  color: var(--text-secondary);
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;

}


.card-title {

  color: var(--text-heading);
  font-weight: 700;
  font-size: 16px;
  min-height: 44px;

}


.brand-text {

  color: var(--text-secondary);
  font-size: 14px;

}


.rating-text {

  color: var(--text-primary);
  font-size: 14px;

}


.description-text {

  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.6;

}


.price-text {

  color: var(--text-heading);
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 6px;

}


.stock-text {

  color: var(--success);
  font-size: 13px;
  font-weight: 500;

}


.stock-text.out {

  color: var(--danger);

}


/* ===== Buttons ===== */

.btn {

  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);

}


.btn-details {

  background-color: var(--text-heading);
  border: 0.5px solid var(--text-heading);
  color: var(--bg-surface);

}

.btn-details:hover {

  background-color: var(--accent);
  border-color: var(--accent);
  color: #ffffff;

}


.btn-wishlist {

  background-color: transparent;
  border: 0.5px solid var(--border-color);
  color: var(--text-primary);

}

.btn-wishlist:hover:not(:disabled) {

  border-color: var(--accent);
  color: var(--accent);

}

.btn-wishlist.is-added {

  background-color: var(--success);
  border-color: var(--success);
  color: #ffffff;

}


.btn-cart {

  background-color: var(--accent);
  border: 0.5px solid var(--accent);
  color: #ffffff;

}

.btn-cart:hover:not(:disabled) {

  background-color: var(--accent-hover);
  border-color: var(--accent-hover);

}

.btn-cart.is-in-cart {

  background-color: var(--bg-surface-alt);
  border-color: var(--border-color);
  color: var(--text-secondary);

}

.btn:disabled {

  opacity: 0.6;
  cursor: not-allowed;

}


.expensive-product {

  border-top: 3px solid var(--accent);

}

</style>