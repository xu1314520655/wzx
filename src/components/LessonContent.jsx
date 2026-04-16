import { useUser } from '../context/UserContext';

export default function LessonContent({ courseId, lessonId, lesson }) {
  const { completeLesson } = useUser();

  if (!lesson) {
    return (
      <div className="lesson-content">
        <div className="empty-state">
          <p>请从左侧选择一个课时开始学习</p>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    completeLesson(courseId, lessonId);
  };

  if (lesson.type === 'video') {
    return (
      <div className="lesson-content">
        <div className="lesson-video-area">
          <div className="video-placeholder">
            <div className="video-icon">🎬</div>
            <p>视频课程内容</p>
            <span className="video-duration">{lesson.duration}</span>
          </div>
        </div>
        <div className="lesson-text-content">
          <h2>{lesson.title}</h2>
          <div className="markdown-content">
            <h3>学习要点</h3>
            <p>本课时将通过详细的讲解和演示，帮助你掌握核心概念。请认真观看视频并做好笔记。</p>
            <h3>关键知识点</h3>
            <ul>
              <li>理解基本概念和原理</li>
              <li>掌握核心操作方法</li>
              <li>学会在实际场景中应用</li>
            </ul>
            <h3>代码示例</h3>
            <pre><code>{`import pandas as pd
import numpy as np

# 创建示例数据
data = {'姓名': ['张三', '李四', '王五'],
        '成绩': [85, 92, 78]}
df = pd.DataFrame(data)
print(df.describe())`}</code></pre>
            <blockquote>
              <p>提示：完成本课时后，请继续完成课后练习以巩固所学内容。</p>
            </blockquote>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleComplete}>
            标记为已完成
          </button>
        </div>
      </div>
    );
  }

  return null;
}
