Extract fenced code from CommonMark documents.

```javascript
var defence = require('defence')

var markdown = [
  "# H1",
  "",
  "```javascript",
  "console.log('test')",
  "```",
  "",
  "```",
  "No info string",
  "```"
].join('\n')

var justFenced = [
  "", "", "",
  "console.log('test')",
  "", "", "",
  "No info string",
  ""
].join('\n')

defence(markdown) // => justFenced

var justJavaScript = [
  "", "", "",
  "console.log('test')",
  "", "", "", "", ""
].join('\n')

defence(markdown, [ 'javascript' ]) // => justJavaScript

var justNoInfo = [
  "", "", "", "", "", "", "",
  "No info string",
  ""
].join('\n')

defence(markdown, [ '' ]) // => justNoInfo
```
