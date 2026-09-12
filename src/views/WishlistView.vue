<template>
  <MainComponents>

    <h1 class="wishlist-title text-center mb-5">
      My Wishlist
    </h1>


    <div
      v-if="wishlist.length === 0"
      class="text-center empty-wishlist"
    >

      <div class="empty-icon">
        ♡
      </div>

      <h4>
        Your wishlist is empty.
      </h4>

      <p class="empty-text">
        Save your favorite products here.
      </p>

      <router-link
        to="/"
        class="btn btn-browse mt-2"
      >
        Browse Products
      </router-link>

    </div>


    <div
      v-else
      class="row g-4"
    >

      <div
        v-for="item in wishlist"
        :key="item.id"
        class="col-md-6 col-lg-4 col-xl-3"
      >

        <div class="card h-100 product-card">

          <div class="image-wrap">
            <img
              :src="getProduct(item.productId)?.image"
              :alt="getProduct(item.productId)?.title"
              class="card-img-top product-image"
            />
          </div>


          <div class="card-body d-flex flex-column">

            <span class="badge category-badge mb-2 align-self-start">
              {{ getProduct(item.productId)?.category }}
            </span>


            <h5 class="card-title">
              {{ getProduct(item.productId)?.title }}
            </h5>


            <p class="brand-text mb-2">
              {{ getProduct(item.productId)?.brand }}
            </p>


            <p class="rating-text mb-2">
              ⭐ {{ getProduct(item.productId)?.rating }}
            </p>


            <p class="price-text mb-3">
              {{
                formatPrice(
                  getProduct(item.productId)?.price || 0
                )
              }}
            </p>


            <div class="mt-auto d-flex flex-wrap gap-2">

              <router-link
                :to="`/product/${item.productId}`"
                class="btn btn-details"
              >
                Details
              </router-link>


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

  name: "WishlistView",


  components: {
    MainComponents
  },


  data() {

    return {

      products: products,

      wishlist: [],

      removing: false

    };

  },


  mounted() {

    this.getWishlist();

  },


  methods: {

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


    getProduct(productId) {

      return this.products.find(

        product =>
          Number(product.id) ===
          Number(productId)

      );

    },


    async openRemoveModal(item) {

      const product =
        this.getProduct(
          item.productId
        );


      const confirmed =
        await openConfirm({
          title: "Remove from wishlist?",
          message: `Are you sure you want to remove ${product?.title || "this product"} from your wishlist?`,
          confirmText: "Remove"
        });


      if (!confirmed) {
        return;
      }


      this.removing = true;


      try {

        await api.delete(
          `/wishlist/${item.id}`
        );


        await this.getWishlist();


        showToast(
          "Product removed from wishlist."
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


    formatPrice

  }

};

</script>


<style scoped>

.wishlist-title {

  color: var(--text-heading);
  font-weight: 700;
  font-size: 34px;

}


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

}


.product-image {

  height: 240px;
  object-fit: contain;
  padding: 20px;

}


.category-badge {

  background-color: var(--bg-surface-alt);
  color: var(--text-secondary);
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

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


.price-text {

  color: var(--text-heading);
  font-weight: 700;
  font-size: 17px;

}


.empty-wishlist {

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  padding: 60px 20px;
  border-radius: 14px;

}


.empty-icon {

  font-size: 52px;
  color: var(--text-secondary);
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


.btn-details {

  background-color: var(--text-heading);
  border: 0.5px solid var(--text-heading);
  color: var(--bg-surface);
  border-radius: 8px;
  font-size: 13px;

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);

}

.btn-details:hover {

  background-color: var(--accent);
  border-color: var(--accent);
  color: #ffffff;

}


.btn-remove {

  background-color: transparent;
  border: 0.5px solid var(--danger);
  color: var(--danger);
  border-radius: 8px;
  font-size: 13px;

  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);

}

.btn-remove:hover:not(:disabled) {

  background-color: var(--danger);
  color: #ffffff;

}

</style>