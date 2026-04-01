import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const mockContracts = [
  { id: 'CT-2024-001', name: 'Licenciamento Office 365', provider: 'Microsoft', status: 'Ativo', start: '01/01/2024', end: '31/12/2026', value: 45000, dept: 'TI', responsible: 'João Silva' },
  { id: 'CT-2024-002', name: 'Serviços de Cloud AWS', provider: 'Amazon Web Services', status: 'Ativo', start: '15/03/2024', end: '14/03/2025', value: 120000, dept: 'TI', responsible: 'Maria Souza' },
  { id: 'CT-2024-003', name: 'Manutenção de Elevadores', provider: 'Otis Brasil', status: 'Vencendo', start: '10/05/2023', end: '09/05/2024', value: 12500, dept: 'Facilities', responsible: 'Carlos Lima' },
  { id: 'CT-2024-004', name: 'Segurança Patrimonial', provider: 'G4S Brasil', status: 'Ativo', start: '01/06/2023', end: '31/05/2025', value: 85000, dept: 'Segurança', responsible: 'Ana Paula' },
  { id: 'CT-2024-005', name: 'Limpeza e Conservação', provider: 'Verzani & Sandrini', status: 'Aguardando Assinatura', start: '01/04/2024', end: '31/03/2026', value: 65000, dept: 'Facilities', responsible: 'Carlos Lima' },
  { id: 'CT-2024-006', name: 'Consultoria Jurídica', provider: 'Mattos Filho Advogados', status: 'Vencido', start: '01/01/2023', end: '31/12/2023', value: 25000, dept: 'Jurídico', responsible: 'Roberto Dias' },
  { id: 'CT-2024-007', name: 'Aluguel de Impressoras', provider: 'Simpress', status: 'Ativo', start: '15/02/2024', end: '14/02/2027', value: 8500, dept: 'Administrativo', responsible: 'Lucia Ferreira' },
];

export const ContractList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Gestão de Contratos</h1>
          <p className="text-slate-500 font-bold uppercase text-sm">Listagem completa e filtros avançados</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="brutal-btn-outline flex items-center gap-2">
            <Download size={18} />
            Exportar
          </button>
          <button className="brutal-btn-primary">Novo Contrato</button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="brutal-card p-4 bg-slate-50 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome, fornecedor ou número..." 
            className="w-full pl-10 pr-4 py-2 border-2 border-black outline-none focus:bg-white transition-all font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border-2 border-black font-bold outline-none bg-white cursor-pointer">
          <option>Status: Todos</option>
          <option>Ativo</option>
          <option>Vencendo</option>
          <option>Vencido</option>
          <option>Aguardando Assinatura</option>
        </select>
        <select className="px-4 py-2 border-2 border-black font-bold outline-none bg-white cursor-pointer">
          <option>Departamento: Todos</option>
          <option>TI</option>
          <option>Facilities</option>
          <option>Jurídico</option>
        </select>
        <button className="p-2 border-2 border-black bg-white hover:bg-slate-100 transition-all">
          <Filter size={20} />
        </button>
      </div>

      {/* Table */}
      <div className="brutal-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 text-xs font-black uppercase tracking-wider">
                  <div className="flex items-center gap-2 cursor-pointer">
                    ID / Nome <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="p-4 text-xs font-black uppercase tracking-wider">Fornecedor</th>
                <th className="p-4 text-xs font-black uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-black uppercase tracking-wider">Vigência</th>
                <th className="p-4 text-xs font-black uppercase tracking-wider">Responsável</th>
                <th className="p-4 text-xs font-black uppercase tracking-wider text-right">Valor</th>
                <th className="p-4 text-xs font-black uppercase tracking-wider text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {mockContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-slate-50 transition-all group">
                  <td className="p-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase">{contract.id}</p>
                    <p className="font-bold text-sm group-hover:text-accent transition-all">{contract.name}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">{contract.provider}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{contract.dept}</p>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={contract.status} />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span>{contract.start}</span>
                      <span className="text-slate-300">|</span>
                      <span className={cn(contract.status === 'Vencido' ? "text-red-500" : "")}>{contract.end}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium">{contract.responsible}</td>
                  <td className="p-4 text-sm font-black text-right">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contract.value)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 border-2 border-transparent hover:border-black hover:bg-white transition-all" title="Visualizar">
                        <Eye size={16} />
                      </button>
                      <button className="p-1.5 border-2 border-transparent hover:border-black hover:bg-white transition-all" title="Editar">
                        <Edit size={16} />
                      </button>
                      <button className="p-1.5 border-2 border-transparent hover:border-black hover:bg-red-50 hover:text-red-600 transition-all" title="Excluir">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 bg-slate-50 border-t-2 border-black flex items-center justify-between">
          <p className="text-xs font-bold uppercase text-slate-500">Mostrando 1-7 de 124 contratos</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border-2 border-black bg-white disabled:opacity-50" disabled>
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center">
              <button className="w-8 h-8 border-2 border-black bg-black text-white font-bold text-xs">1</button>
              <button className="w-8 h-8 border-2 border-black border-l-0 bg-white font-bold text-xs hover:bg-slate-100">2</button>
              <button className="w-8 h-8 border-2 border-black border-l-0 bg-white font-bold text-xs hover:bg-slate-100">3</button>
            </div>
            <button className="p-2 border-2 border-black bg-white">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Ativo': return <span className="badge badge-success">Ativo</span>;
    case 'Vencendo': return <span className="badge badge-warning">Vencendo</span>;
    case 'Vencido': return <span className="badge badge-danger">Vencido</span>;
    case 'Aguardando Assinatura': return <span className="badge badge-info">Assinatura</span>;
    default: return <span className="badge badge-neutral">{status}</span>;
  }
};
