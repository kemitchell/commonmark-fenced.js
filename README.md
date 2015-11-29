```javascript
var defence = require('defence')
var assert = require('assert')

// Defence takes CommonMark input in and returns a string with the same
// number of lines, including just the text of code blocks you specify.

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

// By default, extract the text of all fenced code blocks.

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

// You can also specify fenced code blocks with specific info strings.

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

// The empty string means "fenced code blocks without info strings".

assert.deepEqual(defence(markdown, [ '' ]), justNoInfo)
```
