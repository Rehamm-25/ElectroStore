<template>
  <div
    v-if="modalState.show"
    class="modal-overlay"
    @click.self="cancel"
  >

    <div class="remove-modal">

      <div class="modal-icon">
        !
      </div>


      <h4>
        {{ modalState.title }}
      </h4>

      <p>
        {{ modalState.message }}
      </p>


      <div class="modal-actions">

        <button
          class="btn btn-cancel"
          @click="cancel"
        >
          Cancel
        </button>


        <button
          class="btn btn-confirm"
          @click="confirm"
        >
          {{ modalState.confirmText }}
        </button>

      </div>

    </div>

  </div>
</template>


<script>
import modalState, {
  confirmYes,
  confirmNo
} from "../utils/confirm";


export default {

  name: "ConfirmModal",


  computed: {

    modalState() {

      return modalState;

    }

  },


  methods: {

    confirm() {

      confirmYes();

    },


    cancel() {

      confirmNo();

    }

  }

};
</script>


<style scoped>

.modal-overlay {

  position: fixed;
  inset: 0;
  z-index: 4000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  background-color: rgba(15, 23, 42, 0.55);

}


.remove-modal {

  width: 100%;
  max-width: 400px;
  padding: 28px;

  background-color: var(--bg-surface);
  border: 0.5px solid var(--border-color);
  border-radius: 16px;
  text-align: center;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);

  animation: modal-show 0.2s ease;

}


@keyframes modal-show {

  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }

}


.modal-icon {

  width: 46px;
  height: 46px;
  margin: 0 auto 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: var(--bg-surface-alt);
  color: var(--danger);

  font-size: 20px;
  font-weight: 700;

}


.remove-modal h4 {

  margin-bottom: 10px;
  color: var(--text-heading);
  font-weight: 600;

}


.remove-modal p {

  margin-bottom: 24px;
  color: var(--text-secondary);
  line-height: 1.6;

}


.modal-actions {

  display: flex;
  justify-content: center;
  gap: 10px;

}


.btn {

  min-width: 100px;
  border-radius: 8px;

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);

}


.btn-cancel {

  background-color: transparent;
  border: 0.5px solid var(--border-color);
  color: var(--text-primary);

}

.btn-cancel:hover {

  border-color: var(--border-hover);

}


.btn-confirm {

  background-color: var(--danger);
  border: 0.5px solid var(--danger);
  color: #ffffff;

}

.btn-confirm:hover {

  opacity: 0.9;

}


@media (max-width: 576px) {

  .remove-modal {
    padding: 24px 20px;
  }

}

</style>