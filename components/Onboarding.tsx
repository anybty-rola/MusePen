import React, { useState } from 'react';
import { UserGenre, UserProfile, AIPersona } from '../types';
import { ArrowRight, Check, Database, BrainCircuit, Sparkles, ScrollText } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: Partial<UserProfile>) => void;
  isMobile?: boolean;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isMobile }) => {
  const [step, setStep] = useState(1);
  const [genre, setGenre] = useState<UserGenre | null>(null);
  const [persona, setPersona] = useState<AIPersona | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const genres = [
    { 
        id: UserGenre.ANCIENT_ROMANCE, 
        label: 'Ancient Romance', 
        sub: '古代言情',
        db: '正在加载诗词与礼仪数据库...',
        icon: ScrollText
    },
    { 
        id: UserGenre.XIANXIA, 
        label: 'Xianxia / Cultivation', 
        sub: '玄幻修仙',
        db: '正在加载山海经与道家概念...',
        icon: Sparkles
    },
    { 
        id: UserGenre.WESTERN_FANTASY, 
        label: 'Western Fantasy', 
        sub: '西方奇幻',
        db: '正在加载凯尔特/北欧神话图谱...',
        icon: Database
    },
    { 
        id: UserGenre.REALISM, 
        label: 'Modern Realism', 
        sub: '现实主义',
        db: '正在加载社会学与心理学模型...',
        icon: BrainCircuit
    },
  ];

  const handleNext = () => {
    if (step === 1 && genre) {
        setStep(2);
    } else if (step === 2 && persona) {
        setIsInitializing(true);
        setTimeout(() => {
            onComplete({ genre, persona });
        }, 2000);
    }
  };

  if (isInitializing) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-ink-900 text-white font-mono p-8">
            <div className="w-full max-w-md space-y-4">
                <div className="h-1 w-full bg-ink-800 rounded overflow-hidden">
                    <div className="h-full bg-accent-cyan animate-[width_2s_ease-out_forwards]" style={{width: '100%'}}></div>
                </div>
                <div className="space-y-2 text-sm text-accent-cyan">
                    <p>> 正在连接华为云 (HUAWEI CLOUD)...</p>
                    <p>> 获取用户配置文件...</p>
                    <p>> 挂载知识库: [{genre}]</p>
                    <p>> 配置系统 Prompt: [{persona}]</p>
                    <p className="animate-pulse text-white">> 初始化完成</p>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[600px] bg-ink-50 p-6 relative overflow-y-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-ink-200/40 via-transparent to-transparent pointer-events-none"></div>

      <div className={`w-full z-10 ${isMobile ? '' : 'max-w-2xl'}`}>
        {/* Progress */}
        <div className="flex items-center gap-4 mb-8 text-xs font-mono text-ink-400">
            <span className={step === 1 ? "text-ink-900 font-bold" : ""}>01_领域</span>
            <span className="text-ink-200">//////</span>
            <span className={step === 2 ? "text-ink-900 font-bold" : ""}>02_人格</span>
        </div>

        <div className="space-y-8 animate-fade-in pb-12">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold text-ink-900">您正在构思怎样的世界？</h2>
                <p className="text-ink-500 font-sans">文心 (Muse) 将预加载特定的文化数据集。</p>
              </div>
              
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {genres.map((g) => {
                  const Icon = g.icon;
                  return (
                    <button
                        key={g.id}
                        onClick={() => setGenre(g.id)}
                        className={`p-6 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                        genre === g.id 
                            ? 'border-ink-900 bg-white shadow-xl' 
                            : 'border-transparent bg-white/50 hover:bg-white hover:border-ink-200'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className={`p-3 rounded-lg ${genre === g.id ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-500'}`}>
                                <Icon size={20} />
                            </div>
                            {genre === g.id && <Check className="text-accent-cyan" size={20} />}
                        </div>
                        <div>
                            <span className="block font-serif font-bold text-lg text-ink-900">{g.sub}</span>
                            <span className="block text-xs uppercase tracking-wider font-sans text-ink-400 mt-1">{g.label}</span>
                        </div>
                        {genre === g.id && !isMobile && (
                            <div className="mt-4 pt-4 border-t border-ink-100 text-[10px] font-mono text-accent-cyan">
                                > {g.db}
                            </div>
                        )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold text-ink-900">定义您的 AI 伴侣</h2>
                <p className="text-ink-500 font-sans">您希望 Muse 如何介入您的创作？</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 <button
                    onClick={() => setPersona(AIPersona.CRITIC)}
                    className={`p-6 rounded-xl border-2 text-left transition-all flex items-center gap-6 ${
                        persona === AIPersona.CRITIC 
                        ? 'border-accent-red bg-white shadow-xl shadow-red-900/5' 
                        : 'border-transparent bg-white/50 hover:bg-white hover:border-ink-200'
                    }`}
                 >
                    <div className="bg-red-100 p-4 rounded-full text-accent-red">
                        <Database size={24} />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-ink-900">严谨考据党 (The Historian)</h3>
                        <p className="text-sm text-ink-500 mt-1">专注于文化准确性、礼仪和时间线一致性。会指出时代错误。</p>
                    </div>
                 </button>

                 <button
                    onClick={() => setPersona(AIPersona.CREATIVE)}
                    className={`p-6 rounded-xl border-2 text-left transition-all flex items-center gap-6 ${
                        persona === AIPersona.CREATIVE 
                        ? 'border-accent-cyan bg-white shadow-xl shadow-cyan-900/5' 
                        : 'border-transparent bg-white/50 hover:bg-white hover:border-ink-200'
                    }`}
                 >
                    <div className="bg-cyan-100 p-4 rounded-full text-accent-cyan">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-ink-900">脑洞大开党 (The Creative)</h3>
                        <p className="text-sm text-ink-500 mt-1">专注于情节反转、创意命名和诗意的流畅性。优先考虑风格而非严格的准确性。</p>
                    </div>
                 </button>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={handleNext}
              disabled={(step === 1 && !genre) || (step === 2 && !persona)}
              className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all ${
                ((step === 1 && !genre) || (step === 2 && !persona))
                  ? 'bg-ink-200 text-ink-300 cursor-not-allowed'
                  : 'bg-ink-900 text-white hover:bg-black hover:scale-105 shadow-xl'
              }`}
            >
              {step === 2 ? '启动 Muse' : '下一步'}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
