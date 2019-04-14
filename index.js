module.exports = defence

var commonmark = require('commonmark')
var EOL = require('os').EOL

function defence (markup, infoStrings) {
  // Create a predicate function to identify fenced code blocks to
  // be preserved in output.
  var enteringMatchingFencedCode = (
    infoStrings === undefined
      ? enteringFencedCodeBlock
      : function (event, node) {
        return (
          enteringFencedCodeBlock(event, node) &&
          infoStrings.some(function (permitted) {
            return permitted === node.info
          })
        )
      }
  )

  // Parse the input markup.
  var walker = new commonmark.Parser()
    .parse(markup)
    .walker()

  // Walk the parse tree.
  var event, node, startLine, endLine
  var lastBlockEndedOnLine = 1
  var output = ''
  event = walker.next()
  while (event) {
    node = event.node
    // Process matching fenced code blocks.
    if (enteringMatchingFencedCode(event, node)) {
      startLine = firstLineOf(node)
      endLine = lastLineOf(node)
      output += newlines(startLine - lastBlockEndedOnLine + 1)
      lastBlockEndedOnLine = endLine
      output += node.literal

    // End the document.
    } else if (endingDocument(event, node)) {
      var lastLineOfDocument = lastLineOf(node)
      output += newlines(lastLineOfDocument - lastBlockEndedOnLine + 1)
    }
    event = walker.next()
  }

  return output
}

function enteringFencedCodeBlock (event, node) {
  return (
    event.entering === true &&
    node.type === 'code_block'
  )
}

function endingDocument (event, node) {
  return (
    event.entering === false &&
    node.type === 'document'
  )
}

function lastLineOf (node) {
  return node.sourcepos[1][0]
}

function firstLineOf (node) {
  return node.sourcepos[0][0]
}

function newlines (number) {
  return new Array(number + 1).join(EOL)
}
