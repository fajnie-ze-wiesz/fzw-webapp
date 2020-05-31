import apiAxios from './index';

import Quiz from '../data/quiz';
import Question from '../data/question';

function parseQuestion(data) {
  return Question.create({
    newsId: data.news_id,
    imageUrl: data.image_url,
    type: data.manipulation_category_name,
    answerExplanationHTML: data.answer_explanation_html,
    expectedAnswer: data.expected_answer,
  });
}

function parseQuiz(data) {
  return Quiz.create({
    id: data.id,
    questions: (data.questions || []).map(parseQuestion),
  });
}

export function generateQuiz() {
  const data = {};
  if (process.env.NUM_OF_QUIZ_QUESTIONS) {
    data['num_of_questions'] = process.env.NUM_OF_QUIZ_QUESTIONS;
  }
  return apiAxios.post('quiz/', data).then((response) => {
    return parseQuiz(response.data);
  });
}
