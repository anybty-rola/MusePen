import React, { useState, useEffect } from 'react';
import { UserProfile, FeatureType, Draft } from '../types';
import { generateCreativeContent } from '../services/geminiService';
import { saveDraftLocal, getDraftsLocal } from '../services/storage';
import { PenTool, Scroll, BookOpen, Languages, Sparkles, Loader2, Save, History, Cloud, User, Home, ChevronDown } from 'lucide-react';

interface FeatureDemoProps {
  user: UserProfile;
  onRequestLogin: (draftCount: number) => void;
  isMobile: boolean;
}

export const FeatureDemo: React.FC<FeatureDemoProps> = ({ user, onRequestLogin, isMobile }) => {
  const [activeFeature, setActiveFeature] = useState<FeatureType>(FeatureType.NAMING);
  const [activeTab, setActiveTab] = useState('HOME'); // HOME, POETRY, TRANSLATE, PROFILE
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  
  // Translation State
  const [targetLang, setTargetLang] = useState('英语 (English)');

  // Load drafts on mount
  useEffect(() => {
    setDrafts(getDraftsLocal());
  }, []);

  // Update active feature based on Tab change (Mobile Logic)
  useEffect(() => {
    if (isMobile) {
        if (activeTab === 'HOME') setActiveFeature(FeatureType.NAMING);
        if (activeTab === 'POETRY') setActiveFeature(FeatureType.POETRY);
        if (activeTab === 'TRANSLATE') setActiveFeature(FeatureType.TRANSLATE);
    }
  }, [activeTab, isMobile]);

  const features = [
    { id: FeatureType.NAMING, label: '灵感起名', icon: PenTool, placeholder: '例如：为一个出身极寒之地的冷酷剑客起名...' },
    { id: FeatureType.POETRY, label: '诗词辅助', icon: Scroll, placeholder: '例如：写一首关于月下废墟的七言绝句...' },
    { id: FeatureType.AUDIT, label: '文化考据', icon: BookOpen, placeholder: '粘贴一段描写，检查是否符合唐朝礼仪...' },
    { id: FeatureType.TRANSLATE, label: '文学润色', icon: Languages, placeholder: '输入原文，AI将为您进行文学意译...' },
  ];

  const languages = [
    '英语 (English)',
    '现代汉语 (Modern Chinese)',
    '古文/文言文 (Classical Chinese)',
    '日语 (Japanese)',
    '法语 (French)',
    '德语 (German)',
    '西班牙语 (Spanish)'
  ];

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setOutput('');
    
    // Pass targetLang only if feature is TRANSLATE
    const langParam = activeFeature === FeatureType.TRANSLATE ? targetLang : undefined;

    const result = await generateCreativeContent(activeFeature, input, user.genre, langParam);
    
    setIsLoading(false);
    setOutput(result);
    
    // Auto-save to local draft
    const newDraft = saveDraftLocal(activeFeature, result);
    setDrafts(prev => [newDraft, ...prev]);
  };

  const unsavedCount = drafts.filter(d => !d.synced).length;

  // --- UI COMPONENTS ---

  const DraftList = () => (
    <div className="flex-1 overflow-hidden flex flex-col mt-4 border-t border-ink-100">
        <div className="px-6 py-3 flex items-center justify-between text-xs font-bold text-ink-400 uppercase tracking-wider">
            <span className="flex items-center gap-2"><History size={12}/> 最近草稿</span>
            {unsavedCount > 0 && !user.isLoggedIn && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="未同步"></span>
            )}
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
            {drafts.length === 0 && (
                <p className="text-xs text-ink-300 text-center py-4 italic">暂无灵感记录...</p>
            )}
            {drafts.map(draft => (
                <div key={draft.id} className="p-3 rounded-lg bg-ink-50 border border-ink-100 text-xs hover:border-accent-cyan/30 transition-colors cursor-pointer" onClick={() => setOutput(draft.content)}>
                    <div className="flex justify-between mb-1">
                        <span className="font-bold text-ink-700">{features.find(f => f.id === draft.type)?.label}</span>
                        {!draft.synced && !user.isLoggedIn && <span className="text-amber-600 text-[10px]">本地</span>}
                    </div>
                    <p className="text-ink-500 line-clamp-2">{draft.content}</p>
                </div>
            ))}
        </div>
    </div>
  );

  const MainWorkspace = () => (
    <div className={`flex flex-col h-full ${isMobile ? 'pb-24 pt-4' : 'p-12'}`}>
        <div className={`w-full mx-auto space-y-6 ${isMobile ? 'px-4' : 'max-w-3xl'}`}>
          {!isMobile && (
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-serif font-bold text-ink-800">
                {features.find(f => f.id === activeFeature)?.label}
                </h1>
                <span className="text-xs px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full font-bold">
                Gemini 2.5
                </span>
            </div>
          )}

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-ink-100 transition-all focus-within:ring-2 focus-within:ring-accent-cyan/20 relative">
            
            {/* Language Selector for Translation */}
            {activeFeature === FeatureType.TRANSLATE && (
                <div className="absolute top-4 right-4 z-20">
                    <div className="relative group">
                        <select 
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            className="appearance-none bg-ink-50 border border-ink-200 hover:border-accent-cyan text-ink-800 text-xs font-bold py-1.5 pl-3 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all"
                        >
                            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" size={12} />
                    </div>
                </div>
            )}

            <textarea
              className="w-full h-32 md:h-32 resize-none outline-none text-ink-800 placeholder:text-ink-300 bg-transparent relative z-10 text-sm md:text-base pt-2"
              placeholder={features.find(f => f.id === activeFeature)?.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !input.trim()}
                className="flex items-center gap-2 bg-accent-cyan hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 shadow-lg shadow-cyan-900/10 text-sm md:text-base"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {activeFeature === FeatureType.TRANSLATE ? '开始翻译' : '生成灵感'}
              </button>
            </div>
          </div>

          {/* Output Area */}
          {(output || isLoading) && (
            <div className="relative animate-fade-in pb-12">
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white shadow-lg min-h-[200px]">
                    {isLoading ? (
                        <div className="h-full flex flex-col items-center justify-center text-ink-300 gap-4 py-12">
                            <Loader2 className="animate-spin w-8 h-8" />
                            <p className="font-serif italic text-sm">文心雕龙，正在构思...</p>
                        </div>
                    ) : (
                        <div className="prose prose-stone max-w-none">
                            <h3 className="font-serif text-ink-400 text-xs uppercase tracking-widest mb-4 border-b border-ink-200 pb-2">Muse 建议</h3>
                            <div className="whitespace-pre-wrap text-ink-900 leading-relaxed font-serif text-sm md:text-base">
                                {output}
                            </div>
                        </div>
                    )}
                </div>
            </div>
          )}
        </div>
    </div>
  );

  // --- LAYOUTS ---

  if (isMobile) {
      // MOBILE LAYOUT
      return (
        <div className="flex flex-col h-full bg-ink-50">
            {/* Header */}
            <header className="h-14 bg-white/80 backdrop-blur-md border-b border-ink-100 flex items-center justify-center pt-2 sticky top-0 z-20">
                <h1 className="font-serif font-bold text-ink-900">
                    {activeTab === 'PROFILE' ? '我的工作室' : features.find(f => f.id === activeFeature)?.label}
                </h1>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === 'PROFILE' ? (
                     <div className="p-6 space-y-6">
                         {/* Mobile Profile View */}
                         <div className="flex flex-col items-center gap-3 py-6">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl shadow-xl ${user.isLoggedIn ? 'bg-accent-cyan text-white' : 'bg-ink-200 text-ink-500'}`}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-lg text-ink-900">{user.name}</p>
                                <p className="text-sm text-ink-400">{user.genre || '未设置流派'}</p>
                            </div>
                         </div>
                         
                         {!user.isLoggedIn ? (
                             <button 
                                onClick={() => onRequestLogin(unsavedCount)}
                                className="w-full bg-accent-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                             >
                                <Save size={18} />
                                同步本地数据 ({unsavedCount})
                             </button>
                         ) : (
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-200">
                                <Cloud size={20} />
                                <span className="font-bold text-sm">云端同步已开启</span>
                            </div>
                         )}

                         <div className="bg-white rounded-xl border border-ink-100 overflow-hidden">
                             <div className="p-4 bg-ink-50 border-b border-ink-100 font-bold text-xs uppercase text-ink-400">历史记录</div>
                             <div className="max-h-60 overflow-y-auto">
                                 {drafts.map(draft => (
                                     <div key={draft.id} className="p-3 border-b border-ink-50 text-xs text-ink-600 last:border-0" onClick={() => { setOutput(draft.content); setActiveTab('HOME'); }}>
                                         {draft.content.substring(0, 50)}...
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </div>
                ) : (
                    <MainWorkspace />
                )}
            </div>

            {/* Bottom Tab Bar */}
            <nav className="h-20 bg-white border-t border-ink-200 flex items-center justify-around pb-4 px-2 absolute bottom-0 w-full z-30">
                <button 
                    onClick={() => setActiveTab('HOME')} 
                    className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'HOME' ? 'text-ink-900' : 'text-ink-300'}`}
                >
                    <Home size={24} strokeWidth={activeTab === 'HOME' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">灵感</span>
                </button>
                <button 
                    onClick={() => setActiveTab('POETRY')} 
                    className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'POETRY' ? 'text-ink-900' : 'text-ink-300'}`}
                >
                    <Scroll size={24} strokeWidth={activeTab === 'POETRY' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">诗词</span>
                </button>
                <button 
                    onClick={() => setActiveTab('TRANSLATE')} 
                    className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'TRANSLATE' ? 'text-ink-900' : 'text-ink-300'}`}
                >
                    <Languages size={24} strokeWidth={activeTab === 'TRANSLATE' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">翻译</span>
                </button>
                <button 
                    onClick={() => setActiveTab('PROFILE')} 
                    className={`relative flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'PROFILE' ? 'text-ink-900' : 'text-ink-300'}`}
                >
                    <User size={24} strokeWidth={activeTab === 'PROFILE' ? 2.5 : 2} />
                    <span className="text-[10px] font-medium">我的</span>
                    {unsavedCount > 0 && !user.isLoggedIn && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-red"></span>
                    )}
                </button>
            </nav>
        </div>
      );
  }

  // DESKTOP LAYOUT
  return (
    <div className="flex flex-col md:flex-row h-full bg-ink-50 font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-white border-r border-ink-200 flex flex-col">
        <div className="p-6 pb-2">
          <h2 className="font-serif font-bold text-xl text-ink-900 tracking-tight">妙笔·文心 <span className="text-sm font-light text-ink-400">MusePen</span></h2>
          <p className="text-xs text-ink-300 uppercase tracking-widest mt-1">工作台</p>
        </div>

        {/* Tools Nav */}
        <div className="px-4 py-2 space-y-1">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                onClick={() => { setActiveFeature(f.id); setOutput(''); setInput(''); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeFeature === f.id 
                    ? 'bg-ink-900 text-white shadow-md' 
                    : 'text-ink-600 hover:bg-ink-100'
                }`}
              >
                <Icon size={18} />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Drafts List (Mini) */}
        <DraftList />

        {/* User / Sync Footer */}
        <div className="p-4 border-t border-ink-100 bg-ink-50/50">
          {!user.isLoggedIn ? (
              <button 
                onClick={() => onRequestLogin(unsavedCount)}
                className="w-full flex items-center justify-between bg-white border border-ink-200 hover:border-accent-red hover:shadow-lg hover:shadow-red-900/5 text-ink-900 py-3 px-4 rounded-xl text-sm font-bold transition-all group"
              >
                <div className="flex items-center gap-2">
                    <Cloud size={16} className="text-ink-400 group-hover:text-accent-red" />
                    <span>游客模式 (未登录)</span>
                </div>
                {unsavedCount > 0 && (
                    <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px]">
                        {unsavedCount}
                    </span>
                )}
              </button>
          ) : (
             <div className="w-full flex items-center gap-3 px-2">
                <div className="w-8 h-8 rounded-full bg-accent-cyan text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold text-ink-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-green-600 flex items-center gap-1">
                        <Cloud size={10} /> 已同步
                    </p>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto relative">
         <MainWorkspace />
      </div>
    </div>
  );
};
