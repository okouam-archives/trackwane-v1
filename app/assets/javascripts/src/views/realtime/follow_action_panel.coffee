class Trackwane.Views.Realtime.FollowActionPanel extends Trackwane.Views.Base

  initialize: (options) ->
    @pubsub = options.pubsub
    @template = Handlebars.compile($("#follow-panel-template").html())

  clear: ->
    @$el.empty()

  render: ->
    @$el.html(@template)