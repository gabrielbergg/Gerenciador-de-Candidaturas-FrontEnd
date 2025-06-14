
export interface Skill {
  id: number;
  melhorias: string;
}

export interface CandidaturaResponse {
  id: number;
  tituloVaga: string;
  nomeEmpresa: string;
  requisitosVaga: string;
  localCandidatura: string;
  descricaoVaga: string | null;
  dataCandidatura: Date; 
  statusCandidatura: string; 
  entrevista: any[]; 
  skills: Skill[];
  links: any[]; 
}