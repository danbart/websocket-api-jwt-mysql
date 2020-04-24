export class Usuario {

    public user_id: number;
    public user_name: string;
    public user_surname: string;
    public user_role: string;
    public user_estado: boolean;
    public user_avatar: string;
    public user_email: string;
    public user_password: string;
    public user_createdAt: string;
    public user_updatedAt: string;
    public user_deletedAt: string;

    constructor() {
        this.user_id = 0;
        this.user_name = '';
        this.user_surname = '';
        this.user_role = 'ROLE_USER';
        this.user_estado = true;
        this.user_avatar = '';
        this.user_email = '';
        this.user_password = '';
        this.user_createdAt = '';
        this.user_updatedAt = '';
        this.user_deletedAt = '';
    }

}



