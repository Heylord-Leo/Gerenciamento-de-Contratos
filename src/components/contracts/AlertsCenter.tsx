import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  PenTool, 
  CheckCircle2, 
  DollarSign,
  Filter,
  Search,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const mockAlerts = [
  { id: 1, type: 'danger', category: 'Vencimento', title: 'Contrato Oracle Expirado', date: 'Há 2 dias', desc: 'O contrato de licenciamento de banco de dados expirou e requer renovação imediata.', action: 'Renovar Agora' },
  { id: 2, type: 'warning', category: 'Renovação', title: 'Renovação AWS em 14 dias', date: '22/04/2026', desc: 'Contrato de serviços cloud entra em período de renovação automática em breve.', action: 'Revisar Termos' },
  { id: 3, type: 'info', category: 'Assinatura', title: 'Aguardando Assinatura Jurídico', date: 'Há 5 dias', desc: 'Contrato Verzani & Sandrini aguarda validação final do departamento jurídico.', action: 'Cobrar Retorno' },
  { id: 4, type: 'danger', category: 'Pagamento', title: 'Fatura AWS Pendente', date: 'Ontem', desc: 'Pagamento da fatura de Março não identificado no sistema financeiro.', action: 'Ver Fatura' },
  { id: 5, type: 'warning', category: 'Documentação', title: 'Seguro Garantia Expirando', date: 'Em 5 dias', desc: 'A apólice de seguro garantia da obra matriz precisa ser atualizada.', action: 'Anexar Novo' },
];

export const AlertsCenter: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Central de Pendências</h1>
          <p className="text-slate-500 font-bold uppercase text-sm">Acompanhamento operacional e alertas críticos</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Filtrar alertas..." className="pl-10 pr-4 py-2 border-2 border-black outline-none font-bold text-xs w-64" />
          </div>
          <button className="p-2 border-2 border-black bg-white hover:bg-slate-100 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AlertStat label="Críticos" value="03" color="bg-red-500" />
        <AlertStat label="Atenção" value="08" color="bg-amber-400" />
        <AlertStat label="Assinaturas" value="05" color="bg-blue-500" />
        <AlertStat label="Pagamentos" value="12" color="bg-emerald-500" />
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="brutal-card flex flex-col md:flex-row overflow-hidden group">
            <div className={cn(
              "w-2 md:w-4 shrink-0",
              alert.type === 'danger' ? "bg-red-500" : alert.type === 'warning' ? "bg-amber-400" : "bg-blue-500"
            )}></div>
            
            <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex gap-4">
                <div className={cn(
                  "w-12 h-12 border-2 border-black flex items-center justify-center shrink-0",
                  alert.type === 'danger' ? "bg-red-50" : alert.type === 'warning' ? "bg-amber-50" : "bg-blue-50"
                )}>
                  {alert.category === 'Vencimento' && <Clock size={24} />}
                  {alert.category === 'Renovação' && <AlertTriangle size={24} />}
                  {alert.category === 'Assinatura' && <PenTool size={24} />}
                  {alert.category === 'Pagamento' && <DollarSign size={24} />}
                  {alert.category === 'Documentação' && <CheckCircle2 size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">{alert.category}</span>
                    <span className="text-[10px] font-black text-slate-300">•</span>
                    <span className="text-[10px] font-black uppercase text-slate-400">{alert.date}</span>
                  </div>
                  <h3 className="text-lg font-black uppercase group-hover:text-accent transition-all">{alert.title}</h3>
                  <p className="text-sm font-bold text-slate-500 mt-1 max-w-2xl">{alert.desc}</p>
                </div>
              </div>
              
              <button className="brutal-btn-primary text-xs whitespace-nowrap flex items-center gap-2">
                {alert.action}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AlertStat = ({ label, value, color }: any) => (
  <div className="brutal-card p-4 flex items-center justify-between bg-white">
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
    <div className={cn("w-10 h-10 border-2 border-black", color)}></div>
  </div>
);
