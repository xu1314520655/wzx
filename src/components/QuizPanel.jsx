import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function QuizPanel({ courseId, lessonId }) {
  const { saveQuizScore } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '在Python中，以下哪个是正确的列表创建方式？',
      options: ['list = (1, 2, 3)', 'list = [1, 2, 3]', 'list = {1, 2, 3}', 'list = <1, 2, 3>'],
      correctIndex: 1,
      explanation: '在Python中，列表使用方括号 [] 创建，元组使用圆括号 ()，集合使用花括号 {}。',
    },
    {
      id: 'q2',
      question: 'Pandas中，用于读取CSV文件的函数是？',
      options: ['pd.read_csv()', 'pd.load_csv()', 'pd.open_csv()', 'pd.import_csv()'],
      correctIndex: 0,
      explanation: 'pd.read_csv() 是Pandas中读取CSV文件的标准函数。',
    },
    {
      id: 'q3',
      question: '以下哪个不是Python的基本数据类型？',
      options: ['int', 'str', 'float', 'array'],
      correctIndex: 3,
      explanation: 'array 不是Python的基本数据类型，它是NumPy等库提供的类型。',
    },
    {
      id: 'q4',
      question: '在DataFrame中，如何选择名为"score"的列？',
      options: ['df.get("score")', 'df["score"]', 'df.column("score")', 'df.select("score")'],
      correctIndex: 1,
      explanation: '在Pandas中，使用 df["列名"] 的方式选择列是最常用的方法。',
    },
    {
      id: 'q5',
      question: 'Matplotlib中，用于显示图表的函数是？',
      options: ['plt.draw()', 'plt.show()', 'plt.display()', 'plt.render()'],
      correctIndex: 1,
      explanation: 'plt.show() 用于显示Matplotlib创建的图表。',
    },
  ];

  const handleSelectAnswer = (questionIndex, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResult(true);
    const score = questions.reduce((acc, q, i) => {
      return acc + (selectedAnswers[i] === q.correctIndex ? 1 : 0);
    }, 0);
    saveQuizScore(courseId, lessonId, score, questions.length);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResult(false);
    setIsSubmitted(false);
  };

  const score = questions.reduce((acc, q, i) => {
    return acc + (selectedAnswers[i] === q.correctIndex ? 1 : 0);
  }, 0);

  const totalQuestions = questions.length;

  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    return (
      <div className="quiz-panel">
        <div className={`quiz-result ${isPerfect ? 'perfect' : percentage >= 60 ? 'pass' : 'fail'}`}>
          <div className="result-icon">{isPerfect ? '🏆' : percentage >= 60 ? '🎉' : '💪'}</div>
          <h3>{isPerfect ? '满分通过！' : percentage >= 60 ? '测验通过！' : '继续加油！'}</h3>
          <div className="result-score">
            <span className="score-number">{score}</span>
            <span className="score-total"> / {totalQuestions}</span>
          </div>
          <p className="result-percentage">正确率 {percentage}%</p>
        </div>
        <div className="quiz-review">
          <h4>答题回顾</h4>
          {questions.map((q, i) => {
            const isCorrect = selectedAnswers[i] === q.correctIndex;
            return (
              <div key={q.id} className={`review-item ${isCorrect ? 'correct' : 'wrong'}`}>
                <div className="review-header">
                  <span>{isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}</span>
                  <span>第{i + 1}题</span>
                </div>
                <p className="review-question">{q.question}</p>
                <p className="review-answer">
                  你的答案：{selectedAnswers[i] !== undefined ? q.options[selectedAnswers[i]] : '未作答'}
                </p>
                {!isCorrect && (
                  <p className="review-correct">正确答案：{q.options[q.correctIndex]}</p>
                )}
                <p className="review-explanation">{q.explanation}</p>
              </div>
            );
          })}
        </div>
        <button className="btn btn-primary" onClick={handleReset}>
          <RotateCcw size={16} /> 重新测验
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-panel">
      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }} />
        </div>
        <span className="progress-text">{currentQuestion + 1} / {totalQuestions}</span>
      </div>

      <div className="quiz-question">
        <h3 className="question-text">{question.question}</h3>
        <div className="question-options">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`option-btn ${selectedAnswers[currentQuestion] === idx ? 'selected' : ''}`}
              onClick={() => handleSelectAnswer(currentQuestion, idx)}
            >
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-actions">
        <button
          className="btn btn-outline"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(prev => prev - 1)}
        >
          上一题
        </button>
        {currentQuestion < totalQuestions - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => setCurrentQuestion(prev => prev + 1)}
          >
            下一题
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < totalQuestions}
          >
            <Award size={16} /> 提交测验
          </button>
        )}
      </div>
    </div>
  );
}
