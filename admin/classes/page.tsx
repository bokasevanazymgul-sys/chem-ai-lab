'use client';

import React, { useState } from 'react';
import { Users, ArrowLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminClassesPage() {
  const [selectedClass, setSelectedClass] = useState('7 "А"');
  const [students, setStudents] = useState([
    { id: 1, name: 'Әлішер Ерұланұлы', status: 'Белсенді' },
    { id: 2, name: 'Мадина Серікқызы', status: 'Белсенді' },
    { id: 3, name: 'Арман Нұрланұлы', status: 'Белсенді' },
  ]);
  const [newStudentName, setNewStudentName] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Сіз сұраған сыныптардың толық және реттелген тізімі
  const classesList = [
    '7 "А"', '7 "Ә"', '7 "Б"', 
    '8 "А"', '8 "Ә"', '8 "Б"', '8 "В"', 
    '9 "А"', '9 "Ә"', '9 "Б"', 
    '10 "А"', '10 "Ә"', '10 "Б"', '10 "В"', 
    '11 "А"', '11 "Ә"', '11 "Б"', '11 "В"'
  ];

  // Жаңа оқушы қосу функциясы
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newItem = {
      id: Date.now(),
      name: newStudentName,
      status: 'Белсенді',
    };

    setStudents([...students, newItem]);
    setNewStudentName('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  // Оқушыны жою функциясы
  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
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
                <Users className="w-5 h-5 text-emerald-400" />
                <span>Сыныптар мен Оқушыларды басқару</span>
              </h1>
              <p className="text-xs text-slate-400">7-11 сыныптардың оқушылар тізімі және қатысуы</p>
            </div>
          </div>
        </div>

        {/* Classes Selection Tabs */}
        <div className="flex flex-wrap gap-2">
          {classesList.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition border ${
                selectedClass === cls
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cls} сынып
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Students List */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{selectedClass} сынып оқушылары</h2>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                Барлығы: {students.length} оқушы
              </span>
            </div>

            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
              {students.length === 0 ? (
                <p className="p-6 text-center text-sm text-slate-500">Бұл сыныпта әлі оқушылар тіркелмеген.</p>
              ) : (
                students.map((student, index) => (
                  <div key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-900/50 transition">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-500 font-mono w-6">{index + 1}.</span>
                      <div>
                        <p className="text-sm font-medium text-slate-200">{student.name}</p>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          {student.status}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteStudent(student.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      title="Оқушыны өшіру"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Add Student Form */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 h-fit">
            <h2 className="text-lg font-semibold flex items-center space-x-2">
              <Plus className="w-5 h-5 text-emerald-400" />
              <span>Оқушы қосу</span>
            </h2>
            <p className="text-xs text-slate-400">
              {selectedClass} сыныбына жаңа оқушының аты-жөнін енгізіңіз.
            </p>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Оқушының аты-жөні</label>
                <input 
                  type="text" 
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Мысалы: Айдын Сапарұлы" 
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              {successMsg && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Оқушы сәтті қосылды!</span>
                </div>
              )}

              <button 
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20"
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