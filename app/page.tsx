import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Home() {
  const acceptLang = headers().get('accept-language');
  let target = '/en';
  if (acceptLang && acceptLang.toLowerCase().includes('zh')) {
    target = '/zh';
  }
  redirect(target);
  return null;
} 