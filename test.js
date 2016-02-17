var tape = require('tape')
var defence = require('./')
var fs = require('fs')
var glob = require('glob')
var path = require('path')

tape.test(function(test) {
  glob.sync('tests/*')
    .forEach(function(directory) {
      test.equal(
        defence(
          read(path.join(directory, 'input')),
          readJSON(path.join(directory, 'infostrings'))),
        read(path.join(directory, 'output')),
        directory) })
  test.end() })

function read(file) {
  try {
    return fs.readFileSync(file).toString() }
  catch (e) {
    return undefined } }

function readJSON(file) {
  try {
    var input = fs.readFileSync(file).toString()
    return JSON.parse(input) }
  catch (e) {
    return undefined } }
