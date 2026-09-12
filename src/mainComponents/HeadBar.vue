<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container">

      <router-link to="/" class="navbar-brand">
        Electro<span>Store</span>
      </router-link>


      <div class="nav-right-mobile">

        <!-- Dark Mode Toggle -->
        <button
          class="theme-toggle"
          @click="toggleTheme"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg
            v-if="isDark"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>

          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>


        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

      </div>


      <div
        id="navbarContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav ms-auto align-items-lg-center">

          <li class="nav-item">
            <router-link to="/" class="nav-link">
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              About
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/wishlist" class="nav-link">
              Wishlist
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/cart"
              class="nav-link cart-link"
              aria-label="Shopping cart"
            >
              <span>Cart</span>

              <span
                v-if="cartCount > 0"
                class="cart-badge"
              >
                {{ cartCount }}
              </span>
            </router-link>
          </li>


          <!-- Desktop Dark Mode Toggle -->
          <li class="nav-item desktop-toggle">
            <button
              class="theme-toggle"
              @click="toggleTheme"
              :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <svg
                v-if="isDark"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>

              <svg
                v-else
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </li>

        </ul>
      </div>

    </div>
  </nav>
</template>


<script>
export default {
  name: "HeadBar",

  props: {
    cart: {
      type: Array,
      default: () => []
    }
  },

  data() {

    return {

      isDark: false

    };

  },

  computed: {
    cartCount() {
      return this.cart.reduce(
        (total, item) =>
          total + Number(item.quantity || 0),
        0
      );
    }
  },

  mounted() {

    // NEW: استرجاع اختيار المستخدم السابق (لو موجود) من الجلسة السابقة
    const savedTheme =
      localStorage.getItem("theme");

    this.isDark =
      savedTheme === "dark";

    this.applyTheme();

  },

  methods: {

    // NEW: تبديل بين Light و Dark وحفظ الاختيار
    toggleTheme() {

      this.isDark = !this.isDark;

      localStorage.setItem(
        "theme",
        this.isDark ? "dark" : "light"
      );

      this.applyTheme();

    },


    applyTheme() {

      document.documentElement.setAttribute(
        "data-theme",
        this.isDark ? "dark" : "light"
      );

    }

  }
};
</script>


<style scoped>

.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1030;

  background-color: var(--bg-surface);
  border-bottom: 0.5px solid var(--border-color);
  padding: 14px 0;

  transition:
    background-color var(--transition-base),
    border-color var(--transition-base);
}


.navbar-brand {
  color: var(--text-heading);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.3px;
  transition: color var(--transition-fast);
}

.navbar-brand:hover {
  color: var(--text-heading);
}

.navbar-brand span {
  color: var(--accent);
}


.nav-link {
  position: relative;

  display: flex;
  align-items: center;
  gap: 7px;

  color: var(--text-secondary) !important;
  font-size: 15px;
  font-weight: 500;
  margin-left: 24px;
  padding: 8px 2px !important;

  transition: color var(--transition-fast);
}

/* NEW: underline animation عند الـ hover والـ active */
.nav-link::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent);
  transition: width var(--transition-base);
}

.nav-link:hover {
  color: var(--accent) !important;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active {
  color: var(--accent) !important;
}

.router-link-active::after {
  width: 100%;
}


.cart-badge {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 50px;
  background-color: var(--accent);
  color: var(--bg-surface);

  font-size: 11px;
  font-weight: 700;

  transition: background-color var(--transition-fast);
}


/* NEW: Dark Mode Toggle Button */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  border: 0.5px solid var(--border-color);
  border-radius: 8px;
  background-color: transparent;
  color: var(--text-secondary);

  cursor: pointer;

  transition:
    border-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);
}

.theme-toggle:hover {
  border-color: var(--border-hover);
  color: var(--accent);
  transform: rotate(15deg);
}


/* الزرار بتاع الديسكتوب مخفي على الموبايل، والعكس */
.desktop-toggle {
  margin-left: 24px;
}

.nav-right-mobile {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (min-width: 992px) {

  .nav-right-mobile .theme-toggle {
    display: none;
  }

}

@media (max-width: 991px) {

  .desktop-toggle {
    display: none;
  }

}


.navbar-toggler {
  border-color: var(--border-color);
}

.navbar-toggler:focus {
  box-shadow: none;
}

</style>