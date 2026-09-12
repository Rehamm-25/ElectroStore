<template>
  <MainComponents>

    <div class="text-center mb-5">
      <h1 class="cart-title">
        Shopping Cart
      </h1>

      <p class="cart-subtitle">
        Review your selected products
      </p>
    </div>


    <div
      v-if="cart.length === 0"
      class="empty-cart text-center"
    >
      <div class="empty-icon">
        🛒
      </div>

      <h3>
        Your cart is empty
      </h3>

      <p class="empty-text">
        Add some products to your cart first.
      </p>

      <router-link
        to="/"
        class="btn btn-browse"
      >
        Browse Products
      </router-link>
    </div>


    <div v-else>

      <div
        v-for="item in cart"
        :key="item.id"
        class="cart-item mb-3"
      >

        <div class="row align-items-center g-3">

          <div class="col-md-2">
            <img
              :src="getProduct(item.productId)?.image"
              :alt="getProduct(item.productId)?.title"
              class="cart-image"
            />
          </div>


          <div class="col-md-3">

            <h5 class="product-title">
              {{ getProduct(item.productId)?.title }}
            </h5>

            <p class="brand-text mb-0">
              {{ getProduct(item.productId)?.brand }}
            </p>

          </div>


          <div class="col-md-2">

            <span class="label-text">
              Price
            </span>

            <div class="value-text">
              {{
                formatPrice(
                  getProduct(item.productId)?.price || 0
                )
              }}
            </div>

          </div>


          <div class="col-md-2">

            <span class="label-text">
              Quantity
            </span>

            <div class="quantity-box">

              <button
                class="quantity-btn"
                @click="decreaseQuantity(item)"
                :disabled="
                  updatingItemId !== null ||
                  item.quantity <= 1
                "
              >
                −
              </button>


              <span class="quantity">
                {{ item.quantity }}
              </span>


              <button
                class="quantity-btn"
                @click="increaseQuantity(item)"
                :disabled="
                  updatingItemId !== null ||
                  item.quantity >=
                    (getProduct(item.productId)?.stock || 0)
                "
              >
                +
              </button>

            </div>

          </div>


          <div class="col-md-2">

            <span class="label-text">
              Total
            </span>

            <div class="value-text">
              {{
                formatPrice(
                  (getProduct(item.productId)?.price || 0) *
                  Number(item.quantity || 0)
                )
              }}
            </div>

          </div>


          <div class="col-md-1">

            <button
              class="btn btn-remove"
              @click="openRemoveModal(item)"
              :disabled="removing"
            >
              Remove
            </button>

          </div>

        </div>

      </div>


      <div class="cart-summary">

        <div class="d-flex justify-content-between mb-3">
          <span class="summary-label">Items</span>
          <strong class="summary-value">{{ totalItems }}</strong>
        </div>


        <div class="d-flex justify-content-between mb-3">
          <span class="summary-label">Subtotal</span>
          <strong class="summary-value">{{ formatPrice(subtotal) }}</strong>
        </div>


        <hr class="summary-divider" />


        <div class="d-flex justify-content-between total-row">
          <span>Total</span>
          <strong>{{ formatPrice(subtotal) }}</strong>
        </div>


        <button
          class="btn btn-checkout"
          @click="handleCheckout"
        >
          Checkout
        </button>

      </div>

    </div>

  </MainComponents>
</template>


<script>
import api from "../api/axios";
import products from "../data/products.js";
import MainComponents from "../mainComponents/MainComponents.vue";
import { formatPrice } from "../utils/format";
import { showToast } from "../utils/toast";
import { openConfirm } from "../utils/confirm";

export default {

  name: "CartView",


  components: {
    MainComponents
  },


  emits: [
    "cart-updated"
  ],


  data() {

    return {

      products: products,

      cart: [],

      removing: false,

      updatingItemId: null

    };

  },


  computed: {

    totalItems() {

      return this.cart.reduce(
        (total, item) =>
          total + Number(item.quantity || 0),
        0
      );

    },


    subtotal() {

      return this.cart.reduce(
        (total, item) => {

          const product =
            this.getProduct(
              item.productId
            );

          return (
            total +
            (product?.price || 0) *
            Number(item.quantity || 0)
          );

        },
        0
      );

    }

  },


  mounted() {

    this.getCart();

  },


  methods: {

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


    getProduct(productId) {

      return this.products.find(
        product =>
          Number(product.id) ===
          Number(productId)
      );

    },


    async increaseQuantity(item) {

      const product =
        this.getProduct(
          item.productId
        );


      if (
        this.updatingItemId !== null ||
        item.quantity >= (product?.stock || 0)
      ) {
        return;
      }


      this.updatingItemId = item.id;


      try {

        const newQuantity =
          Number(item.quantity) + 1;


        await api.patch(
          `/cart/${item.id}`,
          {
            quantity: newQuantity
          }
        );


        await this.getCart();


        this.$emit(
          "cart-updated"
        );

      } catch (error) {

        console.error(
          "Error updating quantity:",
          error
        );

        showToast(
          "Failed to update quantity.",
          "error"
        );

      } finally {

        this.updatingItemId = null;

      }

    },


    async decreaseQuantity(item) {

      if (
        Number(item.quantity) <= 1 ||
        this.updatingItemId !== null
      ) {
        return;
      }


      this.updatingItemId = item.id;


      try {

        const newQuantity =
          Number(item.quantity) - 1;


        await api.patch(
          `/cart/${item.id}`,
          {
            quantity: newQuantity
          }
        );


        await this.getCart();


        this.$emit(
          "cart-updated"
        );

      } catch (error) {

        console.error(
          "Error updating quantity:",
          error
        );

        showToast(
          "Failed to update quantity.",
          "error"
        );

      } finally {

        this.updatingItemId = null;

      }

    },


    async openRemoveModal(item) {

      const product =
        this.getProduct(
          item.productId
        );


      const confirmed =
        await openConfirm({
          title: "Remove from cart?",
          message: `Are you sure you want to remove ${product?.title || "this product"} from your cart?`,
          confirmText: "Remove"
        });


      if (!confirmed) {
        return;
      }


      this.removing = true;


      try {

        await api.delete(
          `/cart/${item.id}`
        );


        await this.getCart();


        this.$emit(
          "cart-updated"
        );


        showToast(
          "Product removed from cart."
        );

      } catch (error) {

        console.error(
          "Error removing product:",
          error
        );

        showToast(
          "Failed to remove product.",
          "error"
        );

      } finally {

        this.removing = false;

      }

    },


    handleCheckout() {

      showToast(
        "Checkout is coming soon!"
      );

    },


    formatPrice

  }

};
</script>


<style scoped>

.cart-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--text-heading);
}

.cart-subtitle {
  color: var(--text-secondary);
  font-size: 17px;
}


.empty-cart {

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  padding: 60px 20px;
  border-radius: 14px;

}


.empty-icon {

  font-size: 48px;
  margin-bottom: 15px;

}


.empty-text {

  color: var(--text-secondary);

}


.btn-browse {

  background-color: var(--text-heading);
  border: 0.5px solid var(--text-heading);
  color: var(--bg-surface);
  border-radius: 8px;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);

}

.btn-browse:hover {

  background-color: var(--accent);
  border-color: var(--accent);
  color: #ffffff;

}


.cart-item {

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  padding: 18px 20px;
  border-radius: 12px;

  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base);

}

.cart-item:hover {

  border-color: var(--border-hover);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);

}


.product-title {

  color: var(--text-heading);
  font-weight: 600;
  font-size: 15px;

}


.brand-text {

  color: var(--text-secondary);
  font-size: 13px;

}


.cart-image {

  width: 100%;
  height: 110px;
  object-fit: contain;
  background-color: var(--bg-surface-alt);
  border-radius: 10px;
  padding: 10px;

}


.label-text {

  color: var(--text-secondary);
  font-size: 12px;

}

.value-text {

  color: var(--text-heading);
  font-weight: 600;
  font-size: 14px;

}


.quantity-box {

  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;

}


.quantity-btn {

  width: 30px;
  height: 30px;
  border: 0.5px solid var(--border-color);
  border-radius: 7px;
  background-color: transparent;
  color: var(--text-primary);
  font-size: 18px;
  cursor: pointer;

  transition:
    border-color var(--transition-fast),
    color var(--transition-fast);

}

.quantity-btn:hover:not(:disabled) {

  border-color: var(--accent);
  color: var(--accent);

}

.quantity-btn:disabled {

  opacity: 0.45;
  cursor: not-allowed;

}


.quantity {

  min-width: 20px;
  text-align: center;
  font-weight: 600;
  color: var(--text-primary);

}


.btn-remove {

  background-color: transparent;
  border: 0.5px solid var(--danger);
  color: var(--danger);
  border-radius: 7px;
  font-size: 12px;

  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);

}

.btn-remove:hover:not(:disabled) {

  background-color: var(--danger);
  color: #ffffff;

}


.cart-summary {

  max-width: 440px;
  margin-left: auto;
  margin-top: 30px;

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  padding: 24px;
  border-radius: 14px;

}


.summary-label {

  color: var(--text-secondary);

}

.summary-value {

  color: var(--text-primary);

}

.summary-divider {

  border-color: var(--border-color);

}


.total-row {

  font-size: 19px;
  color: var(--text-heading);

}


.btn-checkout {

  width: 100%;
  margin-top: 18px;
  height: 46px;

  background-color: var(--accent);
  border: none;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 500;

  transition: background-color var(--transition-fast);

}

.btn-checkout:hover {

  background-color: var(--accent-hover);

}


@media (max-width: 576px) {

  .cart-summary {
    margin-left: 0;
    max-width: 100%;
  }

}

</style>