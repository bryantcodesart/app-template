import type { CodegenConfig } from '@graphql-codegen/cli';
import { PAYLOAD_API_ENDPOINT } from './PAYLOAD_API_ENDPOINT';

/**
 * @see https://www.youtube.com/watch?v=XPUcMOhCjHw&ab_channel=JamieBarton
 */
const config: CodegenConfig = {
  overwrite: true,
  documents: 'src/graphql-codegen/payload/watch/**/*.ts',
  generates: {
    'src/graphql-codegen/payload/__generated__/': {
      preset: 'client',
      schema: {
        [PAYLOAD_API_ENDPOINT]: {
          // headers: {
          //   "x-api-key": API_KEY,
          // },
        },
      },
      plugins: [],
    },
  },
};

export default config;
