"use client";

type Theme = "light" | "dark" | "system";

declare global {
  interface Window {
    __theme: Theme;
    __onThemeChange: (theme: Theme) => void;
    __setPreferredTheme: (theme: Theme) => void;
  }
}

const code = function code() {
  window.__onThemeChange = function () {};

  function applyTheme(theme: Theme) {
    let actualTheme = theme;
    if (theme === "system") {
      actualTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    window.__theme = theme;
    document.documentElement.dataset.theme = actualTheme;
    document.documentElement.setAttribute("color-scheme", actualTheme);

    window.__onThemeChange(theme);
  }

  function isValidTheme(theme: any): theme is Theme {
    return theme === "light" || theme === "dark" || theme === "system";
  }

  let preferredTheme: Theme | null = null;

  try {
    const storedTheme = localStorage.getItem("theme");
    if (isValidTheme(storedTheme)) {
      preferredTheme = storedTheme;
    }
  } catch (err) {}

  window.__setPreferredTheme = function (newTheme: Theme) {
    applyTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (err) {}
  };

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkQuery.addEventListener("change", function () {
    if (window.__theme === "system") {
      applyTheme("system");
    }
  });

  // 사용자 설정이 없으면 기본적으로 "system" 모드를 적용
  applyTheme(preferredTheme || "system");
};

/**
 * 브라우저의 다크모드를 지원하는 스크립트
 * script는 랜더링 차단 요소로 동작하므로 다크모드를 보장함
 */
export default function ThemeScript({ nonce }: { nonce: string }) {
  return <></>;
  // return <script id="theme-script" nonce={nonce} dangerouslySetInnerHTML={{ __html: `(${code})();` }} />;
}
