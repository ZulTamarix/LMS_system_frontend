export interface Course_type {
    id: number;
    crs_title: string;
    crs_code: string;
    crs_category: string;
    crs_description: string;
    crs_thumbnail: string;
    crs_type: string;
    crs_isPaid: number;
    crs_price: number | "";
    crs_duration: number | "",
    crs_status: 'active' | 'inactive';
}