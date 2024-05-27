export type UserData ={
    step: number,
    data:Record<string, string | number>
}

export type UserNameType ={
    first_name: string,
    last_name: string,
}

export type UserRoleType ={
    _id: string,
    role: string
}

export type UserDetailsType ={
    first_name?: string,
    last_name?: string,
    password?: string,
    email?: string,
    phone?: string,
    role?: string
}