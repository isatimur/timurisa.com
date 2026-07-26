/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "googleusercontent.com",
            "cdn.sanity.io"
            // "oaidalleapiprodscus.blob.core.windows.net",
            // "cdn.openai.com"
        ]
    },
}

module.exports = nextConfig