class Trackwane.Views.Realtime.Places.Listing extends Trackwane.Core.Framework.View
  @include Trackwane.Core.Traits.Listing

  template_id: "#place-listing-template"

  events:
    "click a.select": "onSelect"
    "click a.remove": "onRemove"
    "click td input[type='checkbox']": "onToggle"
    "click th input[type='checkbox']": "onMasterToggle"
    "click a.row-action.info": "onInfoAction"
    "click a.row-action.delete": "onDeleteAction"
    "click a.row-action.edit": "onEditAction"

  onInfoAction: (evt) ->
    alert "Not implemented"

  onDeleteAction: (evt) ->
    if confirm("Are you sure you want to delete this place?")
      @publish("place:deleted", $(evt.currentTarget).parents("td").find(".name").data("id"))
    false

  onEditAction: (evt) ->
    alert "Not implemented"

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
