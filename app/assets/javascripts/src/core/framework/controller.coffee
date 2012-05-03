moduleKeywords = ['extended', 'included']

class Trackwane.Core.Framework.Controller extends Backbone.View

  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @[key] = value
    obj.extended?.apply(@)
    this

  @include: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @::[key] = value
    obj.included?.apply(@)
    this

  initialize: (options) ->
    super(options)
    @pubsub = _.extend({}, Backbone.Events)
    @handleApplicationEvents()

  init: (options) ->
    @pubsub = _.extend({}, Backbone.Events)
    @handleApplicationEvents()

  handleApplicationEvents: ->
    if @appEvents
      events = _.keys(@appEvents)
      _.each(events, (key) => @pubsub.on(key, @[@appEvents[key]].bind(this)))



