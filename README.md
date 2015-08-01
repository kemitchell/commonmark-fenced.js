```javascript
var fenced = require('./')

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
  "",
  "",
  "",
  "console.log('test')",
  "",
  "",
  "",
  "No info string",
  ""
].join('\n')

var justJavaScript = [
  "",
  "",
  "",
  "console.log('test')",
  "",
  "",
  "",
  "",
  ""
].join('\n')

var justNoInfo = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "No info string",
  ""
].join('\n')

fenced(markdown) // => justFenced
fenced(markdown, [ 'javascript' ]) // => justJavaScript
fenced(markdown, [ '' ]) // => justNoInfo
```
