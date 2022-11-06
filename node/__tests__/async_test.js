const { GetFullName , GetFullNameWithCallback} = require('../async')


describe('Callback code', () => {
  test(' should work', (done) => {
    function callback(error, data) {
        if (error) {
          done(error);
        }
        try {
            expect(data).toBe('Darshan Marathe');
            done();
          } catch (error) {
            done(error);
          }
      }
    
      GetFullNameWithCallback("Darshan" , "Marathe" , callback);
  });
});



describe('Promise code', () => {
 test(' should work', () => {
    expect.assertions(1);
    return GetFullName("Darshan" , "Marathe")
    .then(e => expect(e).toBe('Darshan Marathe'));
 });
});

describe('Async code', () => {
    
    test('test async code', async () => {
        let name = await GetFullName("Darshan" , "Marathe");
        expect(name).toBe("Darshan Marathe")
       
    });
});