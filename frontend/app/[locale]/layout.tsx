import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // 直接读取params，无需await
  const { locale } = await params;
  
  // SEO优化：标题包含全球关键词
  const titles: Record<string, string> = {
    en: 'PDF Tools Global - Professional PDF Tools Online | USA, China, Hong Kong, UK',
    zh: 'PDF工具全球站 - 专业级PDF工具在线使用 | 美国、中国、香港、英国用户首选',
  };

  const descriptions: Record<string, string> = {
    en: 'The world\'s leading free PDF processor. Merge, split, convert, compress, and secure PDFs. Serving users in USA, China, Hong Kong, UK, Canada, Singapore. No registration required.',
    zh: '全球领先的免费PDF处理器。合并、分割、转换、压缩、加密PDF。为美国、中国、香港、英国、加拿大、新加坡等全球用户服务。无需注册，完全免费。',
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      'free PDF tools',
      'PDF merger',
      'PDF converter',
      'compress PDF',
      'split PDF',
      'PDF to Word',
      'Word to PDF',
      'JPG to PDF',
      'USA PDF tools',
      'China PDF tools',
      'Hong Kong PDF tools',
      'UK PDF tools',
      'Canada PDF tools',
      'Singapore PDF tools',
    ],
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 验证语言是否支持
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // 获取翻译消息
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
