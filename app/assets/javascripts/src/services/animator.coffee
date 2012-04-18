class Trackwane.Services.Animator

  animations: []

  frame: 0

  constructor: (@onAnimationFinished) ->
    @log = Trackwane.Logger.get("Animator")

  add: (animation) ->
    @log.debug("Adding animation for device #{animation.device_id} at frame #{@frame}.")
    isDuplicate = _.any @animations, ((current) -> current.device_id == animation.device_id)
    if isDuplicate
      @raiseDuplicationError(animation)
    else
      @animations.push(animation)

  raiseDuplicationError: (animation) ->
    clearTimeout(@timeout);
    throw new Error("Attempted to insert a duplication animation for device #{animation.device_id}.")

  animationLoop: ->
    animationsToRemove = []
    @log.debug("Executing animations at frame #{@frame}")
    if not _.isEmpty(@animations)
      _.each @animations, (animation) =>
        animation.execute(@frame)
        if animation.finished
          animationsToRemove.push(animation)
          @onAnimationFinished(animation.device_id)
      _.each animationsToRemove, (animationToRemove) =>
        @animations = _.filter @animations, (animation) =>
          animation.device_id != animationToRemove.device_id
    @frame = @frame + 1
    @timeout = setTimeout(@animationLoop.bind(this), @delta)

  start: (delta) ->
    @delta = delta
    @animationLoop()
