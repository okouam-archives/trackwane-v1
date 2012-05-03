class Trackwane.Views.Realtime.Trackers.Panel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime.Trackers

  events:
    "click #btn-new-tracker": "onCreateTracker"

  appEvents:
    "tracker:selected": "onTrackerSelected"
    "tracker:created": "onTrackerCreated"
    "tracker:saved": "onTrackerSaved"
    "tracker:deleted": "onTrackerDeleted"

  initialize: (options) ->
    super(options)
    @listing = new @Scope.Listing({el: "#canvas #trackers", pubsub: @pubsub})
    @editor = new @Scope.Editor({el: "#tracker-panel .editor", pubsub: @pubsub})

  onTrackerSelected: (event_id) ->
    @pubsub.trigger("app:action")

  onCreateTracker: (evt) ->
    @pubsub.trigger("tracker:create")
    @editor.render()

  onTrackerCreated: (attributes) ->
    device = new Trackwane.Models.Device(attributes)
    callbacks =
      success: (model) =>
        @trackers.add(model)
        @pubsub.trigger("trackers:fetched", @trackers)
        @editor.close()
        @render(@trackers)
    device.save(null, callbacks)

  onTrackerDeleted: ->

  onTrackerSaved: ->

  render: (trackers) ->
    @trackers = trackers;
    @listing.render(trackers)
