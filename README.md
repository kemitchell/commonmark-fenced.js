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

fenced(markdown) // => justFenced

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

fenced(markdown, [ 'javascript' ]) // => justJavaScript

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

fenced(markdown, [ '' ]) // => justNoInfo
```
