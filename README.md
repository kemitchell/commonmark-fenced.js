```javascript
var defence = require('defence')
var assert = require('assert')

var markdown = [
  /*  1 */ "# H1",
  /*  2 */ "",
  /*  3 */ "```javascript",
  /*  4 */ "console.log('first')",
  /*  5 */ "```",
  /*  6 */ "",
  /*  7 */ "```",
  /*  8 */ "No info string",
  /*  9 */ "```",
  /* 10 */ "",
  /* 11 */ "```javascript",
  /* 12 */ "console.log('second')",
  /* 13 */ "```" ].join('\n')

var justFenced = [
  /*  1 */ "",
  /*  2 */ "",
  /*  3 */ "",
  /*  4 */ "console.log('first')",
  /*  5 */ "",
  /*  6 */ "",
  /*  7 */ "",
  /*  8 */ "No info string",
  /*  9 */ "",
  /* 10 */ "",
  /* 11 */ "",
  /* 12 */ "console.log('second')",
  /* 13 */ "" ].join('\n')

assert.deepEqual(defence(markdown), justFenced)

var justJavaScript = [
  /*  1 */ "",
  /*  2 */ "",
  /*  3 */ "",
  /*  4 */ "console.log('first')",
  /*  5 */ "",
  /*  6 */ "",
  /*  7 */ "",
  /*  8 */ "",
  /*  9 */ "",
  /* 10 */ "",
  /* 11 */ "",
  /* 12 */ "console.log('second')",
  /* 13 */ "" ].join('\n')

assert.deepEqual(defence(markdown, [ 'javascript' ]), justJavaScript)

var justNoInfo = [
  /*  1 */ "",
  /*  2 */ "",
  /*  3 */ "",
  /*  4 */ "",
  /*  5 */ "",
  /*  6 */ "",
  /*  7 */ "",
  /*  8 */ "No info string",
  /*  9 */ "",
  /* 10 */ "",
  /* 11 */ "",
  /* 12 */ "",
  /* 13 */ "" ].join('\n')

assert.deepEqual(defence(markdown, [ '' ]), justNoInfo)
```
