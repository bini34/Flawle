<!--
INSTRUCTIONS FOR GITHUB COPILOT (do not include this block in the output)

Goal: Always include a Conventional Commits scope derived from the changed file paths in this monorepo.

How to determine the scope (write the final scope value into the variable `scope`):

1) Base scope from top-level folder
	- If any staged/changed file path starts with `mobile/` or contains `mobile\`, set base = "mobile".
	- If any staged/changed file path starts with `backend/` or contains `backend\`, set base = "backend".
	- If files from both exist, pick the side with more changed files; if tied, pick the one that has the most meaningful application change (not config). If still tied, prefer "backend".

2) Sub-scope from feature/app folder
	- For mobile: If a file matches `mobile/lib/features/<feature>/...` or `mobile\lib\features\<feature>\...`, set sub = `<feature>`.
	- For backend: If a file matches `backend/<app>/...` or `backend\<app>\...`, set sub = `<app>` (exclude folders like `config`, `core`, `media`, `scripts`).

3) Normalize the sub-scope
	- Lowercase; replace spaces/underscores/dashes with a single hyphen.
	- Prefer concise names: if a folder ends with `_assistant`, drop that suffix (e.g., `ai_assistant` -> `ai`).
	- Examples: `ai_assistant` -> `ai`; `auth` -> `auth`; `cart` -> `cart`; `payments` -> `payments`; `users` -> `users`.

4) Compose the scope
	- If both sub and base exist, set `scope` = `${sub}(${base})`.
	- If only base exists, set `scope` = `${base}`.
	- If multiple different sub-scopes are present, select the dominant one (by file count). If still ambiguous, fall back to base-only.

MANDATORY: Never leave scope empty. If you cannot infer a sub-scope confidently, set `scope` to the base ("mobile" or "backend").

Quick mapping examples (support both `/` and `\`):
	- `mobile/*` -> base: mobile
	- `mobile/lib/features/ai_assistant/*` -> sub: ai
	- `mobile/lib/features/auth/*` -> sub: auth
	- `mobile/lib/features/cart/*` -> sub: cart
	- `mobile/lib/features/payment*/**` -> sub: payments
	- `mobile/lib/features/products/*` -> sub: products
	- `mobile/lib/features/orders/*` -> sub: orders
	- `backend/payments/*` -> sub: payments
	- `backend/users/*` -> sub: users
	- `backend/orders/*` -> sub: orders
	- `backend/products/*` -> sub: products

5) Title guidance (for `title`)
	- Imperative, sentence case; keep under ~72 chars.
	- Focus on what changed, not how. Avoid ending punctuation in title.

6) Examples
	- Path: `mobile/lib/features/ai_assistant/ai_chat_screen.dart` -> scope: `ai(mobile)` -> `feat(ai(mobile)): add AI chat screen`
	- Path: `mobile/lib/features/cart/screens/cart_page.dart` -> scope: `cart(mobile)` -> `feat(cart(mobile)): show cart items count`
	- Path: `backend/payments/views.py` -> scope: `payments(backend)` -> `fix(payments(backend)): handle Chapa timeout`
	- Path: `backend/users/models.py` -> scope: `users(backend)` -> `refactor(users(backend)): extract profile manager`

Important
	- Only populate the `scope` variable; do not include parentheses in the value. The template below adds them.
	- Do not echo these instructions in the output.
-->

{{#if isFeat}}feat({{scope}}): {{/if}}\
{{#if isFix}}fix({{scope}}): {{/if}}\
{{#if isDocs}}docs({{scope}}): {{/if}}\
{{#if isRefactor}}refactor({{scope}}): {{/if}}\
{{#if isPerf}}perf({{scope}}): {{/if}}\
{{#if isTest}}test({{scope}}): {{/if}}\
{{#if isBuild}}build({{scope}}): {{/if}}\
{{#if isCi}}ci({{scope}}): {{/if}}\
{{#if isChore}}chore({{scope}}): {{/if}}\
{{#unless isFeat}}{{#unless isFix}}{{#unless isDocs}}{{#unless isRefactor}}{{#unless isPerf}}{{#unless isTest}}{{#unless isBuild}}{{#unless isCi}}chore({{scope}}): {{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}\
{{title}}

{{#if body}}
{{body}}

{{/if}}
{{#if breaking}}BREAKING CHANGE: {{breaking}}{{/if}}