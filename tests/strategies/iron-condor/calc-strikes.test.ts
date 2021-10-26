import {calcStrikes} from "../../../src/strategies/iron-condor/calc-strikes";

describe("tests to calculate 10% strikes spread for iron condor", function () {

    it('should calculate spread strikes from 116 (AFG Sample)', function () {
        const price = 116
        const strikes = [103, 105, 108, 110, 113, 115, 118, 120, 123, 125, 130, 135]
        expect(calcStrikes(price, .1, strikes)).toMatchObject({
            ps: 105, pb: 103,
            cs: 130, cb: 135
        })
    });

    it('should calculate spread of 7% for iron condor', function () {
        const price = 100
        const strikes = [90, 93, 96, 98, 100, 102, 104, 107, 110]
        expect(calcStrikes(price, .07, strikes)).toMatchObject({
            ps: 93, pb: 90,
            cs: 107, cb: 110
        })
    });

    it('should calculate spread of strikes from 2047.33 (GOOG Sample) ', function () {
        const price = 2047.33
        const strikes = [
            "1830", "1840", "1850", "1860", "1870", "1880", "1890", "1900", "1905", "1910", "1915", "1920",
            "1925", "1930", "1935", "1940", "1945", "1950", "1955", "1960", "1965", "1970", "1975", "1980", "1985",
            "1990", "1995", "1997.5", "2000", "2002.5", "2005", "2007.5", "2010", "2012.5", "2015", "2017.5", "2020",
            "2022.5", "2025", "2027.5", "2030", "2032.5", "2035", "2037.5", "2040", "2042.5", "2045", "2047.5", "2050",
            "2052.5", "2055", "2057.5", "2060", "2062.5", "2065", "2067.5", "2070", "2072.5", "2075", "2077.5", "2080",
            "2082.5", "2085", "2087.5", "2090", "2092.5", "2095", "2097.5", "2100", "2102.5", "2105", "2107.5", "2110",
            "2112.5", "2115", "2117.5", "2120", "2125", "2130", "2135", "2140", "2145", "2150", "2155", "2160", "2165",
            "2170", "2175", "2180", "2185", "2190", "2195", "2200", "2205", "2210", "2215", "2220", "2225", "2230",
            "2240", "2250", "2260", "2270"
        ].map(s => parseInt(s))

        expect(calcStrikes(price, .1, strikes)).toMatchObject({
            ps: 1840, pb: 1830,
            cs: 2250, cb: 2260
        })

        expect(calcStrikes(price, .07, strikes)).toMatchObject({
            ps: 1905, pb: 1900,
            cs: 2190, cb: 2195
        })
    });

    it('should return undefined if strikes are not high enough for spread to be placed', function () {
        const strikes = [80, 85, 90, 95, 100, 105]

        expect(calcStrikes(105, .1, strikes)).not.toBeDefined()
        expect(calcStrikes(100, .1, strikes)).not.toBeDefined()
    });

    it('should return undefined if strikes are not low enough for spread to be placed', function () {
        const price = 221.10
        const strikes = [200, 205, 210, 215, 220, 225, 230, 235, 240]
        expect(calcStrikes(price, .1, strikes)).not.toBeDefined()
    });

    it('should return undefined if no strikes are passed in', function () {
        expect(() => calcStrikes(0, .19, [])).toThrowError()
    });
})