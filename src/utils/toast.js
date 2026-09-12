import { reactive } from "vue";

const state = reactive({
  message: "",
  type: "success"
});

let timer = null;

export function showToast(
  message,
  type = "success"
) {

  state.message = message;
  state.type = type;

  clearTimeout(timer);

  timer = setTimeout(() => {

    state.message = "";

  }, 3500);

}

export default state;