docpadConfig = {
  plugins:
    marked:
      markedRenderer:
        # This automatically adds rel="noopener" to all marked-rendered links,
        # for security reasons (see https://webhint.io/docs/user-guide/hints/hint-disown-opener/)
        link: (href, title, text) ->
          output = '<a rel="noopener" href="' + href + '" title="' + (title||'') + '">' + text + '</a>'
}

module.exports = docpadConfig
