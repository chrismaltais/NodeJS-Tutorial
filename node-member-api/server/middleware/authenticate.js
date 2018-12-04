const {Member} = require('./../models/members');
const wrap = require('./asyncWrapper');

let authenticate = wrap(async (req, res, next) => {
    // let token = req.header('x-auth');
    // Member.findByToken(token).then((member) => {
    //     if (!member) {
    //         return Promise.reject();
    //     }
    //     req.member = member;
    //     req.token = token;
    //     next();
    // }).catch((e) => {
    //     res.status(401).send();
    // })

    let token = req.header('x-auth');
    let specificMember = await Member.findByToken(token);
    if (!specificMember) {
        return res.status(401).send();
    }
    req.member = specificMember;
    req.token = token;
    next();
});

module.exports = authenticate;