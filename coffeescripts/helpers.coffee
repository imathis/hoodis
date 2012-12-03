$._.doAfter = (time, func)-> setTimeout func, time

(($) ->
  # Add a class until a period of time. Fires a callback when complete
  $.fn.addClassUntil = (className, time=400, onComplete = (->true))->
    el = this
    el.addClass className 
    setTimeout (-> el.removeClass(className); onComplete()), time
    this
  
  # Add a class after a period of time. Fires a callback when complete
  $.fn.addClassAfter = (className, time=400, onComplete = (->true))->
    el = this
    setTimeout (-> el.addClass(className); onComplete()), time

  # Add 'fade-out' class (triggering a fadeout animation) for a period of time, then add the 'hide' class.
  # Fires a callback when complete
  $.fn.fadeOut = (className = 'fade-out', time = 400, onComplete = (->true))->
    el = this
    if typeof className is "function" 
      onComplete = className
      className = 'fade-out'
    if typeof className is "number"
      time = className
      className = 'fade-out'
    if typeof time is "function"
      onComplete = time
      time = 400
    el.addClassUntil className, time
    el.addClassAfter 'hide', time, onComplete 
    this

  # Add class 'hide' for a period of time, fires a callback when finished
  $.fn.hideAfter = (time = 400, onComplete = (->true))->
    el = this
    el.addClassAfter 'hide', time, onComplete 
    this

  # Remove class 'hide' for a period of time, fires a callback when finished
  $.fn.showUntil = (time = 400, onComplete = (->true))->
    el = this
    el.removeClass 'hide'
    el.addClassAfter 'hide', time, onComplete 
    this

)($)
