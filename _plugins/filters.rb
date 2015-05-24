require 'json'

module TestFilter
  def parse_questions(questions)
    questions.map { |q| parse_question(q).to_json }.join(',')
  end

  def parse_question(question)
    q = {}
    q['title'] = question.delete('title')
    if question['description']
      q['description'] = question.delete('p')
    end
    q['answers'] = []
    question.each do |type, answer|
      q['answers'] << { "text" => answer, "type" => type }
    end

    q
  end
end

Liquid::Template.register_filter(TestFilter)
