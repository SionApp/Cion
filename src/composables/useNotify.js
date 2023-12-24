import { Notify } from "quasar";

import { MESSAGES_NOTIFICATION as MESSAGES } from "../sources/const";

export default function useNotify() {
  //const $q = useQuasar();

  const notify = (type, message, timeout = 2000, icon = "", actions = []) => {
    if (!MESSAGES.hasOwnProperty(type)) {
      throw new Error(`Invalid type: ${type}`);
    }
    if (typeof icon !== "string") {
      throw new Error(`Invalid icon: ${icon}`);
    }
    if (
      !Array.isArray(actions) ||
      actions.some(
        (action) =>
          typeof action !== "object" ||
          !action.hasOwnProperty("label") ||
          !action.hasOwnProperty("color"),
      )
    ) {
      throw new Error("Invalid actions parameter");
    }
    Notify.create({
      type,
      message: message || MESSAGES[type],
      timeout,
      icon,
      actions: actions.length ? actions : [{ label: "Ok", color: "white" }],
    });
  };

  const notifySuccess = (message) => {
    notify("positive", message);
  };

  const notifyError = (message) => {
    notify("negative", message);
  };

  const notifyWarning = (message) => {
    notify("warning", message);
  };

  const notifyOngoing = (onMessage, message, type, delay = 3000) => {
    const notifyFn = (notificationType) => {
      if (!MESSAGES.hasOwnProperty(notificationType)) {
        throw new Error(`Invalid type: ${notificationType}`);
      }
      notify(notificationType, message || MESSAGES[notificationType]);
    };

    notifyFn("ongoing");

    setTimeout(() => {
      notifyFn(type);
    }, delay);
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyOngoing,
  };
}
