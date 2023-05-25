
export interface Defiant {
  active?: boolean;
  uID: string;
  apellido_materno?: string;
  apellido_paterno?: string;
  api_token?: string;
  avatar?: {
    categoria_id?: number;
    descripcion?: string;
    exclusive?: number;
    visible?: boolean;
  };
  avatar_id?: number;
  id?: number;
  duels?: {
    finished?: any;
    active?: number;
    toPlay?: number;
  };
  birthday?: string;
  establecimiento_nombre?: string;
  inverted_name?: string;
  last_game?: string;
  last_login?: string;
  last_login_ip?: string;
  nota_promedio?: number;
  rango?: {
    filename: string;
  };
  role_id?: number;
  role_name?: string;
  roleuser?: Object;
  short_name?: string;
  achievements?: Object;
  wallet?: {
    id: number;
    uuid: string;
    user_id: number;
  };
  wallet_amount?: number;
}
