'use client';

import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Upload, FileSpreadsheet, CheckCircle2, Plus, Trash2 } from 'lucide-react';

export default function AdminKtpPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  // КТП тақырыптарының тізімі (мысал ретінде бастапқы сабақтар)
  const [ktpTopics, setKtpTopics] = useState([
    { id: 1, week: 1, chapter: '1-тарау. Химия пөніне кіріспе. Таза заттар мен қоспалар', hours: 2, date: 'Қыркүйек' },
    { id: 2, week: 2, chapter: 'Атомдар. Молекулалар. Зат мөлшері', hours: 2, date: 'Қыркүйек' },
    { id: 3, week: 3, chapter: 'Периодтық заң және периодтық жүйе', hours: 2, date: 'Қазан' },
  ]);

  const [newChapter, setNewChapter] = useState('');
  const [newWeek, setNewWeek] = useState('');
  const [newHours, setNewHours] = useState('');

  // Файлды таңдаған кезде
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setSuccessMessage(true);
    }
  };

  // Жаңа тақырып қосу
  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChapter.trim()) return;

    const newItem = {
      id: Date.now(),
      week: Number(newWeek) || ktpTopics.length + 1,
      chapter: newChapter,
      hours: Number(newHours) || 2,
      date: 'Ағымдағы ай',
    };

    setKtpTopics([...ktpTopics, newItem]);
    setNewChapter('');
    setNewWeek('');
    setNewHours('');
  };

  // Тақырыпты жою
  const handleDeleteTopic = (id: number) => {
    setKtpTopics(ktpTopics.filter(t => t.id !== id));
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
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>КТП & Сабақтарды жоспарлау</span>
              </h1>
              <p className="text-xs text-slate-400">7–11 сыныптардың күнтізбелік-тақырыптық жоспары (№399 бұйрық)</p>
            </div>
          </div>
        </div>

        {/* Upload Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-6 h-6 text-cyan-400" />
            <h2 className="text-lg font-semibold">КТП файлын жүктеу (Word / Excel)</h2>
          </div>
          
          <p className="text-sm text-slate-400">
            «7–11 сынып КТЖ Дұрысы.docx» немесе кесте файлдарын жүктеу арқылы жүйеге тіркеңіз.
          </p>

          <label className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-950/40 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition group">
            <input 
              type="file" 
              accept=".docx, .xlsx, .pdf" 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              onChange={handleFileChange}
            />
            
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition">
              <Upload className="w-6 h-6" />
            </div>
            
            <span className="text-sm font-medium text-slate-200 mb-1">
              {fileName ? <span className="text-emerald-400 font-bold">Таңдалған файл: {fileName}</span> : 'Файлды мұнда сүйреп апарыңыз немесе басып таңдаңыз'}
            </span>
            <span className="text-xs text-slate-500">DOCX, XLSX, PDF (максимум 10MB)</span>
          </label>

          {successMessage && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Файл сәтті жүктелді және жүйеге тіркелді!</span>
            </div>
          )}
        </div>

        {/* KTP Table & Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Topics List */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-semibold">Жүйедегі КТП мазмұны (Тараулар мен сағаттар)</h2>
            
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
              {ktpTopics.length === 0 ? (
                <p className="p-6 text-center text-sm text-slate-500">Әлі ешқандай тақырып қосылмаған.</p>
              ) : (
                ktpTopics.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-900/50 transition">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-mono">
                          {item.week}-апта
                        </span>
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {item.hours} сағат
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-200">{item.chapter}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteTopic(item.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      title="Жою"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Topic Form */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 h-fit">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span>Тақырып қосу</span>
            </h2>

            <form onSubmit={handleAddTopic} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Тақырып / Тарау атауы</label>
                <input 
                  type="text" 
                  value={newChapter}
                  onChange={(e) => setNewChapter(e.target.value)}
                  placeholder="Мысалы: Бейорганикалық қосылыстар" 
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Апта реті</label>
                  <input 
                    type="number" 
                    value={newWeek}
                    onChange={(e) => setNewWeek(e.target.value)}
                    placeholder="4" 
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Сағат саны</label>
                  <input 
                    type="number" 
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    placeholder="2" 
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-cyan-500/20 mt-2"
              >
                Тізімге қосу
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}