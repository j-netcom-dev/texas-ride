import moment from "moment";

export const format_time =(timestamp:string) =>{

// Define the two datetime values
    const datetime1 = moment();
    const datetime2 = moment(timestamp);

    const duration = moment.duration(datetime2.diff(datetime1));

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.minutes());

    let formattedDifference;
    if (hours > 0) {
        formattedDifference = `${hours} hours ${minutes} minutes`;
    } else if (minutes > 0) {
        formattedDifference = `${minutes} minutes`;
    } else {
        formattedDifference = `just now`;
    }



    return `in ${formattedDifference}`
}