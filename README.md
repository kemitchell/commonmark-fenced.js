The package exports a single function.

The function's first argument is a string of CommonMark markup.

The function's second, optional, argument is an array of strings.
Each string is a fenced code block "infostring" or the empty string
signifying no infostring.

The function returns a string equal to its first argument, but with all
content outside of fenced code blocks filtered out. If a second argument
was passed, only content in fenced code blocks with matching passed
infostrings is retained. In this way, fenced code block content appears
on the same line in the output as it did in the input.
