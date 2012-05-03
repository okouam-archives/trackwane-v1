class Trackwane.Views.Realtime.Places.Listing extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Listing

  own_events:
    onChecked: "place:show"
    om

  template_id: "#place-listing-template"

  events:
    "click a.select": "onSelect"
    "click a.remove": "onRemove"
    "click td input[type='checkbox']": "onToggle"
    "click th input[type='checkbox']": "onMasterToggle"

  changeVisibility: (id) ->
    if @isChecked(id)
      @publish("place:show", id)
    else
      master = @select("th input")
      if master.is(":checked")
        master.attr("checked", false)
      @publish("place:hide", id)

  onRemove: (evt) ->
    if confirm("Are you sure you want to delete this place?")
      id = $(evt.currentTarget).data("id")
      @publish("place:deleted", id)

  onSelect: (evt) ->
    id = $(evt.currentTarget).data("id")
    unless @isChecked(id)
      input = @findCheckbox(id)
      input.attr("checked", "checked")
      @onToggle(evt)
    @publish("place:selected", id)

  findCheckbox: (id) ->
    @select("input[data-id='#{id}']")

  isChecked: (id) ->
    input = @findCheckbox(id)
    input && input.is(":checked")

  render: (places) ->
    @$el.html(@template(places))
