window.SITE_CONFIG = {
  siteName: 'KenThongBao',
  brand: 'KenThongBao',
  description: 'Thông báo nhanh. Cập nhật rõ ràng.',

  siteUrl: 'https://kenhotro.pages.dev/',

  discordUrl:
    'https://discord.gg/HFsJZ2qaqt',

  supportUrl:
    'https://discord.gg/JQAEHFSmXr',

  maintenance: {
    enabled: false,

    mode: 'banner',

    title:
      'Website đang bảo trì',

    message:
      'Một số chức năng có thể tạm thời không khả dụng. Vui lòng quay lại sau.',

    detail:
      'Đội ngũ đang thực hiện cập nhật hệ thống.'
  },

  importantNotice: {
    enabled: false,

    type: 'WARNING',

    title:
      'Thông báo quan trọng',

    message:
      'Chưa có thông báo khẩn nào đang hoạt động.',

    detail: '',

    updateId: ''
  },

  faq: [
    {
      question:
        'Làm sao để nhận thông báo mới?',

      answer:
        'Theo dõi mục Thông báo trên website hoặc tham gia Discord và bật thông báo cho kênh cập nhật.'
    },

    {
      question:
        'Thêm bài thông báo mới ở đâu?',

      answer:
        'Mở data/updates.js rồi thêm một object mới vào mảng window.UPDATE_POSTS. Không cần sửa index.html.'
    },

    {
      question:
        'Website có cần backend không?',

      answer:
        'Không. Phiên bản hiện tại là website tĩnh; dữ liệu thông báo được lưu trong data/updates.js và tải trực tiếp khi mở trang.'
    },

    {
      question:
        'Có thể đổi tên và link Discord không?',

      answer:
        'Có. Sửa siteName, brand, discordUrl và supportUrl trong data/config.js.'
    },

    {
      question:
        'Bật chế độ bảo trì ở đâu?',

      answer:
        'Đổi maintenance.enabled thành true trong data/config.js rồi sửa title, message và detail theo nội dung cần hiển thị.'
    },

    {
      question:
        'Tạo thông báo quan trọng ở đâu?',

      answer:
        'Đổi importantNotice.enabled thành true trong data/config.js. Có thể liên kết tới một bài update bằng updateId.'
    },

    {
      question:
        'Ngày và phiên bản được sắp xếp thế nào?',

      answer:
        'Các bài có ngày mới hơn sẽ được hiển thị trước. Hãy dùng định dạng YYYY-MM-DD để kết quả sắp xếp chính xác.'
    }
  ]
};
