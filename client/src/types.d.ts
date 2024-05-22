import { LucideIcon } from "lucide-react"

export type LinkPropsType ={
    href: string,
    text: string,
    icon: LucideIcon,
}

export type TopBarPropTypes ={
    page: string,
}

export type CardPropsType ={
    name: string,
    value: number | string,
    icon: LucideIcon,
}