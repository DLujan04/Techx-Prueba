{
    "parser": "@typescript-eslint/parser",
        "parserOptions": {
        "ecmaVersion": 2020,
            "sourceType": "module"
    },
    "plugins": ["@typescript-eslint", "prettier"],
        "extends": [
            "plugin:@typescript-eslint/recommended",
            "plugin:prettier/recommended"
        ],
            "rules": {
        "prettier/prettier": "error"
    }
}
