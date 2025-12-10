import React, { useState, useEffect } from 'react';
import { AppView, UserProfile } from './types';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { FeatureDemo } from './components/FeatureDemo';
import { syncDraftsToCloud } from './services/storage';
import { Smartphone, Monitor } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [draftCount, setDraftCount] = useState(0);
  
  // Responsive & Simulation State
  const [simulateMobile, setSimulateMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = simulateMobile || windowWidth < 768;

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Guest',
    isLoggedIn: false,
    genre: null,
    persona: null
  });

  const handleLoginSuccess = async (email: string) => {
    await syncDraftsToCloud();
    setUserProfile(prev => ({ 
        ...prev, 
        isLoggedIn: true,
        name: email.split('@')[0], 
        email: email
    }));
    setShowLoginModal(false);
  };

  const handleOnboardingComplete = (data: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
    setCurrentView(AppView.DASHBOARD);
  };

  const handleRequestLogin = (count: number) => {
    setDraftCount(count);
    setShowLoginModal(true);
  };

  // The Core App Content
  const AppContent = () => (
    <div className={`relative w-full h-full bg-ink-50 overflow-hidden font-sans ${isMobile ? 'text-sm' : ''}`}>
      {currentView === AppView.ONBOARDING && (
        <Onboarding onComplete={handleOnboardingComplete} isMobile={isMobile} />
      )}

      {currentView === AppView.DASHBOARD && (
        <>
            <FeatureDemo 
                user={userProfile} 
                onRequestLogin={handleRequestLogin}
                isMobile={isMobile}
            />
            
            {showLoginModal && (
                <Login 
                    draftCount={draftCount}
                    onLoginSuccess={handleLoginSuccess}
                    onCancel={() => setShowLoginModal(false)}
                />
            )}
        </>
      )}
    </div>
  );

  // Simulation Wrapper
  return (
    <div className={simulateMobile ? "min-h-screen bg-gray-900 flex items-center justify-center p-8 transition-colors duration-500" : "h-screen w-full bg-ink-50"}>
       
       {/* Simulator Toggle Button */}
       <button 
          onClick={() => setSimulateMobile(!simulateMobile)}
          className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-xl transition-all ${
            simulateMobile 
                ? 'bg-white text-gray-900 hover:bg-gray-200' 
                : 'bg-ink-900 text-white hover:bg-black'
          }`}
       >
          {simulateMobile ? <Monitor size={18} /> : <Smartphone size={18} />}
          {simulateMobile ? '桌面视图' : '模拟手机'}
       </button>

       {/* Render */}
       {simulateMobile ? (
          // iPhone 15 Frame
          <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] border-[8px] border-gray-800 shadow-2xl overflow-hidden ring-4 ring-gray-900/50">
             {/* Dynamic Island / Notch */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50"></div>
             
             {/* Status Bar Time (Fake) */}
             <div className="absolute top-3 left-8 text-white text-xs font-medium z-50">9:41</div>
             <div className="absolute top-3.5 right-8 flex gap-1 z-50">
                <div className="w-4 h-2.5 border border-white/30 rounded-sm"></div>
                <div className="w-0.5 h-1 bg-white/30 rounded-sm"></div>
             </div>

             {/* Content */}
             <AppContent />
             
             {/* Home Indicator */}
             <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50 pointer-events-none"></div>
          </div>
       ) : (
          <AppContent />
       )}
    </div>
  );
};

export default App;