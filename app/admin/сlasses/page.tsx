'use client';

import React, { useState } from 'react';
import { Users, Plus, Trash2, BookOpen } from 'lucide-react';

export default function ClassesPage() {
  const [classesList, setClassesList] = useState([
    { id: 1, name: '7 "А" сыныпы', studentsCount: 22, teacher: 'Химия пәні' },
    { id: 2, name: '7 "Ә" сыныпы', studentsCount: 24, teacher: 'Химия пәні' },
    { id: 3, name: '7 "Б" сыныпы', studentsCount: 20, teacher: 'Химия пәні' },
    { id: 4, name: '8 "А" сыныпы', studentsCount: 25, teacher: 'Химия пәні' },
    { id: 5, name: '8 "Ә" сыныпы', studentsCount: 23, teacher: 'Химия пәні' },
    { id: 6, name: '8 "Б" сыныпы', studentsCount: 21, teacher: 'Химия пәні' },
    { id: 7, name: '8 "В" сыныпы', studentsCount: 19, teacher: 'Химия пәні' },
    { id: 8, name: '9 "А" сыныпы', studentsCount: 20, teacher: 'Химия пәні' },
    { id: 9, name: '9 "Ә" сыныпы', studentsCount: 22, teacher: 'Химия пәні' },
    { id: 10, name: '9 "Б" сыныпы', studentsCount: 18, teacher: 'Химия пәні' },
    { id: 11, name: '10 "А" сыныпы', studentsCount: 18, teacher: 'Химия пәні' },
    { id: 12, name: '10 "Ә" сыныпы', studentsCount: 17, teacher: 'Химия пәні' },
    { id: 13, name: '10 "Б" сыныпы', studentsCount: 16, teacher: 'Химия пәні' },
    { id: 14, name: '10 "В" сыныпы', studentsCount: 15, teacher: 'Химия пәні' },
    { id: 15, name: '11 "А" сыныпы (ҰБТ)', studentsCount: 15, teacher: 'Химия пәні' },
    { id: 16, name: '11 "Ә" сыныпы (ҰБТ)', studentsCount: 14, teacher: 'Химия пәні' },
    { id: 17, name: '11 "Б" сыныпы (ҰБТ)', studentsCount: 13, teacher: 'Химия пәні' },
    { id: 18, name: '11 "В" сыныпы (ҰБТ)', studentsCount: 12, teacher: 'Химия пәні' },
  ]);

  const [newClassName, setNewClassName] = useState('');

  // Жаңа сынып қосу
  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const newClass = {
      id: Date.now(),
      name: newClassName,
      studentsCount: 0,
      teacher: 'Химия пәні',
    };

    setClassesList([newClass, ...classesList]);
    setNewClassName('');
  };

  // Сыныпты жою
  const handleDelete = (id: number) => {
    setClassesList(classesList.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Сыныптар мен Оқушылар</h1>
              <p className="text-xs text-slate-400">Мектеп сыныптарының толық тізімі және оқушылар көрсеткіші</p>
            </div>
          </div>
          <span className="text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-slate-300">
            Барлығы: {classesList.length} сынып
          </span>
        </div>

        {/* Add Class Form */}
        <form onSubmit={handleAddClass} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="Жаңа сынып атауы (мысалы: 7 'Г' сыныпы)" 
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
          />
          <button 
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl flex items-center justify-center space-x-2 transition"
          >
            <Plus className="w-5 h-5" />
            <span>Сынып қосу</span>
          </button>
        </form>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classesList.map((cls) => (
            <div key={cls.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between hover:border-slate-700 transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 font-bold text-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-100">{cls.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">Оқушылар саны: <span className="text-amber-400 font-semibold">{cls.studentsCount}</span> оқушы</p>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(cls.id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
                title="Сыныпты жою"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
