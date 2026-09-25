window.UPDATE_POSTS = [

  {
    id: 'update-2026-09-25-230',

    title:
      'KenThongBao 2.3.0 — Hệ thống thông báo nâng cao',

    version: 'v2.3.0',

    date: '2026-09-25',

    type: 'FEATURE',

    status: 'published',

    priority: 'high',

    tags: [
      'KenThongBao',
      'Timeline',
      'Notice',
      'Maintenance',
      'Animation'
    ],

    summary:
      'Nâng cấp Update Center với timeline, thông báo quan trọng, chế độ bảo trì và hiệu ứng giao diện mới.',

    changes: [

      'Bổ sung Timeline hiển thị lịch sử các phiên bản.',

      'Bổ sung Important Notice cho thông báo quan trọng.',

      'Bổ sung Maintenance Mode có thể bật bằng config.js.',

      'Bổ sung badge MỚI và nhãn IMPORTANT.',

      'Bổ sung icon theo loại cập nhật.',

      'Thêm animation khi card xuất hiện và khi cuộn trang.',

      'Cải thiện animation hover cho card, nút và menu.',

      'Cải thiện menu trên điện thoại.',

      'Mở rộng FAQ và hướng dẫn cấu hình.'
    ],

    content: `

### Có gì mới?

KenThongBao được nâng cấp thành một Update Center đầy đủ hơn, tập trung vào việc theo dõi lịch sử thay đổi và hiển thị các thông báo quan trọng.

### Timeline

- Hiển thị các phiên bản theo thứ tự thời gian.
- Có thể mở trực tiếp bài update từ timeline.
- Hiển thị version, loại cập nhật và trạng thái quan trọng.

### Important Notice

Có thể bật một banner thông báo quan trọng từ data/config.js mà không cần sửa HTML.

### Maintenance Mode

Có thể bật chế độ bảo trì từ data/config.js khi cần tạm thời thông báo website đang được cập nhật.

### Animation

- Card xuất hiện mượt khi tải nội dung.
- Timeline xuất hiện theo từng bước.
- Hover nhẹ trên button, card và menu.
- Hiệu ứng background và terminal được làm sống động hơn.

### Ghi chú

Bản cập nhật vẫn giữ mô hình static site nên không cần backend, database hoặc Node.js để chạy trên Cloudflare Pages.

`.trim()
  },

  {
    id:
      'update-2026-09-25-220',

    title:
      'KenThongBao cập nhật hệ thống thông báo',

    version:
      'v2.2.0',

    date:
      '2026-09-25',

    type:
      'FEATURE',

    status:
      'published',

    priority:
      'high',

    tags: [
      'KenThongBao',
      'Update Center',
      'Search',
      'SEO',
      'UI'
    ],

    summary:
      'Nâng cấp hệ thống thông báo với tìm kiếm, bộ lọc, sắp xếp, liên kết riêng và nhiều cải tiến cho trải nghiệm sử dụng.',

    changes: [
      'Bổ sung tìm kiếm thông báo.',
      'Bổ sung lọc theo loại cập nhật.',
      'Bổ sung lọc theo chủ đề và tag.',
      'Bổ sung sắp xếp mới nhất, cũ nhất và quan trọng.',
      'Bổ sung liên kết riêng cho từng thông báo.',
      'Bổ sung sao chép liên kết và chia sẻ.',
      'Bổ sung nút quay lại đầu trang.',
      'Bổ sung robots.txt, sitemap.xml và trang 404.',
      'Cải thiện SEO và Open Graph.',
      'Tối ưu cấu trúc dữ liệu cho changelog.'
    ],

    content: `

### Có gì mới?

KenThongBao được nâng cấp hệ thống Update Center để việc tìm, lọc và chia sẻ thông báo dễ dàng hơn.

### Tìm kiếm và lọc

- Tìm kiếm theo tiêu đề, nội dung, version và tag.
- Lọc theo loại cập nhật.
- Lọc theo chủ đề.

### Sắp xếp

- Mới nhất.
- Cũ nhất.
- Quan trọng.

### Chia sẻ

Mỗi bài update có ID riêng, cho phép tạo liên kết trực tiếp tới bài đó và sao chép hoặc chia sẻ nhanh trên thiết bị hỗ trợ.

### SEO

Bổ sung metadata cơ bản, canonical URL, robots.txt, sitemap.xml và trang 404.

`.trim()
  },

  {
    id:
      'update-2026-09-18-204',

    title:
      'Cải thiện hệ thống hướng dẫn Discord Bot',

    version:
      'v2.0.4',

    date:
      '2026-09-18',

    type:
      'IMPROVEMENT',

    status:
      'published',

    priority:
      'normal',

    tags: [
      'Discord',
      'Node.js',
      'Bot'
    ],

    summary:
      'Bổ sung hướng dẫn npm, dotenv, slash commands và các bước kiểm tra trước khi deploy.',

    changes: [
      'Bổ sung hướng dẫn xử lý package bị thiếu.',
      'Thêm checklist slash commands.',
      'Bổ sung kiểm tra biến môi trường.',
      'Cải thiện hướng dẫn deploy.',
      'Cải thiện cấu trúc tài liệu.'
    ],

    content: `

### Thay đổi

- Hướng dẫn xử lý lỗi npm và package.
- Checklist trước khi deploy Discord Bot.
- Hướng dẫn kiểm tra file .env.
- Cải thiện phần slash commands.

### Mục tiêu

Giúp người dùng dễ xác định lỗi trước khi liên hệ hỗ trợ.

`.trim()
  },

  {
    id:
      'update-2026-09-11-203',

    title:
      'Bản vá hệ thống trạng thái dịch vụ',

    version:
      'v2.0.3',

    date:
      '2026-09-11',

    type:
      'FIX',

    status:
      'published',

    priority:
      'normal',

    tags: [
      'Discord',
      'Status',
      'Fix'
    ],

    summary:
      'Sửa các trường hợp trạng thái dịch vụ hiển thị dữ liệu cũ hoặc không đồng bộ.',

    changes: [
      'Cải thiện đồng bộ trạng thái.',
      'Giảm dữ liệu cache cũ.',
      'Tối ưu tải dữ liệu.',
      'Cải thiện xử lý khi dữ liệu không khả dụng.'
    ],

    content: `

### Đã sửa

- Sửa lỗi trạng thái dịch vụ không cập nhật đúng.
- Cải thiện xử lý cache.
- Tối ưu quá trình tải thông tin trạng thái.

`.trim()
  },

  {
    id:
      'release-2026-09-01-200',

    title:
      'KenThongBao chính thức ra mắt',

    version:
      'v2.0.0',

    date:
      '2026-09-01',

    type:
      'RELEASE',

    status:
      'published',

    priority:
      'high',

    tags: [
      'Release',
      'Website',
      'Thông báo'
    ],

    summary:
      'Ra mắt website tập trung cho thông báo, cập nhật phiên bản và thông tin hỗ trợ.',

    changes: [
      'Ra mắt KenThongBao.',
      'Ra mắt khu vực Update Center.',
      'Bổ sung FAQ.',
      'Bổ sung khu vực hỗ trợ.',
      'Hỗ trợ responsive.',
      'Hỗ trợ static hosting.'
    ],

    content: `

### Ra mắt

KenThongBao chính thức hoạt động với mục tiêu tập trung các thông báo, cập nhật phiên bản và thông tin hỗ trợ.

### Thành phần

- Update Center.
- Support Center.
- FAQ.
- Giao diện responsive.

### Triển khai

Website được xây dựng theo hướng static site và phù hợp triển khai trên Cloudflare Pages.

`.trim()
  }

];
