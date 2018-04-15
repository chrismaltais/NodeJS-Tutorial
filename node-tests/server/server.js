const express = require('express');

let app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Test Server');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});