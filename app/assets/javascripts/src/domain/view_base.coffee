class Trackwane.Views.Base extends Backbone.View

  handleApplicationEvents: ->
    if @appEvents
      events = _.keys(@appEvents)
      _.each(events, (key) => @pubsub.on(key, @[@appEvents[key]].bind(this)))
