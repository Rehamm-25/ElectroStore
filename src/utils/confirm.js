import { reactive } from "vue";


const state = reactive({
  show: false,
  title: "",
  message: "",
  confirmText: "Remove",
  resolve: null
});

export function openConfirm({
  title,
  message,
  confirmText = "Remove"
}) {

  state.title = title;
  state.message = message;
  state.confirmText = confirmText;
  state.show = true;

  return new Promise((resolve) => {

    state.resolve = resolve;

  });

}

export function confirmYes() {

  state.show = false;

  if (state.resolve) {
    state.resolve(true);
  }

}

export function confirmNo() {

  state.show = false;

  if (state.resolve) {
    state.resolve(false);
  }

}

export default state;