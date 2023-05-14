export interface Certificate{
    id: string,
    serialNumber: string,
    signatureAlgorithm: string,
    issuer: string | null,
    validFrom :Date,
    validTo : Date,
    Status: string,
    certificateType: certType,
    username: string,
    isRevoked: boolean,
    status: string
}

export enum certType{
    ROOT, INTERMEDIATE, END
}