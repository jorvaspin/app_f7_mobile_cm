export interface AppAchievement{
    name?: string;
    description?: string;
};

export interface userAchievement {
    achievement_id?: number | string;
    details:{
        id: number | string;
        description: string;
        name: string;
        image: string;
        civipoints: number | string;

    }
};
