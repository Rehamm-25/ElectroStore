import {
  createRouter,
  createWebHistory
} from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProductDetails from "../views/ProductDetails.vue";
import WishlistView from "../views/WishlistView.vue";
import CartView from "../views/CartView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },

  {
    path: "/about",
    name: "about",
    component: AboutView
  },

  {
    path: "/product/:id",
    name: "product-details",
    component: ProductDetails
  },

  {
    path: "/wishlist",
    name: "wishlist",
    component: WishlistView
  },

  {
    path: "/cart",
    name: "cart",
    component: CartView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;