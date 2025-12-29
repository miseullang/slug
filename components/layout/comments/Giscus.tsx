"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useThemeMode } from "@/lib/useThemeMode";

export default function Giscus() {
  const { isDarkMode } = useThemeMode();
  const theme = isDarkMode ? "dark_dimmed" : "light";

  const syncTheme = () => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (!iframe) return false;
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      "https://giscus.app"
    );
    return true;
  };

  useEffect(() => {
    if (syncTheme()) {
      return;
    }

    const observer = new MutationObserver(() => {
      if (syncTheme()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [theme]);

  return (
    <section className="mt-16 w-full">
      <div className="giscus" />
      <Script
        src="https://giscus.app/client.js"
        strategy="lazyOnload"
        data-repo="miseullang/slug"
        data-repo-id="R_kgDOQIQN2g"
        data-category="Announcements"
        data-category-id="DIC_kwDOQIQN2s4C0Wfs"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme={theme}
        data-lang="ko"
        data-loading="lazy"
        crossOrigin="anonymous"
        async
        onLoad={syncTheme}
      />
    </section>
  );
}
