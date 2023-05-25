
export interface User {
  respuesta_token?: boolean;
  active?: boolean;
  uID: string;
  name: string;
  nick_or_name?: string;
  nickname?: string;
  api_token?: string;
  avatar?: {
    categoria_id?: number;
    descripcion?: string;
    exclusive?: number;
    filename?: string;
    id?: number;
    nombre?: string;
    uuid?: string;
    visible?: boolean;
  };
  avatar_id?: number;
  id?: number;
  comuna_nombre?: string;
  duels?: {
    finished?: any;
    active?: number;
    toPlay?: number;
  };
  birthday?: string;
  colegio_id?: number;
  created_at?: Date;
  curso?: Object;
  nota_promedio?: number;
  pais?: Object;
  pais_id?: number;
  puntaje_mes?: number;
  rango?: {
    filename: string;
    next_level: number;
    puntaje: number;
    value: string;
  };
  role_id?: number;
  role_name?: string;
  roleuser?: Object;
  achievements?: Object;
  wallet?: {
    id: number;
    uuid: string;
  };
  wallet_amount?: number;
}
