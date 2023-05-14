export interface resetCode{
    type: resetType,
    username: string | null,
    telehone: string | null,
    code: String,
    newPassword: string,
    newConfirmed: string
}

export enum resetType{
    TELEHONE, MAIL
}