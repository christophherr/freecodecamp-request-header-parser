/* eslint import/unambiguous: 0 */
const express = require('express'),
    useragent = require('useragent'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    let visitor = useragent.parse(req.headers['user-agent']),
        visitorIP = req.headers['x-forwarded-for'];

    if (visitorIP) {
        let IPlist = visitorIP.split(',');
        visitorIP = IPlist[IPlist.length - 1];
    } else {
        visitorIP = req.connection.remoteAddress;
    }

    res.json({
        'IP-Address': visitorIP,
        Language: req.headers['accept-language'].split(',')[0],
        'Operating System': visitor.os.family
    });
});

app.listen(app.get('port'), () => {
    console.log('Node.js Server is listening on port ' + app.get('port'));
});
