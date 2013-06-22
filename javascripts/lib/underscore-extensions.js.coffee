_.mixin
  # a coffeescript friendly version of _.delay
  delay_: _.delay
  delay: (wait=100, func)->
    @delay_ func, wait, arguments

  # a coffeescript friendly version of _.debounce
  debounce_: _.debounce
  debounce: (wait=100, func)->
    @debounce_ func, wait, arguments

  # a coffeescript friendly version of _.throttle
  throttle_: _.throttle
  throttle: (wait=100, func)->
    @throttle_ func, wait, arguments

  # strip whitespace from elements in an array
  trim: (array) ->
    (a.trim() for a in array) 

  # strip whitespace from a selectors, returns an array
  splitTrim: (s, trimOn = ',') ->
    @compact @trim s.split(trimOn) 

