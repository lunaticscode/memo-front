import { useEffect } from "react";

const PWAInstallButton = () => {
  const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault();
  };
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  return <button>Install</button>;
};
export default PWAInstallButton;
