DISCORD SUPPORT CENTER - CLOUDFLARE PAGES

1) MỞ / ĐỔI LINK DISCORD
- Mở: data/config.js
- Đổi discordUrl và supportUrl thành link server/kênh hỗ trợ của bạn.

2) THÊM BÀI UPDATE
- Mở: data/updates.js
- Thêm một object vào mảng window.UPDATE_POSTS.
- Các trường: title, version, date (YYYY-MM-DD), type, tags, summary, content.

Ví dụ:
{
  title: 'Tên update mới',
  version: 'v2.2.0',
  date: '2026-10-01',
  type: 'FEATURE',
  tags: ['Discord', 'Bot'],
  summary: 'Mô tả ngắn.',
  content: `### Nội dung\n- Dòng 1\n- Dòng 2`
}

3) ĐỔI MÀU
- Mở: assets/style.css
- Sửa biến --brand và các biến ở đầu file.

4) DEPLOY CLOUDFLARE PAGES
- Giải nén ZIP.
- Upload toàn bộ nội dung thư mục này lên Cloudflare Pages theo cách deploy static site mà bạn dùng.
- Không cần Node.js, Python hay database.

5) CẤU TRÚC
index.html
assets/style.css
assets/app.js
assets/favicon.svg
data/config.js
data/updates.js
README.txt
