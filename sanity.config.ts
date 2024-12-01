'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { markdownSchema } from 'sanity-plugin-markdown'


// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from '@/sanity/env'
import {schema} from '@/sanity/schemaTypes'
import {structure} from '@/sanity/structure'
import {defineDocuments, presentationTool} from "@sanity/presentation";

const SANITY_STUDIO_PREVIEW_URL = (
    process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
)
export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    unsplashImageAsset(),
    markdownSchema(),
      presentationTool({
        previewUrl: SANITY_STUDIO_PREVIEW_URL,
        resolve: {
          mainDocuments: defineDocuments([
            {
              route: '/blog/:slug',
              filter: `_type == "post" && slug.current == $slug`,
            },
          ]),
      },
      }),
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
