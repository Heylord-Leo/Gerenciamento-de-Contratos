import React, { useState } from 'react';
import { 
  Sidebar, 
  Topbar 
} from '@/src/components/layout/Shell';
import { Dashboard } from '@/src/components/contracts/Dashboard';
import { ContractList } from '@/src/components/contracts/ContractList';
import { ContractDetails } from '@/src/components/contracts/ContractDetails';
import { ContractForm } from '@/src/components/contracts/ContractForm';
import { AlertsCenter } from '@/src/components/contracts/AlertsCenter';
import { cn } from '@/src/lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewState, setViewState] = useState<'list' | 'details' | 'form'>('list');

  // Simple router logic for the mockup
  const renderContent = () => {
    if (viewState === 'details') {
      return <ContractDetails onBack={() => setViewState('list')} />;
    }

    if (viewState === 'form') {
      return <ContractForm onBack={() => setViewState('list')} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'contracts':
        return <ContractList />;
      case 'alerts':
        return <AlertsCenter />;
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-20 h-20 bg-slate-100 border-2 border-black flex items-center justify-center">
              <span className="text-4xl font-black italic">R</span>
            </div>
            <h2 className="text-2xl font-black uppercase">Relatórios Executivos</h2>
            <p className="text-slate-500 font-bold uppercase">Módulo em desenvolvimento para a próxima sprint.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setViewState('list');
        }}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isCollapsed ? "ml-20" : "ml-64"
      )}>
        <Topbar isCollapsed={isCollapsed} />
        
        <main className="flex-1 mt-16 p-8 max-w-[1600px] mx-auto w-full">
          {/* Quick Action for Mockup Navigation */}
          {activeTab === 'contracts' && viewState === 'list' && (
            <div className="mb-8 p-4 bg-blue-50 border-2 border-blue-600 flex items-center justify-between animate-pulse">
              <p className="text-xs font-black uppercase text-blue-700">Mockup Interativo: Clique para ver as outras telas</p>
              <div className="flex gap-4">
                <button onClick={() => setViewState('form')} className="text-xs font-black uppercase underline text-blue-700">Ver Formulário</button>
                <button onClick={() => setViewState('details')} className="text-xs font-black uppercase underline text-blue-700">Ver Detalhes</button>
              </div>
            </div>
          )}
          
          {renderContent()}
        </main>
      </div>

      {/* Global Toast Mockup */}
      <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right duration-500">
        <div className="bg-black text-white border-2 border-white shadow-[var(--shadow-brutal)] p-4 flex items-center gap-4">
          <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center border-2 border-white">
            <span className="font-black">✓</span>
          </div>
          <div>
            <p className="text-xs font-black uppercase">Sessão Iniciada</p>
            <p className="text-[10px] font-bold opacity-80 uppercase">Bem-vindo ao ContractFlow v2.4</p>
          </div>
        </div>
      </div>
    </div>
  );
}
