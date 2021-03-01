import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import externalDeps from "rollup-plugin-peer-deps-external";
import size from "rollup-plugin-size";
import sourcemaps from "rollup-plugin-sourcemaps";

import pkg from "./package.json";

const globals = {
  react: "React",
};

const extensions = [".js", ".jsx", ".es6", ".es", ".mjs"];
const babelOptions = {
  exclude: /node_modules/,
  extensions,
  babelHelpers: "runtime",
  configFile: "../../.babelrc.js",
};

const resolveConfig = { extensions };

export default {
  input: pkg.source,
  output: [
    {
      name: "materialPickersCalendar",
      sourcemap: true,
      file: "dist/index.js",
      format: "cjs",
      globals,
      exports: "named",
    },

    {
      name: "materialPickersCalendar",
      sourcemap: true,
      file: "dist/index.esm.js",
      format: "esm",
      globals,
      exports: "named",
    },

    {
      name: "materialPickersCalendar",
      sourcemap: true,
      file: "dist/index.umd.production.min.js",
      format: "umd",
      globals,
      exports: "named",
    },
  ],
  external: Object.keys(globals),
  plugins: [
    resolve(resolveConfig),
    babel(babelOptions),
    commonjs(),
    externalDeps(),
    terser(),
    size(),
    sourcemaps(),
  ],
};
