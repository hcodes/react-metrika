# 1.2.0
- Updated counter initialization options and method typings according to the current Yandex Metrika documentation while preserving existing initialization forms.
- Added the `firstPartyParamsHashed` and `destruct` overloads.
- Removed counters from the local registry only after a successful `destruct`.
- Improved script loading state handling.
- Added the default script URL to `loadMetrikaScript()`.
- Corrected the README examples and documentation links, including SPA and Next.js usage guidance.

# 1.1.0
- Added the `scriptUrl` prop to the `MetrikaCounter` and `MetrikaCounters` components.
- Updated dev dependencies.

# 1.0.0
Updated dev deps in package.json.

# 0.3.3
- Fixed commonjs build.
- Update dev deps in package.json.

# 0.3.2
Fixes for TS typings.

# 0.3.1
Fixes for TS typings.

# 0.3.0
- Added `getMetrikaCounterIds` helper.
- Added additional script loading check.
- Fixes for TS typings.
