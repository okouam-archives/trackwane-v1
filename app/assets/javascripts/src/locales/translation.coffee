$.t = (key) ->
  keys = key.split '.'
  current = $.translations[$.locale]
  for identifier in keys
    current = current[identifier]
  current