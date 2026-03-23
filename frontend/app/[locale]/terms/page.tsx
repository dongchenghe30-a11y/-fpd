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
    en: 'Terms of Service - PDF Tools Global',
    zh: '服务条款 - PDF Tools Global',
  };
  
  const descriptions: Record<string, string> = {
    en: 'Terms of Service for PDF Tools Global - Free PDF tools for users worldwide. No registration required.',
    zh: 'PDF Tools Global 服务条款 - 为全球用户提供免费 PDF 工具。无需注册。',
  };
  
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

export default function TermsPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Terms of Service
              </h1>
              
              <div className="space-y-8 text-gray-600 dark:text-gray-400">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    1. Acceptance of Terms
                  </h2>
                  <p>
                    By accessing and using PDF Tools Global ("the Service"), you agree to be bound 
                    by these Terms of Service. If you do not agree to these terms, please do not 
                    use our Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    2. Description of Service
                  </h2>
                  <p className="mb-4">
                    PDF Tools Global provides free online PDF processing tools including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>PDF Merge - Combine multiple PDF files</li>
                    <li>PDF Split - Split PDF into multiple files</li>
                    <li>PDF Compress - Reduce PDF file size</li>
                    <li>PDF Convert - Convert to/from PDF formats</li>
                    <li>PDF Edit - Rotate, watermark, add page numbers</li>
                    <li>PDF Security - Encrypt, decrypt, sign PDFs</li>
                    <li>OCR - Text recognition from scanned PDFs</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    3. No File Storage Policy
                  </h2>
                  <p className="mb-4">
                    <strong>IMPORTANT:</strong> We do NOT store your files on our servers.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All uploaded files are processed in temporary memory</li>
                    <li>Files are automatically deleted immediately after processing</li>
                    <li>We have no access to your documents after processing is complete</li>
                    <li>We do not maintain copies of your processed files</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    4. Acceptable Use
                  </h2>
                  <p className="mb-4">You agree NOT to use the Service to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Process illegal, harmful, or offensive content</li>
                    <li>Upload files containing malware or viruses</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use automated tools to overwhelm our services</li>
                    <li>Process files larger than 100MB</li>
                    <li>Resell or redistribute our service</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    5. Intellectual Property
                  </h2>
                  <p>
                    You retain all rights to the files you upload. We claim no ownership over 
                    your content. By using our Service, you grant us a limited license to 
                    process your files as you request.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    6. Service Availability
                  </h2>
                  <p>
                    We strive to provide uninterrupted service, but we do not guarantee 
                    100% uptime. The Service may be temporarily unavailable due to 
                    maintenance, updates, or circumstances beyond our control.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    7. Limitation of Liability
                  </h2>
                  <p>
                    THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. 
                    WE ARE NOT LIABLE FOR ANY DAMAGES ARISING FROM YOUR USE OF THE SERVICE, 
                    INCLUDING BUT NOT LIMITED TO DATA LOSS OR PROCESSING ERRORS.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    8. International Use
                  </h2>
                  <p>
                    Our Service is available globally and serves users in USA, China, Hong Kong, 
                    UK, Canada, Singapore, Australia, Japan, Germany, France, and 180+ other 
                    countries. You are responsible for complying with local laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    9. Changes to Terms
                  </h2>
                  <p>
                    We reserve the right to modify these Terms at any time. Changes will be 
                    effective immediately upon posting. Continued use of the Service after 
                    changes constitutes acceptance of the new Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    10. Contact
                  </h2>
                  <p>
                    For questions about these Terms, please contact us at:<br />
                    Email: legal@pdf.toolsglobal.com
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Summary
                  </h2>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li>✓ Free to use, no registration required</li>
                      <li>✓ We do NOT store your files</li>
                      <li>✓ No warranty on processing results</li>
                      <li>✓ Available worldwide</li>
                      <li>✓ Terms may change at any time</li>
                    </ul>
                  </div>
                </section>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500">
                    Last updated: January 2024
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
