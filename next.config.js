const nextConfig = {
    images: {
        domains: ['interior.dahk.am'],
    },
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'hy', 'ru'],
        defaultLocale: 'ru',
        localeDetection: false
    },
    env: {
        API_URL: "https://interior.dahk.am/api",
        IMAGE_URL: "https://interior.dahk.am/storage/",
        IMAGE_URL2: "https://interior.dahk.am/",
    },
}


module.exports = nextConfig
