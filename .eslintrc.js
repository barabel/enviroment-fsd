module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["standard-with-typescript", "plugin:react-hooks/recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "plugins": [
        "react-hooks"
    ],
    "ignorePatterns": ["/*.js"],
    "rules": {
        "@typescript-eslint/semi": 0,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
        "no-console": ["warn", { "allow": ["warn", "error"] }],
        "@typescript-eslint/ban-types": ["error",
            {
                "types": {
                    "Function": false,
                },
                "extendDefaults": true
            }
        ],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": ["error", "never"],
        "@typescript-eslint/strict-boolean-expressions": 'off',
        "no-new": "off",
        "react-hooks/exhaustive-deps": 'off'
    }
}
