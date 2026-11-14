'use client';

import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, Plus, Trash2, CheckCircle2, Sparkles, Play, Award } from 'lucide-react';

export default function AdminTestsPage() {
  const [activeTab, setActiveTab] = useState<'manage' | 'student-view' | 'ai-generator'>('manage');

  // Тест сұрақтарының тізімі
  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      question: 'Судың химиялық формуласы қандай?', 
      options: ['H2O', 'CO2', 'NaCl', 'NH3'], 
      correct: 'H2O' 
    },
    { 
      id: 2, 
      question: 'Периодтық жүйенің авторы кім?', 
      options: ['М.В. Ломоносов', 'Д.И. Менделеев', 'А. Лавуазье', 'Н. Бор'], 
      correct: 'Д.И. Менделеев' 
    },
  ]);

  // Қолмен сұрақ қосу штаттары
  const [newQuestion, setNewQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // ИИ Генератор штаттары
  const [topicInput, setTopicInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Оқушы режимі штаттары
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Жаңа сұрақ қосу
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !optionA || !optionB || !correctAnswer) return;

    const newItem = {
      id: Date.now(),
      question: newQuestion,
      options: [optionA, optionB, optionC].filter(Boolean),
      correct: correctAnswer,
    };

    setQuestions([...questions, newItem]);
    setNewQuestion('');
    setOptionA('');
    setOptionB('');
    setOptionC('');
    setCorrectAnswer('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  // Сұрақты өшіру
  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  // ИИ арқылы тест генерациялау
  const handleAIGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicInput.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const generated = [
        {
          id: Date.now() + 1,
          question: `${topicInput} тақырыбы бойынша негізгі ұғымды анықтаңыз:`,
          options: ['Анықтама А', 'Анықтама Б', 'Анықтама В', 'Анықтама Г'],
          correct: 'Анықтама А'
        },
        {
          id: Date.now() + 2,
          question: `Бұл үдерісте қандай заңдылық орындалады? (${topicInput})`,
          options: ['Заңдылық 1', 'Заңдылық 2', 'Заңдылық 3', 'Заңдылық 4'],
          correct: 'Заңдылық 1'
        }
      ];
      setQuestions([...questions, ...generated]);
      setIsGenerating(false);
      setTopicInput('');
      setActiveTab('manage');
    }, 2000);
  };

  // Оқушының жауап беруін есептеу
  const handleSelectOption = (questionId: number, option: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <a href="/admin" className="p-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-xl font-bold flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-purple-400" />
                <span>Тесттерді басқару және тапсыру модулі</span>
              </h1>
              <p className="text-xs text-slate-400">ИИ көмегімен генерациялау және оқушылардың тестілеу ортасы</p>
            </div>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button 
              onClick={() => setActiveTab('manage')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition ${activeTab === 'manage' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Басқару
            </button>
            <button 
              onClick={() => setActiveTab('ai-generator')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center space-x-1 ${activeTab === 'ai-generator' ? 'bg-purple-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ИИ Генератор</span>
            </button>
            <button 
              onClick={() => { setActiveTab('student-view'); setIsSubmitted(false); setSelectedAnswers({}); }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center space-x-1 ${activeTab === 'student-view' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Оқушы көрінісі (Тест тапсыру)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MANAGE & ADD */}
        {activeTab === 'manage' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Жүйедегі тест сұрақтары</h2>
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                  Барлығы: {questions.length} сұрақ
                </span>
              </div>

              <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                {questions.map((q, index) => (
                  <div key={q.id} className="p-4 space-y-2 hover:bg-slate-900/50 transition">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono">
                          {index + 1}-сұрақ
                        </span>
                        <p className="text-sm font-medium text-slate-200">{q.question}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {q.options.map((opt, i) => (
                        <span 
                          key={i} 
                          className={`text-xs px-2.5 py-1 rounded-lg border ${
                            opt === q.correct 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-medium' 
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt} {opt === q.correct && '✓'}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 h-fit">
              <h2 className="text-lg font-semibold flex items-center space-x-2">
                <Plus className="w-5 h-5 text-purple-400" />
                <span>Жаңа сұрақ қосу</span>
              </h2>

              <form onSubmit={handleAddQuestion} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Сұрақ мәтіні</label>
                  <input 
                    type="text" 
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Мысалы: Валенттілік дегеніміз не?" 
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">А нұсқасы</label>
                  <input type="text" value={optionA} onChange={(e) => setOptionA(e.target.value)} placeholder="Жауап" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Ә нұсқасы</label>
                  <input type="text" value={optionB} onChange={(e) => setOptionB(e.target.value)} placeholder="Жауап" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Б нұсқасы</label>
                  <input type="text" value={optionC} onChange={(e) => setOptionC(e.target.value)} placeholder="Жауап" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Дұрыс жауап</label>
                  <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} placeholder="Дұрыс нұсқа мәтіні" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500" />
                </div>

                {successMsg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Сұрақ қосылды!</span>
                  </div>
                )}

                <button type="submit" className="w-full py-2.5 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-purple-500/20 mt-2">
                  Сақтау
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: AI GENERATOR */}
        {activeTab === 'ai-generator' && (
          <div className="max-w-xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">ИИ арқылы тест генерациялау</h2>
                <p className="text-xs text-slate-400">Оқулық парағын сканерлеп немесе тақырып енгізу арқылы автоматты түрде сұрақтар жасаңыз</p>
              </div>
            </div>

            <form onSubmit={handleAIGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Оқулық тақырыбы немесе мәтіні</label>
                <textarea 
                  rows={4}
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="Мысалы: 8-сынып, Органикалық емес қосылыстар кластары, оксидтер..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              <div className="border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-xl p-4 text-center cursor-pointer bg-slate-950/40">
                <span className="text-xs text-slate-400">Немесе оқулық бетін фотоға түсіріп / жүктеп жіберіңіз (Сканерлеу)</span>
                <input type="file" accept="image/*,.pdf" className="hidden" />
              </div>

              <button 
                type="submit" 
                disabled={isGenerating}
                className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <span>ИИ талдап жатыр... Күте тұрыңыз</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>ИИ арқылы тест құру</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: STUDENT TEST VIEW */}
        {activeTab === 'student-view' && (
          <div className="max-w-2xl mx-auto bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
            {!isSubmitted ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">Сұрақ {currentQuestionIndex + 1} / {questions.length}</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium">Оқушы режимі</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-slate-100">
                    {questions[currentQuestionIndex]?.question}
                  </h3>

                  <div className="space-y-2">
                    {questions[currentQuestionIndex]?.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(questions[currentQuestionIndex].id, opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                          selectedAnswers[questions[currentQuestionIndex].id] === opt
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-medium'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-800">
                  <button 
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs disabled:opacity-50"
                  >
                    Артқа
                  </button>

                  {currentQuestionIndex < questions.length - 1 ? (
                    <button 
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs"
                    >
                      Келесі
                    </button>
                  ) : (
                    <button 
                      onClick={() => setIsSubmitted(true)}
                      className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs"
                    >
                      Тестті аяқтау
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Тест аяқталды!</h2>
                  <p className="text-sm text-slate-400">Сіздің жинаған ұпайыңыз:</p>
                  <div className="text-3xl font-extrabold text-emerald-400">
                    {calculateScore()} / {questions.length}
                  </div>
                </div>
                <button 
                  onClick={() => { setIsSubmitted(false); setCurrentQuestionIndex(0); setSelectedAnswers({}); }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm transition"
                >
                  Қайта тапсыру
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}