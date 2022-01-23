//Code available from https://github.com/gpDA/cookieSession
const http = require('http');

// parseCookies parses `name=gplee;year=1993` and convert this to
// { name : 'gplee', year: '1993' }
const parseCookies = (cookie = '') => 
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    res.end('Hello Cookie');
})
    .listen(8082, () => {
        console.log('listening on port 8082')
    })