<!--
INSTRUCTIONS FOR GITHUB COPILOT (do not remove)

Goal: Always include a Conventional Commits scope derived from the changed file paths in this monorepo.

---

## How to determine the `scope`

1. **Base scope from top-level folder**
   - If any changed/staged file path starts with `mobile/` → base = `mobile`
   - If any changed/staged file path starts with `backend/` → base = `backend`
   - If both appear, pick the one with more files changed.
   - If tied, prefer `backend`.

2. **Sub-scope from feature or app folder**
   - For mobile:
     - If path matches `mobile/lib/features/<feature>/...` → sub = `<feature>`
   - For backend:
     - If path matches `backend/<app>/...` → sub = `<app>`
     - Exclude generic folders like `config`, `core`, `media`, `scripts`
   - Normalize: lowercase, replace underscores/dashes with `-`
   - Simplify names: e.g. `ai_assistant` → `ai`

3. **Compose scope**
   - If both exist: `scope = sub(base)` (e.g. `ai(mobile)`)
   - If only base: `scope = base`
   - If multiple sub-scopes → choose dominant by file count; fallback = base.

4. **Example mappings**
   - `mobile/lib/features/auth/login_screen.dart` → `auth(mobile)`
   - `mobile/lib/features/ai_assistant/chat.dart` → `ai(mobile)`
   - `backend/users/models.py` → `users(backend)`
   - `backend/payments/views.py` → `payments(backend)`

---

## Title guidance

- Use imperative mood and sentence case (e.g. “add AI chat screen”)
- Keep under ~72 characters
- No ending punctuation
- Focus on *what* changed, not *how*

---

## Commit message template
-->

{{#if isFeat}}feat({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isFix}}fix({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isDocs}}docs({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isRefactor}}refactor({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isPerf}}perf({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isTest}}test({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isBuild}}build({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isCi}}ci({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#if isChore}}chore({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/if}}
{{#unless isFeat}}{{#unless isFix}}{{#unless isDocs}}{{#unless isRefactor}}{{#unless isPerf}}{{#unless isTest}}{{#unless isBuild}}{{#unless isCi}}chore({{#if sub}}{{sub}}({{base}}){{else}}{{base}}{{/if}}): {{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}
{{title}}

{{#if body}}
{{body}}
{{/if}}

{{#if breaking}}
BREAKING CHANGE: {{breaking}}
{{/if}}
