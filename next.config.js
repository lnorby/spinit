const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@styles': path.resolve(__dirname, 'src/common/styles'),
        };

        return config;
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
        ],
    },
}

module.exports = nextConfig
