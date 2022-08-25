const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        primary: colors.sky[400],
        placeholder: colors.slate[300],
      }),
      textColor: ({ colors }) => ({
        secondary: colors.gray[300],
      }),
      backgroundColor: ({ colors }) => ({
        input: colors.slate[700],
        preview: colors.slate[800],
      }),
      borderColor: ({ colors }) => ({
        DEFAULT: colors.slate[700],
      }),
    },
  },
  plugins: [],
};
