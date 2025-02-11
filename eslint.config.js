import js from '@eslint/js'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  react.configs.recommended,
  {
    rules: {
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]
