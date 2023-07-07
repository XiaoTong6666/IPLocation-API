const http = require('http');
const cheerio = require('cheerio');
const url = require('url');
async function gyuan(ip) {
  const hyuan = await fetch(`https://www.ipshudi.com/${ip}.htm`, {
    headers: {
   accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  cookie: 'Hm_lvt_c375abc2df71accdca3ace57d488f925=1688759396; PHPSESSID=jt57s2f3r3ogtmr8l03qj91tau; Hm_lpvt_c375abc2df71accdca3ace57d488f925=1688759468'
},
  referrerPolicy: 'unsafe-url',
  body: null,
  method: 'GET',
  mode: 'cors'
  });
  const htm = await hyuan.text();
  const $ = cheerio.load(htm);
const yuan = {
  1: $('tr:nth-child(2) span').text().trim(),
  2: $('tr:nth-child(3) span').text().trim(),
  3: $('tr:nth-child(4) span').text().trim(),
};
  return yuan;
}
http.createServer((req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/')) {
    const u = url.parse(req.url, true);
    const ip = u.pathname.substr(1);
    gyuan(ip).then((yuan) => {
      const hyuan = {
        code: 0,
        data: yuan,
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(hyuan));
      res.end();
    });
  } 
}).listen(11451);
