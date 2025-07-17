// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  {
    files: ["src/**/*.js"], // Aplica esta configuración solo a tus archivos JS en 'src'
    rules: {
      // Tus reglas personalizadas aquí
      "no-unused-vars": "warn",
      "indent": ["error", 2], // Ejemplo: 2 espacios de indentación
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "backtick", { "avoidEscape": true }],
      "semi": ["error", "always"]
    }
  }
];