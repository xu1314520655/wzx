import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, BookOpen, Target, Play } from 'lucide-react';
import { courses } from '../data';
import { useUser } from '../context/UserContext';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { getLessonProgress, isLessonCompleted } = useUser();

  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="page">
        <div className="page-content">
          <div className="container">
            <div className="empty-state">
              <h2>课程未找到</h2>
              <p>请检查课程链接是否正确</p>
              <Link to="/courses" className="btn btn-primary" style={{ marginTop: '16px' }}>
                返回课程中心
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const progress = getLessonProgress(courseId, totalLessons);
  const firstLesson = course.chapters[0]?.lessons[0];

  const findNextIncompleteLesson = () => {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (!isLessonCompleted(courseId, lesson.id)) {
          return lesson;
        }
      }
    }
    return firstLesson;
  };

  const nextLesson = findNextIncompleteLesson();
  const isStarted = progress > 0;

  const handleStartLearn = () => {
    if (nextLesson) {
      navigate(`/learn/${courseId}/${nextLesson.id}`);
    }
  };

  return (
    <div className="course-detail-page">
      {/* 课程头部 */}
      <div className="course-detail-header">
        <div className="container">
          <div className="course-detail-top">
            <div className="course-detail-icon">{course.icon}</div>
            <div className="course-detail-info">
              <h1>{course.title}</h1>
              <p>{course.description}</p>
            </div>
          </div>

          <div className="course-detail-meta">
            <div className="course-detail-meta-item">
              <span>{course.difficulty}</span>
            </div>
            <div className="course-detail-meta-item">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="course-detail-meta-item">
              <Users size={16} />
              <span>{course.students.toLocaleString()} 名学生</span>
            </div>
            <div className="course-detail-meta-item">
              <Star size={16} style={{ color: '#F59E0B' }} />
              <span>{course.rating} 分</span>
            </div>
            <div className="course-detail-meta-item">
              <BookOpen size={16} />
              <span>{totalLessons} 个课时</span>
            </div>
          </div>

          <div className="course-detail-actions">
            <button className="btn btn-primary btn-lg" onClick={handleStartLearn}>
              <Play size={18} />
              {isStarted ? '继续学习' : '开始学习'}
            </button>
            {isStarted && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="progress-bar" style={{ width: '200px' }}>
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  已完成 {progress}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 课程主体 */}
      <div className="course-detail-body">
        <div className="container">
          {/* 课程目标 */}
          <div className="course-detail-section">
            <h2>学习目标</h2>
            <ul className="course-objectives">
              {course.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* 课程大纲 */}
          <div className="course-detail-section">
            <h2>课程大纲</h2>
            {course.chapters.map((chapter, chIdx) => (
              <div key={chapter.id} style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                  第{chIdx + 1}章 · {chapter.title}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {chapter.lessons.map(lesson => {
                    const completed = isLessonCompleted(courseId, lesson.id);
                    const typeLabel = lesson.type === 'video' ? '视频' : lesson.type === 'exercise' ? '练习' : '测验';
                    return (
                      <Link
                        key={lesson.id}
                        to={`/learn/${courseId}/${lesson.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          background: 'var(--card)',
                          border: '1px solid var(--card-border)',
                          borderRadius: 'var(--radius)',
                          textDecoration: 'none',
                          color: 'inherit',
                          transition: 'all 0.2s ease',
                          opacity: completed ? 0.7 : 1,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontSize: '1rem' }}>
                            {completed ? '✅' : lesson.type === 'video' ? '🎬' : lesson.type === 'exercise' ? '💻' : '📝'}
                          </span>
                          <div>
                            <div style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{lesson.title}</div>
                            <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                              {typeLabel} · {lesson.duration}
                            </div>
                          </div>
                        </div>
                        <Target size={16} style={{ color: 'var(--text-tertiary)' }} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 课程描述 */}
          <div className="course-detail-section">
            <h2>课程描述</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {course.description}
              本课程由经验丰富的数据分析讲师团队精心打造，结合真实商业案例，采用理论与实践相结合的教学方式。
              课程内容经过多轮迭代优化，确保知识体系的完整性和实用性。无论你是数据分析初学者，
              还是希望提升技能的在职人员，都能在本课程中获得实质性的提升。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
