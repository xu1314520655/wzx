import CourseList from '../components/CourseList';

export default function CoursesPage() {
  return (
    <div className="page courses-page">
      <div className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>课程中心</h1>
            <p>探索丰富的数据分析课程，找到适合你的学习路径</p>
          </div>
          <CourseList />
        </div>
      </div>
    </div>
  );
}
