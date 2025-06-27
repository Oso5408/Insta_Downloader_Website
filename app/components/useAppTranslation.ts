"use client";
import { usePathname } from "next/navigation";
import en from "../../public/locales/en/common.json";
import zh from "../../public/locales/zh/common.json";
import hi from "../../public/locales/hi/common.json";

export function useAppTranslation() {
  const pathname = usePathname();
  // Detect lang from the first path segment
  const lang = pathname?.split("/")[1];
  let dict = en;
  if (lang === "zh") dict = zh;
  else if (lang === "hi") dict = hi;
  const t = (key: string) => dict[key] || key;
  return { t, lang };
} 