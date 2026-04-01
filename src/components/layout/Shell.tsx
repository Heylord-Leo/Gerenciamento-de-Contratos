import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  AlertCircle, 
  BarChart3, 
  PlusCircle, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  User,
  Menu
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'contracts', label: 'Contratos', icon: FileText },
    { id: 'alerts', label: 'Pendências', icon: AlertCircle },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r-2 border-black transition-all duration-300 z-50 flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand */}
      <div className="p-6 border-b-2 border-black flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white font-black text-xl italic">C</span>
            </div>
            <span className="font-black text-lg tracking-tighter uppercase">ContractFlow</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-black flex items-center justify-center mx-auto">
            <span className="text-white font-black text-xl italic">C</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 p-3 font-bold transition-all border-2 border-transparent",
              activeTab === item.id 
                ? "bg-black text-white border-black shadow-[4px 4px 0px 0px rgba(0,0,0,1)]" 
                : "text-slate-500 hover:bg-slate-100 hover:text-black"
            )}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-3 border-t-2 border-black space-y-2">
        <button className="w-full flex items-center gap-3 p-3 font-bold text-slate-500 hover:bg-slate-100 hover:text-black transition-all">
          <Settings size={20} />
          {!isCollapsed && <span>Configurações</span>}
        </button>
        <button className="w-full flex items-center gap-3 p-3 font-bold text-red-600 hover:bg-red-50 transition-all">
          <LogOut size={20} />
          {!isCollapsed && <span>Sair</span>}
        </button>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 hover:bg-slate-100 transition-all border-t border-slate-100 mt-2"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};

export const Topbar: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  return (
    <header 
      className={cn(
        "fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b-2 border-black z-40 transition-all duration-300 flex items-center justify-between px-8",
        isCollapsed ? "left-20" : "left-64"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar contratos, fornecedores..." 
            className="pl-10 pr-4 py-2 bg-slate-100 border-2 border-transparent focus:border-black outline-none transition-all w-80 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-slate-100 transition-all">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-[2px] bg-slate-200"></div>
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black uppercase leading-none">Leonardo Cintra</p>
            <p className="text-xs text-slate-500 font-bold uppercase">Gestor de Contratos</p>
          </div>
          <div className="w-10 h-10 bg-slate-200 border-2 border-black flex items-center justify-center overflow-hidden">
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};
