KENTHONGBAO — STATIC UPDATE CENTER

1) TÊN VÀ LINK

Mở:
data/config.js

Các trường:

siteName
brand
discordUrl
supportUrl

Dùng để đổi tên website và các liên kết.

2) THÊM UPDATE

Mở:

data/updates.js

Thêm object mới vào đầu mảng:

window.UPDATE_POSTS

Khuyến nghị version:

v2.3.1
v2.3.2
v2.4.0
v3.0.0

Ngày dùng:

YYYY-MM-DD

3) LOẠI UPDATE

FEATURE
IMPROVEMENT
FIX
RELEASE
SECURITY
ANNOUNCEMENT

4) ƯU TIÊN

high
normal

Dùng:

high

cho update quan trọng.

5) TRẠNG THÁI

published

Hiển thị trên website.

draft

Không hiển thị.

archived

Không hiển thị.

6) THÔNG BÁO QUAN TRỌNG

Mở:

data/config.js

Tìm:

importantNotice

Đổi:

enabled: false

thành:

enabled: true

Sau đó sửa:

type
title
message
detail
updateId

7) CHẾ ĐỘ BẢO TRÌ

Mở:

data/config.js

Tìm:

maintenance

Đổi:

enabled: false

thành:

enabled: true

Sau đó chỉnh:

title
message
detail

8) GIAO DIỆN

Mở:

assets/style.css

Các biến màu nằm ở đầu file.

9) JAVASCRIPT

File chính:

assets/app.js

File này xử lý:

- tìm kiếm
- lọc
- sắp xếp
- timeline
- modal
- share
- copy link
- FAQ
- animation
- maintenance
- important notice

10) DEPLOY

Website là static site.

Không cần:

Node.js
Python
Database
Backend

Có thể deploy trực tiếp lên Cloudflare Pages.

11) CẤU TRÚC

index.html
404.html
robots.txt
sitemap.xml
README.txt

assets/app.js
assets/style.css
assets/favicon.svg

data/config.js
data/updates.js

12) QUY TẮC UPDATE

Mỗi lần nâng cấp website:

1. Sửa chức năng.
2. Cập nhật giao diện nếu cần.
3. Thêm changelog mới vào data/updates.js.
4. Tăng version.
5. Commit lên GitHub.
6. Cloudflare Pages tự deploy bản mới.
