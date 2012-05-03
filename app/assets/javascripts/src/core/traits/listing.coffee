Trackwane.Core.Traits.Listing =

  onMasterToggle: () ->
    checkboxes = @select("td input")
    if @select("th input").is(":checked")
      notChecked = checkboxes.not(":checked")
      if notChecked.length > 0
        notChecked.each (i, item) =>
          $(item).attr("checked", true)
          @changeVisibility($(item).data("id"))
    else
      checkboxes.each (i, item) =>
        $(item).attr("checked", false)
        @changeVisibility($(item).data("id"))

  onToggle: (evt) ->
    id = $(evt.currentTarget).data("id")
    @changeVisibility(id)