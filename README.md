```javascript
var defence = require('defence')
var assert = require('assert')

var markdown = [
  "# H1",
  "",
  "```javascript",
  "console.log('first')",
  "```",
  "",
  "```",
  "No info string",
  "```",
  "",
  "```javascript",
  "console.log('second')",
  "```"
].join('\n')

var justFenced = [
  "",
  "",
  "",
  "console.log('first')",
  "",
  "",
  "",
  "No info string",
  "",
  "",
  "",
  "console.log('second')",
  ""
].join('\n')

assert.deepEqual(defence(markdown), justFenced)

var justJavaScript = [
  "",
  "",
  "",
  "console.log('first')",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "console.log('second')",
  ""
].join('\n')

assert.deepEqual(
  defence(markdown, [ 'javascript' ]),
  justJavaScript
)

var justNoInfo = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "No info string",
  "",
  "",
  "",
  "",
  ""
].join('\n')

assert.deepEqual(
  defence(markdown, [ '' ]),
  justNoInfo
)
```
