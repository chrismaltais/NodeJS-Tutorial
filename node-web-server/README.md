# Lessons Learned
**Request:** Stores information about request coming in, headers, body, etc.

**Response:** Respond how you want to respond to this request

`app.listen(port)` binds the app to a port on our machine

Tip: `option + cmd + i` opens Developer Tools for Chrome

**Middleware:** Let’s you define how your application works, can be thought of as a third party add on

express.static → Takes absolute path of file you want to serve

`app.use(express.static());`

**__dirname**: The directory name of the current module. This is the same as the `[path.dirname()]` of the `[__filename]`

**View Engines:** Templates to inject information into (similar to PHP!)

Multiple types of View Engines:

- Express (`.ejs`)
- Handlbars (`.hbs`)

`res.send()` for static pages,

`res.render()` for dynamic pages.

**Partials:**

- Partial piece of a website
    `hbs.registerPartials(__dirname + '/views/partials')`

Syntax:

    {{> partialName}}

**Helpers:**

- Essentially a function that can be called in your partials (Helps DRY philosophy)

Initialize:

```javascript
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
 });
```

Use:

```
<footer>
    <p>Copyright {{getCurrentYear}}</p>
</footer>
```

**Middleware:**

- If next is not specified, page will be unable to load.
- Executed in the order you use `app.use`!

**Using middleware to create a log:**

const express = require('express');
const fs = require('fs');
let app = express();
    
```javascript
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
```

`next()` is to tell express when middleware is done.

**Tip:** `Date().toString()` prints the current date (great for logging!)

## Deploying to Heroku:**
Environment Variables: 

```javascript
const port = process.env.PORT || 3000;
```

### How Heroku knows what to run when booted up:

- In `package.json`, in “scripts” add:
    `"start": "node script.js"`
- Can now start app with:
    `npm start`
    
**Tip:** Get current year in JS → `new Date().getFullYear()`

