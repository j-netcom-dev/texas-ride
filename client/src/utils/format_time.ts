import { format } from 'timeago.js'

export const format_time = (timestamp: string) =>{
    return format(new Date(timestamp));
}