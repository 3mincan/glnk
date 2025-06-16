export interface HCP {
  id: string;
  name: string;
  education: string[];
  workplaces: string[];
  publications: string[];
};

export interface Connection {
  source: string;
  target: string;
  type: "coauthorship" | "sharedWorkplace";
  details: string;
};

export interface ProfessionalDetailsProps {
  name?: string;
  specialty?: string;
  age?: number;
  profileImage?: string;
  location?: string;
  description?: string;
  patientsServed?: number;
  successRate?: number;
  education?: {
    institution: string;
    degree: string;
    specialization: string;
    period: string;
  };
}

export interface HCPCardProps {
  name: string;
  title: string;
  specialty: string;
  profileImage?: string;
  peers: number;
  following: number;
  showConnections?: boolean;
  showMyConnections?: boolean;
}

export interface NodeProps {
  id: string;
  name: string;
  education: string[];
  workplaces: string[];
  publications: string[];
}

export interface LinkProps {
  source: string;
  target: string;
  type: "coauthorship" | "sharedWorkplace";
  label: string;
}