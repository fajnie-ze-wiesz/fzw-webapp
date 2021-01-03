import apiAxios from './index';

import Quiz from '../data/quiz';
import Question from '../data/question';
import TopicCategory from '../data/topic_category';

function parseQuestion(data) {
  return Question.create({
    newsId: data.news_id,
    imageUrl: data.image_url,
    sourceName: data.source_name,
    sourceUrl: data.source_url,
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

export async function generateQuiz({topicCategory = null}) {
  const data = {};
  if (process.env.NUM_OF_QUIZ_QUESTIONS) {
    data['num_of_questions'] = process.env.NUM_OF_QUIZ_QUESTIONS;
  }
  if (topicCategory) {
    data['topic_category_name'] = TopicCategory.getName(topicCategory);
  }
  const response = await apiAxios.post('quiz/', data);
  return parseQuiz(response.data);
}

function loadImageByUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image ${url} could not be loaded`));
    img.src = url;
  });
}

export function loadQuizImages(quiz) {
  const questions = Quiz.getQuestions(quiz);
  const imageUrls = questions.map(Question.getImageUrl);
  return Promise.all(imageUrls.map(loadImageByUrl));
}
