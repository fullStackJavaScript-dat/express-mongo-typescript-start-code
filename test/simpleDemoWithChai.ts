import { expect } from "chai";

//VERY UNCOMMON TO INCLUDE WHAT IS TO BE TESTED IN THE TESTs, BUT THIS IS JUST MEANT AS A QUICK DEMO
function delayMsg(msg: string, delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!(msg && delay) || msg === "") {
        reject("Wrong arguments")
      } else
        resolve(msg.toUpperCase());
    }, delay);
  });
};

describe('Array', function () {
  describe('Verify the #indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      expect([1, 2, 3].indexOf(0)).to.be.equal(-1);
      expect([1, 2, 3].indexOf(5)).to.be.equal(-1);
      expect([1, 2, 3].indexOf(3)).to.be.equal(2);
    })
  })
});

describe("Testing async behaviour", function () {
  var foo = false;
  before(function (done) {
    setTimeout(function () {
      foo = true;
      done();  //Test will fail without this --> TRY
    }, 1000);
  });
  it("should pass (with done called)", function () {
    expect(foo).to.equal(true);
  });
});

describe("DelayMsg behaviour, tested with async/await", function () {
  it("Should eventually provide HELLO", async function () {
    const msg = await delayMsg("hello", 100);
    expect(msg).to.be.equal("HELLO");
  })
  it("Should eventulally reject", async function () {
    try {
      const msg = await delayMsg("", 100);
    } catch (err) { //Observe --> normal try-catch, when you use async-await
      expect(err).to.be.equal("Wrong arguments");
    }
  })
})

describe("DelayMsg behaviour, tested WITHOUT async/await", function () {
  it("Should eventually provide HELLO", function (done) {
    delayMsg("hello", 100)
      .then(function (msg) { expect(msg).to.be.equal("HELLO"); })
      //.finally(done) //Use this with node Ver10 and above otherwise do
      .then(done, done)
  })
  it("Should eventually provide HELLO", function (done) {
    delayMsg("", 100)
      .catch(function (err) {
        expect(err).to.be.equal("Wrong arguments");
      })//.finally(done) //Use this with node Ver10 and above otherwise do
      .then(done, done)
  })
})              