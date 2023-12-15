/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    distDir: './dist', // Changes the build output directory to `./dist/`.
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "googleusercontent.com",
            // "oaidalleapiprodscus.blob.core.windows.net",
            // "cdn.openai.com"
        ]
    },
}

module.exports = nextConfig