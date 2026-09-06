import { defineConfig, globalIgnores } from 'eslint/config'
import lintRules from 'eslint-config-next'
 
export default defineConfig([
  ...lintRules,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);
