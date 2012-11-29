(function() {
  var _this = this;

  $(document).ready(function() {
    return window.test = new window.Test({
      el: '#test',
      model: new window.Questions()
    });
  });

  window.Questions = $.Model.extend({
    url: '/test',
    defaults: {
      E: [],
      I: [],
      S: [],
      N: [],
      T: [],
      F: [],
      J: [],
      P: [],
      questions: []
    },
    initialize: function() {
      var _this = this;
      return this.fetch({
        success: function(model, response, options) {
          var qs;
          qs = _this.parseQuestions(response.response);
          return _this.set({
            questions: qs
          });
        }
      });
    },
    parseQuestions: function(data) {
      var p, parts, q, qs, question, questions, title;
      questions = data.trim().replace(/#[^\n]*\n\n/gm, '').split(/\n{2,}/);
      qs = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = questions.length; _i < _len; _i++) {
          question = questions[_i];
          parts = question.split(/\n-/);
          title = parts.shift().trim().split(/\n/);
          q = {};
          q.title = title.shift();
          if (title[0] != null) {
            q.paragraph = title.join(' ');
          }
          q.answers = (function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = parts.length; _j < _len1; _j++) {
              p = parts[_j];
              _results1.push({
                attribute: p.match(/([EISNTFJP])\s*/)[1],
                text: p.match(/^\w\s*(.*)/)[1]
              });
            }
            return _results1;
          })();
          _results.push(q);
        }
        return _results;
      })();
      return qs;
    }
  });

  window.Test = $.View.extend({
    responses: {},
    initialize: function(options) {
      this.setElement($(options.el));
      this.questionTemplate = $._.template($('#question').html());
      this.resultsTemplate = $._.template($('#results').html());
      return this.model.on('change:questions', this.render, this);
    },
    events: {
      'change input': 'choose'
    },
    render: function() {
      var _this = this;
      this.$el.append($('<ol id="questions">'));
      return $._.each($._.shuffle(this.model.get('questions')), function(q, index) {
        var t;
        t = $(_this.questionTemplate({
          title: q.title,
          index: index + 1,
          answers: $._.shuffle(q.answers)
        }));
        return _this.$('ol').append(t);
      });
    },
    renderResults: function() {
      var type;
      type = this.calc();
      this.$el.empty();
      return this.$el.append($(this.resultsTemplate({
        t: $._.keys(type),
        v: $._.values(type)
      })));
    },
    choose: function(e) {
      var checked,
        _this = this;
      checked = this.$('input:checked');
      if (checked.length === 74) {
        this.$('input:checked').each(function(i) {
          var attr, input, name;
          input = $(i);
          name = $(input).attr('name');
          attr = input.attr('data-attribute');
          return _this.model.set(attr, $._.union(_this.model.get(attr), [name]));
        });
        return this.renderResults();
      }
    },
    calc: function() {
      var E, F, I, J, N, P, S, T, k, type, v;
      type = {};
      E = this.model.get('E');
      I = this.model.get('I');
      S = this.model.get('S');
      N = this.model.get('N');
      T = this.model.get('T');
      F = this.model.get('F');
      J = this.model.get('J');
      P = this.model.get('P');
      if (E.length > I.length) {
        type.E = E.length / 11;
      } else {
        type.I = I.length / 11;
      }
      if (S.length > N.length) {
        type.S = S.length / 21;
      } else {
        type.N = N.length / 21;
      }
      if (T.length > F.length) {
        type.T = T.length / 21;
      } else {
        type.F = F.length / 21;
      }
      if (J.length > P.length) {
        type.J = J.length / 21;
      } else {
        type.P = P.length / 21;
      }
      for (k in type) {
        v = type[k];
        type[k] = Math.round(v * 100);
      }
      return type;
    }
  });

}).call(this);
