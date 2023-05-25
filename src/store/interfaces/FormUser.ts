
export interface FormUser {
  birthday?: {
    day?: number | string | undefined;
    month?: number | string | undefined;
    year?: number | string | undefined;
  };
  email?: string | undefined;
  nickname?: string | undefined;
  pais?: {
    id?: number | undefined;
    filename: string | undefined;
  };
}
