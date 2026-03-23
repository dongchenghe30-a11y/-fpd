# PDF Tools Global - 全球免费PDF工具站

🌍 **服务全球用户的免费在线PDF工具 | Serving users worldwide**

## 29个PDF工具 - 完全免费

### 📁 组织PDF (Organize PDF)
| 工具 | 功能 | 说明 |
|------|------|------|
| Merge PDF | 合并PDF | 多个PDF合并为一个 |
| Split PDF | 分段PDF | 将PDF拆分为多个 |
| Remove Pages | 删除页面 | 删除指定页面 |
| Extract Pages | 摘录页面 | 提取指定页面 |
| Organize PDF | 组织PDF | 拖拽排序页面 |
| Scan to PDF | 扫描成PDF | 相机扫描文档 |

### ⚡ 优化PDF (Optimize PDF)
| 工具 | 功能 | 说明 |
|------|------|------|
| Compress PDF | 压缩PDF | 减小文件大小 |
| Repair PDF | 修复PDF | 修复损坏的PDF |
| OCR PDF | OCR识别 | 文字识别 |

### 🔄 转换为PDF (Convert to PDF)
| 工具 | 功能 | 说明 |
|------|------|------|
| JPG to PDF | JPG转PDF | 图片转PDF |
| Word to PDF | Word转PDF | DOCX转PDF |
| PPT to PDF | PPT转PDF | PPT转PDF |
| Excel to PDF | Excel转PDF | XLSX转PDF |
| HTML to PDF | HTML转PDF | 网页转PDF |

### 📤 从PDF转换 (Convert from PDF)
| 工具 | 功能 | 说明 |
|------|------|------|
| PDF to JPG | PDF转JPG | PDF转图片 |
| PDF to Word | PDF转Word | PDF转DOCX |
| PDF to PPT | PDF转PPT | PDF转演示文稿 |
| PDF to Excel | PDF转Excel | PDF表格提取 |
| PDF/A Archive | PDF/A归档 | 长期存档格式 |

### ✏️ 编辑PDF (Edit PDF)
| 工具 | 功能 | 说明 |
|------|------|------|
| Rotate PDF | 旋转PDF | 旋转页面角度 |
| Page Numbers | 添加页码 | 添加页码 |
| Watermark | 添加水印 | 添加水印 |
| Crop PDF | 裁剪PDF | 裁剪页面边缘 |
| Edit PDF | 直接编辑 | 在线编辑文本 |

### 🔒 安全性 (Security)
| 工具 | 功能 | 说明 |
|------|------|------|
| Unlock PDF | 解锁PDF | 移除密码保护 |
| Protect PDF | 保护PDF | 添加密码 |
| Sign PDF | 签名PDF | 电子签名 |
| Redact PDF | 编辑版PDF | 永久删除信息 |
| Compare PDF | 比较PDF | 对比差异 |

---

## 快速开始

### 方式一：Docker部署（推荐）

```bash
# 克隆项目
git clone <your-repo-url>
cd pdf-global-tools

# 启动所有服务
docker-compose up -d

# 访问
# 前端: http://localhost:3002
# 后端API: http://localhost:8000
```

### 方式二：本地开发

#### 前端 (Next.js)
```bash
cd frontend
npm install
npm run dev    # http://localhost:3002
```

#### 后端 (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## 全球SEO关键词

### 目标市场
- 🇺🇸 **美国 (USA)**: New York, Los Angeles, Chicago, Houston
- 🇨🇳 **中国 (China)**: 北京, 上海, 深圳, 香港
- 🇬🇧 **英国 (UK)**: London, Manchester, Birmingham
- 🇭🇰 **香港 (Hong Kong)**: 香港岛, 九龙, 新界
- 🇨🇦 **加拿大 (Canada)**: Toronto, Vancouver, Montreal
- 🇸🇬 **新加坡 (Singapore)**: 全岛覆盖
- 🇦🇺 **澳大利亚**: Sydney, Melbourne, Brisbane
- 🇯🇵 **日本**: Tokyo, Osaka, Kyoto
- 🇩🇪 **德国**: Berlin, Munich, Hamburg
- 🇫🇷 **法国**: Paris, Lyon, Marseille

### SEO关键词
```
免费PDF工具, free PDF tools, PDF merger, PDF converter
compress PDF, split PDF, merge PDF, PDF compressor
Word to PDF, Excel to PDF, JPG to PDF, PDF to Word
PDF security, PDF encryption, unlock PDF, PDF signature
```

---

## 技术栈

### 前端
- **Framework**: Next.js 14.2.5 (App Router)
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Icons**: Lucide React

### 后端
- **Framework**: FastAPI
- **PDF Core**: PyMuPDF (fitz)
- **Convert**: pdf2docx, pdfplumber
- **Image**: Pillow, img2pdf

### 部署
- **Container**: Docker, Docker Compose
- **Web Server**: Nginx
- **SSL**: Cloudflare (推荐)

---

## 安全特性

- ✅ **不存储文件** - 文件仅在内存中处理
- ✅ **临时清理** - 自动删除临时文件
- ✅ **SSL加密** - 全站HTTPS
- ✅ **无Cookie追踪** - 仅使用必要Cookie

---

## 项目结构

```
pdf-global-tools/
├── frontend/              # Next.js 前端
│   ├── app/
│   │   └── [locale]/      # 国际化路由
│   ├── components/        # React组件
│   ├── lib/              # 工具函数
│   └── messages/         # i18n翻译
│
├── backend/               # FastAPI 后端
│   └── app/
│       └── services/      # PDF处理服务
│
├── nginx/                # Nginx配置
├── docker-compose.yml    # Docker编排
└── README.md
```

---

## API文档

### 端点: POST /api/v1/process

**参数:**
- `action`: 操作类型 (merge, split, compress, etc.)
- `file_0 ~ file_4`: 上传的文件
- `options`: JSON格式选项

**示例:**
```bash
curl -X POST http://localhost:8000/api/v1/process \
  -F "action=merge" \
  -F "file_0=@document1.pdf" \
  -F "file_1=@document2.pdf"
```

---

## Google AdSense

广告位已预留于：
- 首页Hero下方
- 工具列表页
- 工具详情页

注意：确保删除任何"无广告"等违规文案

---

## License

MIT License - 免费商用

---

**Made with love for users worldwide**
