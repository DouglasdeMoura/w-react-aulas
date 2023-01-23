// eslint-disable-next-line @typescript-eslint/no-var-requires
const stylomatic = require('stylomatic/eslint-preset')

module.exports = {
  ...stylomatic,
  rules: {
    ...stylomatic.rules,
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
}
