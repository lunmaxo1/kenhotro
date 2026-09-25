window.UPDATE_POSTS = [
{
  id: 'update-2026-09-25-221',
  title: 'KenThongBao sửa lỗi giao diện và tối ưu Update Center',
  version: 'v2.2.1',
  date: '2026-09-25',
  type: 'FIX',
  status: 'published',
  priority: 'high',

  tags: [
    'KenThongBao',
    'UI',
    'Responsive',
    'Update Center',
    'Fix',
    'Mobile'
  ],

  summary:
    'Sửa lỗi giao diện do thiếu CSS, hoàn thiện responsive và ổn định hệ thống hiển thị cập nhật trên máy tính và điện thoại.',

  changes: [
    'Khôi phục và hoàn thiện stylesheet chính của website.',
    'Sửa lỗi giao diện do file assets/style.css bị thiếu nhiều phần.',
    'Bổ sung đầy đủ layout cho header và navigation.',
    'Bổ sung layout cho Hero và Terminal Card.',
    'Bổ sung hiển thị Stats Card.',
    'Bổ sung giao diện Update Center.',
    'Bổ sung giao diện Featured Update.',
    'Bổ sung style cho Update Card.',
    'Bổ sung giao diện Support Card.',
    'Bổ sung giao diện FAQ.',
    'Bổ sung giao diện modal xem chi tiết cập nhật.',
    'Bổ sung trạng thái hidden cho các thành phần cần ẩn/hiện.',
    'Cải thiện giao diện menu trên điện thoại.',
    'Tối ưu responsive cho tablet và mobile.',
    'Cải thiện hover, focus và trạng thái tương tác.',
    'Sửa fallback FAQ trong app.js từ object thành array.',
    'Giữ nguyên dữ liệu và cấu trúc các bản cập nhật hiện có.',
    'Tối ưu hiển thị Update Center trên nhiều kích thước màn hình.'
  ],

  content: `
### Có gì mới?

KenThongBao đã được sửa và tối ưu lại giao diện sau khi phát hiện stylesheet chính bị thiếu nhiều thành phần quan trọng.

### Sửa lỗi giao diện

Đã khôi phục các phần CSS cần thiết cho:

- Header và navigation.
- Hero section.
- Terminal card.
- Stats.
- Update Center.
- Featured Update.
- Update Card.
- Trung tâm hỗ trợ.
- FAQ.
- Contact.
- Footer.
- Modal chi tiết cập nhật.

### Responsive

Giao diện hiện được tối ưu lại cho:

- Máy tính.
- Laptop.
- Tablet.
- Điện thoại.

Đặc biệt bổ sung lại menu mobile và cách hiển thị các card khi màn hình nhỏ.

### Update Center

Hệ thống cập nhật hiện được hiển thị đầy đủ hơn với:

- Search.
- Filter.
- Sort.
- Featured Update.
- Update Cards.
- Modal đọc chi tiết.
- Tag.
- Priority.
- Date.
- Version.

### Sửa JavaScript

Đã sửa lỗi fallback FAQ trong \`assets/app.js\`.

Trước đây:

\`\`\`js
const faqs = Array.isArray(cfg.faq) ? cfg.faq : {};
\`\`\`

Đã sửa thành:

\`\`\`js
const faqs = Array.isArray(cfg.faq) ? cfg.faq : [];
\`\`\`

Điều này đảm bảo \`forEach()\` luôn được gọi trên array hợp lệ.

### Tương thích

Không thay đổi cấu trúc dữ liệu của \`data/updates.js\`.

Các bản update cũ vẫn được giữ nguyên và bản cập nhật mới này chỉ bổ sung thêm thông tin về việc sửa lỗi giao diện.

### Ghi chú

Đây là bản cập nhật tập trung vào việc sửa lỗi giao diện, responsive và ổn định hệ thống Update Center của KenThongBao.
  `.trim()
},
  {
  id: 'update-2026-09-25-220',
  title: 'KenThongBao cập nhật hệ thống thông báo',
  version: 'v2.2.0',
  date: '2026-09-25',
  type: 'FEATURE',
  status: 'published',
  priority: 'high',

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
    'Bổ sung nút sao chép liên kết thông báo.',
    'Bổ sung chức năng chia sẻ thông báo trên thiết bị hỗ trợ.',
    'Bổ sung nút quay lại đầu trang.',
    'Cải thiện giao diện trên điện thoại.',
    'Bổ sung trang 404.',
    'Bổ sung robots.txt và sitemap.xml.',
    'Cải thiện SEO và thông tin Open Graph.',
    'Tối ưu cấu trúc dữ liệu cho các bản cập nhật.'
  ],

  content: `
### Có gì mới?

KenThongBao đã được nâng cấp hệ thống Update Center để việc theo dõi các bản cập nhật dễ dàng hơn.

### Tìm kiếm và lọc

- Tìm kiếm theo tiêu đề.
- Tìm kiếm theo nội dung.
- Tìm kiếm theo phiên bản.
- Tìm kiếm theo tag.
- Lọc theo loại cập nhật.
- Lọc theo chủ đề.

### Sắp xếp

Có thể sắp xếp thông báo theo:

- Mới nhất.
- Cũ nhất.
- Quan trọng.

### Liên kết thông báo

Mỗi thông báo hiện có ID riêng để tạo liên kết trực tiếp.

Có thể sao chép liên kết hoặc chia sẻ trực tiếp từ cửa sổ thông báo.

### SEO và website

- Bổ sung thông tin SEO cơ bản.
- Bổ sung Open Graph.
- Bổ sung canonical URL.
- Bổ sung robots.txt.
- Bổ sung sitemap.xml.
- Bổ sung trang 404.

### Giao diện

Tiếp tục tối ưu giao diện cho cả máy tính và điện thoại.

### Ghi chú

Đây là bản cập nhật tập trung vào hệ thống thông báo, tìm kiếm và trải nghiệm sử dụng của KenThongBao.
  `.trim()
},
  {
    id: 'update-2026-09-25-210',
    title: 'KenThongBao 2.1.0 chính thức cập nhật',
    version: 'v2.1.0',
    date: '2026-09-25',
    type: 'FEATURE',
    status: 'published',
    priority: 'high',
    tags: ['Website', 'Thông báo', 'Troubleshooter'],
    summary: 'Nâng cấp trung tâm thông báo, giao diện và hệ thống hiển thị cập nhật.',
    changes: [
      'Làm mới giao diện trung tâm thông báo.',
      'Bổ sung khu vực nổi bật cho cập nhật quan trọng.',
      'Cải thiện tìm kiếm và bộ lọc bài viết.',
      'Tối ưu hiển thị trên điện thoại.',
      'Cải thiện cấu trúc dữ liệu để dễ thêm update mới.'
    ],
    content: `
### Có gì mới?

- Trung tâm thông báo được tổ chức lại theo hướng rõ ràng và dễ đọc hơn.
- Cập nhật quan trọng được đưa lên khu vực nổi bật.
- Có thể tìm kiếm theo tiêu đề, phiên bản, nội dung hoặc tag.
- Giao diện được tối ưu cho cả điện thoại và máy tính.

### Dữ liệu

Các bài viết được quản lý trong file \`data/updates.js\`. Chỉ cần thêm một object mới là có thể đăng thông báo tiếp theo.

### Lưu ý

Bản cập nhật này tập trung vào phần hiển thị và quản lý nội dung của website.
    `.trim()
  },
  {
    id: 'update-2026-09-18-204',
    title: 'Cải thiện hệ thống hướng dẫn Discord Bot',
    version: 'v2.0.4',
    date: '2026-09-18',
    type: 'IMPROVEMENT',
    status: 'published',
    priority: 'normal',
    tags: ['Discord', 'Node.js', 'Bot'],
    summary: 'Bổ sung hướng dẫn npm, dotenv, slash commands và các bước kiểm tra trước khi deploy.',
    changes: [
      'Bổ sung hướng dẫn xử lý package bị thiếu.',
      'Thêm checklist slash commands.',
      'Bổ sung kiểm tra biến môi trường.',
      'Cải thiện hướng dẫn deploy.',
      'Sắp xếp lại tài liệu theo từng nhóm lỗi.'
    ],
    content: `
### Thay đổi

- Hướng dẫn xử lý lỗi npm và package.
- Checklist trước khi deploy Discord Bot.
- Hướng dẫn kiểm tra file \`.env\` và biến môi trường.
- Cải thiện phần slash commands.

### Mục tiêu

Giúp người dùng xác định lỗi nhanh hơn trước khi liên hệ hỗ trợ.
    `.trim()
  },
  {
    id: 'update-2026-09-11-203',
    title: 'Bản vá hệ thống trạng thái dịch vụ',
    version: 'v2.0.3',
    date: '2026-09-11',
    type: 'FIX',
    status: 'published',
    priority: 'normal',
    tags: ['Discord', 'Status', 'Fix'],
    summary: 'Sửa các trường hợp trạng thái dịch vụ hiển thị dữ liệu cũ hoặc không đồng bộ.',
    changes: [
      'Cải thiện đồng bộ trạng thái.',
      'Giảm trường hợp dữ liệu cache cũ.',
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
    id: 'release-2026-09-01-200',
    title: 'KenThongBao chính thức ra mắt',
    version: 'v2.0.0',
    date: '2026-09-01',
    type: 'RELEASE',
    status: 'published',
    priority: 'high',
    tags: ['Release', 'Website', 'Thông báo'],
    summary: 'Ra mắt website tập trung cho thông báo, cập nhật phiên bản và thông tin hỗ trợ.',
    changes: [
      'Ra mắt trung tâm thông báo.',
      'Bổ sung khu vực cập nhật phiên bản.',
      'Bổ sung FAQ.',
      'Hỗ trợ tìm kiếm và lọc bài viết.',
      'Hỗ trợ giao diện responsive.',
      'Tổ chức dữ liệu theo file để dễ cập nhật.'
    ],
    content: `
### Ra mắt

KenThongBao chính thức hoạt động với mục tiêu tập trung thông báo, phiên bản mới, thay đổi quan trọng và thông tin hỗ trợ.

### Thành phần

- Notification Center
- Update Center
- FAQ
- Bộ lọc và tìm kiếm
- Responsive UI
    `.trim()
  }
];
