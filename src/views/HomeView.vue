<template>
  <MainComponents>

    <div class="text-center mb-5">
      <h1 class="home-title">
        Electronics Store
      </h1>

      <p class="home-subtitle">
        Find the best electronics for you
      </p>
    </div>


    <div class="filters-box mb-5">

      <div class="row g-3">

        <div class="col-md-5">
          <input
            v-model="search"
            type="text"
            class="form-control theme-input"
            placeholder="Search products..."
          />
        </div>


        <div class="col-md-3">
          <select
            v-model="selectedCategory"
            class="form-select theme-input"
          >
            <option value="">
              All Categories
            </option>

            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>


        <div class="col-md-4">
          <select
            v-model="sortOption"
            class="form-select theme-input"
          >
            <option value="">
              Sort Products
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rating
            </option>

            <option value="name">
              Name A-Z
            </option>
          </select>
        </div>

      </div>

    </div>


    <div class="row g-4">

      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="col-md-6 col-lg-4 col-xl-3"
      >

        <ProductCard
          :product="product"
          :wishlist="wishlist"
          :cart="cart"
          @wishlist-updated="getWishlist"
          @cart-updated="handleCartUpdated"
        />

      </div>

    </div>


    <div
      v-if="filteredProducts.length === 0"
      class="text-center mt-5 no-results"
    >
      <h4>No products found.</h4>
    </div>

  </MainComponents>
</template>


<script>
import api from "../api/axios";
import products from "../data/products.js";

import ProductCard from "../mainComponents/ProductCard.vue";
import MainComponents from "../mainComponents/MainComponents.vue";


export default {

  name: "HomeView",


  components: {
    ProductCard,
    MainComponents
  },


  emits: [
    "cart-updated"
  ],


  props: {
    cart: {
      type: Array,
      default: () => []
    }
  },


  data() {

    return {

      products: products,

      wishlist: [],

      search: "",

      selectedCategory: "",

      sortOption: ""

    };

  },


  computed: {

    categories() {

      return [
        ...new Set(
          this.products.map(
            product => product.category
          )
        )
      ];

    },


    filteredProducts() {

      let result = [...this.products];


      if (this.search.trim()) {

        const searchText =
          this.search
            .trim()
            .toLowerCase();

        result = result.filter(
          product =>
            product.title
              .toLowerCase()
              .includes(searchText)
            ||
            product.brand
              .toLowerCase()
              .includes(searchText)
            ||
            product.category
              .toLowerCase()
              .includes(searchText)
        );

      }


      if (this.selectedCategory) {

        result = result.filter(
          product =>
            product.category ===
            this.selectedCategory
        );

      }


      if (this.sortOption === "price-low") {

        result.sort(
          (a, b) => a.price - b.price
        );

      }

      if (this.sortOption === "price-high") {

        result.sort(
          (a, b) => b.price - a.price
        );

      }

      if (this.sortOption === "rating") {

        result.sort(
          (a, b) => b.rating - a.rating
        );

      }

      if (this.sortOption === "name") {

        result.sort(
          (a, b) =>
            a.title.localeCompare(b.title)
        );

      }


      return result;

    }

  },


  async mounted() {

    await this.getWishlist();

  },


  methods: {

    async getWishlist() {

      try {

        const response = await api.get("/wishlist");

        this.wishlist = response.data;

      } catch (error) {

        console.error(
          "Error getting wishlist:",
          error
        );

      }

    },


    handleCartUpdated() {

      this.$emit("cart-updated");

    }

  }

};
</script>


<style scoped>

.home-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--text-heading);
}

.home-subtitle {
  color: var(--text-secondary);
  font-size: 17px;
}


.filters-box {

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  padding: 20px;
  border-radius: 14px;
  transition: border-color var(--transition-base);

}


.theme-input {

  height: 46px;
  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-primary);

  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);

}

.theme-input:focus {

  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
  outline: none;
  color: var(--text-primary);
  background-color: var(--bg-surface);

}


.no-results {

  color: var(--text-secondary);

}

</style>