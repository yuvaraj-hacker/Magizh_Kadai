import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "primereact/resources/themes/tailwind-light/theme.css";
export default function PrelineScript() {
  const path = useLocation();
  useEffect(() => {
    const loadPreline = async () => {
      await import("preline/preline");
      window.HSStaticMethods.autoInit();
    };
    loadPreline();
  }, [path]);
  return null;
}