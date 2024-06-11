/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier/skip-formatting",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "vue/multi-word-component-names": "off",
        "no-extra-boolean-cast": "off",
        "vue/no-side-effects-in-computed-properties": "off",
        "vue/no-v-text-v-html-on-component": "off",
        "no-fallthrough": "off",
        "vue/no-deprecated-slot-attribute": "off",
        indent: [0, "tab"],
        useTabs: "off",
        "prettier/prettier": [
            "error",
            {
                doubleQuote: true,
                semi: true,
                tabWidth: 4,
                printWidth: 120,
                "editor.formatOnSave": true,
                "prettier.eslintIntegration": true,
                arrowParens: "always",
                endOfLine: "auto",
                useTabs: false,
            },
        ],
    },
};
