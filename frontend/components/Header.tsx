'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  FileText, Globe, Menu, X, ChevronDown,
  GitMerge, Scissors, Trash2, BookOpen, ListOrdered, ScanSearch,
  Archive, Wrench, ScanLine,
  Image, Monitor, Sheet, Code,
  ImagePlus, FileDown,
  RotateCw, Hash, Droplets, Crop, PenLine,
  Unlock, Lock, PenTool, Eraser, GitCompare,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  locale?: string;
}

// 6大分类的配置，含图标和颜色
const categories = [
  {
    key: 'organize',
    color: '#3b82f6',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-600',
    tools: [
      { id: 'merge', icon: GitMerge, href: '/tools/merge' },
      { id: 'split', icon: Scissors, href: '/tools/split' },
      { id: 'removePages', icon: Trash2, href: '/tools/remove-pages' },
      { id: 'extractPages', icon: BookOpen, href: '/tools/extract-pages' },
      { id: 'organize', icon: ListOrdered, href: '/tools/organize' },
      { id: 'scanToPdf', icon: ScanSearch, href: '/tools/scan-to-pdf' },
    ],
  },
  {
    key: 'optimize',
    color: '#10b981',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-600',
    tools: [
      { id: 'compress', icon: Archive, href: '/tools/compress' },
      { id: 'repair', icon: Wrench, href: '/tools/repair' },
      { id: 'ocr', icon: ScanLine, href: '/tools/ocr' },
    ],
  },
  {
    key: 'convertTo',
    color: '#f59e0b',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    tools: [
      { id: 'jpgToPdf', icon: Image, href: '/tools/jpg-to-pdf' },
      { id: 'wordToPdf', icon: FileText, href: '/tools/word-to-pdf' },
      { id: 'pptToPdf', icon: Monitor, href: '/tools/ppt-to-pdf' },
      { id: 'excelToPdf', icon: Sheet, href: '/tools/excel-to-pdf' },
      { id: 'htmlToPdf', icon: Code, href: '/tools/html-to-pdf' },
    ],
  },
  {
    key: 'convertFrom',
    color: '#ec4899',
    bgClass: 'bg-pink-50',
    textClass: 'text-pink-600',
    tools: [
      { id: 'pdfToJpg', icon: ImagePlus, href: '/tools/pdf-to-jpg' },
      { id: 'pdfToWord', icon: FileDown, href: '/tools/pdf-to-word' },
      { id: 'pdfToPpt', icon: Monitor, href: '/tools/pdf-to-ppt' },
      { id: 'pdfToExcel', icon: Sheet, href: '/tools/pdf-to-excel' },
      { id: 'pdfToPdfa', icon: Archive, href: '/tools/pdf-to-pdfa' },
    ],
  },
  {
    key: 'edit',
    color: '#8b5cf6',
    bgClass: 'bg-violet-50',
    textClass: 'text-violet-600',
    tools: [
      { id: 'rotate', icon: RotateCw, href: '/tools/rotate' },
      { id: 'pageNumbers', icon: Hash, href: '/tools/page-numbers' },
      { id: 'watermark', icon: Droplets, href: '/tools/watermark' },
      { id: 'crop', icon: Crop, href: '/tools/crop' },
      { id: 'edit', icon: PenLine, href: '/tools/edit' },
    ],
  },
  {
    key: 'security',
    color: '#ef4444',
    bgClass: 'bg-red-50',
    textClass: 'text-red-600',
    tools: [
      { id: 'unlock', icon: Unlock, href: '/tools/unlock' },
      { id: 'protect', icon: Lock, href: '/tools/protect' },
      { id: 'sign', icon: PenTool, href: '/tools/sign' },
      { id: 'redact', icon: Eraser, href: '/tools/redact' },
      { id: 'compare', icon: GitCompare, href: '/tools/compare' },
    ],
  },
];

export default function Header({ locale: propLocale }: HeaderProps) {
  const t = useTranslations('navigation');
  const tTools = useTranslations('tools');
  const tCats = useTranslations('categories');
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // 移动端各分类展开状态
  const [mobileCatOpen, setMobileCatOpen] = useState<Record<string, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = propLocale || (pathname.startsWith('/zh') ? 'zh' : 'en');
  const otherLocale = currentLocale === 'zh' ? 'en' : 'zh';
  const otherLocalePath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`) || `/${otherLocale}`;

  // 点击外部关闭下拉
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 切换移动端分类展开
  const toggleMobileCat = (key: string) => {
    setMobileCatOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">
              PDF Tools <span className="text-blue-600">Global</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {/* Home */}
            <Link
              href={`/${currentLocale}`}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t('home')}
            </Link>

            {/* Tools 下拉 */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors py-1"
                onClick={() => setDropdownOpen((v) => !v)}
                onMouseEnter={() => setDropdownOpen(true)}
              >
                {t('tools')}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* ── 下拉面板 ── */}
              {dropdownOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[780px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {/* 小三角 */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
                    <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 translate-y-1 mx-auto" />
                  </div>

                  <div className="grid grid-cols-3 gap-5">
                    {categories.map((cat) => (
                      <div key={cat.key}>
                        {/* 分类标题 */}
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${cat.bgClass} ${cat.textClass}`}>
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          {tCats(`${cat.key}.name`)}
                        </div>

                        {/* 工具列表 */}
                        <ul className="space-y-0.5">
                          {cat.tools.map((tool) => {
                            const Icon = tool.icon;
                            return (
                              <li key={tool.id}>
                                <Link
                                  href={`/${currentLocale}${tool.href}`}
                                  className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 group transition-colors"
                                  onClick={() => setDropdownOpen(false)}
                                >
                                  <span
                                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                                  >
                                    <Icon className="w-3.5 h-3.5" />
                                  </span>
                                  <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium leading-tight">
                                    {tTools(`${tool.id}.name`)}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* 底部全部工具链接 */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">29 {currentLocale === 'zh' ? '种工具，完全免费' : 'tools, completely free'}</span>
                    <Link
                      href={`/${currentLocale}#tools`}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {t('allTools')} →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href={`/${currentLocale}/about`}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t('about')}
            </Link>
          </div>

          {/* ── Right side ── */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Link
              href={otherLocalePath}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg border border-gray-200 hover:border-blue-300"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLocale === 'zh' ? 'EN' : '中文'}</span>
            </Link>

            {/* CTA */}
            <Link
              href={`/${currentLocale}#tools`}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all shadow-sm"
            >
              {t('allTools')}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Navigation ── */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            {/* Home */}
            <Link
              href={`/${currentLocale}`}
              className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>

            {/* Mobile 工具分类折叠 */}
            {categories.map((cat) => (
              <div key={cat.key} className="mt-1">
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => toggleMobileCat(cat.key)}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    {tCats(`${cat.key}.name`)}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${mobileCatOpen[cat.key] ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileCatOpen[cat.key] && (
                  <div className="ml-5 mt-1 space-y-0.5 pb-1">
                    {cat.tools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.id}
                          href={`/${currentLocale}${tool.href}`}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-gray-50 group"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-sm text-gray-600 group-hover:text-gray-900">
                            {tTools(`${tool.id}.name`)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* About */}
            <Link
              href={`/${currentLocale}/about`}
              className="block px-3 py-2.5 mt-1 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>

            {/* All Tools CTA */}
            <div className="pt-3 px-1">
              <Link
                href={`/${currentLocale}#tools`}
                className="block px-3 py-2.5 text-center bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('allTools')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
