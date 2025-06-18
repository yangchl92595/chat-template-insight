import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown, Code2, MessageSquare, Braces, Binary, Layers, Zap, BookOpen, Target, Users, CheckCircle } from 'lucide-react';

const Index = () => {
  const [activeStep, setActiveStep] = useState(0);

  const alpacaExample = `{
  "instruction": "解释什么是机器学习",
  "input": "",
  "output": "机器学习是人工智能的一个分支，它使用算法和统计模型让计算机系统能够从数据中学习并做出决策，而无需显式编程。"
}`;

  const sharegptExample = `[{
  "conversation": [
    {
      "system": "你是一个AI助手",
      "input": "什么是深度学习？",
      "output": "深度学习是机器学习的一个子集，使用多层神经网络来模拟人脑的工作方式。"
    },
    {
      "input": "它有什么应用？",
      "output": "深度学习广泛应用于图像识别、自然语言处理、语音识别等领域。"
    }
  ]
}]`;

  const messagesExample = `{
  "messages": [
    {
      "role": "system",
      "content": "你是一个能干的助手"
    },
    {
      "role": "user", 
      "content": "谁赢得了2020年的世界职业棒球大赛?"
    },
    {
      "role": "assistant",
      "content": "洛杉矶道奇队在2020年赢得了世界职业棒球大赛冠军"
    }
  ]
}`;

  const chatTemplateExample = `{% for message in messages %}
  {%- if message['role'] == 'system' %}
    {{ message['content'] }}
  {%- endif %}
  {%- if message['role'] == 'user' %}
    <|User|>{{ message['content'] }}
  {%- endif %}
  {%- if message['role'] == 'assistant' %}
    <|Assistant|>{{ message['content'] }}<|end_of_sentence|>
  {%- endif %}
{% endfor %}`;

  const tokenizedExample = `{
  "input_ids": [128000, 9426, 374, 264, 15228, 18328, 627, 128006, 882, 128007, 271, 102, 105, 70446, 5486, 233, 17792, 5486, 233, 17792],
  "attention_mask": [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  "labels": [-100, -100, -100, -100, -100, -100, -100, 128006, 78191, 128007, 271, 102, 105, 70446, 5486, 233, 17792, 5486, 233, 17792]
}`;

  const steps = [
    {
      title: "原始数据格式",
      description: "训练数据的两种主要格式：Alpaca和ShareGPT",
      icon: <Code2 className="w-5 h-5" />
    },
    {
      title: "统一Message格式",
      description: "中间件将不同格式转换为标准的messages结构",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      title: "Chat Template应用",
      description: "基于Jinja模板引擎处理对话格式",
      icon: <Braces className="w-5 h-5" />
    },
    {
      title: "Token化处理",
      description: "将文本转换为数字ID序列",
      icon: <Binary className="w-5 h-5" />
    },
    {
      title: "Embedding向量化",
      description: "将token ID转换为语义向量",
      icon: <Layers className="w-5 h-5" />
    }
  ];

  const dataQualityIssues = [
    {
      title: "数据量太小",
      description: "容易过拟合，泛化能力差",
      icon: "📊",
      detail: "7B模型至少需要1000条起步，数据量需随模型参数增长而增加"
    },
    {
      title: "噪声数据多",
      description: "错别字、格式混乱、标注错误",
      icon: "🔍",
      detail: "需清洗乱码、重复内容、无关段落，检查标签一致性"
    },
    {
      title: "样本偏差严重",
      description: "数据分布与实际场景差异大",
      icon: "⚖️",
      detail: "训练数据要与真实应用场景分布保持一致"
    },
    {
      title: "任务相关性不够",
      description: "混入无关数据影响效果",
      icon: "🎯",
      detail: "如金融问答模型不应混入大量财经新闻"
    },
    {
      title: "数据多样性不足",
      description: "场景覆盖单一，缺乏多样性",
      icon: "🌈",
      detail: "需覆盖不同场景、句式、指令类型"
    }
  ];

  const qaVsStatementModes = [
    {
      mode: "问答模式",
      example: {
        question: "什么是跨站脚本攻击（XSS）？",
        answer: "跨站脚本攻击（XSS）是一种常见的Web安全漏洞，攻击者通过在网页中注入恶意脚本代码，当其他用户访问该网页时，恶意脚本会在用户浏览器中执行..."
      },
      pros: [
        "模仿真实用户交互场景",
        "训练模型主动回应能力",
        "适合客服、助手类应用",
        "用户意图明确清晰"
      ],
      cons: [
        "问题设计质量要求高",
        "容易产生模式化回答",
        "问题覆盖面可能不够全面"
      ],
      suitable: "对话系统、智能客服、教育问答"
    },
    {
      mode: "陈述模式",
      example: {
        instruction: "解释Web安全中的跨站脚本攻击",
        response: "跨站脚本攻击（Cross-Site Scripting，XSS）是指攻击者在合法的Web页面中插入恶意的客户端脚本代码。当用户浏览该页面时，嵌入的脚本将在用户的浏览器上执行..."
      },
      pros: [
        "知识传授更系统全面",
        "避免问题设计的局限性",
        "更适合知识注入",
        "表达更加自然流畅"
      ],
      cons: [
        "缺乏交互性训练",
        "可能不够贴近实际应用",
        "用户意图识别能力较弱"
      ],
      suitable: "知识库问答、专业内容生成、文档写作"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            大模型训练数据格式解析
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从原始训练数据到模型输入的完整转换流程
          </p>
        </div>

        {/* Process Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">数据处理流程</h2>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <Button
                  variant={activeStep === index ? "default" : "outline"}
                  className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                      : 'hover:scale-105'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {step.icon}
                  <span className="font-medium">{step.title}</span>
                </Button>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Badge variant="secondary" className="mb-2">
                  步骤 {activeStep + 1}
                </Badge>
                <h3 className="text-xl font-semibold mb-2">{steps[activeStep].title}</h3>
                <p className="text-gray-600">{steps[activeStep].description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <div className="grid gap-8 mb-12">
          <Tabs defaultValue="formats" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="formats" className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                原始格式
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages格式
              </TabsTrigger>
              <TabsTrigger value="template" className="flex items-center gap-2">
                <Braces className="w-4 h-4" />
                Chat Template
              </TabsTrigger>
              <TabsTrigger value="tokenized" className="flex items-center gap-2">
                <Binary className="w-4 h-4" />
                Token化结果
              </TabsTrigger>
              <TabsTrigger value="dataset-construction" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                数据集构建
              </TabsTrigger>
              <TabsTrigger value="qa-modes" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                问答模式
              </TabsTrigger>
            </TabsList>

            <TabsContent value="formats">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="outline">Alpaca格式</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
                      <code>{alpacaExample}</code>
                    </pre>
                    <p className="text-sm text-gray-600 mt-3">
                      简单的指令-输入-输出三元组格式，适合单轮对话训练
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="outline">ShareGPT格式</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border">
                      <code>{sharegptExample}</code>
                    </pre>
                    <p className="text-sm text-gray-600 mt-3">
                      支持多轮对话的格式，包含完整的会话上下文
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDown className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">转换过程</span>
                </div>
                <p className="text-blue-700">
                  中间件（如LLaMAFactory、ms-swift、MindSpeed-LLM）会将这些不同格式统一转换为标准的messages格式
                </p>
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    统一Messages格式
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border mb-4">
                    <code>{messagesExample}</code>
                  </pre>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-1">system</h4>
                      <p className="text-sm text-green-700">系统提示词，定义AI的行为</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-1">user</h4>
                      <p className="text-sm text-blue-700">用户输入的问题或指令</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-800 mb-1">assistant</h4>
                      <p className="text-sm text-purple-700">AI助手的回复内容</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="template">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Braces className="w-5 h-5" />
                    Chat Template模板
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 text-sm">
                      <strong>重要：</strong> Chat Template定义在模型的tokenizer_config.json文件中，基于Jinja模板引擎，决定了最终的对话格式
                    </p>
                  </div>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border mb-4">
                    <code>{chatTemplateExample}</code>
                  </pre>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">模板作用</h4>
                      <ul className="text-sm space-y-1 text-gray-700">
                        <li>• 解析messages结构</li>
                        <li>• 添加特殊标记符</li>
                        <li>• 格式化对话文本</li>
                        <li>• 生成模型需要的格式</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">输出示例</h4>
                      <code className="text-xs bg-white p-2 rounded block">
                        你是一个能干的助手&lt;|User|&gt;谁赢得了2020年的世界职业棒球大赛?&lt;|Assistant|&gt;洛杉矶道奇队...&lt;|end_of_sentence|&gt;
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokenized">
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Binary className="w-5 h-5" />
                    Token化处理结果
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border mb-4">
                    <code>{tokenizedExample}</code>
                  </pre>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-1">input_ids</h4>
                      <p className="text-sm text-blue-700">文本转换后的token ID序列</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-1">attention_mask</h4>
                      <p className="text-sm text-green-700">标记哪些位置需要关注</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-800 mb-1">labels</h4>
                      <p className="text-sm text-purple-700">训练目标，-100表示不计算loss</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dataset-construction">
              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      高质量数据集构建要点
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-yellow-800 text-sm">
                        <strong>重要：</strong> 数据集质量直接决定微调成败，80%的时间应花在数据集准备上！
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {dataQualityIssues.map((issue, index) => (
                        <Card key={index} className="p-4 border-l-4 border-red-400">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{issue.icon}</span>
                            <div>
                              <h4 className="font-semibold text-red-800 mb-1">{issue.title}</h4>
                              <p className="text-sm text-red-600 mb-2">{issue.description}</p>
                              <p className="text-xs text-gray-600">{issue.detail}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-6 h-6" />
                      数据集构建最佳实践
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-800">数据来源多样化</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            专业书籍：权威、系统的领域知识
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            最新论文：前沿技术和最新发现
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            大模型蒸馏：弥补知识差距
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            专家Review：确保质量和准确性
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-800">GA增强策略</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            Genre（类型）：多种表达框架
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            Audience（受众）：不同目标群体
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            数据增强：避免单一化表达
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            场景覆盖：提升模型泛化能力
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      数据质量检查标准
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">内容质量</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>✓ 答案与文献事实一致</li>
                          <li>✓ 不超出文献范围</li>
                          <li>✓ 答案直接回应问题</li>
                          <li>✓ 聚焦数据集属性</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800">格式规范</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>✓ 无关键信息缺失</li>
                          <li>✓ 术语统一表述</li>
                          <li>✓ 重复问题合并</li>
                          <li>✓ 模糊答案修正</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="qa-modes">
              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      问答模式 vs 陈述模式对比
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">
                      选择合适的数据表达模式对微调效果至关重要。不同模式适合不同的应用场景和目标。
                    </p>
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      {qaVsStatementModes.map((mode, index) => (
                        <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{mode.mode}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h5 className="font-medium mb-2">示例：</h5>
                              {'question' in mode.example ? (
                                <div>
                                  <p className="text-sm text-blue-700 mb-2">
                                    <strong>问：</strong>{mode.example.question}
                                  </p>
                                  <p className="text-sm text-green-700">
                                    <strong>答：</strong>{mode.example.answer}
                                  </p>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-sm text-blue-700 mb-2">
                                    <strong>指令：</strong>{mode.example.instruction}
                                  </p>
                                  <p className="text-sm text-green-700">
                                    <strong>回应：</strong>{mode.example.response}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <h5 className="font-medium mb-2 text-green-600">优点：</h5>
                              <ul className="text-sm space-y-1">
                                {mode.pros.map((pro, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    {pro}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-medium mb-2 text-red-600">缺点：</h5>
                              <ul className="text-sm space-y-1">
                                {mode.cons.map((con, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">×</span>
                                    {con}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="pt-2 border-t">
                              <h5 className="font-medium mb-1">适用场景：</h5>
                              <p className="text-sm text-gray-600">{mode.suitable}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <Zap className="w-6 h-6" />
                      选择建议
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-800">选择问答模式，如果你的目标是：</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• 构建客服或助手系统</li>
                          <li>• 需要交互式对话能力</li>
                          <li>• 用户意图相对明确</li>
                          <li>• 注重用户体验的自然性</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-800">选择陈述模式，如果你的目标是：</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• 进行领域知识注入</li>
                          <li>• 构建专业内容生成系统</li>
                          <li>• 需要系统性知识输出</li>
                          <li>• 注重知识的完整性和准确性</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-white/70 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>混合策略：</strong> 实际项目中，可以根据不同的数据来源和目标场景，在同一个数据集中混合使用两种模式，以获得更全面的训练效果。
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Embedding Explanation */}
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-800">
              <Layers className="w-6 h-6" />
              为什么需要Embedding向量化？
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Token ID的局限性</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    Token ID只是简单的整数标识符
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    不包含任何语义信息
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    无法体现词汇间的关系
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-800">Embedding的优势</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    引入语义信息，相似词向量距离近
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    适合神经网络数学运算处理
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    降低维度，减少计算量
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6" />
              总结要点
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">关键流程</h4>
                <ol className="space-y-2 text-sm">
                  <li>1. 原始数据（Alpaca/ShareGPT格式）</li>
                  <li>2. 中间件统一转换为Messages格式</li>
                  <li>3. Chat Template模板处理</li>
                  <li>4. Tokenization转换为ID序列</li>
                  <li>5. Embedding向量化处理</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-3">重要理念</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Chat Template决定最终格式</li>
                  <li>• Messages结构是标准中间格式</li>
                  <li>• Token化是文本到数字的桥梁</li>
                  <li>• Embedding赋予数据语义信息</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
