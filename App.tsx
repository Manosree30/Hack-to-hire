import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputArea } from './components/InputArea';
import { ResultCard } from './components/ResultCard';
import { analyzeContent } from './services/geminiService';
import { AnalysisResult } from './types';
import { Shield, BrainCircuit, MessageSquareWarning, Siren } from 'lucide-react';

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string, image?: { base64: string; mimeType: string }) => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeContent(text, image?.base64, image?.mimeType);
      setResult(data);
    } catch (err) {
      setError("Unable to analyze content. Please try again or check your connection.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const resetAnalysis = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2532&auto=format&fit=crop')] bg-cover bg-fixed bg-no-repeat">
      <div className="absolute inset-0 bg-[#0f0a1e]/90 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-400 mb-6 brand-font tracking-tight drop-shadow-lg">
              AI-DRIVE SCAM DETECTION
            </h2>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              An AI system that detects scams <span className="text-white font-semibold">BEFORE</span> you click, pay, or respond — giving real-time warnings to stop fraud before it happens.
            </p>
          </div>

          <InputArea onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

          {error && (
            <div className="mt-8 max-w-3xl mx-auto p-4 bg-red-950/40 border border-red-500/30 rounded-xl text-red-200 flex items-center justify-center backdrop-blur-md">
               <Siren className="mr-2" /> <span>{error}</span>
            </div>
          )}

          {result ? (
              <div className="pb-12">
                   <ResultCard result={result} />
                   <div className="text-center mt-10">
                      <button 
                          onClick={resetAnalysis}
                          className="px-6 py-2 rounded-full border border-slate-600 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all text-sm font-medium tracking-wide uppercase"
                      >
                          Analyze another item
                      </button>
                   </div>
              </div>
          ) : (
             !isAnalyzing && (
                 <div className="mt-20">
                    <div className="flex items-center justify-center mb-10">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-indigo-500"></div>
                        <span className="px-4 text-indigo-300 text-sm font-bold uppercase tracking-widest">Solution Overview</span>
                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-indigo-500"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Slide 3 Content Adaptation */}
                        <FeatureCard 
                            number="01"
                            icon={<MessageSquareWarning className="text-purple-400" />}
                            title="Real-Time Analysis"
                            desc="AI scans messages, emails, and payment requests using NLP to identify phishing tone and fake urgency."
                        />
                         <FeatureCard 
                            number="02"
                            icon={<Shield className="text-blue-400" />}
                            title="Risk Scoring"
                            desc="Each payment or receiver is analyzed and given a 'Scam Risk Score' before the transaction is processed."
                        />
                         <FeatureCard 
                            number="03"
                            icon={<Siren className="text-red-400" />}
                            title="Smart Alerts"
                            desc="Users get instant warnings such as '⚠ Unverified Receiver Detected' to stop fraud before it happens."
                        />
                         <FeatureCard 
                            number="04"
                            icon={<BrainCircuit className="text-emerald-400" />}
                            title="Continuous Learning"
                            desc="Machine Learning models evolve automatically, learning from new scam trends to stay ahead."
                        />
                    </div>
                 </div>
             )
          )}
        </main>

        <footer className="bg-[#0a0715]/80 border-t border-indigo-900/30 py-10 mt-auto backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="border-t border-white/5 pt-6">
                <p className="text-xs text-slate-500">
                    &copy; {new Date().getFullYear()} FluxByte AI. Powered by Google Gemini.
                </p>
             </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard = ({ number, icon, title, desc }: { number: string, icon: React.ReactNode, title: string, desc: string }) => (
    <div className="bg-[#130f25]/80 p-6 rounded-2xl border border-indigo-500/10 hover:border-indigo-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-900/20 group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <span className="text-4xl font-black text-indigo-900/40 group-hover:text-indigo-900/60 transition-colors brand-font">{number}</span>
        </div>
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default App;