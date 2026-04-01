import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  History, 
  Paperclip, 
  ShieldCheck, 
  CreditCard, 
  Users,
  Download,
  ExternalLink,
  Upload,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ContractDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('geral');

  const tabs = [
    { id: 'geral', label: 'Informações Gerais', icon: FileText },
    { id: 'docs', label: 'Documentos', icon: Paperclip },
    { id: 'clauses', label: 'Cláusulas Críticas', icon: ShieldCheck },
    { id: 'approvals', label: 'Aprovações', icon: Users },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'history', label: 'Histórico', icon: History },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 hover:text-black transition-all w-fit"
        >
          <ArrowLeft size={14} /> Voltar para lista
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black uppercase tracking-tighter">Licenciamento Office 365</h1>
              <span className="badge badge-success">Ativo</span>
            </div>
            <p className="text-slate-500 font-bold uppercase text-sm">Fornecedor: Microsoft Corporation | ID: CT-2024-001</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="brutal-btn-outline">Editar</button>
            <button className="brutal-btn-primary">Renovar</button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard label="Vigência Total" value="36 Meses" sub="01/01/24 - 31/12/26" icon={Calendar} />
        <SummaryCard label="Valor Total" value="R$ 1.620.000" sub="R$ 45.000 / mês" icon={CreditCard} />
        <SummaryCard label="Gestor" value="João Silva" sub="TI - Infraestrutura" icon={Users} />
        <SummaryCard label="Próxima Renovação" value="31/12/2026" sub="Renovação Automática" icon={Clock} />
      </div>

      {/* Tabs Navigation */}
      <div className="border-b-2 border-black flex overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-6 py-4 font-black uppercase text-xs flex items-center gap-2 whitespace-nowrap transition-all border-b-4",
              activeTab === tab.id 
                ? "border-black bg-white text-black" 
                : "border-transparent text-slate-400 hover:text-black hover:bg-slate-50"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="brutal-card p-8 bg-white">
        {activeTab === 'geral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Section title="Dados do Contrato">
                <InfoRow label="Número do Contrato" value="CT-2024-001-MSFT" />
                <InfoRow label="Tipo de Contrato" value="Licenciamento de Software (SaaS)" />
                <InfoRow label="Departamento" value="Tecnologia da Informação" />
                <InfoRow label="Centro de Custo" value="TI-INFRA-002" />
              </Section>
              <Section title="Vigência e Prazos">
                <InfoRow label="Data de Início" value="01 de Janeiro de 2024" />
                <InfoRow label="Data de Término" value="31 de Dezembro de 2026" />
                <InfoRow label="Aviso Prévio" value="90 dias" />
                <InfoRow label="Renovação Automática" value="Sim" />
              </Section>
            </div>
            <div className="space-y-8">
              <Section title="Valores e Faturamento">
                <InfoRow label="Valor Mensal" value="R$ 45.000,00" />
                <InfoRow label="Moeda" value="BRL (Real)" />
                <InfoRow label="Frequência" value="Mensal" />
                <InfoRow label="Índice de Reajuste" value="IPCA (Anual)" />
              </Section>
              <Section title="Observações">
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Contrato referente ao licenciamento E5 para 500 usuários. Inclui suporte Premier e acesso ao Azure AD Premium. 
                  Revisão de volumetria deve ocorrer semestralmente.
                </p>
              </Section>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-black uppercase">Arquivos Anexados (4)</h3>
              <button className="brutal-btn-outline text-xs flex items-center gap-2">
                <Upload size={14} /> Upload Documento
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DocCard name="Contrato_Assinado_MSFT_2024.pdf" size="2.4 MB" date="02/01/2024" />
              <DocCard name="Proposta_Comercial_V3.pdf" size="1.1 MB" date="15/12/2023" />
              <DocCard name="Termo_Aditivo_01_Volumetria.pdf" size="850 KB" date="10/03/2024" />
              <DocCard name="Certificado_Seguranca_Cloud.pdf" size="450 KB" date="05/01/2024" />
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-1 before:bg-slate-200">
            <HistoryItem date="10/03/2024 14:30" user="Maria Souza" action="Termo Aditivo Adicionado" detail="Aumento de 50 licenças E5 conforme solicitação do RH." />
            <HistoryItem date="02/01/2024 09:15" user="João Silva" action="Contrato Ativado" detail="Assinaturas coletadas e contrato movido para status Ativo." />
            <HistoryItem date="20/12/2023 16:45" user="Jurídico" action="Aprovação Concedida" detail="Minuta aprovada sem ressalvas." />
            <HistoryItem date="15/12/2023 11:00" user="João Silva" action="Contrato Criado" detail="Início do processo de formalização." />
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, sub, icon: Icon }: any) => (
  <div className="brutal-card p-4 flex items-center gap-4">
    <div className="w-12 h-12 bg-slate-100 border-2 border-black flex items-center justify-center shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">{label}</p>
      <p className="text-lg font-black uppercase leading-none">{value}</p>
      <p className="text-[10px] font-bold text-slate-500 mt-1">{sub}</p>
    </div>
  </div>
);

const Section = ({ title, children }: any) => (
  <div className="space-y-4">
    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoRow = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>
    <span className="text-sm font-black uppercase">{value}</span>
  </div>
);

const DocCard = ({ name, size, date }: any) => (
  <div className="p-4 border-2 border-black flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-red-100 text-red-600 border-2 border-black flex items-center justify-center">
        <FileText size={20} />
      </div>
      <div>
        <p className="text-sm font-bold group-hover:text-accent transition-all">{name}</p>
        <p className="text-[10px] font-black text-slate-400 uppercase">{size} • {date}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 hover:bg-white border-2 border-transparent hover:border-black transition-all">
        <Download size={16} />
      </button>
      <button className="p-2 hover:bg-white border-2 border-transparent hover:border-black transition-all">
        <ExternalLink size={16} />
      </button>
    </div>
  </div>
);

const HistoryItem = ({ date, user, action, detail }: any) => (
  <div className="relative">
    <div className="absolute -left-[29px] top-1 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center z-10">
      <div className="w-2 h-2 bg-black rounded-full"></div>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase">{date}</p>
      <p className="text-sm font-black uppercase mt-1">{action}</p>
      <p className="text-xs font-bold text-slate-600 mt-1">{detail}</p>
      <p className="text-[10px] font-black uppercase text-slate-400 mt-2">Por: {user}</p>
    </div>
  </div>
);

import { Clock } from 'lucide-react';
