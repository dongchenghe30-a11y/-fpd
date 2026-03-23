'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FileText, Shield, Zap, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';

const footerLinks = {
  organize: [
    { key: 'merge', href: '/tools/merge' },
    { key: 'split', href: '/tools/split' },
    { key: 'compress', href: '/tools/compress' },
    { key: 'ocr', href: '/tools/ocr' },
  ],
  convert: [
    { key: 'jpgToPdf', href: '/tools/jpg-to-pdf' },
    { key: 'wordToPdf', href: '/tools/word-to-pdf' },
    { key: 'pdfToWord', href: '/tools/pdf-to-word' },
    { key: 'pdfToJpg', href: '/tools/pdf-to-jpg' },
  ],
  security: [
    { key: 'protect', href: '/tools/protect' },
    { key: 'unlock', href: '/tools/unlock' },
    { key: 'sign', href: '/tools/sign' },
    { key: 'redact', href: '/tools/redact' },
  ],
};

export default function Footer() {
  const t = useTranslations();
  const tFooter = useTranslations('footer');
  const pathname = usePathname();
  const locale = pathname.startsWith('/zh') ? 'zh' : 'en';

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                PDF Tools <span className="text-blue-400">Global</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">{tFooter('description')}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-400" />
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>180+ Countries</span>
              </div>
            </div>
          </div>

          {/* Organize */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">PDF工具</h3>
            <ul className="space-y-2">
              {footerLinks.organize.map((link) => (
                <li key={link.key}>
                  <Link href={`/${locale}${link.href}`} className="text-sm hover:text-blue-400 transition-colors">
                    {t(`tools.${link.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Convert */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">转换</h3>
            <ul className="space-y-2">
              {footerLinks.convert.map((link) => (
                <li key={link.key}>
                  <Link href={`/${locale}${link.href}`} className="text-sm hover:text-blue-400 transition-colors">
                    {t(`tools.${link.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">安全</h3>
            <ul className="space-y-2">
              {footerLinks.security.map((link) => (
                <li key={link.key}>
                  <Link href={`/${locale}${link.href}`} className="text-sm hover:text-blue-400 transition-colors">
                    {t(`tools.${link.key}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">{tFooter('copyright')}</p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="text-sm hover:text-blue-400 transition-colors">
              {tFooter('privacy')}
            </Link>
            <Link href={`/${locale}/terms`} className="text-sm hover:text-blue-400 transition-colors">
              {tFooter('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
