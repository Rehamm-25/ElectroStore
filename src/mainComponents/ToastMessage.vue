<template>
  <Transition name="toast">
    <div
      v-if="toastState.message"
      class="toast-message"
      :class="`toast-${toastState.type}`"
    >
      <span class="toast-icon">
        {{
          toastState.type === "success"
            ? "✓"
            : "!"
        }}
      </span>

      <span>
        {{ toastState.message }}
      </span>
    </div>
  </Transition>
</template>


<script>
import toastState from "../utils/toast";


export default {

  name: "ToastMessage",


  computed: {

    toastState() {

      return toastState;

    }

  }

};
</script>


<style scoped>

.toast-message {

  position: fixed;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;

  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 260px;
  max-width: calc(100% - 30px);

  padding: 12px 20px;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;
  color: #ffffff;

  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);

}


.toast-success {

  background-color: var(--success);

}


.toast-error {

  background-color: var(--danger);

}


.toast-icon {

  width: 20px;
  height: 20px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);

  font-size: 12px;
  font-weight: 700;

}


.toast-enter-active,
.toast-leave-active {

  transition:
    opacity var(--transition-base),
    transform var(--transition-base);

}


.toast-enter-from,
.toast-leave-to {

  opacity: 0;
  transform: translate(-50%, -16px);

}


@media (max-width: 576px) {

  .toast-message {
    top: 80px;
    width: calc(100% - 30px);
    min-width: 0;
  }

}

</style>