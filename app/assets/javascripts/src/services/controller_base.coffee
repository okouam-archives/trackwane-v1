class Trackwane.Controllers.Base extends Backbone.View

  init: ->
    @pubsub = _.extend({}, Backbone.Events)
    @handleApplicationEvents()

  handleApplicationEvents: ->
    if @appEvents
      events = _.keys(@appEvents)
      _.each(events, (key) => @pubsub.on(key, @[@appEvents[key]].bind(this)))



