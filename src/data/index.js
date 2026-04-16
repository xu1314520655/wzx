export const courses = [
  {
    id: 'python-basics',
    title: 'Python数据分析基础',
    description: '从零开始学习Python编程，掌握数据分析的核心基础知识。涵盖变量、数据类型、控制流、函数等核心概念，为后续数据分析学习打下坚实基础。',
    difficulty: '入门',
    duration: '24课时',
    students: 3842,
    rating: 4.8,
    icon: '🐍',
    tags: ['Python', '基础', '零基础友好'],
    objectives: [
      '掌握Python基本语法和数据类型',
      '理解变量、运算符和表达式',
      '学会使用条件语句和循环结构',
      '能够编写简单的数据处理脚本',
      '理解函数的定义和调用',
    ],
    chapters: [
      {
        id: 'ch1',
        title: 'Python环境搭建与初识',
        lessons: [
          { id: 'l1', title: '认识Python与数据分析', type: 'video', duration: '15分钟' },
          { id: 'l2', title: '安装Python与Jupyter', type: 'video', duration: '10分钟' },
          { id: 'l3', title: '第一个Python程序', type: 'exercise', duration: '20分钟' },
        ],
      },
      {
        id: 'ch2',
        title: '变量与数据类型',
        lessons: [
          { id: 'l4', title: '变量与赋值', type: 'video', duration: '12分钟' },
          { id: 'l5', title: '数字类型与运算', type: 'video', duration: '15分钟' },
          { id: 'l6', title: '字符串操作', type: 'video', duration: '18分钟' },
          { id: 'l7', title: '数据类型转换', type: 'exercise', duration: '25分钟' },
          { id: 'l8', title: '章节测验', type: 'quiz', duration: '15分钟' },
        ],
      },
      {
        id: 'ch3',
        title: '控制流与函数',
        lessons: [
          { id: 'l9', title: '条件语句 if-elif-else', type: 'video', duration: '15分钟' },
          { id: 'l10', title: '循环语句 for与while', type: 'video', duration: '18分钟' },
          { id: 'l11', title: '函数定义与参数', type: 'video', duration: '20分钟' },
          { id: 'l12', title: '实战：成绩分析器', type: 'exercise', duration: '30分钟' },
          { id: 'l13', title: '阶段测验', type: 'quiz', duration: '20分钟' },
        ],
      },
    ],
  },
  {
    id: 'data-processing',
    title: 'Pandas数据处理实战',
    description: '深入学习Pandas库，掌握数据清洗、转换、合并等核心操作。通过真实商业数据案例，提升数据处理能力。',
    difficulty: '进阶',
    duration: '32课时',
    students: 2156,
    rating: 4.9,
    icon: '🐼',
    tags: ['Pandas', '数据处理', '实战'],
    objectives: [
      '熟练使用Pandas进行数据读取和写入',
      '掌握数据清洗和缺失值处理',
      '学会数据筛选、排序和分组',
      '理解数据合并和重塑操作',
      '能够处理真实商业数据集',
    ],
    chapters: [
      {
        id: 'ch1',
        title: 'Pandas入门',
        lessons: [
          { id: 'l1', title: 'Series与DataFrame', type: 'video', duration: '18分钟' },
          { id: 'l2', title: '数据读取与写入', type: 'video', duration: '15分钟' },
          { id: 'l3', title: '数据查看与统计', type: 'exercise', duration: '25分钟' },
        ],
      },
      {
        id: 'ch2',
        title: '数据清洗',
        lessons: [
          { id: 'l4', title: '缺失值处理', type: 'video', duration: '20分钟' },
          { id: 'l5', title: '重复值与异常值', type: 'video', duration: '18分钟' },
          { id: 'l6', title: '数据类型转换', type: 'video', duration: '15分钟' },
          { id: 'l7', title: '实战：销售数据清洗', type: 'exercise', duration: '35分钟' },
          { id: 'l8', title: '章节测验', type: 'quiz', duration: '15分钟' },
        ],
      },
      {
        id: 'ch3',
        title: '数据操作与转换',
        lessons: [
          { id: 'l9', title: '数据筛选与切片', type: 'video', duration: '16分钟' },
          { id: 'l10', title: '排序与排名', type: 'video', duration: '12分钟' },
          { id: 'l11', title: '分组聚合', type: 'video', duration: '22分钟' },
          { id: 'l12', title: '数据合并', type: 'video', duration: '18分钟' },
          { id: 'l13', title: '实战：电商数据分析', type: 'exercise', duration: '40分钟' },
          { id: 'l14', title: '阶段测验', type: 'quiz', duration: '20分钟' },
        ],
      },
    ],
  },
  {
    id: 'data-visualization',
    title: '数据可视化与图表设计',
    description: '学习使用Matplotlib和Seaborn创建专业级数据可视化图表。掌握图表设计原则，让数据讲述引人入胜的故事。',
    difficulty: '进阶',
    duration: '28课时',
    students: 1893,
    rating: 4.7,
    icon: '📊',
    tags: ['可视化', 'Matplotlib', 'Seaborn'],
    objectives: [
      '掌握Matplotlib基础绑图方法',
      '学会创建各种常用图表类型',
      '理解图表设计的美学原则',
      '使用Seaborn创建统计图表',
      '能够制作数据报告可视化',
    ],
    chapters: [
      {
        id: 'ch1',
        title: 'Matplotlib基础',
        lessons: [
          { id: 'l1', title: '图表基础与折线图', type: 'video', duration: '18分钟' },
          { id: 'l2', title: '柱状图与饼图', type: 'video', duration: '16分钟' },
          { id: 'l3', title: '散点图与气泡图', type: 'exercise', duration: '25分钟' },
        ],
      },
      {
        id: 'ch2',
        title: '高级图表与美化',
        lessons: [
          { id: 'l4', title: '图表样式与配色', type: 'video', duration: '20分钟' },
          { id: 'l5', title: '子图与组合图表', type: 'video', duration: '18分钟' },
          { id: 'l6', title: 'Seaborn统计图表', type: 'video', duration: '22分钟' },
          { id: 'l7', title: '实战：销售报告可视化', type: 'exercise', duration: '35分钟' },
          { id: 'l8', title: '章节测验', type: 'quiz', duration: '15分钟' },
        ],
      },
    ],
  },
  {
    id: 'statistical-analysis',
    title: '统计分析与假设检验',
    description: '系统学习描述性统计和推断性统计方法，掌握假设检验、回归分析等核心统计技术，用数据驱动商业决策。',
    difficulty: '高级',
    duration: '36课时',
    students: 1247,
    rating: 4.6,
    icon: '📈',
    tags: ['统计学', '假设检验', '回归分析'],
    objectives: [
      '掌握描述性统计的核心指标',
      '理解概率分布与抽样理论',
      '学会进行假设检验',
      '掌握相关分析与回归分析',
      '能够运用统计方法解决商业问题',
    ],
    chapters: [
      {
        id: 'ch1',
        title: '描述性统计',
        lessons: [
          { id: 'l1', title: '集中趋势度量', type: 'video', duration: '18分钟' },
          { id: 'l2', title: '离散程度度量', type: 'video', duration: '16分钟' },
          { id: 'l3', title: '数据分布与偏度', type: 'exercise', duration: '25分钟' },
        ],
      },
      {
        id: 'ch2',
        title: '推断性统计',
        lessons: [
          { id: 'l4', title: '概率与正态分布', type: 'video', duration: '22分钟' },
          { id: 'l5', title: '置信区间', type: 'video', duration: '20分钟' },
          { id: 'l6', title: '假设检验入门', type: 'video', duration: '25分钟' },
          { id: 'l7', title: 'T检验与卡方检验', type: 'video', duration: '22分钟' },
          { id: 'l8', title: '实战：A/B测试分析', type: 'exercise', duration: '40分钟' },
          { id: 'l9', title: '阶段测验', type: 'quiz', duration: '20分钟' },
        ],
      },
    ],
  },
  {
    id: 'real-project',
    title: '商业数据分析实战项目',
    description: '综合运用所学知识，完成真实商业数据分析项目。从数据获取到报告呈现，体验完整的数据分析工作流程。',
    difficulty: '高级',
    duration: '20课时',
    students: 876,
    rating: 4.9,
    icon: '💼',
    tags: ['实战项目', '综合应用', '商业分析'],
    objectives: [
      '能够独立完成数据分析项目',
      '掌握数据获取和清洗流程',
      '学会撰写数据分析报告',
      '提升数据可视化表达能力',
      '积累真实项目经验',
    ],
    chapters: [
      {
        id: 'ch1',
        title: '项目准备',
        lessons: [
          { id: 'l1', title: '项目需求分析', type: 'video', duration: '15分钟' },
          { id: 'l2', title: '数据获取与探索', type: 'video', duration: '20分钟' },
          { id: 'l3', title: '数据清洗方案设计', type: 'exercise', duration: '30分钟' },
        ],
      },
      {
        id: 'ch2',
        title: '分析与报告',
        lessons: [
          { id: 'l4', title: '数据分析与建模', type: 'video', duration: '25分钟' },
          { id: 'l5', title: '可视化与洞察', type: 'video', duration: '20分钟' },
          { id: 'l6', title: '报告撰写与呈现', type: 'video', duration: '18分钟' },
          { id: 'l7', title: '实战：零售数据分析', type: 'exercise', duration: '60分钟' },
          { id: 'l8', title: '项目答辩', type: 'quiz', duration: '30分钟' },
        ],
      },
    ],
  },
];

export const achievements = [
  { id: 'first_login', title: '初次登录', description: '首次登录平台', icon: '🚀', points: 10, category: '入门' },
  { id: 'first_lesson', title: '学习起步', description: '完成第一个课时', icon: '📖', points: 20, category: '学习' },
  { id: 'first_exercise', title: '动手实践', description: '完成第一个编程练习', icon: '💻', points: 30, category: '实践' },
  { id: 'first_quiz', title: '知识检验', description: '完成第一次测验', icon: '✅', points: 25, category: '测验' },
  { id: 'perfect_quiz', title: '满分达人', description: '测验获得满分', icon: '💯', points: 50, category: '测验' },
  { id: 'streak_3', title: '连续学习', description: '连续3天学习', icon: '🔥', points: 30, category: '坚持' },
  { id: 'streak_7', title: '一周坚持', description: '连续7天学习', icon: '⭐', points: 60, category: '坚持' },
  { id: 'streak_30', title: '月度学霸', description: '连续30天学习', icon: '🏆', points: 200, category: '坚持' },
  { id: 'course_complete', title: '课程通关', description: '完成一门完整课程', icon: '🎓', points: 100, category: '学习' },
  { id: 'python_master', title: 'Python精通', description: '完成Python基础课程', icon: '🐍', points: 80, category: '学习' },
  { id: 'data_cleaner', title: '数据清洗师', description: '完成Pandas课程', icon: '🧹', points: 80, category: '学习' },
  { id: 'viz_artist', title: '可视化艺术家', description: '完成可视化课程', icon: '🎨', points: 80, category: '学习' },
  { id: 'code_100', title: '百行代码', description: '累计编写100行代码', icon: '📝', points: 40, category: '实践' },
  { id: 'code_1000', title: '千行代码', description: '累计编写1000行代码', icon: '🚀', points: 150, category: '实践' },
  { id: 'top_10', title: '前十名', description: '进入排行榜前十', icon: '🥇', points: 100, category: '排名' },
  { id: 'all_courses', title: '全能学者', description: '完成所有课程', icon: '👑', points: 500, category: '学习' },
];

export const leaderboardData = [
  { rank: 1, name: '张明远', avatar: '🧑‍💻', level: 28, points: 4850, courses: 5 },
  { rank: 2, name: '李思涵', avatar: '👩‍🎓', level: 26, points: 4620, courses: 5 },
  { rank: 3, name: '王浩然', avatar: '👨‍🔬', level: 25, points: 4380, courses: 4 },
  { rank: 4, name: '陈雨萱', avatar: '👩‍💻', level: 23, points: 3950, courses: 4 },
  { rank: 5, name: '刘子轩', avatar: '🧑‍🎓', level: 22, points: 3720, courses: 4 },
  { rank: 6, name: '赵晓峰', avatar: '👨‍💻', level: 21, points: 3480, courses: 3 },
  { rank: 7, name: '孙美琪', avatar: '👩‍🔬', level: 20, points: 3150, courses: 3 },
  { rank: 8, name: '周天宇', avatar: '🧑‍🔬', level: 19, points: 2900, courses: 3 },
  { rank: 9, name: '吴佳怡', avatar: '👩‍🎓', level: 18, points: 2650, courses: 3 },
  { rank: 10, name: '郑凯文', avatar: '👨‍🎓', level: 17, points: 2400, courses: 2 },
  { rank: 11, name: '黄思远', avatar: '🧑‍💻', level: 16, points: 2180, courses: 2 },
  { rank: 12, name: '林雅婷', avatar: '👩‍💻', level: 15, points: 1950, courses: 2 },
  { rank: 13, name: '杨子墨', avatar: '👨‍🔬', level: 14, points: 1720, courses: 2 },
  { rank: 14, name: '何雨欣', avatar: '👩‍🎓', level: 13, points: 1500, courses: 1 },
  { rank: 15, name: '罗文博', avatar: '🧑‍🎓', level: 12, points: 1280, courses: 1 },
];

export const lessonContents = {
  video: {
    title: '视频课程',
    content: `# 欢迎来到本课时

本课时将通过详细的讲解和演示，帮助你掌握核心概念。

## 学习要点

1. **理解基本概念** - 掌握本课时的核心理论知识
2. **跟随示例操作** - 通过实例加深理解
3. **完成课后练习** - 巩固所学内容

## 知识讲解

在数据分析中，我们经常需要处理各种类型的数据。Python提供了丰富的工具和库来帮助我们高效地完成这些任务。

### 关键代码示例

\`\`\`python
import pandas as pd
import numpy as np

# 创建示例数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六'],
    '成绩': [85, 92, 78, 95],
    '等级': ['B', 'A', 'C', 'A']
}

df = pd.DataFrame(data)
print(df.describe())
\`\`\`

### 要点总结

- 数据分析的核心是**发现问题**和**解决问题**
- Python的生态系统为数据分析提供了强大支持
- 实践是最好的学习方式

---

> 💡 **提示**：完成本课时后，请继续完成课后练习以巩固所学内容。`,
  },
  exercise: {
    title: '编程练习',
    description: '请在代码编辑器中完成以下练习任务',
    initialCode: `# 练习：数据处理基础\n# 请完成以下任务\n\nimport pandas as pd\nimport numpy as np\n\n# 任务1：创建一个包含学生信息的DataFrame\n# 要求：包含姓名、年龄、成绩三列，至少5条数据\nstudents = pd.DataFrame({\n    # 请在这里编写代码\n})\n\n# 任务2：计算平均成绩\naverage_score = None  # 请替换为你的代码\n\n# 任务3：筛选成绩大于80分的学生\ntop_students = None  # 请替换为你的代码\n\nprint("学生数据：")\nprint(students)\nprint(f"\\n平均成绩：{average_score}")\nprint(f"\\n优秀学生：")\nprint(top_students)`,
    testCases: [
      { description: 'DataFrame包含正确的列名', check: 'students.columns.tolist()' },
      { description: 'DataFrame至少有5行数据', check: 'len(students) >= 5' },
      { description: '平均成绩计算正确', check: 'isinstance(average_score, (int, float))' },
    ],
    hints: [
      '使用 pd.DataFrame() 创建数据框',
      '使用 df["列名"].mean() 计算平均值',
      '使用 df[df["列名"] > 值] 进行条件筛选',
    ],
  },
  quiz: {
    title: '章节测验',
    questions: [
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
        explanation: 'array 不是Python的基本数据类型，它是NumPy等库提供的类型。Python基本数据类型包括int、float、str、bool、list、tuple、dict、set等。',
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
    ],
  },
};
