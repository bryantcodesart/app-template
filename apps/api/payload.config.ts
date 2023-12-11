import { buildConfig } from 'payload/config';
import { postgresAdapter } from '@payloadcms/db-postgres';

import { slateEditor } from '@payloadcms/richtext-slate';
import ENV from './src/env';

export default buildConfig({
  collections: [
    // Collections go here
  ],
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: ENV.DATABASE_URI,
    },
  }),
});
