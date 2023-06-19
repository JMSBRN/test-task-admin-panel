/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    env: {
      LOCAL_SECRET: process.env.LOCAL_SECRET,
      CALL_SECRET: process.env.CALL_SECRET
    }
};

module.exports = nextConfig;
