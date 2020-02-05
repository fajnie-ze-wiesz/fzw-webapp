import apiAxios from './index';

import { default as Quiz } from '../data/quiz';
import { default as Question } from '../data/question';

function parseQuestion(data) {
  return Question.create({
    newsId: data.news_id,
    imageUrl: data.image_url,
    type: data.manipulation_category_name,
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
  return apiAxios.post('quiz/').then((response) => {
    return parseQuiz(response.data);
  });
}
