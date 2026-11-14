import React from 'react';
import { LayoutDashboard, BookOpen, Users, FileText, CheckSquare, Gamepad2, Settings, Plus, ArrowLeft } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md p-6 hidden md:flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                CHEM AI LAB
              </span>
              <p className="text-[10px] text-slate-400">Әкімші панелі</p>
            </div>
          </div>

          <nav className="space-y-1">
            <a href="/admin" className="flex items-center space-x-3 px-4 py-3 bg-blue-600/20 border border-blue-500/30 text-cyan-400 rounded-xl font-medium text-sm">
              <LayoutDashboard className="w-4 h-4" />
              <span>Басқару панелі</span>
            </a>
            <a href="/admin/ktp" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm transition">
              <BookOpen className="w-4 h-4" />
              <span>КТП & Сабақтар</span>
            </a>
            <a href="/admin/classes" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm transition">
              <Users className="w-4 h-4" />
              <span>Сыныптар мен Оқушылар</span>
            </a>
            <a href="/admin/materials" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm transition">
              <FileText className="w-4 h-4" />
              <span>ҚМЖ & Материалдар</span>
            </a>
            <a href="/admin/tests" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm transition">
              <CheckSquare className="w-4 h-4" />
              <span>Тесттер (20+ сұрақ)</span>
            </a>
            <a href="/admin/games" className="flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl text-sm transition">
              <Gamepad2 className="w-4 h-4" />
              <span>Ойындар & Зертхана</span>
            </a>
          </nav>
        </div>

        <div className="border-t border-slate-800 pt-4">
          <a href="/" className="flex items-center space-x-2 text-sm text-slate-400 hover:text-cyan-400 transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Басты бетке қайту</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold">Мұғалімнің басқару панелі</h1>
            <p className="text-sm text-slate-400">Бокашева Назымгул Сериковна • «А.Бертаева атындағы жалпы білім беретін мектебі» КММ</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition flex items-center space-x-2 text-sm">
              <Plus className="w-4 h-4" />
              <span>Жаңа КТП / Сабақ қосу</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <p className="text-sm text-slate-400 mb-1">Барлық сыныптар</p>
            <h3 className="text-3xl font-extrabold text-cyan-400">12</h3>
            <span className="text-xs text-slate-500 mt-2 block">7-11 сынып параллельдері</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <p className="text-sm text-slate-400 mb-1">Тіркелген оқушылар</p>
            <h3 className="text-3xl font-extrabold text-blue-400">0</h3>
            <span className="text-xs text-slate-500 mt-2 block">Белсенді аккаунттар</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <p className="text-sm text-slate-400 mb-1">Жүктелген ҚМЖ</p>
            <h3 className="text-3xl font-extrabold text-purple-400">0</h3>
            <span className="text-xs text-slate-500 mt-2 block">DOCX / PDF форматтары</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <p className="text-sm text-slate-400 mb-1">Тест сұрақтары</p>
            <h3 className="text-3xl font-extrabold text-emerald-400">0</h3>
            <span className="text-xs text-slate-500 mt-2 block">Әр тақырыпқа 20+ сұрақ</span>
          </div>
        </div>

        {/* Quick KTP Management Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Күнтізбелік-тақырыптық жоспар (КТП) модульдері</h3>
            <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">2022 жылғы №399 бұйрық</span>
          </div>
          <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">Әлі КТП мәліметтері енгізілген жоқ</p>
            <p className="text-sm text-slate-500 mt-1 mb-4">«7–11 сынып КТЖ Дұрысы.docx» файлын жүктеңіз немесе жаңа тақырып қосыңыз.</p>
            <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-sm transition">
              Word / Excel файлын импорттау
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}