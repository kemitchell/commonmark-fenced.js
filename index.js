var commonmark = require('commonmark')

function lastLineOf(node) {
  return node.sourcepos[1][0] }

function firstLineOf(node) {
  return node.sourcepos[0][0] }

function newlines(number) {
  return new Array(number).join("\n") }

function chop(string) {
  return string.slice(0, string.length - 1) }

function commonmarkFenced(markup, infoStrings) {
  var infoMatches = (
    infoStrings === undefined ? 
      function infoMatches() {
        return true } :
      function(info) {
        return infoStrings.some(function(permitted) {
          return permitted === info }) } )
  var walker = new commonmark.Parser().parse(markup).walker()
  var event, node, isMatchingFencedCode, startLine, endLine
  var lastBlockBeganOnLine = 0
  var output = ''
  var lastLineOfDocument = 0
  function isMatchingFencedCode(event, node) {
    return (
      event.entering === true &&
      node.type === 'CodeBlock' &&
      infoMatches(node.info) ) }
  function isEndOfDocument(event, node) {
    return (
      event.entering === false &&
      node.type === 'Document' ) }
  while (event = walker.next()) {
    node = event.node
    if (isMatchingFencedCode(event, node)) {
      startLine = firstLineOf(node)
      if (startLine > lastBlockBeganOnLine) {
        output += newlines((startLine - lastBlockBeganOnLine) + 1) }
      endLine = lastLineOf(node)
      lastBlockBeganOnLine = startLine
      output += chop(node.literal) }
    else if (isEndOfDocument(event, node)) {
      lastLineOfDocument = lastLineOf(node)
      if (lastLineOfDocument > lastBlockBeganOnLine) {
        output += newlines(lastLineOfDocument - lastBlockBeganOnLine) } } }
  return output }

module.exports = commonmarkFenced
