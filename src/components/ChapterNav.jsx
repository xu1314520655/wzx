import { Link, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CheckCircle2, Circle, BookOpen, Code, HelpCircle } from 'lucide-react';

const typeIcons = {
  video: <BookOpen size={16} />,
  exercise: <Code size={16} />,
  quiz: <HelpCircle size={16} />,
};

const typeLabels = {
  video: '视频',
  exercise: '练习',
  quiz: '测验',
};

export default function ChapterNav({ course }) {
  const { courseId, lessonId } = useParams();
  const { isLessonCompleted } = useUser();

  return (
    <div className="chapter-nav">
      <h3 className="chapter-nav-title">课程大纲</h3>
      {course.chapters.map((chapter, chIdx) => (
        <div key={chapter.id} className="chapter-section">
          <div className="chapter-header">
            <span className="chapter-number">第{chIdx + 1}章</span>
            <span className="chapter-title">{chapter.title}</span>
          </div>
          <ul className="lesson-list">
            {chapter.lessons.map(lesson => {
              const isActive = lessonId === lesson.id;
              const isCompleted = isLessonCompleted(courseId, lesson.id);
              return (
                <li key={lesson.id}>
                  <Link
                    to={`/learn/${courseId}/${lesson.id}`}
                    className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  >
                    <span className="lesson-status">
                      {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                    </span>
                    <span className="lesson-type-icon">{typeIcons[lesson.type]}</span>
                    <div className="lesson-info">
                      <span className="lesson-title">{lesson.title}</span>
                      <span className="lesson-meta">
                        {typeLabels[lesson.type]} · {lesson.duration}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
