class Trackwane.Views.Realtime.Trackers.Editor extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Editor

  validation_rules: Trackwane.Models.Device.validation_rules

  template_id: "#tracker-editor-template"

  events:
    "click .create": "onCreate",
    "click .cancel": "onClose",
    "click .save": "onSave"

  initialize: (options) ->
    super(options)

  onCreate: () ->
    callback =
      submitHandler: () =>
        attributes = @formAttributes();
        @publish("tracker:created", attributes)
    @select("form").validate(_.extend(@validation_rules, callback));

  onDelete: () ->
    attributes = @formAttributes();
    @publish("tracker:deleted", attributes);

  onClose: () ->
    @close()

  onSave: () ->
    callback =
      submitHandler: () =>
        attributes = @formAttributes()
        @publish("tracker:saved", attributes)
    @select("form").validate(_.extend(Trackwane.Models.Device.validation_rules, callback));

  formAttributes: () ->
    attributes = {}
    items = @select("input, select")
    items.each (i, item) ->
      key = $(item).attr("name")
      attributes[key] = $(item).val() if key
    attributes

  render: (tracker) ->
    tracker ||= {}
    @$el.html(@template(tracker))
    @$el.show()

