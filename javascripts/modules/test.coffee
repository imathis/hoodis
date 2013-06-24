test =
  start: ->
    new Test(el: '#test', model: new Questions())

class Questions extends Backbone.Model
  url: '/test.markdown'
  defaults:
    questions: []
    answers: []
    count: {E: 0, I: 0, S: 0, N: 0, F:0, T:0, J:0, P:0}
    type: {}

  shuffle: false

  initialize: (options)->
    @fetch 
      error: (model, response, options) =>
        qs = @parseQuestions(response.responseText)
        qs = _.shuffle(qs) unless @shuffle is false
        @set questions: qs

  answer: (index, type) ->
    answers = @get 'answers'
    count = @get 'count'
    answers[index - 1] = type
    count = _.defaults _.countBy(answers), count
    @set answers: answers
    @set count: count

    @getResult() if _.compact(answers).length is @get('questions').length

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

  getResult: ->
    p    = @get 'count'
    type = {}

    if p.E > p.I then type.E = p.E/11 else type.I = p.I/11
    if p.S > p.N then type.S = p.S/21 else type.N = p.N/21
    if p.F > p.T then type.F = p.F/21 else type.T = p.T/21
    if p.J > p.P then type.J = p.J/21 else type.P = p.P/21
    
    type[k] = Math.round(v*100) for k,v of type
    @.set type: type

class Test extends Backbone.View

  responses: {}

  initialize: (options) ->
    @setElement $(options.el)
    @questionTemplate = _.template($('#question').html())
    @resultsTemplate  = _.template($('#results').html())
    @model.on 'change:questions', @render, @
    @model.on 'change:type', @finish, @

  events:
    'change .question' : 'choose'

  render: ->
    list = $('<ol class="questions">')
    @$('header').after list

    _.each @model.get('questions'), (q, index) =>
      answers = if @model.shuffle then _.shuffle(q.answers) else q.answers
      t = $(@questionTemplate(title: q.title, paragraph: q.paragraph, index: index + 1, answers: answers))
      list.append t

    @list = list.find('li')
    @list.first().addClass('current')


  choose: (e) ->
    current = $(e.currentTarget)
    @model.answer current.data('index'), current.find('input:checked').data('attribute')

    _.delay 400, =>
      next = current.next()
      @$('.previous').removeClass 'previous'

      current.addClassUntil 400, 'out current'
      current.addClassAfter 400, 'previous, answered'
      current.cssUntil 400, 'margin-top': "-#{current.height()/4}px"

      next.addClass 'current'
      next.addClassUntil 400, 'in'

      @$('.question-index').text next.attr('data-index')

  toggleQuestion: (e) ->
    q = $(e.currentTarget).parents('.question')
    q.toggleClass('show')

  closeQuestion: (e) ->
    q = $(e.currentTarget)
    q.toggleClass('show')

  finish: ->
    type = @model.get 'type'
    @$el.empty()
    @$el.append $(@resultsTemplate(t:_.keys(type), v:_.values(type)))


module.exports = test
