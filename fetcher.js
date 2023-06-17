const net = require('net');
const fs = require('fs');

const { argv } = require('process');

const args = argv.slice(2);
const URL = args[0];
const localPath = args[1];

const conn = net.createConnection({
  host: URL,
  port: 80,
});

conn.on('connect', () => {
  console.log('Connected to site');    
  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: ${URL}\r\n`);
  conn.write(`\r\n`);
});
conn.on('data', (data) => {
  // console.log(data);
  const body = data.substring(data.indexOf('<'));
  fs.appendFile(localPath, body, err => {
    if (err) {
      console.log(err);
    }
  });
  console.log(body);
  console.log(`Downloaded and saved ${body.length} bytes to ${localPath}.`)
  conn.end();
});

conn.setEncoding('UTF8');

