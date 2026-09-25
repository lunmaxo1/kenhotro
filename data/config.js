window.SITE_CONFIG = {
  siteName: 'KenThongBao',
  brand: 'KenThongBao',
  description: 'Thông báo nhanh. Cập nhật rõ ràng.',
  siteUrl: 'https://kenhotro.pages.dev/',
  discordUrl: 'https://discord.gg/HFsJZ2qaqt',
  supportUrl: 'https://discord.gg/JQAEHFSmXr',
  faq: [
    {
      question: 'Làm sao để nhận thông báo mới?',
      answer: 'Theo dõi mục Thông báo trên website hoặc tham gia Discord và bật thông báo cho kênh cập nhật.'
    },
    {
      question: 'Thêm bài thông báo mới ở đâu?',
      answer: 'Mở data/updates.js rồi thêm một object mới vào mảng window.UPDATE_POSTS. Không cần sửa index.html.'
    },
    {
      question: 'Website có cần backend không?',
      answer: 'Không. Phiên bản hiện tại là website tĩnh; dữ liệu thông báo được lưu trong data/updates.js và tải trực tiếp khi mở trang.'
    },
    {
      question: 'Có thể đổi tên và link Discord không?',
      answer: 'Có. Sửa các trường siteName, brand, discordUrl và supportUrl trong data/config.js.'
    },
    {
      question: 'Ngày và phiên bản được sắp xếp thế nào?',
      answer: 'Các bài có ngày mới hơn sẽ được hiển thị trước. Hãy dùng định dạng ngày YYYY-MM-DD để kết quả sắp xếp chính xác.'
    }
  ]
};
