import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/config';

export default createMiddleware({
  // 支持的语言列表
  locales,

  // 默认语言
  defaultLocale,

  // 不要在URL中显示默认语言
  localePrefix: 'always',
});

export const config = {
  // 匹配所有路径，除了以这些开头的
  matcher: [
    // 匹配所有路径除了:
    // - api (API路由)
    // - _next/static (静态文件)
    // - _next/image (图片优化)
    // - favicon.ico (网站图标)
    // - .*\\..* (包含扩展名的文件)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
