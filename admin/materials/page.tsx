'use client';

import React, { useState } from 'react';
import { FileText, ArrowLeft, Upload, CheckCircle2, Trash2, Download } from 'lucide-react';

export default function AdminMaterialsPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  // Жүктелген ҚМЖ және материалдар тізімі
  const [materials, setMaterials] = useState([
    { id: 1, name: '7-сынып Химия - 1-тоқсан ҚМЖ.docx', type: 'ҚМЖ', date: '2026-10-24' },
    { id: 2, name: '8-сынып Зат мөлшері практикалық сабақ.docx', type: 'Материал', date: '2026-10-25' },
  ]);

  // Файлды таңдаған кезде
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setSuccessMessage(true);

      // Автоматты түрде тізімге қосу
      const newMaterial = {
        id: Date.now(),
        name: file.name,
        type: file.name.endsWith('.xlsx') ? 'Кесте' : 'ҚМЖ / Құжат',
        date: new Date().toISOString().split('T')[0],
      };
      setMaterials([newMaterial, ...materials]);
      
      setTimeout(() => setSuccessMessage(false), 4000);
    }
  };

  // Материалды жою
  const handleDelete = (id: number) => {
    setMaterials(materials.filter(m => m.id !== id));
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
                <FileText className="w-5 h-5 text-amber-400" />
                <span>ҚМЖ & Материалдарды басқару</span>
              </h1>
              <p className="text-xs text-slate-400">Қысқа мерзімді жоспарлар мен сабақ әдістемелік материалдары</p>
            </div>
          </div>
        </div>

        {/* Upload Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-3">
            <Upload className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-semibold">ҚМЖ немесе сабақ жоспарын жүктеу</h2>
          </div>
          
          <p className="text-sm text-slate-400">
            Word (.docx), Excel (.xlsx) немесе PDF форматтарындағы ҚМЖ құжаттарын жүктеу арқылы жүйеде сақтаңыз.
          </p>

          <label className="relative border-2 border-dashed border-slate-700 hover:border-amber-500 bg-slate-950/40 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition group">
            <input 
              type="file" 
              accept=".docx, .xlsx, .pdf" 
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              onChange={handleFileChange}
            />
            
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition">
              <FileText className="w-6 h-6" />
            </div>
            
            <span className="text-sm font-medium text-slate-200 mb-1">
              {fileName ? <span className="text-emerald-400 font-bold">Жүктелді: {fileName}</span> : 'Файлды мұнда сүйреп апарыңыз немесе басып таңдаңыз'}
            </span>
            <span className="text-xs text-slate-500">DOCX, XLSX, PDF (максимум 10MB)</span>
          </label>

          {successMessage && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center space-x-2 text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>ҚМЖ файлы жүйеге сәтті тіркеліп, төменгі тізімге қосылды!</span>
            </div>
          )}
        </div>

        {/* Materials List Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Жүктелген ҚМЖ мен материалдар тізімі</h2>
            <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">
              Барлығы: {materials.length} файл
            </span>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
            {materials.length === 0 ? (
              <p className="p-6 text-center text-sm text-slate-500">Әлі ешқандай материал жүктелмеген.</p>
            ) : (
              materials.map((mat) => (
                <div key={mat.id} className="p-4 flex items-center justify-between hover:bg-slate-900/50 transition">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{mat.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {mat.type}
                        </span>
                        <span className="text-[10px] text-slate-500">Күні: {mat.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => alert(`Жүктеліп алынатын файл: ${mat.name}`)}
                      className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition"
                      title="Жүктеп алу"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(mat.id)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      title="Жою"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}