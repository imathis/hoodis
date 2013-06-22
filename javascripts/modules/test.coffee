test =
  start: ->
    new Test(el: '#test', model: new Questions())

class Questions extends Backbone.Model
  url: '/test.markdown'
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

  shuffle: false

  initialize: (options)->
    @fetch 
      error: (model, response, options) =>
        qs = @parseQuestions(response.responseText)
        qs = _.shuffle(qs) unless @shuffle is false
        @set questions: qs

  parseQuestions: (data) =>
    questions = data.trim().replace(/^#{1,2} [^\n]*\n{1,2}/gm, '').split /\n{2,}/
    qs = (for question in questions
      parts = question.split /\n- /
      title = parts.shift().trim().split /\n/
      q = {}
      q.title = title.shift().replace /#{3} /, ''
      q.paragraph = title.join(' ') if title[0]?
      q.answers = (for p in parts
        attribute: p.match(/\(([EISNTFJP])\)\s*/)[1]
        text: p.match(/^\(\w\)\s*(.*)/)[1]
      )
      q
    )
    qs

class Test extends Backbone.View

  responses: {}

  initialize: (options) ->
    @setElement $(options.el)
    @questionTemplate = _.template($('#question').html())
    @resultsTemplate  = _.template($('#results').html())
    @model.on 'change:questions', @render, this

  events:
    'click button' : 'finish'
    'click .answered h2' : 'toggleQuestion'
    'change .answered' : 'closeQuestion'
    'change .current' : 'choose'

  render: ->
    list = $('<ol id="questions">')
    @$('header').after list

    _.each @model.get('questions'), (q, index) =>
      answers = if @model.shuffle then _.shuffle(q.answers) else q.answers
      t = $(@questionTemplate(title: q.title, paragraph: q.paragraph, index: index + 1, answers: answers))
      list.append t
    @list = list.find('li')
    @list.first().addClass('current')

  renderResults: ->
    type = @calc()
    @$el.empty()
    @$el.append $(@resultsTemplate(t:_.keys(type), v:_.values(type)))

  choose: (e) ->
    current = $(e.currentTarget)
    if parseInt(current.attr('data-index')) is 74
      @finish()
    else
      _.delay 400, =>
        next = current.next()
        @$('.previous').removeClass('previous')
        current.addClass('previous')
        _.delay 200, =>
          current.addClass('answered')
          current.removeClass('current')
          next.addClass('current')
          @$('.question-index').text next.attr('data-index')
          #if parseInt(next.attr('data-index')) is 74
            #@$el.append($('<footer><button class="finish">Finish</button><footer>'))


  toggleQuestion: (e) ->
    q = $(e.currentTarget).parents('.question')
    q.toggleClass('show')

  closeQuestion: (e) ->
    q = $(e.currentTarget)
    q.toggleClass('show')

  finish: ->
    console.log 'finished'
    checked = @$('input:checked')
    if checked.length is 74
      @$('input:checked').each (i)=>
        input = $(i)
        name = $(input).attr('name')
        attr = input.attr('data-attribute')
        @model.set attr, _.union(@model.get(attr), [name])
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

module.exports = test
