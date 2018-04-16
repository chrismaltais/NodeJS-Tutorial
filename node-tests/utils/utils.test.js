const utils = require('./utils');
const chai = require('chai');
// const assert = require('assert');

let assert = chai.assert;
let expect = chai.expect;

describe('Utils:', () => {
    
    describe('#add', () => {
        it('Should add two numbers', () => {
            let res = utils.add(33, 11);
            expect(res).to.be.a('number', `Result was ${typeof res}`)                      .to.equal(44, `Expected 44. Value is ${res}`);
        });
        
        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 3, (sum) => {
                expect(sum).to.equal(7).to.be.a('number');
                done();
            }); 
        });
        
    });
 
    


    it('Should square one number', () => {
        let res = utils.square(12);
        expect(res).to.equal(144).to.be.a('number');
    });

    it('should asynchronously square one number', (done) => {
        utils.asyncSquare(9, (square) => {
            expect(square).to.equal(81).to.be.a('number');
            done();
        });
    }); 
});

it('Should verify first and last names are set', () => {
    let user = {
        location: 'Toronto, ON',
        age: 21,
    };
    
    let username = utils.setName(user, 'Chris Maltais');
    
    //expect(username).to.equal(user);
    expect(username).to.include({
        firstName: 'Chris',
        lastName: 'Maltais'
    });
});