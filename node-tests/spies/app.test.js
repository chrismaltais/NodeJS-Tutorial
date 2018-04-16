const chai = require('chai');
const expect = require('chai').expect;
const spies = require('chai-spies');
const rewire = require('rewire');

let app = rewire('./app');
app.__set__
app.__get__
chai.use(spies);

describe('App', () => {
//    let db = {
//        saveUser: chai.spy()
//    };
//    app.__set__('db', db); // Why?
    
    const db = app.__get__('db');
    db.saveUser = chai.spy();
    
    it('should call the spy correctly', () => {
        let spy  = chai.spy();
        spy('Chris', 21);
        expect(spy).to.have.been.called.with('Chris', 21);
    });
    
    it('should call saveUser with user object', () => {
        let email = 'test@email.com';
        let password = 'password';
        
        app.handleSignup(email, password);
        expect(db.saveUser).to.have.been.called.with({email, password});
    });
});