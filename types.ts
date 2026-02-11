
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
}

export interface MousePosition {
  x: number;
  y: number;
}
