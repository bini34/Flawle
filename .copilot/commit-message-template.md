{{#if isFeat}}feat{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isFix}}fix{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isDocs}}docs{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isRefactor}}refactor{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isPerf}}perf{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isTest}}test{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isBuild}}build{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isCi}}ci{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#if isChore}}chore{{#if scope}}({{scope}}){{/if}}: {{/if}}\
{{#unless isFeat}}{{#unless isFix}}{{#unless isDocs}}{{#unless isRefactor}}{{#unless isPerf}}{{#unless isTest}}{{#unless isBuild}}{{#unless isCi}}chore: {{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}{{/unless}}\
{{title}}

{{#if body}}
{{body}}

{{/if}}
{{#if breaking}}BREAKING CHANGE: {{breaking}}{{/if}}