import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import ChapterNav from '../components/ChapterNav';
import LessonContent from '../components/LessonContent';
import CodePlayground from '../components/CodePlayground';
import QuizPanel from '../components/QuizPanel';
import { courses } from '../data';
import { useUser } from '../context/UserContext';

export default function LearnPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { getLessonProgress, isLessonCompleted } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Find current lesson
  let currentLesson = null;
  let prevLesson = null;
  let nextLesson = null;
  let allLessons = [];

  course.chapters.forEach(chapter => {
    chapter.lessons.forEach(lesson => {
      allLessons.push({ ...lesson, chapterId: chapter.id });
    });
  });

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  if (currentIndex >= 0) {
    currentLesson = allLessons[currentIndex];
    prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  }

  const navigateToLesson = (lesson) => {
    if (lesson) {
      navigate(`/learn/${courseId}/${lesson.id}`);
      setSidebarOpen(false);
    }
  };

  return (
    <div className="learn-page">
      {/* 移动端菜单按钮 */}
      <button
        className="menu-toggle"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1001,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--primary)',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
        }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={20} />
      </button>

      {/* 左侧边栏 */}
      <div className={`learn-sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
        <ChapterNav course={course} />
      </div>

      {/* 中间内容区 */}
      <div className="learn-main">
        {/* 顶部信息栏 */}
        <div className="learn-top-bar">
          <div>
            <Link to={`/course/${courseId}`} style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', textDecoration: 'none' }}>
              {course.icon} {course.title}
            </Link>
            <h1>{currentLesson ? currentLesson.title : '选择课时'}</h1>
          </div>
          <div className="learn-progress-info">
            <span>学习进度</span>
            <div className="progress-bar learn-progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>{progress}%</span>
          </div>
        </div>

        {/* 课时内容 */}
        {currentLesson ? (
          <>
            {currentLesson.type === 'video' && (
              <LessonContent
                courseId={courseId}
                lessonId={lessonId}
                lesson={currentLesson}
              />
            )}
            {currentLesson.type === 'exercise' && (
              <CodePlayground
                courseId={courseId}
                lessonId={lessonId}
              />
            )}
            {currentLesson.type === 'quiz' && (
              <QuizPanel
                courseId={courseId}
                lessonId={lessonId}
              />
            )}

            {/* 课时导航 */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 'var(--spacing-xl)',
              paddingTop: 'var(--spacing-lg)',
              borderTop: '1px solid var(--border)',
            }}>
              <button
                className="btn btn-outline"
                disabled={!prevLesson}
                onClick={() => navigateToLesson(prevLesson)}
              >
                <ChevronLeft size={16} /> 上一课时
              </button>
              {nextLesson ? (
                <button
                  className="btn btn-primary"
                  onClick={() => navigateToLesson(nextLesson)}
                >
                  下一课时 <ChevronRight size={16} />
                </button>
              ) : (
                <Link to={`/course/${courseId}`} className="btn btn-success">
                  返回课程
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>请从左侧大纲选择一个课时开始学习</p>
            {allLessons.length > 0 && (
              <button
                className="btn btn-primary"
                style={{ marginTop: '16px' }}
                onClick={() => navigateToLesson(allLessons[0])}
              >
                从第一课时开始
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
