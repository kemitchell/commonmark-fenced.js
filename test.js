var tape = require('tape')
var defence = require('./')
var fs = require('fs')
var glob = require('glob')
var path = require('path')

tape.test(function (test) {
  glob.sync('tests/*').forEach(function (directory) {
    test.equal(
      defence(
        read(path.join(directory, 'input')),
        readJSON(path.join(directory, 'infostrings'))
      ),
      read(path.join(directory, 'output')),
      directory)
  })
  test.end()
})

function read (file) {
  try {
    return fs.readFileSync(file).toString()
  } catch (e) {
    return undefined
  }
}

function readJSON (file) {
  try {
    var input = fs.readFileSync(file).toString()
    return JSON.parse(input)
  } catch (e) {
    return undefined
  }
}

tape.test('fence on line 1', function (test) {
  var input = [
    '```',
    'Line 2',
    '```',
    'Line 4',
    'Line 5',
    '```',
    'Line 7',
    '```'
  ]
  var result = defence(input.join('\n'), [''])
  checkNumberedLines(test, result)
  test.end()
})

tape.test('numbered lines', function (test) {
  var input = []
  for (var counter = 0; counter < 100; counter++) {
    input.push('Line ' + (counter + 1))
  }
  var replaced = [
    1, 4,
    20, 22,
    30, 31,
    60, 67,
    80, 99
  ]
  replaced.forEach(function (index) {
    input[index] = '```'
  })
  var result = defence(input.join('\n'), [''])
  checkNumberedLines(test, result)
  test.end()
})

function checkNumberedLines (test, result) {
  result
    .split('\n')
    .forEach(function (line, offset) {
      var match = /^Line (\d+)$/.exec(line)
      if (match) {
        var number = parseInt(match[1])
        test.strictEqual(number, offset + 1, line)
      }
    })
}
