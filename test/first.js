/**
 * Created by vyt on 2015-07-27.
 */
//var should = require("chai").should();

 describe('1 plus 1', function () {
     it("should add 1 + 1", function () {
         var onePlusone = 1 + 1;
         onePlusone.should.equal(2);
     })
 });

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
        var mone = -1;
      mone.should.equal([1,2,3].indexOf(5));
      mone.should.equal([1,2,3].indexOf(0));
    });
  });
});