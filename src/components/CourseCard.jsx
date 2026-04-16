import { Link } from 'react-router-dom';
import { Clock, Users, Star, BarChart3 } from 'lucide-react';

const difficultyColors = {
  '入门': { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
  '进阶': { bg: '#FFF7ED', text: '#D97706', border: '#FED7AA' },
  '高级': { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' },
};

export default function CourseCard({ course }) {
  const diffStyle = difficultyColors[course.difficulty] || difficultyColors['入门'];

  return (
    <Link to={`/course/${course.id}`} className="course-card">
      <div className="course-card-header">
        <span className="course-card-icon">{course.icon}</span>
        <span className="course-card-difficulty" style={{ background: diffStyle.bg, color: diffStyle.text, borderColor: diffStyle.border }}>
          {course.difficulty}
        </span>
      </div>
      <h3 className="course-card-title">{course.title}</h3>
      <p className="course-card-desc">{course.description}</p>
      <div className="course-card-tags">
        {course.tags.map(tag => (
          <span key={tag} className="course-tag">{tag}</span>
        ))}
      </div>
      <div className="course-card-meta">
        <span><Clock size={14} /> {course.duration}</span>
        <span><Users size={14} /> {course.students.toLocaleString()}人学习</span>
        <span><Star size={14} style={{ color: '#F59E0B' }} /> {course.rating}</span>
      </div>
    </Link>
  );
}
