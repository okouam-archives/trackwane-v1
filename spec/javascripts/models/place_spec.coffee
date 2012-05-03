#= require libraries
#= require spec
#= require application

describe 'Trackwane.Models.Place', =>

  describe 'when parsing a server response', =>

    it 'creates a OpenLayers.Point from the coordinates', =>
      attributes = {}
      place = new Trackwane.Models.Place(attributes)

    it 'create a OpenLayers.Lonlat from the coordinates', =>
      console.debug window.Trackwane


