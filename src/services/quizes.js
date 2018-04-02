import apiAxios from './index';

function parseQuestion(data) {
  return {
    newsId: data.news_id,
    imageUrl: data.image_url,
    type: data.manipulation_category_name,
    answer: null,
    expectedAnswer: data.expected_answer
  }
}

function parseQuiz(data) {
  return {
    id: data.id,
    questionIndex: 0,
    questions: (data.questions || []).map((questionData) => parseQuestion(questionData)),
  }
}

export function generateQuiz() {
  return apiAxios.post('quiz/').then((response) => {
    return parseQuiz(response.data);
  });
}
