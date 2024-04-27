/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    ignorePatterns: ['!.vitepress', 'cache', 'dist', 'useComponents.js'],
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@shiouhoo'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    overrides: [
        {
            files: ['Index.vue', 'index.vue', 'Demo.vue', 'Unocss.vue', 'Base.vue', 'useComponents.js'],
            rules: {
                'vue/multi-word-component-names': 'off',
            }
        }
    ],
    rules: {
    }
};
