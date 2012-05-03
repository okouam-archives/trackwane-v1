moduleKeywords = ['extended', 'included']

class Trackwane.Core.Framework.View extends Backbone.View

  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @[key] = value
    obj.extended?.apply(@)
    this

  @include: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @::[key] = value
    obj.included?.apply(@)
    this

  template: null

  pubsub: null

  initialize: (options) ->
    super(options)
    @validate(options)
    @pubsub = options.pubsub
    @template = Handlebars.compile($(@template_id).html())
    @handleApplicationEvents() if @appEvents

  validate: (options) ->
    throw "[Trackwane] Publish-Subscribe mechanism is not initialized." unless options.pubsub
    if @template_id && $(@template_id).length == 0
      throw "[Trackwane] The template ID #{@template_id} could not be located."

  hide: () ->
    @$el.hide()

  show: () ->
    @$el.show()

  select: (selector) ->
    @$el.find(selector)

  publish: (event, data) ->
    @pubsub.trigger(event, data)

  handleApplicationEvents: ->
    if @appEvents != undefined
      events = _.keys(@appEvents)
      _.each events, (key) =>
        throw "[Trackwane] The method #{@appEvents[key]} is not a defined." unless @[@appEvents[key]]
        @pubsub.on(key, @[@appEvents[key]].bind(this))
