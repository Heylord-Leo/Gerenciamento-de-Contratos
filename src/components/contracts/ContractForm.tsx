import React from 'react';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Upload,
  Calendar,
  DollarSign,
  User,
  Building2,
  FileText
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const ContractForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 border-2 border-black hover:bg-slate-100 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">Novo Contrato</h1>
            <p className="text-slate-500 font-bold uppercase text-[10px]">Preencha os dados para formalização no sistema</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="brutal-btn-outline flex items-center gap-2">
            <X size={18} /> Cancelar
          </button>
          <button className="brutal-btn-primary flex items-center gap-2">
            <Save size={18} /> Salvar Contrato
          </button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="space-y-8 pb-20">
        {/* Dados Gerais */}
        <FormSection title="01. Dados Gerais" icon={FileText}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Nome do Contrato" placeholder="Ex: Licenciamento Office 365" required />
            <InputField label="Número do Contrato" placeholder="Ex: CT-2024-001" />
            <SelectField label="Tipo de Contrato" options={['Software', 'Serviços', 'Locação', 'Manutenção']} />
            <SelectField label="Departamento" options={['TI', 'RH', 'Financeiro', 'Jurídico', 'Facilities']} />
          </div>
        </FormSection>

        {/* Fornecedor */}
        <FormSection title="02. Fornecedor" icon={Building2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Razão Social / Nome" placeholder="Buscar fornecedor cadastrado..." />
            <InputField label="CNPJ / ID" placeholder="00.000.000/0000-00" />
          </div>
        </FormSection>

        {/* Vigência */}
        <FormSection title="03. Vigência e Renovação" icon={Calendar}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Data de Início" type="date" />
            <InputField label="Data de Término" type="date" />
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-6 h-6 border-2 border-black flex items-center justify-center group-hover:bg-slate-100 transition-all">
                  <input type="checkbox" className="hidden peer" />
                  <div className="w-3 h-3 bg-black opacity-0 peer-checked:opacity-100 transition-all"></div>
                </div>
                <span className="text-xs font-black uppercase">Renovação Automática</span>
              </label>
            </div>
          </div>
        </FormSection>

        {/* Valores */}
        <FormSection title="04. Valores e Faturamento" icon={DollarSign}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Valor Total" placeholder="R$ 0,00" />
            <InputField label="Valor Mensal (Estimado)" placeholder="R$ 0,00" />
            <SelectField label="Frequência de Pagamento" options={['Mensal', 'Trimestral', 'Semestral', 'Anual', 'Único']} />
          </div>
        </FormSection>

        {/* Responsável */}
        <FormSection title="05. Responsabilidade" icon={User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Gestor Responsável" placeholder="Nome do colaborador" />
            <InputField label="Centro de Custo" placeholder="Ex: TI-INFRA-001" />
          </div>
        </FormSection>

        {/* Anexos */}
        <FormSection title="06. Documentos e Anexos" icon={Upload}>
          <div className="border-2 border-dashed border-black p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-white transition-all cursor-pointer group">
            <Upload size={48} className="text-slate-300 group-hover:text-black transition-all mb-4" />
            <p className="font-black uppercase text-sm">Arraste os arquivos aqui</p>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase">PDF, DOCX ou Imagens (Máx 10MB)</p>
            <button className="mt-6 brutal-btn-outline text-xs">Selecionar Arquivos</button>
          </div>
        </FormSection>
      </div>
    </div>
  );
};

const FormSection = ({ title, icon: Icon, children }: any) => (
  <div className="brutal-card p-6 bg-white">
    <div className="flex items-center gap-3 mb-6 border-b-2 border-slate-100 pb-4">
      <div className="w-10 h-10 bg-slate-100 border-2 border-black flex items-center justify-center">
        <Icon size={20} />
      </div>
      <h3 className="font-black uppercase tracking-tight">{title}</h3>
    </div>
    {children}
  </div>
);

const InputField = ({ label, placeholder, type = "text", required }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full px-4 py-2 border-2 border-black outline-none focus:bg-slate-50 transition-all font-bold text-sm"
    />
  </div>
);

const SelectField = ({ label, options }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-500">{label}</label>
    <select className="w-full px-4 py-2 border-2 border-black outline-none bg-white cursor-pointer font-bold text-sm">
      {options.map((opt: string) => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);
