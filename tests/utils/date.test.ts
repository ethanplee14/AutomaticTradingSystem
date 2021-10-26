import {dashlessDate, monthName, nearestDate,} from "../../src/utils/date";


describe('tests for dashless date util method', function() {

    it('should parse January 1st 2021 date', function() {
        const date = dashlessDate("20210101")
        expect(date).toEqual(new Date(2021, 0, 1))
        expect(monthName(date)).toEqual("January")
    })

    it('should parse December 31st 2021 date', function() {
        const date = dashlessDate("20211231")
        expect(date).toEqual(new Date(2021, 11, 31))
        expect(monthName(date)).toEqual("December")
    })
})

describe('tests for nearestDate util method', function() {

    it('should return date closest', function() {
        const origin = new Date(2021, 3, 14)
        const dates = [new Date(2021, 4, 14), new Date(2021, 3, 12), new Date(2021, 3, 31)]
        expect(nearestDate(origin, dates)).toEqual(new Date(2021, 3, 12))
    })

    it('should return date closest larger list', function() {
        const origin = new Date(2020, 1, 1)
        const dates = [new Date(2020, 1, 11), new Date(2021, 1, 1), new Date(2020, 12, 15), new Date(2020, 1, 3)]
        expect(nearestDate(origin, dates)).toEqual(new Date(2020, 1, 3))
    })

    it('should return date sooner in the list if multiple dates of same difference', function() {
        const origin = new Date(2021, 6, 12)
        const dates = [new Date(2021, 6, 6), new Date(2021, 6, 18), new Date(2021, 7, 20)]
        expect(nearestDate(origin, dates)).toEqual(new Date(2021, 6, 6))

        const dates2 = [new Date(2021, 6, 18), new Date(2021, 6, 2), new Date(2021, 7, 20)]
        expect(nearestDate(origin, dates2)).toEqual(new Date(2021, 6, 18))
    })

    it('should throw error if no dates array is empty', function () {
        expect(() => nearestDate(new Date(), [])).toThrowError()
    });
})