# PDF Tools Global - 全球免费PDF工具站

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/FastAPI-0.111.0-009688?style=for-the-badge&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python" alt="Python">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker" alt="Docker">
</p>

<p align="center">
  🌐 <strong>服务全球用户的免费在线PDF工具 | Serving users worldwide</strong><br>
  29个PDF工具 · 完全免费 · 无需注册
</p>

---

## 📋 目录

- [🌟 功能概览](#-功能概览)
- [🚀 快速开始](#-快速开始)
- [💻 本地开发](#-本地开发)
- [☁️ 云端部署](#☁️-云端部署)
- [📚 API文档](#-api文档)
- [🏗️ 项目结构](#🏗️-项目结构)
- [🔧 环境变量](#-环境变量)
- [🌍 全球SEO配置](#-全球seo配置)
- [🔐 安全特性](#-安全特性)
- [📺 广告配置](#-广告配置)
- [🤝 贡献指南](#-贡献指南)
- [📄 License](#-license)

---

## 🌟 功能概览

### 📁 组织PDF (Organize PDF)

| 工具 | 功能 | 描述 |
|------|------|------|
| Merge PDF | 合并PDF | 多个PDF文件合并为一个 |
| Split PDF | 分段PDF | 将PDF拆分为多个文件 |
| Remove Pages | 删除页面 | 删除指定页面 |
| Extract Pages | 摘录页面 | 提取指定页面生成新PDF |
| Organize PDF | 组织PDF | 拖拽排序页面顺序 |
| Scan to PDF | 扫描成PDF | 相机扫描文档 |

### ⚡ 优化PDF (Optimize PDF)

| 工具 | 功能 | 描述 |
|------|------|------|
| Compress PDF | 压缩PDF | 减小PDF文件大小 |
| Repair PDF | 修复PDF | 修复损坏的PDF文件 |
| OCR PDF | OCR识别 | 文字识别提取 |

### 🔄 转换为PDF (Convert to PDF)

| 工具 | 功能 | 描述 |
|------|------|------|
| JPG to PDF | JPG转PDF | 图片转换为PDF |
| Word to PDF | Word转PDF | DOCX转换为PDF |
| PPT to PDF | PPT转PDF | PPT转换为PDF |
| Excel to PDF | Excel转PDF | XLSX转换为PDF |
| HTML to PDF | HTML转PDF | 网页转换为PDF |

### 📤 从PDF转换 (Convert from PDF)

| 工具 | 功能 | 描述 |
|------|------|------|
| PDF to JPG | PDF转JPG | PDF转换为图片 |
| PDF to Word | PDF转Word | PDF转换为DOCX |
| PDF to PPT | PDF转PPT | PDF转换为演示文稿 |
| PDF to Excel | PDF转Excel | PDF表格数据提取 |
| PDF/A Archive | PDF/A归档 | 转换为长期存档格式 |

### ✏️ 编辑PDF (Edit PDF)

| 工具 | 功能 | 描述 |
|------|------|------|
| Rotate PDF | 旋转PDF | 旋转页面角度 |
| Page Numbers | 添加页码 | 添加页码水印 |
| Watermark | 添加水印 | 添加文字/图片水印 |
| Crop PDF | 裁剪PDF | 裁剪页面边缘 |
| Edit PDF | 直接编辑 | 在线编辑PDF文本 |

### 🔒 安全性 (Security)

| 工具 | 功能 | 描述 |
|------|------|------|
| Unlock PDF | 解锁PDF | 移除密码保护 |
| Protect PDF | 保护PDF | 添加密码保护 |
| Sign PDF | 签名PDF | 添加电子签名 |
| Redact PDF | 编辑版 | 永久删除敏感信息 |
| Compare PDF | 比较PDF | 对比两个PDF差异 |

---

## 🚀 快速开始

### 方式一：Docker 部署（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/your-username/pdf-global-tools.git
cd pdf-global-tools

# 2. 启动所有服务
docker-compose up -d

# 3. 访问服务
# 前端: http://localhost:3002
# 后端API: http://localhost:8000
# 健康检查: http://localhost:8000/health
```

### 方式二：本地开发

#### 前端 + 后端同时运行

```bash
# 终端1 - 启动后端
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 终端2 - 启动前端
cd frontend
npm install
npm run dev
```

---

## 💻 本地开发

### 前端开发 (Next.js)

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器 (端口3002)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

**前端配置:**

| 配置项 | 值 | 说明 |
|--------|-----|------|
| 端口 | 3002 | 避免与默认3000冲突 |
| 框架 | Next.js 14.2.5 | App Router |
| 国际化 | next-intl | 中英文支持 |
| 样式 | Tailwind CSS | 响应式设计 |

### 后端开发 (FastAPI)

```bash
# 进入后端目录
cd backend

# 创建虚拟环境 (推荐)
python -m venv venv
# Windows: .\venv\Scripts\activate
# Linux/Mac: source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 启动开发服务器
uvicorn app.main:app --reload --port 8000

# 访问API文档
# Swagger: http://localhost:8000/docs
# ReDoc: http://localhost:8000/redoc
```

**后端依赖:**

| 包 | 版本 | 用途 |
|-----|------|------|
| FastAPI | 0.111.0 | Web框架 |
| PyMuPDF | 1.24.5 | PDF处理核心 |
| pdf2docx | 0.5.8 | PDF转Word |
| Pillow | 10.3.0 | 图片处理 |
| Uvicorn | 0.30.1 | ASGI服务器 |

---

## ☁️ 云端部署

### Docker Compose 完整配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PYTHONUNBUFFERED=1
      - LOG_LEVEL=INFO
      - MAX_FILE_SIZE=104857600
    volumes:
      - /tmp/pdf_tools:/tmp/pdf_tools
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 生产环境 Nginx 配置

```nginx
# nginx/nginx.conf
upstream frontend {
    server localhost:3002;
}

upstream backend {
    server localhost:8000;
}

server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 后端API
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 大文件上传
        client_max_body_size 100M;
    }
}
```

### 云平台部署建议

| 平台 | 前端 | 后端 | 特点 |
|------|------|------|------|
| Vercel | ✅ 托管 | ❌ | 免费前端托管 |
| Railway | ✅ | ✅ | 按量付费 |
| Render | ✅ | ✅ | 免费层可用 |
| Fly.io | ✅ | ✅ | 全球CDN |
| 阿里云 | ✅ | ✅ | 国内访问快 |
| AWS | ✅ | ✅ | 企业级 |

---

## 📚 API文档

### 统一处理端点

**端点:** `POST /api/v1/process`

**请求参数:**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| action | FormData | 是 | 操作类型 |
| file_0 | File | 是 | 第一个文件 |
| file_1 | File | 否 | 第二个文件 (最多5个) |
| options | FormData | 否 | JSON格式选项 |

**操作类型 (action):**

```python
# 组织PDF
"merge"          # 合并PDF
"split"          # 拆分PDF
"remove_pages"   # 删除页面
"extract_pages"  # 提取页面

# 优化PDF
"compress"       # 压缩PDF
"ocr"            # OCR识别

# 转换到PDF
"jpg_to_pdf"     # JPG转PDF

# 从PDF转换
"pdf_to_jpg"     # PDF转JPG
"pdf_to_word"    # PDF转Word

# 编辑PDF
"rotate"         # 旋转PDF
"watermark"      # 添加水印

# 安全
"protect"        # 加密PDF
"unlock"         # 解密PDF
"compare"        # 比较PDF
```

**示例 - 合并PDF:**

```bash
curl -X POST http://localhost:8000/api/v1/process \
  -F "action=merge" \
  -F "file_0=@document1.pdf" \
  -F "file_1=@document2.pdf" \
  -o merged.pdf
```

**示例 - 压缩PDF:**

```bash
curl -X POST http://localhost:8000/api/v1/process \
  -F "action=compress" \
  -F "file_0=@large.pdf" \
  -F "options={\"quality\":\"medium\"}" \
  -o compressed.pdf
```

### 健康检查端点

**端点:** `GET /health`

```json
{
  "status": "healthy",
  "service": "pdf-tools-global",
  "version": "1.0.0"
}
```

---

## 🏗️ 项目结构

```
pdf-global-tools/
├── frontend/                      # Next.js 前端应用
│   ├── app/
│   │   ├── [locale]/             # 国际化路由
│   │   │   ├── page.tsx          # 首页
│   │   │   ├── layout.tsx        # 布局
│   │   │   ├── tools/
│   │   │   │   └── [...slug]/
│   │   │   │       ├── page.tsx  # 工具详情页
│   │   │   │       └── layout.tsx # 工具页布局
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx      # 隐私政策
│   │   │   ├── terms/
│   │   │   │   └── page.tsx      # 服务条款
│   │   │   └── about/
│   │   │       └── page.tsx      # 关于页面
│   │   ├── api/
│   │   │   └── process/
│   │   │       └── route.ts      # API代理
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/               # React 组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ToolCard.tsx
│   │   ├── ToolGrid.tsx
│   │   ├── FileUploader.tsx
│   │   ├── LoadingOverlay.tsx
│   │   └── Toast.tsx
│   ├── i18n/                     # 国际化配置
│   │   ├── config.ts
│   │   └── request.ts
│   ├── messages/                 # 翻译文件
│   │   ├── zh.json
│   │   └── en.json
│   ├── lib/                      # 工具函数
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── middleware.ts             # 语言检测中间件
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                       # FastAPI 后端
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py               # FastAPI 主应用
│   │   └── services/            # PDF 处理服务
│   │       ├── merge_service.py      # 合并
│   │       ├── split_service.py      # 拆分
│   │       ├── extract_service.py    # 页面提取
│   │       ├── rotate_service.py     # 旋转
│   │       ├── compress_service.py   # 压缩
│   │       ├── watermark_service.py  # 水印
│   │       ├── protect_service.py    # 加密
│   │       ├── unlock_service.py     # 解密
│   │       ├── compare_service.py     # 比较
│   │       ├── ocr_service.py         # OCR
│   │       ├── pdf_to_jpg_service.py # 转JPG
│   │       ├── pdf_to_word_service.py # 转Word
│   │       └── jpg_to_pdf_service.py # JPG转PDF
│   ├── requirements.txt
│   └── Dockerfile
│
├── nginx/                        # Nginx 配置
│   └── nginx.conf
│
├── docker-compose.yml            # Docker 编排
├── README.md                      # 项目说明
└── PROJECT_STRUCTURE.md          # 结构文档
```

---

## 🔧 环境变量

### 前端环境变量

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 后端环境变量

```env
# .env
LOG_LEVEL=INFO
MAX_FILE_SIZE=104857600  # 100MB
TEMP_DIR=/tmp/pdf_tools
```

---

## 🌍 全球SEO配置

### 目标市场

| 地区 | 国家 | 城市 |
|------|------|------|
| 🇺🇸 北美 | 美国 | New York, Los Angeles, Chicago |
| 🇨🇳 亚洲 | 中国 | 北京, 上海, 深圳, 香港 |
| 🇬🇧 欧洲 | 英国 | London, Manchester |
| 🇨🇦 北美 | 加拿大 | Toronto, Vancouver |
| 🇸🇬 亚洲 | 新加坡 | 全岛覆盖 |
| 🇦🇺 大洋洲 | 澳大利亚 | Sydney, Melbourne |
| 🇯🇵 亚洲 | 日本 | Tokyo, Osaka |
| 🇩🇪 欧洲 | 德国 | Berlin, Munich |
| 🇫🇷 欧洲 | 法国 | Paris, Lyon |

### SEO 关键词

```text
# 核心关键词
免费PDF工具, free PDF tools, PDF merger, PDF converter
compress PDF, split PDF, merge PDF, PDF compressor

# 转换类
Word to PDF, Excel to PDF, JPG to PDF, PDF to Word
PPT to PDF, HTML to PDF, PDF to Excel

# 安全类
PDF security, PDF encryption, unlock PDF, PDF signature

# 编辑类
PDF watermark, rotate PDF, PDF page numbers, crop PDF
```

### 多语言 Meta 标签

每个页面都配置了中英文双语 meta 标签:

- **首页**: 29个免费PDF工具
- **工具页**: [工具名] - 免费在线工具
- **隐私政策**: Privacy Policy / 隐私政策
- **服务条款**: Terms of Service / 服务条款

---

## 🔐 安全特性

| 特性 | 说明 |
|------|------|
| ✅ 不存储文件 | 文件仅在内存中处理，处理完成后立即删除 |
| ✅ 临时清理 | 自动清理临时文件，防止泄露 |
| ✅ SSL加密 | 全站HTTPS保护传输安全 |
| ✅ 无追踪Cookie | 仅使用必要的技术Cookie |
| ✅ 文件大小限制 | 最大100MB，防止滥用 |
| ✅ CORS控制 | 限制API访问来源 |

---

## 📺 广告配置

### Google AdSense 广告位

| 位置 | 描述 |
|------|------|
| 首页Hero下方 | 728x90 横幅广告 |
| 工具列表页 | 工具卡片之间 |
| 工具详情页 | 工具操作区下方 |

### 注意事项

⚠️ **重要提示:**
- 确保删除任何"无广告"、"去广告"等违规文案
- AdSense ID: `ca-pub-XXXXXXXXXXXXX` (替换为您的ID)
- 广告不应影响用户体验

---

## 🤝 贡献指南

欢迎提交 Pull Request!

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 前端: 使用 ESLint + Prettier
- 后端: 使用 Black + Flake8
- 提交信息: 使用 [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📄 License

MIT License - 免费商用

```
MIT License

Copyright (c) 2024 PDF Tools Global

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  <strong>Made with ❤️ for users worldwide</strong>
</p>
