import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { viteBundler } from '@payloadcms/bundler-vite';
import path = require('path');

export default buildConfig({
  collections: [
    // Collections go here
  ],
  editor: slateEditor({}),
  admin: {
    bundler: viteBundler(),
    buildPath: path.resolve(process.cwd(), '../dist/payload/build'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
