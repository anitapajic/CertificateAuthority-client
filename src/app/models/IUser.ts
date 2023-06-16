export interface IUser{
    username: string;
    password: string;
    confirmedPassword: string;
    firstname: string;
    name: string;
    telephone: string;
    code: string;
    type: twoFactorType;

}

export interface LoginDTO{
    username: string;
    password: string;
    code: string;
    type: twoFactorType;
}

export interface TwoFactor{
    username: string;
    type: twoFactorType;
}
export enum twoFactorType{
    EMAIL, PHONE
}