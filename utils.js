// тут буде утилітарна фу-ія по вибору рандомного питання з заданої теми, 
// це потрібно для того щоб не захламлять кодом наш 'index.js',
// все що стосується питань будемо робити в 'utils.js.
/**Поперше нам потрібно імпортувати питання із question.json*/
// Создаєм зміну: 
// const questions = require('./questions.json');
// const [Random] = require('random-js');

// // создаєм ф-ію яка отримуватиме в качестві аргумента вибрану тему
// const getRandomQuestion = (topic) => {
//   const random = new Random();

//   const questionTopic = topic.toLowerCase();
//   const randomQuestionIndex = Math.floor(
//     Math.random() * questions[questionTopic].length,
//   );

//   return questions[questionTopic][randomQuestionIndex];
// };
// це класичний підхід рандомізації якогось числа

// альтернативний підхід рандомізації чисел для 'npm' - це підключити бібліотеку 'random-js'!!!!
            // Disclaimer //
// Підключать багато бібліотек для різних мелочей не варто. Чим менше залежностей в коді тим краще!!!
// Просто попробуєм щоб побачить як воно работає !!!
// ДЛя цього останавлюєм бота 'ctrl+c' 
// устанавлюєм бібліотеку "npm i",
// імпортуємо клас 'random' з бібліотеки 'random-js';









const questions = require('./questions.json');
const { Random } = require('random-js');

// создаєм ф-ію яка отримуватиме в качестві аргумента вибрану тему
const getRandomQuestion = (topic) => {
  const random = new Random();

  let questionTopic = topic.toLowerCase();

  if (questionTopic === 'Рандомне питання') {
    questionTopic = 
    Object.keys(questions)[
      random.integer(0, Object.keys(questions).length - 1)
    ];
  }

  const randomQuestionIndex = random.integer(
    0,
    questions[questionTopic].length - 1,
  );

  return {
    question: questions[questionTopic][randomQuestionIndex],
    questionTopic,
  };
};

const getCorrectAnswer = (topic, id) => {
  const question = questions[topic].find((question) => question.id === id);

  if (!question.hasOptions) {
    return question.answer;
  }

  return question.option.find((option) => option.isCorrect).text;
}

module.exports = { getRandomQuestion, getCorrectAnswer };






// ми создали ф-ію тепер її потрібно експортувати щоб пізніше до неї звернутися в 'index.js'
// в кінці файла пишем (строка 53)
//  після чого вертаємось в 'index.js' і імпортуємо її