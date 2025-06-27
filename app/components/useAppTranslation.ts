"use client";
import { usePathname } from "next/navigation";
import en from "../../public/locales/en/common.json";
import zh from "../../public/locales/zh/common.json";
import hi from "../../public/locales/hi/common.json";
import ne from "../../public/locales/ne/common.json";

const enDict = en as { [key: string]: string };
const zhDict = zh as { [key: string]: string };
const hiDict = hi as { [key: string]: string };
const neDict = ne as { [key: string]: string };

export function useAppTranslation() {
  const pathname = usePathname();
  // Detect lang from the first path segment
  const lang = pathname?.split("/")[1];
  let dict = enDict;
  if (lang === "zh") dict = zhDict;
  else if (lang === "hi") dict = hiDict;
  else if (lang === "ne") dict = neDict;
  const t = (key: string) => dict[key] || key;
  return { t, lang };
} 