const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const HTML_FILE = path.join(__dirname, 'flappy-bird.html');

// Tìm địa chỉ IP cục bộ
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  fs.readFile(HTML_FILE, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Không tìm thấy file flappy-bird.html');
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
});

const ip = getLocalIP();
server.listen(PORT, '0.0.0.0', () => {
  console.log('========================================================');
  console.log('  FLAPPY BIRD SERVER ĐANG CHẠY!');
  console.log('========================================================');
  console.log(`* Trên máy tính:   http://localhost:${PORT}`);
  console.log(`* Trên ĐIỆN THOẠI: http://${ip}:${PORT}`);
  console.log('========================================================');
  console.log('(Lưu ý: Điện thoại và máy tính cần kết nối chung mạng Wi-Fi)');
  console.log('Nhấn Ctrl + C để dừng server.');
});
