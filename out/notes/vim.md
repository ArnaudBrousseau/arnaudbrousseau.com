Here are some nice tips and tricks I learned while practicing VIM at work or at
home.

## Setting VIM's syntax highlighter to a particular language
The answer is a single command: `setf`  
(`setf markdown`, `setf javascript`, etc)

## Look up docs about a function, a command, anything
When your cursor is on a word, press shift+K.

## Delete efficiently
`dtx` => __d__eletes un__t__il `x` (NOT including character `x`). It's super useful to delete until the next parens. For instance: `dt)` or `dt{`  
`ctx` => lets you go to insert mode after deletion (__c__hange vs __d__elete)

## Ctags
Ctags are pretty old fashioned but they work surprisingly well. I use them
mostly at work when diving into unfamiliar Python code.  
`ctrl+]` lets you lookup a symbol, `ctrl+T` brings you back to where you were.

## Autocomplete
Vim has native autocomplete!  
`ctrl+N` to trigger autocomplete and `ctrl+N`/`ctrl+P` to iterate over
suggestions. By default Vim searches the current file and opened buffers.

## Personal .vimrc
Each vim user has to have his/her personal .vimrc. I open sourced mine on
Github, over there: https://github.com/ArnaudBrousseau/dotfiles/blob/master/vimrc
