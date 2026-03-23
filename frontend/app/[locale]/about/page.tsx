import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Zap, Globe, Users, Heart, Award } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    en: 'About Us - PDF Tools Global',
    zh: '关于我们 - PDF Tools Global',
  };
  
  const descriptions: Record<string, string> = {
    en: 'Learn about PDF Tools Global - Your trusted free PDF processing solution serving millions of users worldwide.',
    zh: '了解 PDF Tools Global - 您值得信赖的免费 PDF 处理解决方案，服务全球数百万用户。',
  };
  
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutSection' });

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">10M+</div>
              <div className="text-sm text-gray-500">{t('statsUsers')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">29</div>
              <div className="text-sm text-gray-500">{t('statsTools')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">180+</div>
              <div className="text-sm text-gray-500">{t('statsCountries')}</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">50M+</div>
              <div className="text-sm text-gray-500">{t('statsProcessed')}</div>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('missionTitle')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('missionDesc1')}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {t('missionDesc2')}
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('whyTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('freeTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('freeDesc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('fastTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('fastDesc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('privacyTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('privacyDesc')}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('globalTitle')}</h3>
                  <p className="text-sm text-gray-500">{t('globalDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('teamTitle')}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('teamDesc')}
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{t('expertsTitle')}</p>
                <p className="text-sm text-gray-500">{t('expertsDesc')}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{t('supportTitle')}</p>
                <p className="text-sm text-gray-500">{t('supportDesc')}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <Globe className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{t('reachTitle')}</p>
                <p className="text-sm text-gray-500">{t('reachDesc')}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl font-bold mb-4">{t('contactTitle')}</h2>
            <p className="text-white/80 mb-6">{t('contactDesc')}</p>
            <div className="space-y-2">
              <p>{t('emailSupport')}</p>
              <p>{t('emailBusiness')}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
