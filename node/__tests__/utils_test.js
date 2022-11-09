const { createAnalyser , setVXfirstNameCookie , fetchVXfirstNameCookie} = require('../utils');

const { AudioContext } = require('standardized-audio-context-mock');
const { window } = require('jest-environment-jsdom')

global.AudioContext = AudioContext;
global.window = window;

describe('browser utils ', () => {


    const vm = {
            $cookies : {
                _cookies : {} ,
                remove: function(name) { 
                    delete this._cookies[name] },
                set: function(name , value) {this._cookies[name] =value},
                get: function(name) {return this._cookies[name]}
            }
        }
    test('test createAnalyser', () => {
        const analyser =  createAnalyser({} , 30);
        expect(analyser).not.toBe(null);
        expect(analyser.minDecibels).toBe(-90)
         
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
      });
      
    

    test('test setVXfirstNameCookie', () => {
        

        const mockCallbackRemoved =  jest.spyOn(vm.$cookies , 'remove')
        
        const mockCallbackSet =  jest.spyOn(vm.$cookies , 'set')

        setVXfirstNameCookie(vm , "myName")


        expect(mockCallbackRemoved).toHaveBeenCalled();
        expect(mockCallbackSet).toHaveBeenCalled();
        expect(vm.$cookies._cookies["firstNameCookie"]).toBe("myName");
    });



    test('should fetchVXfirstNameCookie work', () => {
        const mockCallbackGet =  jest.spyOn(vm.$cookies , 'get')
        vm.$cookies._cookies['firstNameCookie'] ="Hello"
        fetchVXfirstNameCookie(vm , "firstNameCookie")


        expect(mockCallbackGet).toHaveBeenCalled();
      
        expect(global.window.location.href).toBe("http://localhost/");
    });
});