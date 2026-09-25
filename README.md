KENTHONGBAO - WEBSITE THÔNG BÁO

1) TÊN / LINK / DISCORD
- Mở: data/config.js
- siteName: tên website.
- brand: tên hiển thị ở header/footer.
- siteUrl: URL hiện tại của website.
- discordUrl: link server Discord.
- supportUrl: link kênh/server hỗ trợ.

2) THÊM BÀI THÔNG BÁO
- Mở: data/updates.js
- Thêm một object mới vào mảng window.UPDATE_POSTS.
- Các trường nên dùng: id, title, version, date, type, status, priority, tags, summary, changes, content.
- date dùng định dạng YYYY-MM-DD.
- status: published để hiển thị; archived để ẩn khỏi danh sách.
- priority: high để đưa bài vào khu vực Cập nhật quan trọng.

3) GIAO DIỆN
- assets/style.css: màu sắc, khoảng cách, card, responsive.
- assets/favicon.svg: biểu tượng favicon của KenThongBao.

4) DEPLOY
- Đây là website tĩnh, không cần Node.js, Python hay database để chạy phần giao diện.
- Khi sửa file và push lên GitHub, Cloudflare Pages sẽ cập nhật theo cấu hình deploy của project.
- URL hiện tại: https://kenhotro.pages.dev/

5) CẤU TRÚC
index.html
assets/style.css
assets/app.js
assets/favicon.svg
data/config.js
data/updates.js
README.txt
