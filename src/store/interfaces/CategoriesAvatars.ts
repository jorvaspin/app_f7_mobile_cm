export interface Avatar {
    id: string;
    filename: string;
    nombre: string;
    descripcion: string;
}

export interface AvatarCategories {
    title?: string;
    description?: number;
    avatars: Array<Avatar>;
};
