import { defineType } from 'sanity';

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'role',
            type: 'string',
            title: 'Role',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'text',
        },
    ],
});