import { useEffect, useRef } from "react";

const QuizSecurity = ({ hasStarted, isSubmitted, onAutoSubmit }) => {
  const submittedRef = useRef(false);

  const autoSubmit = (reason) => {
    if (submittedRef.current || isSubmitted) return;
    submittedRef.current = true;

    alert(`Quiz auto-submitted: ${reason}`);
    onAutoSubmit(reason);
  };

  useEffect(() => {
    if (!hasStarted || isSubmitted) return;

    /* TAB SWITCH / MINIMIZE */
    const handleVisibilityChange = () => {
      if (document.hidden) {
        autoSubmit("Tab switched or screen minimized");
      }
    };

    const handleBlur = () => {
      autoSubmit("Window lost focus");
    };

    /* COPY / PASTE / RIGHT CLICK */
    const preventAction = (e) => e.preventDefault();
    const disableRightClick = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    document.addEventListener("copy", preventAction);
    document.addEventListener("paste", preventAction);
    document.addEventListener("cut", preventAction);
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);

      document.removeEventListener("copy", preventAction);
      document.removeEventListener("paste", preventAction);
      document.removeEventListener("cut", preventAction);
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasStarted, isSubmitted]);

  return null;
};

export default QuizSecurity;