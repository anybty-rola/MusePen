import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldAlert, CloudUpload } from 'lucide-react';

interface LoginProps {
  draftCount: number;
  onLoginSuccess: (email: string) => void;
  onCancel: () => void;
}

export const Login: React.FC<LoginProps> = ({ draftCount, onLoginSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulate API delay for syncing
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(email);
    }, 2000);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
      ></div>

      {/* Bottom Sheet / Modal */}
      <div className="relative w-full max-w-lg bg-ink-50 rounded-t-3xl sm:rounded-3xl p-8 shadow-2xl animate-[slideUp_0.3s_ease-out] overflow-hidden border-t border-white/50">
        
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-ink-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10">
            {/* Header with Urgency Hook */}
            <div className="flex items-start gap-4 mb-8">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl shrink-0">
                    <ShieldAlert size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-serif font-bold text-ink-900">
                        防止灵感丢失
                    </h2>
                    <p className="text-ink-500 text-sm mt-1">
                        您有 <span className="font-bold text-accent-red">{draftCount} 条本地草稿</span> 尚未保存。
                        登录后即可将它们永久同步至妙笔云端。
                    </p>
                </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-ink-400 uppercase tracking-wider pl-1">邮箱地址</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" size={18} />
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="writer@musepen.com"
                            className="w-full bg-white border border-ink-200 rounded-xl py-4 pl-12 pr-4 text-ink-900 placeholder:text-ink-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ink-900 hover:bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98] disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <CloudUpload className="animate-bounce" size={20} />
                                同步 {draftCount} 条记录中...
                            </>
                        ) : (
                            <>
                                <span>保存并保护数据</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                    
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="w-full py-3 text-ink-400 text-sm hover:text-ink-800 transition-colors"
                    >
                        我愿承担数据丢失风险 (退出不保存)
                    </button>
                </div>
            </form>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
