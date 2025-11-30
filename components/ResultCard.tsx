import React from 'react';
import { AnalysisResult } from '../types';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, Info, Activity } from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const { riskScore, category, reason, actions, confidence } = result;

  const isHighRisk = riskScore > 60;
  const isMediumRisk = riskScore > 30 && riskScore <= 60;
  
  // Dynamic Styles
  let themeColor = "emerald";
  let HeaderIcon = ShieldCheck;
  let borderColor = "border-emerald-500/30";
  let bgColor = "bg-emerald-950/30";
  let textColor = "text-emerald-400";
  let scoreColor = "text-emerald-400";
  let title = "Likely Safe";
  let gradient = "from-emerald-900/50 to-emerald-950/10";

  if (isHighRisk) {
    themeColor = "red";
    HeaderIcon = ShieldAlert;
    borderColor = "border-red-500/30";
    bgColor = "bg-red-950/30";
    textColor = "text-red-400";
    scoreColor = "text-red-500";
    title = "High Scam Risk";
    gradient = "from-red-900/50 to-red-950/10";
  } else if (isMediumRisk) {
    themeColor = "amber";
    HeaderIcon = AlertTriangle;
    borderColor = "border-amber-500/30";
    bgColor = "bg-amber-950/30";
    textColor = "text-amber-400";
    scoreColor = "text-amber-500";
    title = "Suspicious Activity";
    gradient = "from-amber-900/50 to-amber-950/10";
  }

  return (
    <div className={`w-full max-w-4xl mx-auto mt-8 glass-panel rounded-xl shadow-2xl border ${borderColor} overflow-hidden animate-fade-in`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradient} p-6 md:p-8 border-b ${borderColor} flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-2xl bg-[#0f0a1e] border border-white/10 ${isHighRisk ? 'text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : isMediumRisk ? 'text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'}`}>
            <HeaderIcon size={40} />
          </div>
          <div>
            <h2 className={`text-3xl font-bold ${textColor} brand-font tracking-wide`}>{title}</h2>
            <div className="flex items-center mt-1 space-x-2">
                <span className="text-slate-400 text-sm">AI Confidence:</span>
                <span className="text-white text-sm font-semibold bg-white/10 px-2 py-0.5 rounded">{confidence}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 bg-[#0f0a1e]/50 p-3 rounded-xl border border-white/5">
            <div className="text-right">
                <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Risk Score</div>
                <div className={`text-4xl font-black ${scoreColor} brand-font`}>{riskScore}<span className="text-lg text-slate-500">/100</span></div>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
                 <svg className="h-full w-full transform -rotate-90 absolute" viewBox="0 0 36 36">
                    <path
                        className={`${isHighRisk ? 'text-red-500' : isMediumRisk ? 'text-amber-500' : 'text-emerald-500'}`}
                        strokeDasharray={`${riskScore}, 100`}
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                 </svg>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-8">
        
        {/* Category Badge */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
            <span className="text-sm font-bold text-indigo-300 uppercase tracking-widest flex items-center">
                <Activity size={16} className="mr-2" />
                Detected Category
            </span>
            <span className={`self-start px-4 py-1.5 rounded-full text-sm font-bold border bg-opacity-10 ${
                isHighRisk 
                    ? 'bg-red-500 text-red-400 border-red-500/30' 
                    : isMediumRisk 
                    ? 'bg-amber-500 text-amber-400 border-amber-500/30' 
                    : 'bg-emerald-500 text-emerald-400 border-emerald-500/30'
            }`}>
                {category}
            </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Analysis */}
            <div className="space-y-3">
            <h3 className="flex items-center text-lg font-bold text-white">
                <Info size={20} className="mr-2 text-indigo-400" />
                Red Flags & Analysis
            </h3>
            <div className="bg-[#130f25] p-5 rounded-xl border border-indigo-900/30 text-slate-300 leading-relaxed text-sm">
                {reason}
            </div>
            </div>

            {/* Action Plan */}
            <div className="space-y-3">
            <h3 className="flex items-center text-lg font-bold text-white">
                <CheckCircle size={20} className="mr-2 text-indigo-400" />
                Recommended Actions
            </h3>
            <div className="grid gap-3">
                {actions.map((action, idx) => (
                <div key={idx} className="flex items-start p-3 bg-[#130f25] border border-indigo-900/30 rounded-xl hover:border-indigo-500/50 transition-colors group">
                    <div className={`min-w-[24px] h-6 flex items-center justify-center rounded-full text-xs font-bold mr-3 mt-0.5 ${
                        isHighRisk ? 'bg-red-900/50 text-red-400' : 'bg-indigo-900/50 text-indigo-400'
                    }`}>
                    {idx + 1}
                    </div>
                    <p className="text-slate-300 font-medium text-sm group-hover:text-white transition-colors">{action}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};