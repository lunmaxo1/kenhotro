window.UPDATE_POSTS = [
  {
    id: 'update-2026-09-25-210',
    title: 'kenz Support 2.1.0 chính thức cập nhật',
    version: 'v2.1.0',
    date: '2026-09-25',
    type: 'FEATURE',
    status: 'published',
    priority: 'high',
    tags: ['Support', 'Discord', 'Troubleshooter'],
    summary: 'Ra mắt Update Center mới, cải thiện Support Center và Smart Troubleshooter.',
    changes: [
      'Làm mới giao diện Support Center.',
      'Bổ sung Update Center.',
      'Cải thiện Smart Troubleshooter.',
      'Tối ưu giao diện điện thoại.',
      'Cải thiện tốc độ tải nội dung.'
    ],
    content: `
### Có gì mới?

- Trung tâm cập nhật phiên bản mới.
- Hiển thị phiên bản, ngày phát hành, loại và mức độ cập nhật.
- Smart Troubleshooter được tổ chức lại.
- Tối ưu giao diện trên điện thoại và máy tính.

### Hệ thống

Website hoạt động dưới dạng static site và có thể deploy trên Cloudflare Pages.

### Lưu ý

Nếu phát hiện lỗi, hãy gửi thông tin lỗi kèm phiên bản đang sử dụng để được hỗ trợ.
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
    summary: 'Bổ sung hướng dẫn npm, dotenv, slash commands và deploy bot.',
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
    id: 'update-2026-09-11-203',
    title: 'Bản vá hệ thống trạng thái dịch vụ',
    version: 'v2.0.3',
    date: '2026-09-11',
    type: 'FIX',
    status: 'published',
    priority: 'normal',
    tags: ['Discord', 'Status', 'Fix'],
    summary: 'Sửa lỗi trạng thái dịch vụ hiển thị dữ liệu cũ hoặc không đồng bộ.',
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
    id: 'release-2026-09-01-200',
    title: 'kenz Support chính thức ra mắt',
    version: 'v2.0.0',
    date: '2026-09-01',
    type: 'RELEASE',
    status: 'published',
    priority: 'high',
    tags: ['Release', 'Support'],
    summary: 'Ra mắt Support Center với FAQ, Update Center và Troubleshooter.',
    changes: [
      'Ra mắt Support Center.',
      'Ra mắt Update Center.',
      'Bổ sung FAQ.',
      'Bổ sung Troubleshooter.',
      'Hỗ trợ responsive.',
      'Hỗ trợ static hosting.'
    ],
    content: `
### Ra mắt

kenz Support chính thức hoạt động với hệ thống tài liệu, thông báo cập nhật và hỗ trợ xử lý sự cố.

### Thành phần

- Support Center
- Update Center
- FAQ
- Troubleshooter
- Responsive UI

### Triển khai

Website được xây dựng theo hướng static site và phù hợp triển khai trên Cloudflare Pages.
    `.trim()
  }
];
