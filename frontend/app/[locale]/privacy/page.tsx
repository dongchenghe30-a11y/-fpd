import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    en: 'Privacy Policy - PDF Tools Global',
    zh: '隐私政策 - PDF Tools Global',
  };
  
  const descriptions: Record<string, string> = {
    en: 'Privacy Policy for PDF Tools Global - We do not store your files. Your privacy is our priority.',
    zh: 'PDF Tools Global 隐私政策 - 我们不会存储您的文件。您的隐私是我们的首要任务。',
  };
  
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

// Privacy Policy content
const privacyContent = {
  en: `
# Privacy Policy

**Last Updated: January 2024**

## Our Commitment to Privacy

PDF Tools Global ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our PDF processing services.

## Key Points

### 1. No File Storage
- **We do NOT store your files on our servers**
- All file processing happens in temporary memory
- Files are automatically deleted immediately after processing
- We have no access to your documents after processing is complete

### 2. Information We Collect

#### Automatically Collected Information:
- Browser type and version
- Operating system
- IP address (anonymized)
- Pages visited and features used
- Date and time of access
- Referring website

#### Information You Provide:
- Uploaded files (processed and deleted immediately)
- Any text you enter in our tools

### 3. How We Use Your Information

We use collected information to:
- Provide and maintain our services
- Improve user experience
- Analyze service usage patterns
- Prevent abuse and ensure security
- Comply with legal obligations

### 4. Data Security

We implement industry-standard security measures:
- 256-bit SSL encryption for all data transmission
- Secure cloud infrastructure
- Regular security audits
- No persistent storage of user files

### 5. Cookies

We use essential cookies for:
- Session management
- Language preferences
- Service functionality

We do NOT use:
- Advertising cookies
- Tracking cookies
- Third-party analytics cookies

### 6. Third-Party Services

Our service may contain links to third-party websites. We are not responsible for the privacy practices of these websites.

### 7. Children's Privacy

Our services are not intended for users under 13 years of age. We do not knowingly collect information from children.

### 8. International Users

Our service is available globally. By using our service, you consent to data processing in Hong Kong and/or other locations where our servers are hosted.

### 9. Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Opt-out of communications

### 10. Changes to This Policy

We may update this Privacy Policy periodically. Changes will be posted on this page with an updated revision date.

## Contact Us

If you have questions about this Privacy Policy, please contact us at:
- Email: privacy@pdf.toolsglobal.com

---

## Summary (Simplified)

**What we collect:** Basic technical information and usage data
**What we DON'T collect:** Your PDF files (they're deleted immediately after processing)
**How we protect data:** SSL encryption, secure servers, no persistent storage
**Your rights:** Access, correction, and deletion of your data

---

*This policy is written in English. Translations may be provided for convenience.*
`,
  zh: `
# 隐私政策

**最后更新：2024年1月**

## 隐私承诺

PDF Tools Global（"我们"或"本公司"）致力于保护您的隐私。本隐私政策说明了我们如何收集、使用和保护您使用PDF处理服务时的信息。

## 核心要点

### 1. 不存储文件
- **我们不在服务器上存储您的文件**
- 所有文件处理都在临时内存中进行
- 文件在处理完成后立即自动删除
- 处理完成后我们无法访问您的文档

### 2. 我们收集的信息

#### 自动收集的信息：
- 浏览器类型和版本
- 操作系统
- IP地址（已匿名化）
- 访问的页面和使用的功能
- 访问日期和时间
- 来源网站

#### 您提供的信息：
- 上传的文件（处理后立即删除）
- 您在工具中输入的任何文本

### 3. 我们如何使用信息

我们使用收集的信息来：
- 提供和维护我们的服务
- 改善用户体验
- 分析服务使用模式
- 防止滥用并确保安全
- 遵守法律义务

### 4. 数据安全

我们实施行业标准的安全措施：
- 所有数据传输采用256位SSL加密
- 安全云基础设施
- 定期安全审计
- 用户文件无持久存储

### 5. Cookie

我们使用必要的Cookie用于：
- 会话管理
- 语言偏好
- 服务功能

我们不使用：
- 广告Cookie
- 跟踪Cookie
- 第三方分析Cookie

### 6. 第三方服务

我们的服务可能包含指向第三方网站的链接。我们对这些网站的隐私惯例不承担责任。

### 7. 儿童隐私

我们的服务不面向13岁以下的用户。我们不会故意收集儿童的信息。

### 8. 国际用户

我们的服务面向全球用户。使用我们的服务即表示您同意在香港和/或托管我们服务器的其他地点进行数据处理。

### 9. 您的权利

您有权：
- 访问您的个人信息
- 更正不准确的数据
- 要求删除您的数据
- 选择退出通信

### 10. 政策变更

我们可能会定期更新本隐私政策。变更将发布在本页面上，并标注更新日期。

## 联系我们

如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
- 邮箱：privacy@pdf.toolsglobal.com

---

## 简化总结

**我们收集的内容：** 基本技术信息和使用数据
**我们不收集的内容：** 您的PDF文件（处理后立即删除）
**我们如何保护数据：** SSL加密、安全服务器、无持久存储
**您的权利：** 访问、更正和删除您的数据
`,
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Privacy Policy
              </h1>
              
              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Our Commitment to Privacy
                  </h2>
                  <p className="mb-4">
                    PDF Tools Global is committed to protecting your privacy. We do NOT store your files on our servers. 
                    All file processing happens in temporary memory and files are automatically deleted after processing.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    No File Storage Policy
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>We do NOT store your files on our servers</li>
                    <li>All file processing happens in temporary memory</li>
                    <li>Files are automatically deleted immediately after processing</li>
                    <li>We have no access to your documents after processing is complete</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Information We Collect
                  </h2>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Automatically Collected:
                  </h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>IP address (anonymized)</li>
                    <li>Pages visited and features used</li>
                    <li>Date and time of access</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Data Security
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>256-bit SSL encryption for all data transmission</li>
                    <li>Secure cloud infrastructure</li>
                    <li>Regular security audits</li>
                    <li>No persistent storage of user files</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Cookies
                  </h2>
                  <p className="mb-4">
                    We use essential cookies for session management and language preferences. 
                    We do NOT use advertising or tracking cookies.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    International Users
                  </h2>
                  <p>
                    Our service serves users in USA, China, Hong Kong, UK, Canada, Singapore, 
                    Australia, Japan, Germany, France and 180+ other countries. By using our service, 
                    you consent to data processing in our server locations.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Your Rights
                  </h2>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of communications</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Us
                  </h2>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at:<br />
                    Email: privacy@pdf.toolsglobal.com
                  </p>
                </section>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    <strong>Summary:</strong> We don't store your files. Your documents are processed 
                    and deleted immediately. We only collect basic technical information for 
                    service improvement and security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
