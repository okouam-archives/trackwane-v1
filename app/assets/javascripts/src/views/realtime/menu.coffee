class Trackwane.Views.Menu extends Trackwane.Core.Framework.View

  events:
    "click .toggle": "onToggleMenu"

  initialize: (options) ->
    super(options)

  onToggleMenu: ->
    if @$el.css("margin-top") == "-52px"
      @$el.css("margin-top", "-25px")
    else
      @$el.css("margin-top", "-52px")

  render: (options) ->