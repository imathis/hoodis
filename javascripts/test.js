(function() {

  $(document).ready(function() {
    return window.test = new window.Test({
      model: new window.Questions(),
      el: '#test'
    }).render();
  });

  window.Test = $.View.extend({
    responses: {},
    initialize: function(options) {
      this.setElement($(options.el));
      this.questionTemplate = $._.template($('#question').html());
      return this.resultsTemplate = $._.template($('#results').html());
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
      console.log([type, $._.keys(type), $._.values(type)]);
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
      var e, f, i, j, k, n, p, s, t, type, v;
      type = {};
      e = this.model.get('e');
      i = this.model.get('i');
      s = this.model.get('s');
      n = this.model.get('n');
      t = this.model.get('t');
      f = this.model.get('f');
      j = this.model.get('j');
      p = this.model.get('p');
      if (e.length > i.length) {
        type.e = e.length / 11;
      } else {
        type.i = i.length / 11;
      }
      if (s.length > n.length) {
        type.s = s.length / 21;
      } else {
        type.n = n.length / 21;
      }
      if (t.length > f.length) {
        type.t = t.length / 21;
      } else {
        type.f = f.length / 21;
      }
      if (j.length > p.length) {
        type.j = j.length / 21;
      } else {
        type.p = p.length / 21;
      }
      for (k in type) {
        v = type[k];
        type[k] = Math.round(v * 100);
      }
      return type;
    }
  });

  window.Questions = $.Model.extend({
    defaults: {
      e: [],
      i: [],
      s: [],
      n: [],
      t: [],
      f: [],
      j: [],
      p: [],
      questions: [
        {
          title: "When the phone rings, do you",
          answers: [
            {
              text: 'hurry to get it first',
              attribute: 'e'
            }, {
              text: 'hope someone else will answer',
              attribute: 'i'
            }
          ]
        }, {
          title: "Are you more",
          answers: [
            {
              text: 'observant than introspective',
              attribute: 's'
            }, {
              text: 'introspective than observant',
              attribute: 'n'
            }
          ]
        }, {
          title: "Is it worse to",
          answers: [
            {
              text: 'have your head in the clouds',
              attribute: 's'
            }, {
              text: 'be in a rut',
              attribute: 'n'
            }
          ]
        }, {
          title: "With people, are you usually more",
          answers: [
            {
              text: 'firm than gentle',
              attribute: 't'
            }, {
              text: 'gentle than firm',
              attribute: 'f'
            }
          ]
        }, {
          title: "Are you more comfortable in making",
          answers: [
            {
              text: 'critical judgments',
              attribute: 't'
            }, {
              text: 'value judgments',
              attribute: 'f'
            }
          ]
        }, {
          title: "Is clutter in the workplace something you",
          answers: [
            {
              text: 'take time to straighten up',
              attribute: 'j'
            }, {
              text: 'tolerate pretty well',
              attribute: 'p'
            }
          ]
        }, {
          title: "Is it your way to",
          answers: [
            {
              text: 'make up your mind quickly',
              attribute: 'j'
            }, {
              text: 'pick and choose at some length',
              attribute: 'p'
            }
          ]
        }, {
          title: "Waiting in line, do you often",
          answers: [
            {
              text: 'chat with others',
              attribute: 'e'
            }, {
              text: 'stick to business',
              attribute: 'i'
            }
          ]
        }, {
          title: "Are you more",
          answers: [
            {
              text: 'sensible than ideational',
              attribute: 's'
            }, {
              text: 'ideational than sensible',
              attribute: 'n'
            }
          ]
        }, {
          title: "Are you more interested in",
          answers: [
            {
              text: 'what is actual',
              attribute: 's'
            }, {
              text: 'what is possible',
              attribute: 'n'
            }
          ]
        }, {
          title: "In making up your mind, are you more likely to go by",
          answers: [
            {
              text: 'data',
              attribute: 't'
            }, {
              text: 'desires',
              attribute: 'f'
            }
          ]
        }, {
          title: "In sizing up others, do you tend to be",
          answers: [
            {
              text: 'objective and impersonal',
              attribute: 't'
            }, {
              text: 'friendly and personal',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you prefer contracts to be",
          answers: [
            {
              text: 'signed, sealed and delivered',
              attribute: 'j'
            }, {
              text: 'settled on a handshake',
              attribute: 'p'
            }
          ]
        }, {
          title: "Are you more satisfied having",
          answers: [
            {
              text: 'a finished product',
              attribute: 'j'
            }, {
              text: 'work in progress',
              attribute: 'p'
            }
          ]
        }, {
          title: "At a party, do you",
          answers: [
            {
              text: 'interact with many, even strangers',
              attribute: 'e'
            }, {
              text: 'interact with a few friends',
              attribute: 'i'
            }
          ]
        }, {
          title: "Do you tend to be more",
          answers: [
            {
              text: 'factual than speculative',
              attribute: 's'
            }, {
              text: 'speculative than factual',
              attribute: 'n'
            }
          ]
        }, {
          title: "Do you like writers who",
          answers: [
            {
              text: 'say what they mean',
              attribute: 's'
            }, {
              text: 'use metaphors and symbolism',
              attribute: 'n'
            }
          ]
        }, {
          title: "Which appeals to you more",
          answers: [
            {
              text: 'consistency of thought',
              attribute: 't'
            }, {
              text: 'harmonious relationships',
              attribute: 'f'
            }
          ]
        }, {
          title: "If you must disappoint someone, are you usually",
          answers: [
            {
              text: 'frank and straightforward',
              attribute: 't'
            }, {
              text: 'warm and considerate',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you like things",
          answers: [
            {
              text: 'scheduled',
              attribute: 'j'
            }, {
              text: 'unscheduled',
              attribute: 'p'
            }
          ]
        }, {
          title: "Do you often prefer",
          answers: [
            {
              text: 'final, unalterable statements',
              attribute: 'j'
            }, {
              text: 'tentative, preliminary statements',
              attribute: 'p'
            }
          ]
        }, {
          title: "Does interacting with strangers",
          answers: [
            {
              text: 'energize you',
              attribute: 'e'
            }, {
              text: 'tax your reserves',
              attribute: 'i'
            }
          ]
        }, {
          title: "Facts",
          answers: [
            {
              text: 'speak for themselves',
              attribute: 's'
            }, {
              text: 'illustrate principles',
              attribute: 'n'
            }
          ]
        }, {
          title: "Do you find visionaries and theorists",
          answers: [
            {
              text: 'somewhat annoying',
              attribute: 's'
            }, {
              text: 'rather fascinating',
              attribute: 'n'
            }
          ]
        }, {
          title: "In a heated discussion, do you",
          answers: [
            {
              text: 'stick to your guns',
              attribute: 't'
            }, {
              text: 'look for common ground',
              attribute: 'f'
            }
          ]
        }, {
          title: "Is it better to be",
          answers: [
            {
              text: 'just',
              attribute: 't'
            }, {
              text: 'merciful',
              attribute: 'f'
            }
          ]
        }, {
          title: "At work, is it more natural for you to",
          answers: [
            {
              text: 'point out mistakes',
              attribute: 'j'
            }, {
              text: 'try to please others',
              attribute: 'p'
            }
          ]
        }, {
          title: "Are you more comfortable",
          answers: [
            {
              text: 'after a decision',
              attribute: 'j'
            }, {
              text: 'before a decision',
              attribute: 'p'
            }
          ]
        }, {
          title: "Do you tend to",
          answers: [
            {
              text: 'say right out what\'s on your mind',
              attribute: 'e'
            }, {
              text: 'keep your ears open',
              attribute: 'i'
            }
          ]
        }, {
          title: "Common sense is",
          answers: [
            {
              text: 'usually reliable',
              attribute: 's'
            }, {
              text: 'frequently questionable',
              attribute: 'n'
            }
          ]
        }, {
          title: "Children often do not",
          answers: [
            {
              text: 'make themselves useful enough',
              attribute: 's'
            }, {
              text: 'exercise their fantasy enough',
              attribute: 'n'
            }
          ]
        }, {
          title: "When in charge of others, do you tend to be",
          answers: [
            {
              text: 'firm and unbending',
              attribute: 't'
            }, {
              text: 'forgiving and lenient',
              attribute: 'f'
            }
          ]
        }, {
          title: "Are you more often",
          answers: [
            {
              text: 'a cool-headed person',
              attribute: 't'
            }, {
              text: 'a warm-hearted person',
              attribute: 'f'
            }
          ]
        }, {
          title: "Are you prone to",
          answers: [
            {
              text: 'nailing things down',
              attribute: 'j'
            }, {
              text: 'exploring the possibilities',
              attribute: 'p'
            }
          ]
        }, {
          title: "In most situations, are you more",
          answers: [
            {
              text: 'deliberate than spontaneous',
              attribute: 'j'
            }, {
              text: 'spontaneous than deliberate',
              attribute: 'p'
            }
          ]
        }, {
          title: "Do you think of yourself as",
          answers: [
            {
              text: 'an outgoing person',
              attribute: 'e'
            }, {
              text: 'a private person',
              attribute: 'i'
            }
          ]
        }, {
          title: "Are you more frequently",
          answers: [
            {
              text: 'a practical sort of person',
              attribute: 's'
            }, {
              text: 'a fanciful sort of person',
              attribute: 'n'
            }
          ]
        }, {
          title: "Do you speak more in",
          answers: [
            {
              text: 'particulars than generalities',
              attribute: 's'
            }, {
              text: 'generalities than particulars',
              attribute: 'n'
            }
          ]
        }, {
          title: "Which is more of a compliment",
          answers: [
            {
              text: '"There\'s a logical person"',
              attribute: 't'
            }, {
              text: '"There\'s a sentimental person"',
              attribute: 'f'
            }
          ]
        }, {
          title: "Which rules you more",
          answers: [
            {
              text: 'your thoughts',
              attribute: 't'
            }, {
              text: 'your feelings',
              attribute: 'f'
            }
          ]
        }, {
          title: "When finishing a job, do you like to",
          answers: [
            {
              text: 'tie up all the loose ends',
              attribute: 'j'
            }, {
              text: 'move on to something else',
              attribute: 'p'
            }
          ]
        }, {
          title: "Do you prefer to work",
          answers: [
            {
              text: 'to deadlines',
              attribute: 'j'
            }, {
              text: 'just whenever',
              attribute: 'p'
            }
          ]
        }, {
          title: "Are you the kind of person who",
          answers: [
            {
              text: 'is rather talkative',
              attribute: 'e'
            }, {
              text: 'doesn\'t miss much',
              attribute: 'i'
            }
          ]
        }, {
          title: "Are you inclined to take what is said",
          answers: [
            {
              text: 'more literally',
              attribute: 's'
            }, {
              text: 'more figuratively',
              attribute: 'n'
            }
          ]
        }, {
          title: "Do you more often see",
          answers: [
            {
              text: 'what\'s right in front of you',
              attribute: 's'
            }, {
              text: 'what can only be imagined',
              attribute: 'n'
            }
          ]
        }, {
          title: "Is it worse to be",
          answers: [
            {
              text: 'a softy',
              attribute: 't'
            }, {
              text: 'hard-nosed',
              attribute: 'f'
            }
          ]
        }, {
          title: "In trying circumstances, are you sometimes",
          answers: [
            {
              text: 'too unsympathetic',
              attribute: 't'
            }, {
              text: 'too sympathetic',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you tend to choose",
          answers: [
            {
              text: 'rather carefully',
              attribute: 'j'
            }, {
              text: 'somewhat impulsively',
              attribute: 'p'
            }
          ]
        }, {
          title: "Are you inclined to be more",
          answers: [
            {
              text: 'hurried than leisurely',
              attribute: 'j'
            }, {
              text: 'leisurely than hurried',
              attribute: 'p'
            }
          ]
        }, {
          title: "At work, do you tend to",
          answers: [
            {
              text: 'be sociable with your colleagues',
              attribute: 'e'
            }, {
              text: 'keep more to yourself',
              attribute: 'i'
            }
          ]
        }, {
          title: "Are you more likely to trust",
          answers: [
            {
              text: 'your experiences',
              attribute: 's'
            }, {
              text: 'your conceptions',
              attribute: 'n'
            }
          ]
        }, {
          title: "Are you more inclined to feel",
          answers: [
            {
              text: 'down to earth',
              attribute: 's'
            }, {
              text: 'somewhat removed',
              attribute: 'n'
            }
          ]
        }, {
          title: "Do you think of yourself as a",
          answers: [
            {
              text: 'tough-minded person',
              attribute: 't'
            }, {
              text: 'tender-hearted person',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you value in yourself more that you are",
          answers: [
            {
              text: 'reasonable',
              attribute: 't'
            }, {
              text: 'devoted',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you usually want things",
          answers: [
            {
              text: 'settled and decided',
              attribute: 'j'
            }, {
              text: 'just penciled in',
              attribute: 'p'
            }
          ]
        }, {
          title: "Would you say you are more",
          answers: [
            {
              text: 'serious and determined',
              attribute: 'j'
            }, {
              text: 'easy going',
              attribute: 'p'
            }
          ]
        }, {
          title: "Do you consider yourself",
          answers: [
            {
              text: 'a good conversationalist',
              attribute: 'e'
            }, {
              text: 'a good listener',
              attribute: 'i'
            }
          ]
        }, {
          title: "Do you prize in yourself",
          answers: [
            {
              text: 'a strong hold on reality',
              attribute: 's'
            }, {
              text: 'a vivid imagination',
              attribute: 'n'
            }
          ]
        }, {
          title: "Are you drawn more to",
          answers: [
            {
              text: 'fundamentals',
              attribute: 's'
            }, {
              text: 'overtones',
              attribute: 'n'
            }
          ]
        }, {
          title: "Which seems the greater fault",
          answers: [
            {
              text: 'to be too compassionate',
              attribute: 't'
            }, {
              text: 'to be too dispassionate',
              attribute: 'f'
            }
          ]
        }, {
          title: "Are you swayed more by",
          answers: [
            {
              text: 'convincing evidence',
              attribute: 't'
            }, {
              text: 'a touching appeal',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you feel better about",
          answers: [
            {
              text: 'coming to closure',
              attribute: 'j'
            }, {
              text: 'keeping your options open',
              attribute: 'p'
            }
          ]
        }, {
          title: "Is it preferable mostly to",
          answers: [
            {
              text: 'make sure things are arranged',
              attribute: 'j'
            }, {
              text: 'just let things happen naturally',
              attribute: 'p'
            }
          ]
        }, {
          title: "Are you inclined to be",
          answers: [
            {
              text: 'easy to approach',
              attribute: 'e'
            }, {
              text: 'somewhat reserved',
              attribute: 'i'
            }
          ]
        }, {
          title: "In stories, do you prefer",
          answers: [
            {
              text: 'action and adventure',
              attribute: 's'
            }, {
              text: 'fantasy and heroism',
              attribute: 'n'
            }
          ]
        }, {
          title: "Is it easier for you to",
          answers: [
            {
              text: 'put others to good use',
              attribute: 's'
            }, {
              text: 'identify with others',
              attribute: 'n'
            }
          ]
        }, {
          title: "Which do you wish more for yourself",
          answers: [
            {
              text: 'strength of will',
              attribute: 't'
            }, {
              text: 'strength of emotion',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you see yourself as basically",
          answers: [
            {
              text: 'thick-skinned',
              attribute: 't'
            }, {
              text: 'thin-skinned',
              attribute: 'f'
            }
          ]
        }, {
          title: "Do you tend to notice",
          answers: [
            {
              text: 'disorderliness',
              attribute: 'j'
            }, {
              text: 'opportunities for change',
              attribute: 'p'
            }
          ]
        }, {
          title: "Are you more",
          answers: [
            {
              text: 'routinized than whimsical',
              attribute: 'j'
            }, {
              text: 'whimsical than routinized',
              attribute: 'p'
            }
          ]
        }, {
          title: "In your social groups, do you",
          answers: [
            {
              text: 'keep abreast of others\' happenings',
              attribute: 'e'
            }, {
              text: 'get behind on the news',
              attribute: 'i'
            }
          ]
        }, {
          title: "Are you more interested in",
          answers: [
            {
              text: 'production and distribution',
              attribute: 's'
            }, {
              text: 'design and research',
              attribute: 'n'
            }
          ]
        }, {
          title: "In judging others, are you more swayed by",
          answers: [
            {
              text: 'laws than circumstances',
              attribute: 't'
            }, {
              text: 'circumstances than laws',
              attribute: 'f'
            }
          ]
        }, {
          title: "Which is more admirable",
          answers: [
            {
              text: 'the ability to organize and be methodical',
              attribute: 'j'
            }, {
              text: 'the ability to adapt and make do',
              attribute: 'p'
            }
          ]
        }
      ]
    }
  });

}).call(this);
