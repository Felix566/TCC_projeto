import bus from "../utils/bus";

export default function useFlashMessage() {
  function setFlashMessage(mgs, type) {
    bus.emit("flash", {
      message: mgs,
      type: type,
    });
  }

  return { setFlashMessage };
}
