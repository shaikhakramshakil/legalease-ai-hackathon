"use client";

import { Button } from "../ui/button";

export type KeyRisk = {
    hasRisk: boolean;
    riskLevel: 'high' | 'medium' | 'low' | 'none';
    riskTitle?: string;
    riskExplanation?: string;
};

type RiskAlertViewProps = {
    keyRisk: KeyRisk;
    onLearnMore: () => void;
    onOk: () => void;
};

const riskLevelConfig = {
    high: { icon: 'warning', color: 'bg-[#FFAA00]/30' },
    medium: { icon: 'warning', color: 'bg-[#FFAA00]/30' },
    low: { icon: 'info', color: 'bg-blue-500/30' },
    none: { icon: 'check_circle', color: 'bg-green-500/30' },
};

export function RiskAlertView({ keyRisk, onLearnMore, onOk }: RiskAlertViewProps) {
    const config = riskLevelConfig[keyRisk.riskLevel] || riskLevelConfig.low;
    
    return (
        <div className="flex flex-col items-center justify-center min-h-full bg-black text-white p-6">
            <div className="relative w-full max-w-sm text-center p-8 space-y-6 animate-in fade-in-0 duration-500">
                <div className="relative flex items-center justify-center">
                    <div className={`absolute inset-0 ${config.color} rounded-full animate-pulse-bg`}></div>
                    <div className="relative w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-6xl text-primary dark:text-white">{config.icon}</span>
                    </div>
                </div>
                <div className="space-y-3 animate-in fade-in-0 duration-500 animation-delay-200">
                    <h1 className="text-4xl font-extrabold text-white">Risk Alert</h1>
                    <p className="text-lg text-gray-300">
                        Our AI has identified a potential risk in this document.
                    </p>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl space-y-2 animate-in fade-in-0 duration-500 animation-delay-400">
                    <h2 className="text-white font-bold text-lg">{keyRisk.riskTitle || 'Key Issue Identified'}:</h2>
                    <p className="text-gray-300">
                        {keyRisk.riskExplanation || 'A potential issue has been found.'}
                    </p>
                </div>
                <div className="flex flex-col space-y-4 pt-4 animate-in fade-in-0 duration-500 animation-delay-600">
                    <Button
                        onClick={onLearnMore}
                        className="w-full h-14 px-6 bg-white text-primary text-lg font-bold rounded-xl transition-transform transform hover:scale-105 shadow-lg"
                    >
                        Learn More
                    </Button>
                    <Button
                        onClick={onOk}
                        variant="ghost"
                        className="w-full h-14 px-6 bg-transparent text-gray-400 text-lg font-medium rounded-xl transition-colors hover:bg-gray-800/50"
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
}
