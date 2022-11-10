const { VolumeIndicator} = require('../VolumeIndicator')

const { AudioContext } = require('standardized-audio-context-mock');
const { window } = require('jest-environment-jsdom')

global.AudioContext = AudioContext;
global.window = window;

describe('Volume Indicator test cases', () => {
    
    let vi;
    beforeEach(() => {
        vi = new VolumeIndicator({})
    });


    test('should start', () => {
       expect(vi.interval).toBe(undefined)
       vi.start()
       expect(vi.interval).not.toBe(undefined)
    });

    
    test('should stop', () => {
        vi.start()
        expect(vi.interval).not.toBe(undefined)
        vi.stop();
        expect(vi.interval).toBeGreaterThan(0)
        
     });


     test('should setLowHighListener test', () => {
        const func = jest.fn(() => {})
        vi.setLowHighListener(func , 10);

        expect(vi.lowHighListener).toBe(func)
     });
});