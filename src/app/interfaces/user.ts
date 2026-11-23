export interface User_type {
    id: number;
    usr_role: string;

    usr_name: string;
    usr_phoneNo: string;
    usr_email: string;
    usr_company: string;
    usr_username: string;
    usr_password: string;
    usr_status: 'active' | 'inactive';
}