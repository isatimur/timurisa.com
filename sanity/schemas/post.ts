import { defineType } from "sanity";

export default defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
            },
        },
        {
            name: "mainImage",
            title: "Main Image",
            type: "image",
        },
        {
            name: "excerpt",
            title: "Excerpt",
            type: "text",
        },
        {
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
              { type: 'block' },  // Rich text (basic Markdown/HTML styling)
              {
                type: 'image',
                fields: [
                  {
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                  },
                  {
                    name: 'caption',
                    title: 'Caption',
                    type: 'string',
                  },
                  {
                    name: 'customSize',
                    title: 'Custom Size',
                    type: 'object',
                    fields: [
                      { name: 'width', type: 'number', title: 'Width' },
                      { name: 'height', type: 'number', title: 'Height' }
                    ]
                  }
                ],
              },
              {
                type: 'code',
                title: 'Code Block',
                options: {
                  language: 'python',
                  withFilename: true,
                },
              },
            ],
        },
        {
            name: "author",
            title: "Author",
            type: "reference",
            to: [{ type: "author" }],
        },
        {
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
        },
    ],
});