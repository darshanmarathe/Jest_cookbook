const { ReturnThing } = require('../matchers')

describe('Matchers', () => {
    var stuff;
    it('Matchers  ', () => {
        expect(ReturnThing(2)).toBe(2);
        expect(ReturnThing(null)).toBeNull()
        expect(ReturnThing(stuff)).not.toBeDefined()
        expect(ReturnThing(3)).toBeTruthy();
        expect(0).toBeFalsy();


        const value = ReturnThing(2 + 2);
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4.5);


        // toBe and toEqual are equivalent for numbers
        expect(value).toBe(4);
        expect(value).toEqual(4);

        const v2 = ReturnThing(0.1 + 0.2);
        expect(v2).not.toBe(0.3);         //  This won't work because of rounding error
        expect(v2).toBeCloseTo(0.3); // This works.
    });


    test('there is no I in team', () => {
        expect('team').not.toMatch(/I/);
    });

    test('but there is a "stop" in Christoph', () => {
        expect('Christoph').toMatch(/stop/);
    });


    const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'milk',
    ];

    test('the shopping list has milk on it', () => {
        expect(shoppingList).toContain('milk');
        expect(new Set(shoppingList)).toContain('milk');
    });


   const compileAndroidCode = function () {
        throw new Error('you are using the wrong JDK!');
    }

    test('compiling android goes as expected', () => {
         expect(() => compileAndroidCode()).toThrow();
         expect(() => compileAndroidCode()).toThrow(Error);

        // You can also use a string that must be contained in the error message or a regexp
         expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
         expect(() => compileAndroidCode()).toThrow(/JDK/);

        // Or you can match an exact error mesage using a regexp like below
        expect(() => compileAndroidCode()).not.toThrow(/^you are using the wrong JDK$/); // Test fails
         expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
    });
});