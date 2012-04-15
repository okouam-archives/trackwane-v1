Array::remove = (v) -> $.grep @,(e)->e!=v

class App.Logger

  @active: []

  @level: 0

  constructor: (@name) ->

  error: ->
    console?.error(arguments)

  warn: ->
    console?.warn(arguments) if App.Logger.level > 1 && @isActive(@name)

  info: ->
    console?.info(arguments) if App.Logger.level > 0 && @isActive(@name)

  debug: ->
    console?.debug(arguments) if App.Logger.level > -1 && @isActive(@name)

  isActive: (name) ->
    name in App.Logger.active

  @get: (name) ->
    new App.Logger(name)

  @on: (name) ->
    App.Logger.active.push(name)

  @off: (name) ->
    @active = App.Logger.active.remove(name) if @isActive(name)
