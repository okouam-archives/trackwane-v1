Trackwane.Core.Traits.Editor =

  accept: (callback) ->
    @$el.find("form").validate(_.extend(@validation_rules, callback))

  close: () ->
    @$el.empty();
    @$el.hide();

  render: () ->
    @$el.html(@template)
    @$el.show()
