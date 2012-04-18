class Trackwane.Views.Realtime.SendCommandActionPanel extends Trackwane.Views.Base

  events:
    "click button": "onSendCommand"

  initialize: (options) ->
    @template = Handlebars.compile($("#send-command-panel-template").html())
    @pubsub = options.pubsub

  onSendCommand: ->
    @pubsub.trigger("command:sent", 3, "TEST MESSAGE")

  clear: ->
    @$el.empty()

  render: (msg) ->
    @$el.html(this.template(msg))
