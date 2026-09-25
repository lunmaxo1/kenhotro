window.UPDATE_POSTS = [
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
