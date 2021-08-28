import { expect } from 'chai';


describe('', function(){
    const a = 5;
    const b = 7;

    it('addition works correctly', function(){
      expect(a + b, 'result must equal 12').to.eq(12);
    });

    it('subtraction works correctly', function(){
        expect(a - b, 'result must equal -2').to.eq(-2);
    })
});