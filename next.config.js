const nextConfig = {
    images: {
        domains: ['poels.dahk.am'],
    },
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'hy', 'ru'],
        defaultLocale: 'hy',
        localeDetection: false
    },
    env: {
        API_URL: "https://poels.dahk.am/api",
        IMAGE_URL: "https://poels.dahk.am/storage/",
        IMAGE_URL2: "https://poels.dahk.am/",
    },
}


module.exports = nextConfig
