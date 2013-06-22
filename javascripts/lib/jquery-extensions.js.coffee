$.fn = _.extend $.fn ,

  # Determine if an element exists in the DOM
  exists: ->
    if @.closest('html').length isnt 0 then @ else false

  # Clean elements from a jQuery collection which are no longer in the DOM (have been removed)
  clean: ->
    @.not -> !$(@).exists()
  
  # Set an element's attribute only if it doesn't already exist, like or= for jQuery's attr
  orAttr: (property, value)->
    @attr(property, value) unless @attr(property)?
    @

  # Add a class until a period of time. Fires a callback when complete
  addClassUntil: (className, time=400, onComplete = (->true))->
    @addClass className 
    _.delay time, =>
      @removeClass className
      onComplete()
    @

  # Add a class after a period of time. Fires a callback when complete
  addClassAfter: (className, time=400, onComplete = (->true))->
    _.delay time, =>
      @addClass className
      onComplete()
    @
  
  # Add class 'hide' for a period of time, fires a callback when finished
  hideAfter: (time = 400, onComplete = (->true))->
    @addClassAfter 'hide', time, onComplete 

  # Remove class 'hide' for a period of time, fires a callback when finished
  showUntil: (time = 400, onComplete = (->true))->
    @removeClass 'hide'
    @addClassAfter 'hide', time, onComplete 

  # Add 'fade-out' class (triggering a fadeout animation) for a period of time, then add the 'hide' class.
  # Fires a callback when complete
  fadeOut = (time=400, className = 'fade-out', onComplete = ->true)->
    if typeof time is "function"
      onComplete = time
      time = 400
    if typeof className is "function" 
      onComplete = className
      className = 'fade-out'

    @addClassUntil className, time
    @addClassAfter 'hide', time, onComplete 

  # Set or unset a style based on a condition
  toggleStyle: (property, value, condition=true)->
    value = if condition then value else ''
    @css(property, value)

  # Expand the min-height of an element to reach the bottom of the viewport
  fillHeight: (condition=true)->
    @toggleStyle 'min-height', $(window).height() - @offset().top, condition

  optionHash: ->
    opt = {}
    opt[$(o).val()] = $(o).text() for o in @find('option')
    opt

