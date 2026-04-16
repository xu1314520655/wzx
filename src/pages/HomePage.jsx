import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Brain, Trophy } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { courses } from '../data';

const features = [
  {
    icon: <Sparkles size={28} />,
    title: '互动学习',
    description: '通过精心设计的互动课程，让学习数据分析变得生动有趣，告别枯燥的理论灌输。',
    colorClass: 'purple',
  },
  {
    icon: <Code2 size={28} />,
    title: '实时编程',
    description: '内置在线代码编辑器，边学边练，即时看到运行结果，快速掌握编程技能。',
    colorClass: 'blue',
  },
  {
    icon: <Brain size={28} />,
    title: '智能测评',
    description: '智能测验系统实时评估学习效果，精准定位知识薄弱点，个性化推荐学习内容。',
    colorClass: 'green',
  },
  {
    icon: <Trophy size={28} />,
    title: '成就系统',
    description: '丰富的成就和积分体系，激励持续学习，与同学比拼排名，共同进步成长。',
    colorClass: 'orange',
  },
];

const pathSteps = [
  { icon: '🐍', title: 'Python基础', desc: '语法与编程思维' },
  { icon: '🐼', title: '数据处理', desc: 'Pandas实战' },
  { icon: '📊', title: '数据可视化', desc: '图表与报告' },
  { icon: '📈', title: '统计分析', desc: '假设检验与建模' },
  { icon: '💼', title: '实战项目', desc: '商业数据分析' },
];

export default function HomePage() {
  const recommendedCourses = courses.slice(0, 3);

  return (
    <div className="home-page">
      {/* 英雄区域 */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>面向商务数据分析与应用专业</span>
          </div>
          <h1 className="hero-title">掌握数据分析，开启职业未来</h1>
          <p className="hero-subtitle">
            通过互动式学习体验，从零开始掌握Python数据分析技能。涵盖数据处理、可视化、统计分析等核心能力，助你在数据时代脱颖而出。
          </p>
          <div className="hero-actions">
            <Link to="/courses" className="btn btn-primary btn-lg">
              开始学习 <ArrowRight size={20} />
            </Link>
            <Link to="/courses" className="btn btn-outline btn-lg">
              浏览课程
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">10,000+</div>
              <div className="hero-stat-label">注册学生</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">5</div>
              <div className="hero-stat-label">精品课程</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">500+</div>
              <div className="hero-stat-label">练习题目</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">98%</div>
              <div className="hero-stat-label">好评率</div>
            </div>
          </div>
        </div>
      </section>

      {/* 特色功能区 */}
      <section className="features-section">
        <div className="container">
          <div className="section-title">
            <h2>为什么选择 DataEdu Pro</h2>
            <p>全方位的学习体验，让数据分析学习更高效</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${feature.colorClass}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 课程预览区 */}
      <section className="courses-preview">
        <div className="container">
          <div className="section-title">
            <h2>推荐课程</h2>
            <p>精心设计的课程体系，循序渐进提升数据分析能力</p>
          </div>
          <div className="course-grid">
            {recommendedCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <Link to="/courses" className="btn btn-outline">
              查看全部课程 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 数据统计区 */}
      <section className="stats-section">
        <div className="container">
          <div className="section-title">
            <h2>平台数据</h2>
            <p>用数据说话，见证每一位学习者的成长</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👨‍🎓</div>
              <div className="stat-value">10,014</div>
              <div className="stat-label">注册学生</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">5</div>
              <div className="stat-label">精品课程</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✏️</div>
              <div className="stat-value">528</div>
              <div className="stat-label">练习题目</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-value">140</div>
              <div className="stat-label">总课时数</div>
            </div>
          </div>
        </div>
      </section>

      {/* 学习路径区 */}
      <section className="learning-path-section">
        <div className="container">
          <div className="section-title">
            <h2>学习路径</h2>
            <p>清晰的学习路线，从入门到精通</p>
          </div>
          <div className="path-steps">
            {pathSteps.map((step, index) => (
              <div key={index}>
                <div className="path-step">
                  <div className="path-step-icon">{step.icon}</div>
                  <div className="path-step-title">{step.title}</div>
                  <div className="path-step-desc">{step.desc}</div>
                </div>
                {index < pathSteps.length - 1 && (
                  <span className="path-arrow">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
