/**
 * Converts dashless date string to date object
 * @param dateStr formatted yyyymmdd
 */
import {nearestNumber} from "./math";

export function dashlessDate(dateStr: string) {
    const year = parseInt(dateStr.substr(0, 4))
    const month = parseInt(dateStr.substr(4, 2))
    const day = parseInt(dateStr.substr(6))
    return new Date(year, month-1, day)
}

/**
 * Returns nearest date to origin
 * @param origin date to compare to
 * @param dates list of dates to search through
 * @return date closest to origin.
 * @throws Error if dates empty
 */
export function nearestDate(origin: Date, dates: Date[]) {
    if (dates.length === 0)
        throw new Error("Passed in dates is empty")
    return new Date(nearestNumber(origin.getTime(), dates.map(d => d.getTime())))
}

export function changeTimezone(date: Date, timezone: string) {
    return new Date(date.toLocaleString('en-US', {timeZone: timezone}))
}

/**
 * returns month name of passed in date.
 * @param date
 */
export function monthName(date: Date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

export function shortMonthName(date: Date) {
    return monthName(date).substr(0, 3)
}

export function twoDigitYear(date: Date) {
    return date.getFullYear().toString().substr(-2)
}
