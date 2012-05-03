Trackwane.Core.Traits.Alarms =

  activatePolygonBuilder: ->
    @polygon_builder ?= new Trackwane.Core.Controls.PolygonBuilder(@map, @pubsub)
    @polygon_builder.activate()

  clearPolygonBuilder: ->
    @polygon_builder.deactivate() if @polygon_builder