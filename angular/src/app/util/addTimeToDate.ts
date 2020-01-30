export function addTimeToDate(strTime:string, date:Date) : Date {
        const arrTime = strTime.split(":");
        let newDate = date;
        newDate.setHours(parseInt(arrTime[0]));
        newDate.setMinutes(parseInt(arrTime[1]));
        newDate.setSeconds(0);
        return newDate;
}