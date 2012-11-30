$(document).ready ->
  window.test = new window.Test(el: '#test', model: new window.Questions())
    
window.Questions = $.Model.extend
  url: '/test'
  defaults:
    E: []
    I: []
    S: []
    N: []
    T: []
    F: []
    J: []
    P: []
    questions: []

  initialize: ->
    @fetch success: (model, response, options) =>
      @set questions: @parseQuestions(response.response)

  parseQuestions: (data) =>
    questions = data.trim().replace(/#[^\n]*\n\n/gm, '').split /\n{2,}/
    qs = (for question in questions
      parts = question.split /\n-/
      title = parts.shift().trim().split /\n/
      q = {}
      q.title = title.shift()
      q.paragraph = title.join(' ') if title[0]?
      q.answers = (for p in parts
        attribute: p.match(/([EISNTFJP])\s*/)[1]
        text: p.match(/^\w\s*(.*)/)[1]
      )
      q
    )
    qs

window.Test = $.View.extend

  responses: {}

  initialize: (options) ->
    @setElement $(options.el)
    @questionTemplate = $._.template($('#question').html())
    @resultsTemplate  = $._.template($('#results').html())
    @model.on 'change:questions', @render, this

  events:
    'click button' : 'choose'

  render: ->
    @$('header').after $('<ol id="questions">')
    $._.each $._.shuffle(@model.get('questions')), (q, index) =>
      t = $(@questionTemplate(title: q.title, index: index + 1, answers: $._.shuffle(q.answers)))
      @$('ol').append t

  renderResults: ->
    type = @calc()
    @$el.empty()
    @$el.append $(@resultsTemplate(t:$._.keys(type), v:$._.values(type)))

  choose: (e) ->
    checked = @$('input:checked')
    if checked.length is 74
      @$('input:checked').each (i)=>
        input = $(i)
        name = $(input).attr('name')
        attr = input.attr('data-attribute')
        @model.set attr, $._.union(@model.get(attr), [name])
      @renderResults()
    else
      if checked.length is 73
        alert "You missed one"
      else if checked.length is 72
        alert "You missed a couple"
      else
        alert "You missed a few"
      checked.parents('.question').addClass('answered')

  calc: ->
    type = {}

    E = @model.get('E')
    I = @model.get('I')
    S = @model.get('S')
    N = @model.get('N')
    T = @model.get('T')
    F = @model.get('F')
    J = @model.get('J')
    P = @model.get('P')

    if E.length > I.length then type.E = E.length/11 else type.I = I.length/11
    if S.length > N.length then type.S = S.length/21 else type.N = N.length/21
    if T.length > F.length then type.T = T.length/21 else type.F = F.length/21
    if J.length > P.length then type.J = J.length/21 else type.P = P.length/21
    
    type[k] = Math.round(v*100) for k,v of type
    type
