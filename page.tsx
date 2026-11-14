import React from 'react';
import { BookOpen, ArrowRight, Users, FileText, Award, Gamepad2, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 hidden lg:flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-slate-950">
              ⚗️
            </div>
            <span className="font-bold text-lg tracking-wide">CHEM AI LAB</span>
          </div>

          <nav className="space-y-1">
            <a href="/admin" className="flex items-center space-x-3 px-4 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl font-medium text-sm">
              <LayoutDashboard className="w-4 h-4" />
              <span>Басқару панелі</span>
            </a>
            <a href="/admin/ktp" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition text-sm">
              <BookOpen className="w-4 h-4" />
              <span>КТП & Сабақтар</span>
            </a>
            <a href="/admin/classes" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition text-sm">
              <Users className="w-4 h-4" />
              <span>Сыныптар мен Оқушылар</span>
            </a>
            <a href="/admin/materials" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition text-sm">
              <FileText className="w-4 h-4" />
              <span>ҚМЖ & Материалдар</span>
            </a>
            <a href="/admin/tests" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition text-sm">
              <Award className="w-4 h-4" />
              <span>Тесттер</span>
            </a>
            <a href="/admin/games" className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl transition text-sm">
              <Gamepad2 className="w-4 h-4" />
              <span>Ойындар & Зертхана</span>
            </a>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500">
          <p>© 2026 A. Bertaeva school</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-2xl font-bold">Химия пәнінің әкімшілік панелі</h1>
              <p className="text-sm text-slate-400">Назым Сериковна Бокашева — 7-11 сыныптар</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-cyan-400">
              Модульдер қосылған
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 mb-1">Барлық сыныптар</p>
              <h3 className="text-2xl font-bold text-blue-400">12</h3>
              <span className="text-[10px] text-slate-500">7-11 сынып параллельдері</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 mb-1">Тіркелген оқушылар</p>
              <h3 className="text-2xl font-bold text-emerald-400">0</h3>
              <span className="text-[10px] text-slate-500">Белсенді аккаунттар</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 mb-1">Жүктелген ҚМЖ</p>
              <h3 className="text-2xl font-bold text-cyan-400">0</h3>
              <span className="text-[10px] text-slate-500">DOCX / PDF форматтары</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
              <p className="text-xs text-slate-400 mb-1">Тест сұрақтары</p>
              <h3 className="text-2xl font-bold text-amber-400">20+</h3>
              <span className="text-[10px] text-slate-500">Әр тақырыпқа сай</span>
            </div>
          </div>

          {/* KTP Module Section */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span>Күнтізбелік-тақырыптық жоспар (КТП) модульдері</span>
              </h3>
              <span className="text-xs text-slate-400">2022 жылғы №399 бұйрық</span>
            </div>

            <div className="border border-slate-800 bg-slate-950/40 rounded-xl p-6 text-center">
              <h4 className="text-base font-semibold mb-1">КТП файлын жүктеу немесе қосу</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                «7–11 сынып КТЖ Дұрысы.docx» файлын жүктеңіз немесе жаңа тақырып қосыңыз.
              </p>
              
              <div className="flex justify-center gap-3">
                <a href="/admin/ktp" className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition flex items-center space-x-2">
                  <span>КТП бөліміне өту</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}