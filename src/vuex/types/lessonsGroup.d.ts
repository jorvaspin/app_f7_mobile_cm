type lessonsGroup = {
    id?: number;
    nombre?: string;
    slug?: string;
    short_description?: string;
    icon?: string;
    app_banner?: string | any;
    bg_color?: string | any;
    available?: boolean;
    important?: boolean;
    order?: number;
    is_segmented?: boolean;
    segmented_type?: string | any;
    segmented_value?: string | any;
    lessonsCount?: number;
    lessons?: Array<any>;
};
