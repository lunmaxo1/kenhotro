window.SITE_CONFIG = {
  siteName: 'Discord Support Center',
  brand: 'Discord Support',
  discordUrl: 'https://discord.gg/HFsJZ2qaqt',
  supportUrl: 'https://discord.gg/JQAEHFSmXr',
  faq: [
    { question: 'Làm sao để nhận thông báo update?', answer: 'Tham gia server Discord của bạn và bật thông báo cho kênh cập nhật. Website này cũng hiển thị các bài update mới nhất.' },
    { question: 'Có thể thêm bài update mà không sửa HTML không?', answer: 'Có. Chỉ cần mở data/updates.js và thêm một object mới vào mảng UPDATE_POSTS.' },
    { question: 'Website có cần backend không?', answer: 'Không. Bộ này là website tĩnh, phù hợp để deploy trực tiếp lên Cloudflare Pages.' },
    { question: 'Có thể đổi tên, màu sắc và link Discord không?', answer: 'Có. Sửa data/config.js để đổi tên website và các liên kết. Màu sắc có thể đổi ở đầu file assets/style.css.' }
  ]
};
