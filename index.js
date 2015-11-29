module.exports = defence

var commonmark = require('commonmark')
var EOL = require('os').EOL

function defence(markup, infoStrings) {
  var infoMatches = (
    infoStrings === undefined ?
      function infoMatches() {
        return true } :
      function(info) {
        return infoStrings.some(function(permitted) {
          return permitted === info }) } )
  var walker = new commonmark.Parser().parse(markup).walker()
  var event, node, startLine
  var lastBlockEndedOnLine = 1
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
  event = walker.next()
  while (event) {
    node = event.node
    if (isMatchingFencedCode(event, node)) {
      startLine = firstLineOf(node)
      if (startLine > lastBlockEndedOnLine) {
        output += newlines(( startLine - lastBlockEndedOnLine ) + 1) }
      lastBlockEndedOnLine = lastLineOf(node) - 1
      output += chop(node.literal) }
    else if (isEndOfDocument(event, node)) {
      lastLineOfDocument = lastLineOf(node)
      if (lastLineOfDocument > lastBlockEndedOnLine) {
        output += newlines(lastLineOfDocument - lastBlockEndedOnLine) } }
    event = walker.next() }
  return output }

function lastLineOf(node) {
  return node.sourcepos[1][0] }

function firstLineOf(node) {
  return node.sourcepos[0][0] }

function newlines(number) {
  return new Array(number + 1).join(EOL) }

function chop(string) {
  return string.slice(0, string.length - 1) }
