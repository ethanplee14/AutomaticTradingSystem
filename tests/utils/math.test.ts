import {nearestNumber} from "../../src/utils/math";

describe("tests for closestNumber util function", function() {
    it("should return closest number", function () {
        const numbers = [1, 5, 10, 15]
        expect(nearestNumber(6, numbers)).toBe(5)
        expect(nearestNumber(11, numbers)).toBe(10)
        expect(nearestNumber(-1, numbers)).toBe(1)
    })

    it('should return closest number decimals', function() {
        const decimals = [1.1, 4.56, 22.3, 12.3, 94033192.29]
        expect(nearestNumber(2, decimals)).toBe(1.1)
        expect(nearestNumber(22.2, decimals)).toBe(22.3)
        expect(nearestNumber(4, decimals)).toBe(4.56)
    })

    it('should return number sooner in the list if multiple numbers of same difference', function() {
        expect(nearestNumber(4, [1, 3, 5, 7, 9])).toBe(3)
        expect(nearestNumber(2.5, [1, 2, 3, 4, 5, 6])).toBe(2)
    })

    it('should throw error if numbers is empty', function () {
        expect(() => nearestNumber(5, [])).toThrowError()
    });
})