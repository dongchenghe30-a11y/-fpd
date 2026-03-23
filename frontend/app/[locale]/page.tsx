import { useTranslations } from 'next-intl';
import { Shield, Zap, Globe, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToolGrid } from '@/components/ToolGrid';

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const t = useTranslations('features');
  const tHero = useTranslations('hero');
  const tTools = useTranslations('toolsSection');
  const tSeo = useTranslations('seoSection');
  const tCta = useTranslations('ctaSection');

  const features = [
    { icon: Heart, title: t('free'), description: t('freeDesc'), bg: 'bg-red-50', iconColor: 'text-red-500' },
    { icon: Shield, title: t('secure'), description: t('secureDesc'), bg: 'bg-green-50', iconColor: 'text-green-500' },
    { icon: Zap, title: t('fast'), description: t('fastDesc'), bg: 'bg-yellow-50', iconColor: 'text-yellow-500' },
    { icon: Globe, title: t('global'), description: t('globalDesc'), bg: 'bg-blue-50', iconColor: 'text-blue-500' },
  ];

  return (
    <>
      <Header locale={locale} />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>{tHero('badge')}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {tHero('title')}
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                {tHero('subtitle')}
              </p>

              {/* CTA */}
              <a
                href="#tools"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-lg"
              >
                {tHero('cta')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>{tHero('trustFiles')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>{tHero('trustSpeed')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{tHero('trustGlobal')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-14 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`text-center p-6 rounded-2xl ${feature.bg} hover:shadow-md transition-shadow`}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-white mb-4 shadow-sm`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section id="tools" className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {tTools('title')}
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                {tTools('subtitle')}
              </p>
            </div>

            {/* Google AdSense 广告位 */}
            <div className="mb-10 flex justify-center">
              <div className="w-full max-w-4xl h-24 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                {/* ins class="adsbygoogle" data-ad-slot="YOUR_AD_SLOT" */}
                Advertisement Area
              </div>
            </div>

            <ToolGrid locale={locale} />
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              {tSeo('title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {tSeo('usaTitle')}
                </h3>
                <p className="text-sm leading-relaxed">
                  {tSeo('usaDesc')}
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {tSeo('chinaTitle')}
                </h3>
                <p className="text-sm leading-relaxed">
                  {tSeo('chinaDesc')}
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {tSeo('ukTitle')}
                </h3>
                <p className="text-sm leading-relaxed">
                  {tSeo('ukDesc')}
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {tSeo('caTitle')}
                </h3>
                <p className="text-sm leading-relaxed">
                  {tSeo('caDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {tCta('title')}
            </h2>
            <p className="text-lg text-white/80 mb-8">
              {tCta('subtitle')}
            </p>
            <a
              href="#tools"
              className="inline-flex items-center px-10 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-xl text-lg"
            >
              {tCta('button')}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
