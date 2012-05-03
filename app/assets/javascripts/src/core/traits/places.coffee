Trackwane.Core.Traits.Places =

  activatePointBuilder: () ->
    @point_builder = new Trackwane.Core.Controls.PointBuilder(@map, @pubsub)  if !@point_builder
    @point_builder.activate()

  clearPointBuilder: () ->
    @point_builder.deactivate() if @point_builder