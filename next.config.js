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
    // Static artifacts live at public/a/<slug>/index.html (see scripts/publish-artifact.sh).
    async rewrites() {
        return {
            beforeFiles: [{ source: "/a/:slug", destination: "/a/:slug/index.html" }],
        }
    },
}

module.exports = nextConfig