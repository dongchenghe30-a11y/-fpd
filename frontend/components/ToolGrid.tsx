'use client';

import { useTranslations } from 'next-intl';
import {
  GitMerge,
  Scissors,
  Trash2,
  BookOpen,
  ListOrdered,
  ScanSearch,
  Archive,
  Wrench,
  ScanLine,
  Image,
  FileText,
  Monitor,
  Sheet,
  Code,
  ImagePlus,
  FileDown,
  RotateCw,
  Hash,
  Droplets,
  Crop,
  PenLine,
  Unlock,
  Lock,
  PenTool,
  Eraser,
  GitCompare,
} from 'lucide-react';

export interface Tool {
  id: string;
  icon: React.ElementType;
  category: string;
  color: string;
  href: string;
}

export const tools: Tool[] = [
  // 组织PDF (6)
  { id: 'merge', icon: GitMerge, category: 'organize', color: '#3b82f6', href: '/tools/merge' },
  { id: 'split', icon: Scissors, category: 'organize', color: '#3b82f6', href: '/tools/split' },
  { id: 'removePages', icon: Trash2, category: 'organize', color: '#3b82f6', href: '/tools/remove-pages' },
  { id: 'extractPages', icon: BookOpen, category: 'organize', color: '#3b82f6', href: '/tools/extract-pages' },
  { id: 'organize', icon: ListOrdered, category: 'organize', color: '#3b82f6', href: '/tools/organize' },
  { id: 'scanToPdf', icon: ScanSearch, category: 'organize', color: '#3b82f6', href: '/tools/scan-to-pdf' },

  // 优化PDF (3)
  { id: 'compress', icon: Archive, category: 'optimize', color: '#10b981', href: '/tools/compress' },
  { id: 'repair', icon: Wrench, category: 'optimize', color: '#10b981', href: '/tools/repair' },
  { id: 'ocr', icon: ScanLine, category: 'optimize', color: '#10b981', href: '/tools/ocr' },

  // 转换为PDF (5)
  { id: 'jpgToPdf', icon: Image, category: 'convertTo', color: '#f59e0b', href: '/tools/jpg-to-pdf' },
  { id: 'wordToPdf', icon: FileText, category: 'convertTo', color: '#f59e0b', href: '/tools/word-to-pdf' },
  { id: 'pptToPdf', icon: Monitor, category: 'convertTo', color: '#f59e0b', href: '/tools/ppt-to-pdf' },
  { id: 'excelToPdf', icon: Sheet, category: 'convertTo', color: '#f59e0b', href: '/tools/excel-to-pdf' },
  { id: 'htmlToPdf', icon: Code, category: 'convertTo', color: '#f59e0b', href: '/tools/html-to-pdf' },

  // 从PDF转换 (5)
  { id: 'pdfToJpg', icon: ImagePlus, category: 'convertFrom', color: '#ec4899', href: '/tools/pdf-to-jpg' },
  { id: 'pdfToWord', icon: FileDown, category: 'convertFrom', color: '#ec4899', href: '/tools/pdf-to-word' },
  { id: 'pdfToPpt', icon: Monitor, category: 'convertFrom', color: '#ec4899', href: '/tools/pdf-to-ppt' },
  { id: 'pdfToExcel', icon: Sheet, category: 'convertFrom', color: '#ec4899', href: '/tools/pdf-to-excel' },
  { id: 'pdfToPdfa', icon: Archive, category: 'convertFrom', color: '#ec4899', href: '/tools/pdf-to-pdfa' },

  // 编辑PDF (5)
  { id: 'rotate', icon: RotateCw, category: 'edit', color: '#8b5cf6', href: '/tools/rotate' },
  { id: 'pageNumbers', icon: Hash, category: 'edit', color: '#8b5cf6', href: '/tools/page-numbers' },
  { id: 'watermark', icon: Droplets, category: 'edit', color: '#8b5cf6', href: '/tools/watermark' },
  { id: 'crop', icon: Crop, category: 'edit', color: '#8b5cf6', href: '/tools/crop' },
  { id: 'edit', icon: PenLine, category: 'edit', color: '#8b5cf6', href: '/tools/edit' },

  // 安全性 (5)
  { id: 'unlock', icon: Unlock, category: 'security', color: '#ef4444', href: '/tools/unlock' },
  { id: 'protect', icon: Lock, category: 'security', color: '#ef4444', href: '/tools/protect' },
  { id: 'sign', icon: PenTool, category: 'security', color: '#ef4444', href: '/tools/sign' },
  { id: 'redact', icon: Eraser, category: 'security', color: '#ef4444', href: '/tools/redact' },
  { id: 'compare', icon: GitCompare, category: 'security', color: '#ef4444', href: '/tools/compare' },
];

interface ToolCardProps {
  tool: Tool;
  name: string;
  description: string;
  locale: string;
}

export function ToolCard({ tool, name, description, locale }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <a
      href={`/${locale}${tool.href}`}
      className="tool-card group"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm group-hover:text-blue-600 transition-colors">
        {name}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
        {description}
      </p>
    </a>
  );
}

interface ToolGridProps {
  locale: string;
}

export function ToolGrid({ locale }: ToolGridProps) {
  const t = useTranslations();
  const tCategories = useTranslations('categories');

  const categories = [
    { key: 'organize', name: tCategories('organize.name'), desc: tCategories('organize.description'), color: '#3b82f6' },
    { key: 'optimize', name: tCategories('optimize.name'), desc: tCategories('optimize.description'), color: '#10b981' },
    { key: 'convertTo', name: tCategories('convertTo.name'), desc: tCategories('convertTo.description'), color: '#f59e0b' },
    { key: 'convertFrom', name: tCategories('convertFrom.name'), desc: tCategories('convertFrom.description'), color: '#ec4899' },
    { key: 'edit', name: tCategories('edit.name'), desc: tCategories('edit.description'), color: '#8b5cf6' },
    { key: 'security', name: tCategories('security.name'), desc: tCategories('security.description'), color: '#ef4444' },
  ];

  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const categoryTools = tools.filter((tool) => tool.category === category.key);

        return (
          <section key={category.key} id={category.key}>
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {category.name}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                — {category.desc}
              </span>
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {categoryTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  locale={locale}
                  name={t(`tools.${tool.id}.name`)}
                  description={t(`tools.${tool.id}.description`)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
