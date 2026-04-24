import { useEffect } from "react";

export default function usePageTitle(baseTitle) {
  useEffect(() => {
    const originalTitle = baseTitle;
    let timeout;

    const handleVisibility = () => {
      if (document.hidden) {
        document.title = "🌿 ¡Te esperamos en Equilibria!";
      } else {
        document.title = originalTitle;
        clearTimeout(timeout);
      }
    };

    document.title = baseTitle;
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(timeout);
    };
  }, [baseTitle]);
}
