import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

// Pyodide 加载状态管理
let pyodideInstance = null;
let pyodideLoading = false;
let pyodideLoadPromise = null;

async function loadPyodideInstance() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoadPromise) return pyodideLoadPromise;

  pyodideLoading = true;
  pyodideLoadPromise = (async () => {
    try {
      // 动态加载 Pyodide 脚本
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Pyodide 脚本加载失败，请检查网络连接'));
          document.head.appendChild(script);
        });
      }
      pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });
      // 加载常用数据分析库
      await pyodideInstance.loadPackage(['micropip']);
      pyodideLoading = false;
      return pyodideInstance;
    } catch (err) {
      pyodideLoading = false;
      pyodideLoadPromise = null;
      throw err;
    }
  })();

  return pyodideLoadPromise;
}

const DEFAULT_EXERCISES = {
  'python-basics': {
    code: `# Python 基础练习
# 任务：完成以下函数，使其返回正确的值

def greet(name):
    """编写一个问候函数，返回 '你好, {name}!'"""
    # 请在这里编写代码
    pass

def calculate_average(numbers):
    """计算列表中数字的平均值"""
    # 请在这里编写代码
    pass

# 测试代码
print(greet('同学'))
print(f"平均成绩: {calculate_average([85, 92, 78, 95, 88])}")
`,
  },
  'data-processing': {
    code: `# Pandas 数据处理练习
import pandas as pd
import numpy as np

# 创建示例销售数据
data = {
    '商品': ['笔记本', '手机', '平板', '耳机', '键盘', '鼠标', '显示器', '音箱'],
    '销量': [120, 85, 65, 200, 150, 180, 45, 90],
    '单价': [4999, 2999, 1999, 299, 199, 99, 2499, 399],
    '类别': ['电脑', '电子', '电子', '配件', '配件', '配件', '电脑', '配件']
}

df = pd.DataFrame(data)
df['销售额'] = df['销量'] * df['单价']

print("=== 销售数据 ===")
print(df.to_string(index=False))

print("\\n=== 按类别统计 ===")
print(df.groupby('类别')['销售额'].sum())

print("\\n=== 销量TOP3 ===")
print(df.nlargest(3, '销量')[['商品', '销量', '销售额']])
`,
  },
  'data-visualization': {
    code: `# 数据可视化练习
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# 创建示例数据
categories = ['Q1', 'Q2', 'Q3', 'Q4']
sales_a = [120, 150, 180, 200]
sales_b = [100, 130, 160, 190]

# 创建柱状图
fig, ax = plt.subplots(figsize=(8, 5))
x = np.arange(len(categories))
width = 0.35

bars1 = ax.bar(x - width/2, sales_a, width, label='Product A', color='#4F46E5')
bars2 = ax.bar(x + width/2, sales_b, width, label='Product B', color='#7C3AED')

ax.set_xlabel('Quarter')
ax.set_ylabel('Sales')
ax.set_title('Quarterly Sales Comparison')
ax.set_xticks(x)
ax.set_xticklabels(categories)
ax.legend()

plt.tight_layout()
plt.savefig('chart.png', dpi=100)
print("图表已生成！")
print(f"Product A 总销售额: {sum(sales_a)}")
print(f"Product B 总销售额: {sum(sales_b)}")
`,
  },
  'statistical-analysis': {
    code: `# 统计分析练习
import numpy as np
from scipy import stats

# 生成模拟考试成绩数据
np.random.seed(42)
scores = np.random.normal(75, 10, 100)
scores = np.clip(scores, 0, 100)

print("=== 描述性统计 ===")
print(f"样本量: {len(scores)}")
print(f"均值: {np.mean(scores):.2f}")
print(f"中位数: {np.median(scores):.2f}")
print(f"标准差: {np.std(scores):.2f}")
print(f"最小值: {np.min(scores):.2f}")
print(f"最大值: {np.max(scores):.2f}")

print("\\n=== 假设检验 ===")
# 检验平均分是否显著高于70分
t_stat, p_value = stats.ttest_1samp(scores, 70)
print(f"t统计量: {t_stat:.4f}")
print(f"p值: {p_value:.4f}")
print(f"结论: 平均分{'显著高于' if p_value < 0.05 else '不显著高于'}70分 (α=0.05)")
`,
  },
  'real-project': {
    code: `# 商业数据分析综合练习
import pandas as pd
import numpy as np

# 模拟电商用户行为数据
np.random.seed(42)
n = 1000

users = pd.DataFrame({
    'user_id': range(1, n + 1),
    'age_group': np.random.choice(['18-25', '26-35', '36-45', '46+'], n, p=[0.3, 0.35, 0.2, 0.15]),
    'purchase_count': np.random.poisson(5, n),
    'avg_order_value': np.random.normal(200, 50, n).round(2),
    'total_spent': 0.0,
})

users['total_spent'] = users['purchase_count'] * users['avg_order_value']

print("=== 用户消费概览 ===")
print(users.describe().round(2))

print("\\n=== 各年龄段分析 ===")
segment = users.groupby('age_group').agg({
    'user_id': 'count',
    'purchase_count': 'mean',
    'avg_order_value': 'mean',
    'total_spent': 'sum'
}).round(2)
segment.columns = ['用户数', '平均购买次数', '平均客单价', '总消费额']
print(segment)

print("\\n=== 高价值用户 (消费TOP10%) ===")
threshold = users['total_spent'].quantile(0.9)
vip = users[users['total_spent'] >= threshold]
print(f"高价值用户阈值: ¥{threshold:.2f}")
print(f"高价值用户数: {len(vip)} ({len(vip)/n*100:.1f}%)")
print(f"高价值用户贡献消费: ¥{vip['total_spent'].sum():.2f} ({vip['total_spent'].sum()/users['total_spent'].sum()*100:.1f}%)")
`,
  },
};

export default function CodePlayground({ courseId, lessonId }) {
  const [code, setCode] = useState(DEFAULT_EXERCISES[courseId]?.code || `# Python 代码编辑器\n# 在这里编写你的 Python 代码\n\nprint("Hello, 数据分析!")\n`);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [pyodideStatus, setPyodideStatus] = useState('idle'); // idle, loading, ready, error
  const [plotImages, setPlotImages] = useState([]);
  const textareaRef = useRef(null);
  const { completeLesson, addCodeLines } = useUser();

  // 预加载 Pyodide
  useEffect(() => {
    if (pyodideStatus === 'idle') {
      setPyodideStatus('loading');
      loadPyodideInstance()
        .then(() => setPyodideStatus('ready'))
        .catch((err) => {
          setPyodideStatus('error');
          console.warn('Pyodide 加载失败，将使用模拟模式:', err.message);
        });
    }
  }, []);

  // 自动修复常见 Python 语法错误
  const fixCommonSyntaxErrors = (pythonCode) => {
    let fixed = pythonCode;
    // 修复 print(" 换行问题：将 print("\n... 或 print("\n 合并为一行
    fixed = fixed.replace(/print\("\s*\n/g, 'print("');
    // 修复未闭合的字符串跨行（简单情况）
    const lines = fixed.split('\n');
    const result = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      // 检测 print(" 后面直接换行的情况
      const match = line.match(/^(\s*print\(")([^"]*)$/);
      if (match && i + 1 < lines.length) {
        const indent = match[1];
        const nextLine = lines[i + 1].trim();
        // 合并到下一行找到闭合引号
        if (nextLine.includes('"')) {
          result.push(indent + match[2] + nextLine);
          i += 2;
          continue;
        }
      }
      result.push(line);
      i++;
    }
    return result.join('\n');
  };

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setPlotImages([]);
    setIsCompleted(false);

    // 自动修复代码中的常见语法错误
    const fixedCode = fixCommonSyntaxErrors(code);
    if (fixedCode !== code) {
      setCode(fixedCode);
    }

    try {
      if (pyodideStatus === 'ready' && pyodideInstance) {
        // 真实 Python 执行模式
        await executeWithPyodide(fixedCode);
      } else if (pyodideStatus === 'loading') {
        setOutput('⏳ Python 环境正在加载中，请稍候...');
        setIsRunning(false);
        return;
      } else {
        // 降级到模拟模式
        executeSimulated(fixedCode);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  }, [code, pyodideStatus]);

  const executeWithPyodide = async (pythonCode) => {
    try {
      // 尝试加载 matplotlib 和 scipy（如果代码需要）
      if (pythonCode.includes('matplotlib') || pythonCode.includes('scipy')) {
        try {
          await pyodideInstance.loadPackage(['matplotlib', 'scipy']);
        } catch {
          // 如果加载失败，继续尝试执行
        }
      } else if (pythonCode.includes('pandas') || pythonCode.includes('numpy')) {
        try {
          await pyodideInstance.loadPackage(['pandas', 'numpy']);
        } catch {
          // 忽略
        }
      }

      // 重定向 stdout
      pyodideInstance.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

      // 执行用户代码
      await pyodideInstance.runPythonAsync(pythonCode);

      // 获取输出
      const stdout = pyodideInstance.runPython('sys.stdout.getvalue()');
      const stderr = pyodideInstance.runPython('sys.stderr.getvalue()');

      // 检查是否有图表输出
      let images = [];
      try {
        const hasPlot = pyodideInstance.runPython(`
import os
chart_exists = os.path.exists('chart.png')
chart_exists
`);
        if (hasPlot) {
          const imgData = pyodideInstance.runPython(`
import base64
with open('chart.png', 'rb') as f:
    data = base64.b64encode(f.read()).decode()
data
`);
          images.push(`data:image/png;base64,${imgData}`);
        }
      } catch {
        // 没有图表，忽略
      }

      if (stdout) setOutput(stdout);
      if (stderr) setError(stderr);
      setPlotImages(images);

      if (stdout || images.length > 0) {
        setIsCompleted(true);
        completeLesson(courseId, lessonId);
        addCodeLines(code.split('\n').length);
      }
    } catch (err) {
      const errMsg = err.message || String(err);
      // 清理 Pyodide 内部错误信息，只保留有用的部分
      const cleanError = errMsg.split('\n').filter(line =>
        !line.includes('pyodide') && !line.includes('_pyodide') && line.trim()
      ).join('\n') || errMsg;
      setError(cleanError);
    }
  };

  const executeSimulated = (pythonCode) => {
    // 模拟模式：解析 print 语句并生成输出
    setTimeout(() => {
      const printMatches = pythonCode.match(/print\((.+?)\)/g);
      if (printMatches) {
        const results = printMatches.map(match => {
          const content = match.replace(/print\(|\)/g, '');
          // 简单处理 f-string
          return content
            .replace(/^f"/, '').replace(/"$/, '')
            .replace(/^f'/, '').replace(/'$/, '')
            .replace(/\{.*?\}/g, (match) => {
              const expr = match.slice(1, -1);
              if (expr.includes('sum')) return '总计';
              if (expr.includes('mean')) return '平均值';
              if (expr.includes('len')) return '数量';
              return match;
            });
        });
        setOutput(results.join('\n'));
      } else {
        setOutput('代码执行完成（模拟模式）\n\n💡 提示：Python 环境正在加载中，加载完成后将支持真实代码执行。');
      }
      setIsCompleted(true);
      completeLesson(courseId, lessonId);
      addCodeLines(code.split('\n').length);
    }, 600);
  };

  const resetCode = () => {
    const defaultCode = DEFAULT_EXERCISES[courseId]?.code || `# Python 代码编辑器\n# 在这里编写你的 Python 代码\n\nprint("Hello, 数据分析!")\n`;
    setCode(defaultCode);
    setOutput('');
    setError('');
    setPlotImages([]);
    setIsCompleted(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
    // Ctrl/Cmd + Enter 运行代码
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  };

  return (
    <div className="code-playground">
      <div className="playground-header">
        <div className="playground-title">
          <h4>🐍 Python 代码编辑器</h4>
          <span className={`pyodide-status ${pyodideStatus}`}>
            {pyodideStatus === 'ready' && <><CheckCircle2 size={12} /> Python 就绪</>}
            {pyodideStatus === 'loading' && <><Loader2 size={12} className="spin" /> 加载中...</>}
            {pyodideStatus === 'error' && <><AlertCircle size={12} /> 模拟模式</>}
            {pyodideStatus === 'idle' && <>等待初始化</>}
          </span>
        </div>
        <div className="playground-actions">
          <button className="btn btn-outline btn-sm" onClick={resetCode}>
            <RotateCcw size={14} /> 重置
          </button>
          <button
            className={`btn btn-primary btn-sm ${isRunning ? 'loading' : ''}`}
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <><Loader2 size={14} className="spin" /> 运行中...</>
            ) : (
              <><Play size={14} /> 运行代码</>
            )}
          </button>
        </div>
      </div>

      <div className="playground-body">
        <div className="editor-area">
          <div className="editor-lines">
            {code.split('\n').map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            className="code-editor"
            spellCheck={false}
            placeholder="在这里编写 Python 代码..."
          />
        </div>

        <div className="output-area">
          <div className="output-header">
            <span>输出结果</span>
            {isCompleted && !error && (
              <span className="output-success">
                <CheckCircle2 size={14} /> 运行成功
              </span>
            )}
          </div>
          {error ? (
            <pre className="output-content output-error">{error}</pre>
          ) : (
            <pre className="output-content">{output || '点击 "运行代码" 或按 Ctrl+Enter 查看结果...'}</pre>
          )}
          {plotImages.length > 0 && (
            <div className="plot-images">
              {plotImages.map((src, i) => (
                <img key={i} src={src} alt="Python 图表输出" className="plot-image" />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="playground-footer">
        <span className="playground-shortcut">💡 按 Ctrl+Enter 快速运行</span>
        {pyodideStatus === 'ready' && (
          <span className="playground-mode">真实 Python 环境 (Pyodide)</span>
        )}
        {pyodideStatus === 'error' && (
          <span className="playground-mode">模拟模式 (网络不可用)</span>
        )}
      </div>
    </div>
  );
}
