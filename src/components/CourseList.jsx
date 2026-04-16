import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import CourseCard from './CourseCard';
import { courses } from '../data';

export default function CourseList({ filterDifficulty }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulty, setDifficulty] = useState(filterDifficulty || 'all');

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchSearch = course.title.includes(searchTerm) || course.description.includes(searchTerm) || course.tags.some(t => t.includes(searchTerm));
      const matchDifficulty = difficulty === 'all' || course.difficulty === difficulty;
      return matchSearch && matchDifficulty;
    });
  }, [searchTerm, difficulty]);

  return (
    <div className="course-list">
      <div className="course-list-controls">
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="搜索课程..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <Filter size={16} />
          <button className={`filter-btn ${difficulty === 'all' ? 'active' : ''}`} onClick={() => setDifficulty('all')}>全部</button>
          <button className={`filter-btn ${difficulty === '入门' ? 'active' : ''}`} onClick={() => setDifficulty('入门')}>入门</button>
          <button className={`filter-btn ${difficulty === '进阶' ? 'active' : ''}`} onClick={() => setDifficulty('进阶')}>进阶</button>
          <button className={`filter-btn ${difficulty === '高级' ? 'active' : ''}`} onClick={() => setDifficulty('高级')}>高级</button>
        </div>
      </div>
      {filteredCourses.length > 0 ? (
        <div className="course-grid">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>没有找到匹配的课程</p>
          <button className="btn btn-outline" onClick={() => { setSearchTerm(''); setDifficulty('all'); }}>清除筛选</button>
        </div>
      )}
    </div>
  );
}
