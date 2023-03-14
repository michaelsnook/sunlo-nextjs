import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './app/data/schema.graphql',
  documents: './app/data/*.js',
  generates: {
    './app/data/gql/': {
      preset: 'client',
      presetConfig: {
        skipTypename: true,
        fragmentMasking: false,
      },
      plugins: [],
    },
  },
}

export default config
