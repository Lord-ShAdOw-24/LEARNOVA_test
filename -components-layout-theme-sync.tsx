import { useEffect } from "react";
import { resolveSeason } from "./-lib-season.ts";
import { useLearnova } from "./-lib-store.ts";

export function ThemeSync() {
  const theme = useLearnova((s) => s.theme);
  const seasonal = useLearnova((s) => s.seasonalPreview);
  const reduced = useLearnova((s) => s.reducedMotion);

  useEffect(() => {
    const apply = () => {
      const dark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", dark);
      document.documentElement.dataset.season = resolveSeason(seasonal);
      document.documentElement.dataset.reduced = reduced ? "true" : "false";
    };
    apply();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme, seasonal, reduced]);

  return null;
}
