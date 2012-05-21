class Trackwane.Views.Realtime.Trackers.Panel extends Trackwane.Core.Framework.View

  Scope: Trackwane.Views.Realtime.Trackers

  events:
    "click #btn-new-tracker": "onCreateTracker"
    "click #toggle-trackers": "onShowHidePanel"

  appEvents:
    "tracker:selected": "onTrackerSelected"
    "tracker:created": "onTrackerCreated"
    "tracker:saved": "onTrackerSaved"
    "tracker:deleted": "onTrackerDeleted"

  initialize: (options) ->
    super(options)
    @listing = new @Scope.Listing({el: "#canvas #trackers", pubsub: @pubsub})
    @editor = new @Scope.Editor({el: "#tracker-panel .editor", pubsub: @pubsub})

  onTrackerSelected: (device_id) ->
    trackers = @trackers.where({"device_id": device_id})
    @pubsub.trigger("feature:select", trackers[0])

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

  onShowHidePanel: () ->
    $(@$el).find(".listing").toggle('slow')
    false

  onTrackerDeleted: (id) ->
    @trackers.get(id).destroy();
    @render(@trackers)

  onTrackerSaved: ->

  update: (event) ->
    @listing.update(event)

  render: (trackers) ->
    @trackers = trackers;
    @listing.render(trackers)
