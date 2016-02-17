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
  var event, node, startLine, endLine
  var lastBlockEndedOnLine = 1
  var output = ''
  function isMatchingFencedCode(event, node) {
    return (
      event.entering === true &&
      node.type === 'CodeBlock' &&
      infoMatches(node.info) ) }
  event = walker.next()
  while (event) {
    node = event.node
    if (isMatchingFencedCode(event, node)) {
      startLine = firstLineOf(node)
      endLine = lastLineOf(node)
      if (startLine > lastBlockEndedOnLine) {
        output += newlines(( startLine - lastBlockEndedOnLine + 1 )) }
      lastBlockEndedOnLine = endLine
      output += node.literal }
    else if (isEndOfDocument(event, node)) {
      var lastLineOfDocument = lastLineOf(node)
      output += newlines(lastLineOfDocument - lastBlockEndedOnLine + 1) }
    event = walker.next() }
  return output }

function isEndOfDocument(event, node) {
  return (
    event.entering === false &&
    node.type === 'Document' ) }

function lastLineOf(node) {
  return node.sourcepos[1][0] }

function firstLineOf(node) {
  return node.sourcepos[0][0] }

function newlines(number) {
  return new Array(number + 1).join(EOL) }
