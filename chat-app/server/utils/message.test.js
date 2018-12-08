let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message', () => {
        let message = generateMessage('Chris Maltais', 'This is a test.');
        expect(message.from).toBe("Chris Maltais");
        expect(message.text).toBe('This is a test.');
        expect(typeof message.createdAt).toBe('number');
    })
})