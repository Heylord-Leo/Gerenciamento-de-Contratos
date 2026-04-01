import React from 'react';
import { cn } from '@/src/lib/utils';
import { 
  FileText, 
  Clock, 
  AlertTriangle, 
  PenTool, 
  CheckCircle2, 
  DollarSign,
  ArrowUpRight,
  Plus,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const dataStatus = [
  { name: 'Ativos', value: 45, color: '#10b981' },
  { name: 'Em Aprovação', value: 12, color: '#3b82f6' },
  { name: 'Vencidos', value: 5, color: '#ef4444' },
  { name: 'Em Renovação', value: 8, color: '#f59e0b' },
];

const dataFornecedor = [
  { name: 'AWS', value: 120000 },
  { name: 'Microsoft', value: 85000 },
  { name: 'Oracle', value: 65000 },
  { name: 'SAP', value: 45000 },
  { name: 'Outros', value: 30000 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Visão Gerencial</h1>
          <p className="text-slate-500 font-bold uppercase text-sm">Acompanhamento em tempo real da carteira de contratos</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="brutal-btn-outline flex items-center gap-2">
            <FileText size={18} />
            Relatórios
          </button>
          <button className="brutal-btn-primary flex items-center gap-2">
            <Plus size={18} />
            Novo Contrato
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Contratos Ativos" value="124" icon={FileText} color="bg-black" />
        <StatCard label="A Vencer (30 dias)" value="12" icon={Clock} color="bg-amber-400" textColor="text-black" />
        <StatCard label="Contratos Vencidos" value="05" icon={AlertTriangle} color="bg-red-500" />
        <StatCard label="Aguardando Assinatura" value="08" icon={PenTool} color="bg-blue-500" />
        <StatCard label="Aguardando Aprovação" value="03" icon={CheckCircle2} color="bg-slate-400" />
        <StatCard label="Pagamento Pendente" value="15" icon={DollarSign} color="bg-emerald-500" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="brutal-card p-6">
          <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
            <BarChart3 size={20} />
            Contratos por Status
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {dataStatus.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 border border-black" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs font-bold uppercase">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="brutal-card p-6">
          <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
            <DollarSign size={20} />
            Volume Financeiro por Fornecedor
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataFornecedor}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={{ stroke: '#000', strokeWidth: 2 }} tick={{ fontWeight: 'bold', fontSize: 12 }} />
                <YAxis axisLine={{ stroke: '#000', strokeWidth: 2 }} tick={{ fontWeight: 'bold', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #000', fontWeight: 'bold' }}
                  cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="value" fill="#000" stroke="#000" strokeWidth={1} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lists Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Vencimentos Próximos */}
        <div className="xl:col-span-2 brutal-card overflow-hidden">
          <div className="p-4 border-b-2 border-black bg-slate-50 flex items-center justify-between">
            <h3 className="font-black uppercase flex items-center gap-2">
              <Clock size={18} />
              Vencimentos Próximos
            </h3>
            <button className="text-xs font-black uppercase hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-100 border-b-2 border-black">
                <tr>
                  <th className="p-4 text-xs font-black uppercase">Contrato</th>
                  <th className="p-4 text-xs font-black uppercase">Fornecedor</th>
                  <th className="p-4 text-xs font-black uppercase">Vencimento</th>
                  <th className="p-4 text-xs font-black uppercase">Valor</th>
                  <th className="p-4 text-xs font-black uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <ContractRow name="Licenciamento Office 365" provider="Microsoft" date="15/04/2026" value="R$ 45.000,00" status="warning" />
                <ContractRow name="Serviços de Cloud AWS" provider="Amazon Web Services" date="22/04/2026" value="R$ 120.000,00" status="success" />
                <ContractRow name="Manutenção de Elevadores" provider="Otis Brasil" date="02/05/2026" value="R$ 12.500,00" status="warning" />
                <ContractRow name="Segurança Patrimonial" provider="G4S Brasil" date="10/05/2026" value="R$ 85.000,00" status="success" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Pendências Críticas */}
        <div className="brutal-card flex flex-col">
          <div className="p-4 border-b-2 border-black bg-red-50">
            <h3 className="font-black uppercase text-red-600 flex items-center gap-2">
              <AlertTriangle size={18} />
              Pendências Críticas
            </h3>
          </div>
          <div className="flex-1 p-4 space-y-4">
            <AlertItem title="Assinatura Pendente" desc="Contrato SAP aguardando assinatura do jurídico há 5 dias." type="danger" />
            <AlertItem title="Renovação Automática" desc="Contrato Oracle renova em 48h sem revisão de valores." type="warning" />
            <AlertItem title="Pagamento Atrasado" desc="Fatura mensal AWS vencida desde ontem." type="danger" />
            <AlertItem title="Documento Expirado" desc="Seguro garantia da obra matriz expirou." type="danger" />
          </div>
          <div className="p-4 border-t-2 border-black">
            <button className="w-full brutal-btn-outline text-sm">Ver Central de Alertas</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, textColor = "text-white" }: any) => (
  <div className={cn("brutal-card p-4 flex flex-col justify-between min-h-[120px]", color)}>
    <div className="flex justify-between items-start">
      <div className={cn("p-2 border-2 border-black bg-white text-black")}>
        <Icon size={20} />
      </div>
      <ArrowUpRight size={16} className={textColor} />
    </div>
    <div>
      <p className={cn("text-2xl font-black", textColor)}>{value}</p>
      <p className={cn("text-[10px] font-black uppercase tracking-wider opacity-80", textColor)}>{label}</p>
    </div>
  </div>
);

const ContractRow = ({ name, provider, date, value, status }: any) => (
  <tr className="hover:bg-slate-50 transition-all cursor-pointer group">
    <td className="p-4">
      <p className="font-bold text-sm group-hover:text-accent transition-all">{name}</p>
      <p className="text-[10px] text-slate-400 font-black uppercase">CT-2024-089</p>
    </td>
    <td className="p-4 text-sm font-medium">{provider}</td>
    <td className="p-4 text-sm font-bold">{date}</td>
    <td className="p-4 text-sm font-bold">{value}</td>
    <td className="p-4">
      <span className={cn("badge", status === 'warning' ? "badge-warning" : "badge-success")}>
        {status === 'warning' ? 'Vence em 14 dias' : 'Ativo'}
      </span>
    </td>
  </tr>
);

const AlertItem = ({ title, desc, type }: any) => (
  <div className={cn(
    "p-3 border-2 border-black shadow-[2px 2px 0px 0px rgba(0,0,0,1)] flex gap-3",
    type === 'danger' ? "bg-red-50" : "bg-amber-50"
  )}>
    <div className={cn(
      "w-8 h-8 shrink-0 flex items-center justify-center border-2 border-black",
      type === 'danger' ? "bg-red-500 text-white" : "bg-amber-400 text-black"
    )}>
      <AlertTriangle size={16} />
    </div>
    <div>
      <p className="text-xs font-black uppercase leading-tight">{title}</p>
      <p className="text-[10px] font-bold text-slate-600 mt-1">{desc}</p>
    </div>
  </div>
);

import { BarChart3 } from 'lucide-react';
