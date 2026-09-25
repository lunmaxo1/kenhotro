(() => {
  const cfg = window.SITE_CONFIG || {};
  const posts = Array.isArray(window.UPDATE_POSTS) ? window.UPDATE_POSTS : [];
  const faqs = Array.isArray(cfg.faq) ? cfg.faq : {};

  const $ = (s) => document.querySelector(s);

  document.title = cfg.siteName || 'KenThongBao';

  setText('#brandName', cfg.brand || cfg.siteName || 'KenThongBao');
  setText('#footerName', cfg.siteName || 'KenThongBao');
  setText('#copyrightName', cfg.brand || cfg.siteName || 'KenThongBao');
  setText('#footerDesc', cfg.description || 'Thông báo & cập nhật.');

  setLink('#discordLink', cfg.discordUrl);
  setLink('#inviteCard', cfg.discordUrl);
  setLink('#contactCard', cfg.supportUrl || cfg.discordUrl);
  setLink('#contactBtn', cfg.supportUrl || cfg.discordUrl);

  setText('#year', new Date().getFullYear());

  const sortedBase = [...posts]
    .filter(
      (p) =>
        p &&
        p.status !== 'archived' &&
        p.status !== 'draft'
    )
    .sort(
      (a, b) =>
        dateValue(b.date) -
        dateValue(a.date)
    );

  const allTags = [
    ...new Set(
      sortedBase.flatMap((p) =>
        Array.isArray(p.tags)
          ? p.tags
          : []
      )
    ),
  ].sort((a, b) =>
    a.localeCompare(b, 'vi')
  );

  setText('#updateCount', sortedBase.length);
  setText('#statUpdates', sortedBase.length);
  setText('#statTopics', allTags.length);

  const latest = sortedBase[0];

  if (latest) {
    setText(
      '#latestVersion',
      latest.version || 'latest'
    );

    setText(
      '#latestType',
      latest.type || 'UPDATE'
    );

    setText(
      '#statVersion',
      latest.version || 'latest'
    );

    setText(
      '#lastUpdated',
      'Cập nhật ' +
        formatDate(latest.date)
    );
  } else {
    setText('#statVersion', '—');
    setText(
      '#lastUpdated',
      'Chưa có cập nhật'
    );
  }

  renderFeatured(
    findImportantPost() || latest
  );

  const filters = $('#filters');

  let activeFilter = 'Tất cả';
  let activeTag = '';

  const filterNames = [
    'Tất cả',
    ...new Set(
      sortedBase
        .map((p) => p.type)
        .filter(Boolean)
    ),
  ];

  filterNames.forEach((name) => {
    const button =
      document.createElement('button');

    button.type = 'button';

    button.className =
      'filter' +
      (
        name === activeFilter
          ? ' active'
          : ''
      );

    button.textContent = name;

    button.addEventListener(
      'click',
      () => {
        activeFilter = name;

        [
          ...filters.querySelectorAll(
            '.filter'
          ),
        ].forEach((x) =>
          x.classList.remove(
            'active'
          )
        );

        button.classList.add('active');

        render();
      }
    );

    filters.appendChild(button);
  });

  if (allTags.length) {
    const tagSelect =
      document.createElement('select');

    tagSelect.className =
      'tag-select';

    tagSelect.id = 'tagSelect';

    tagSelect.setAttribute(
      'aria-label',
      'Lọc theo chủ đề'
    );

    tagSelect.innerHTML =
      '<option value="">Tất cả chủ đề</option>' +
      allTags
        .map(
          (tag) =>
            `<option value="${escapeAttr(
              tag
            )}">${escapeHtml(
              tag
            )}</option>`
        )
        .join('');

    tagSelect.addEventListener(
      'change',
      () => {
        activeTag =
          tagSelect.value;

        render();
      }
    );

    filters.appendChild(tagSelect);
  }

  $('#searchInput').addEventListener(
    'input',
    render
  );

  $('#sortSelect').addEventListener(
    'change',
    render
  );

  $('#clearSearch').addEventListener(
    'click',
    () => {
      $('#searchInput').value = '';

      if ($('#tagSelect')) {
        $('#tagSelect').value = '';
      }

      activeTag = '';

      $('#sortSelect').value =
        'newest';

      activeFilter =
        'Tất cả';

      [
        ...filters.querySelectorAll(
          '.filter'
        ),
      ].forEach((x) =>
        x.classList.toggle(
          'active',
          x.textContent === 'Tất cả'
        )
      );

      render();

      $('#searchInput').focus();
    }
  );

  render();
  renderFaq();
  openFromHash();

  window.addEventListener(
    'hashchange',
    openFromHash
  );

  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') {
        closePost();
      }

      if (
        e.key === '/' &&
        document.activeElement !==
          $('#searchInput') &&
        !isTypingTarget(e.target)
      ) {
        e.preventDefault();

        $('#searchInput').focus();
      }
    }
  );

  $('#menuBtn').onclick = () => {
    const nav = $('.nav');

    const open =
      nav.classList.toggle('open');

    $('#menuBtn').setAttribute(
      'aria-expanded',
      String(open)
    );
  };

  document
    .querySelectorAll('.nav-links a')
    .forEach((link) => {
      link.addEventListener(
        'click',
        () => {
          $('.nav').classList.remove(
            'open'
          );

          $('#menuBtn').setAttribute(
            'aria-expanded',
            'false'
          );
        }
      );
    });

  $('#modalClose').onclick = () => {
    closePost();
  };

  $('.modal-backdrop').onclick = () => {
    closePost();
  };

  $('#backTop').onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function render() {
    const query =
      $('#searchInput')
        .value
        .trim()
        .toLowerCase();

    const sort =
      $('#sortSelect').value;

    let list =
      sortedBase.filter((p) => {
        const tags =
          Array.isArray(p.tags)
            ? p.tags
            : [];

        const changes =
          Array.isArray(p.changes)
            ? p.changes
            : [];

        const hay = [
          p.title,
          p.summary,
          p.content,
          p.version,
          p.type,
          ...tags,
          ...changes,
        ]
          .join(' ')
          .toLowerCase();

        const matchesType =
          activeFilter === 'Tất cả' ||
          p.type === activeFilter;

        const matchesTag =
          !activeTag ||
          tags.includes(activeTag);

        const matchesSearch =
          !query ||
          hay.includes(query);

        return (
          matchesType &&
          matchesTag &&
          matchesSearch
        );
      });

    if (sort === 'oldest') {
      list.sort(
        (a, b) =>
          dateValue(a.date) -
          dateValue(b.date)
      );
    }

    if (sort === 'important') {
      list.sort(
        (a, b) =>
          priorityScore(b) -
            priorityScore(a) ||
          dateValue(b.date) -
            dateValue(a.date)
      );
    }

    if (sort === 'newest') {
      list.sort(
        (a, b) =>
          dateValue(b.date) -
          dateValue(a.date)
      );
    }

    const grid =
      $('#updatesGrid');

    grid.innerHTML = '';

    $('#emptyState').classList.toggle(
      'hidden',
      list.length !== 0
    );

    setText(
      '#resultsMeta',
      `${list.length} kết quả`
    );

    $('#clearSearch').classList.toggle(
      'hidden',
      !query &&
        !activeTag &&
        activeFilter === 'Tất cả'
    );

    list.forEach((post) => {
      grid.appendChild(
        postCard(post)
      );
    });
  }

  function renderFeatured(post) {
    const box =
      $('#featuredUpdate');

    if (!post) return;

    box.classList.remove(
      'hidden'
    );

    box.innerHTML = `
      <div>
        <span class="featured-label">
          CẬP NHẬT QUAN TRỌNG
        </span>

        <h3>
          ${escapeHtml(
            post.title
          )}
        </h3>

        <p>
          ${escapeHtml(
            post.summary || ''
          )}
        </p>

        <div class="featured-meta">
          ${escapeHtml(
            post.version || 'UPDATE'
          )}
          ·
          ${formatDate(post.date)}
        </div>
      </div>

      <button
        type="button"
        class="btn secondary featured-btn"
      >
        Xem chi tiết →
      </button>
    `;

    box
      .querySelector('button')
      .onclick = () =>
        openPost(post, true);
  }

  function postCard(post) {
    const element =
      document.createElement(
        'article'
      );

    element.className =
      'update-card';

    const tags =
      (post.tags || [])
        .slice(0, 3)
        .map(
          (tag) =>
            `<span class="mini-tag">${escapeHtml(
              tag
            )}</span>`
        )
        .join('');

    const priority =
      post.priority === 'high'
        ? '<span class="priority">IMPORTANT</span>'
        : '';

    const newBadge =
      isRecent(post.date)
        ? '<span class="new-badge">MỚI</span>'
        : '';

    element.innerHTML = `
      <div class="update-top">

        <div class="tag-row">

          <span class="tag">
            ${escapeHtml(
              post.type ||
                'UPDATE'
            )}
          </span>

          ${priority}
          ${newBadge}

        </div>

        <span class="date">
          ${formatDate(post.date)}
        </span>

      </div>

      <h3>
        ${escapeHtml(
          post.title
        )}
      </h3>

      <p>
        ${escapeHtml(
          post.summary || ''
        )}
      </p>

      <div class="mini-tags">
        ${tags}
      </div>

      <div class="update-footer">

        <span class="version">
          ${escapeHtml(
            post.version || ''
          )}
        </span>

        <button
          type="button"
          class="read-btn"
        >
          Đọc chi tiết →
        </button>

      </div>
    `;

    element
      .querySelector('.read-btn')
      .onclick = () =>
        openPost(post, true);

    return element;
  }

  function openPost(
    post,
    updateHash
  ) {
    if (!post) return;

    const changes =
      Array.isArray(
        post.changes
      ) &&
      post.changes.length
        ? `
          <div class="changes">

            <h3>
              Điểm thay đổi
            </h3>

            <ul>
              ${post.changes
                .map(
                  (item) =>
                    `<li>${escapeHtml(
                      item
                    )}</li>`
                )
                .join('')}
            </ul>

          </div>
        `
        : '';

    const tags =
      (post.tags || [])
        .map(
          (tag) =>
            `<span class="mini-tag">${escapeHtml(
              tag
            )}</span>`
        )
        .join('');

    const shareUrl =
      `${window.location.origin}` +
      `${window.location.pathname}` +
      `#update=${encodeURIComponent(
        post.id || ''
      )}`;

    $('#modalContent').innerHTML = `
      <div class="modal-header-row">

        <div>

          <span class="eyebrow">
            ${escapeHtml(
              post.type ||
                'UPDATE'
            )}
          </span>

          <h1 id="modalTitle">
            ${escapeHtml(
              post.title
            )}
          </h1>

        </div>

        <div class="modal-badges">

          ${
            post.priority ===
            'high'
              ? '<span class="priority">IMPORTANT</span>'
              : ''
          }

          ${
            isRecent(post.date)
              ? '<span class="new-badge">MỚI</span>'
              : ''
          }

        </div>

      </div>

      <div class="meta">

        ${formatDate(post.date)}

        ${
          post.version
            ? ' • ' +
              escapeHtml(
                post.version
              )
            : ''
        }

      </div>

      <div class="mini-tags modal-tags">
        ${tags}
      </div>

      ${changes}

      <div class="modal-body">
        ${renderMarkdownLite(
          post.content || ''
        )}
      </div>

      <div class="modal-actions">

        <button
          type="button"
          class="btn secondary"
          id="copyUpdateLink"
        >
          🔗 Sao chép liên kết
        </button>

        <button
          type="button"
          class="btn primary"
          id="shareUpdate"
        >
          Chia sẻ
        </button>

      </div>
    `;

    $('#copyUpdateLink').onclick =
      async () => {
        const ok =
          await copyText(
            shareUrl
          );

        showToast(
          ok
            ? 'Đã sao chép liên kết'
            : 'Không thể sao chép liên kết'
        );
      };

    $('#shareUpdate').onclick =
      async () => {
        if (
          navigator.share
        ) {
          try {
            await navigator.share(
              {
                title:
                  post.title,
                text:
                  post.summary ||
                  '',
                url:
                  shareUrl,
              }
            );
          } catch (_) {}
        } else {
          const ok =
            await copyText(
              shareUrl
            );

          showToast(
            ok
              ? 'Đã sao chép liên kết để chia sẻ'
              : 'Không thể chia sẻ'
          );
        }
      };

    $('#postModal').classList.remove(
      'hidden'
    );

    document.body.style.overflow =
      'hidden';

    if (
      updateHash &&
      post.id
    ) {
      history.replaceState(
        null,
        '',
        `#update=${encodeURIComponent(
          post.id
        )}`
      );
    }
  }

  function closePost() {
    if (
      $('#postModal').classList.contains(
        'hidden'
      )
    ) {
      return;
    }

    $('#postModal').classList.add(
      'hidden'
    );

    document.body.style.overflow =
      '';

    if (
      location.hash.startsWith(
        '#update='
      )
    ) {
      history.replaceState(
        null,
        '',
        `${location.pathname}${location.search}`
      );
    }
  }

  function openFromHash() {
    const match =
      location.hash.match(
        /^#update=(.+)$/
      );

    if (!match) return;

    const id =
      decodeURIComponent(
        match[1]
      );

    const post =
      sortedBase.find(
        (item) =>
          item.id === id
      );

    if (post) {
      openPost(
        post,
        false
      );
    }
  }

  function renderFaq() {
    const box =
      $('#faqList');

    box.innerHTML = '';

    faqs.forEach((faq) => {
      const element =
        document.createElement(
          'div'
        );

      element.className =
        'faq';

      element.innerHTML = `
        <button
          type="button"
          aria-expanded="false"
        >

          <span>
            ${escapeHtml(
              faq.question
            )}
          </span>

          <span>＋</span>

        </button>

        <div class="faq-answer">
          ${escapeHtml(
            faq.answer
          )}
        </div>
      `;

      element
        .querySelector(
          'button'
        )
        .onclick = () => {
          const open =
            element.classList.toggle(
              'open'
            );

          element
            .querySelector(
              'button'
            )
            .setAttribute(
              'aria-expanded',
              String(open)
            );

          element
            .querySelectorAll(
              'span'
            )[1].textContent =
            open
              ? '−'
              : '＋';
        };

      box.appendChild(
        element
      );
    });
  }

  function findImportantPost() {
    return sortedBase.find(
      (post) =>
        post.priority === 'high' &&
        post.status ===
          'published'
    );
  }

  function priorityScore(post) {
    if (
      post.priority ===
      'high'
    ) {
      return 2;
    }

    if (
      post.priority ===
      'normal'
    ) {
      return 1;
    }

    return 0;
  }

  function dateValue(date) {
    const value =
      new Date(date).getTime();

    return Number.isNaN(value)
      ? 0
      : value;
  }

  function isRecent(date) {
    const diff =
      Date.now() -
      dateValue(date);

    return (
      diff >= 0 &&
      diff <=
        7 *
          24 *
          60 *
          60 *
          1000
    );
  }

  function formatDate(date) {
    const value =
      new Date(date);

    if (
      Number.isNaN(
        value.getTime()
      )
    ) {
      return String(
        date || ''
      );
    }

    return new Intl.DateTimeFormat(
      'vi-VN',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }
    ).format(value);
  }

  function setText(
    selector,
    value
  ) {
    const element =
      $(selector);

    if (element) {
      element.textContent =
        String(
          value ?? ''
        );
    }
  }

  function setLink(
    selector,
    value
  ) {
    const element =
      $(selector);

    if (element) {
      element.href =
        value || '#';
    }
  }

  function escapeHtml(value) {
    return String(
      value ?? ''
    ).replace(
      /[&<>'"]/g,
      (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      })[char]
    );
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function renderMarkdownLite(
    text
  ) {
    return text
      .split('\n')
      .map((line) => {

        if (
          /^### /.test(
            line
          )
        ) {
          return `<h3>${escapeHtml(
            line.slice(4)
          )}</h3>`;
        }

        if (
          /^- /.test(
            line
          )
        ) {
          return `<p>• ${escapeHtml(
            line.slice(2)
          )}</p>`;
        }

        if (
          !line.trim()
        ) {
          return '<br>';
        }

        const safe =
          escapeHtml(
            line
          ).replace(
            /`([^`]+)`/g,
            '<code>$1</code>'
          );

        return `<p>${safe}</p>`;
      })
      .join('');
  }

  async function copyText(
    text
  ) {
    try {
      await navigator
        .clipboard
        .writeText(text);

      return true;
    } catch (_) {
      const input =
        document.createElement(
          'textarea'
        );

      input.value =
        text;

      document.body.appendChild(
        input
      );

      input.select();

      const ok =
        document.execCommand(
          'copy'
        );

      input.remove();

      return ok;
    }
  }

  function showToast(
    message
  ) {
    let toast =
      $('#siteToast');

    if (!toast) {
      toast =
        document.createElement(
          'div'
        );

      toast.id =
        'siteToast';

      toast.className =
        'site-toast';

      document.body.appendChild(
        toast
      );
    }

    toast.textContent =
      message;

    toast.classList.add(
      'show'
    );

    clearTimeout(
      showToast.timer
    );

    showToast.timer =
      setTimeout(
        () =>
          toast.classList.remove(
            'show'
          ),
        2200
      );
  }

  function isTypingTarget(
    target
  ) {
    return (
      target &&
      [
        'INPUT',
        'TEXTAREA',
        'SELECT',
      ].includes(
        target.tagName
      )
    );
  }
})();
