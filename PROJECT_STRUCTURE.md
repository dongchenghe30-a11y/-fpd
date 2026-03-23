# PDF Tools Global - 全球免费PDF工具站

## 项目概览
- **前端**: Next.js 14.2.5 (App Router) + Tailwind CSS + next-intl
- **后端**: Python FastAPI + PyMuPDF + pdf2docx
- **目标**: 6大分类29个功能的全球PDF工具站

## 项目结构

```
pdf-global-tools/
├── frontend/                    # Next.js 前端
│   ├── app/
│   │   ├── [locale]/           # 国际化路由
│   │   │   ├── page.tsx        # 首页
│   │   │   ├── layout.tsx      # 布局
│   │   │   ├── tools/
│   │   │   │   └── [...slug]/
│   │   │   │       └── page.tsx  # 工具详情页
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx    # 隐私政策
│   │   │   └── terms/
│   │   │       └── page.tsx    # 服务条款
│   │   ├── api/                # API代理
│   │   │   └── process/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ToolCard.tsx
│   │   ├── ToolGrid.tsx
│   │   ├── FileUploader.tsx
│   │   ├── LoadingOverlay.tsx
│   │   └── Toast.tsx
│   ├── i18n/
│   │   ├── config.ts
│   │   └── request.ts
│   ├── messages/
│   │   ├── zh.json
│   │   └── en.json
│   ├── lib/
│   │   ├── api.ts              # API调用函数
│   │   └── utils.ts
│   ├── public/
│   │   ├── icons/             # 工具图标
│   │   └── images/
│   ├── middleware.ts           # 语言重定向中间件
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                    # Python FastAPI 后端
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI主应用
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── process.py      # PDF处理路由
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── merge.py
│   │   │   ├── split.py
│   │   │   ├── extract.py
│   │   │   ├── rotate.py
│   │   │   ├── compress.py
│   │   │   ├── watermark.py
│   │   │   ├── protect.py
│   │   │   ├── unlock.py
│   │   │   ├── signature.py
│   │   │   ├── compare.py
│   │   │   ├── ocr.py
│   │   │   ├── repair.py
│   │   │   ├── crop.py
│   │   │   ├── pagenumber.py
│   │   │   ├── organize.py
│   │   │   ├── pdf_to_jpg.py
│   │   │   ├── pdf_to_word.py
│   │   │   ├── pdf_to_ppt.py
│   │   │   ├── pdf_to_excel.py
│   │   │   ├── pdf_to_pdfa.py
│   │   │   ├── jpg_to_pdf.py
│   │   │   ├── word_to_pdf.py
│   │   │   ├── ppt_to_pdf.py
│   │   │   ├── excel_to_pdf.py
│   │   │   ├── html_to_pdf.py
│   │   │   └── scan_to_pdf.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── cleanup.py      # 临时文件清理
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── nginx/
│   └── nginx.conf              # Nginx配置模板
│
└── README.md
```

## 29个功能清单

### 组织PDF (Organize PDF)
1. **合并PDF** - Merge PDF
2. **分段PDF** - Split PDF
3. **删除页面** - Remove Pages
4. **摘录页面** - Extract Pages
5. **组织PDF** - Organize PDF
6. **扫描成PDF** - Scan to PDF

### 优化PDF (Optimize PDF)
7. **压缩PDF** - Compress PDF
8. **修复PDF** - Repair PDF
9. **OCR识别** - OCR PDF

### 转换为PDF (Convert to PDF)
10. **JPG转PDF** - JPG to PDF
11. **Word转PDF** - Word to PDF
12. **PPT转PDF** - PowerPoint to PDF
13. **Excel转PDF** - Excel to PDF
14. **HTML转PDF** - HTML to PDF

### 从PDF转换 (Convert from PDF)
15. **PDF转JPG** - PDF to JPG
16. **PDF转Word** - PDF to Word
17. **PDF转PPT** - PDF to PowerPoint
18. **PDF转Excel** - PDF to Excel
19. **PDF/A归档** - PDF to PDF/A

### 编辑PDF (Edit PDF)
20. **旋转PDF** - Rotate PDF
21. **添加页码** - Add Page Numbers
22. **添加水印** - Add Watermark
23. **裁剪PDF** - Crop PDF
24. **直接编辑** - Edit PDF

### 安全性 (Security)
25. **解锁PDF** - Unlock PDF
26. **保护PDF** - Protect PDF
27. **签名PDF** - Sign PDF
28. **编辑版PDF** - Redact PDF
29. **比较PDF** - Compare PDF

## SEO关键词分布

### 全球覆盖
- 美国 (USA)、中国 (China)、英国 (UK)、香港 (Hong Kong)
- 加拿大 (Canada)、新加坡 (Singapore)、澳大利亚 (Australia)
- 日本 (Japan)、德国 (Germany)、法国 (France)

### 功能关键词
- 免费PDF工具、PDF merger、PDF converter
- PDF compressor、PDF splitter、PDF watermark
- Word to PDF、Excel to PDF、JPG to PDF

## 中间件逻辑

```
Request → Accept-Language检测
         ↓
    zh-* 或 zh → /zh/*
    en-* 或 en → /en/*
    其他 → /en/* (默认英语)
```

## 部署架构

```
Cloudflare CDN
     ↓
Nginx (SSL终止)
  ↓        ↓
Frontend   Backend
(Next.js)  (FastAPI)
:3000      :8000
```
