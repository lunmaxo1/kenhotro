(() => {
  'use strict';

  const cfg =
    window.SITE_CONFIG || {};

  const posts =
    Array.isArray(window.UPDATE_POSTS)
      ? window.UPDATE_POSTS
      : [];

  const faqs =
    Array.isArray(cfg.faq)
      ? cfg.faq
      : [];

  const $ =
    (selector) =>
      document.querySelector(
        selector
      );

  let activeFilter =
    'Tất cả';

  let activeTag =
    '';

  const visiblePosts =
    posts
      .filter(
        (post) =>
          post &&
          post.status !== 'draft' &&
          post.status !== 'archived'
      )
      .sort(
        (a, b) =>
          dateValue(b.date) -
          dateValue(a.date)
      );

  const allTags = [
    ...new Set(
      visiblePosts.flatMap(
        (post) =>
          Array.isArray(post.tags)
            ? post.tags
            : []
      )
    )
  ].sort((a, b) =>
    a.localeCompare(
      b,
      'vi'
    )
  );

  const typeFilters = [
    'Tất cả',
    ...new Set(
      visiblePosts
        .map(
          (post) =>
            post.type
        )
        .filter(Boolean)
    )
  ];

  init();

  function init() {
    applyConfig();

    applyMaintenance();

    renderStats();

    renderImportantNotice();

    renderFeatured(
      findImportantPost() ||
      visiblePosts[0]
    );

    renderFilters();

    renderUpdates();

    renderTimeline();

    renderFaq();

    initMenu();

    initModal();

    initKeyboard();

    initBackTop();

    initAnimations();

    openFromHash();

    window.addEventListener(
      'hashchange',
      openFromHash
    );
  }

  function applyConfig() {
    document.title =
      cfg.siteName ||
      'KenThongBao';

    setText(
      '#brandName',
      cfg.brand ||
        cfg.siteName ||
        'KenThongBao'
    );

    setText(
      '#footerName',
      cfg.siteName ||
        'KenThongBao'
    );

    setText(
      '#copyrightName',
      cfg.brand ||
        cfg.siteName ||
        'KenThongBao'
    );

    setText(
      '#footerDesc',
      cfg.description ||
        'Thông báo nhanh. Cập nhật rõ ràng.'
    );

    setLink(
      '#discordLink',
      cfg.discordUrl
    );

    setLink(
      '#inviteCard',
      cfg.discordUrl
    );

    setLink(
      '#contactCard',
      cfg.supportUrl ||
        cfg.discordUrl
    );

    setLink(
      '#contactBtn',
      cfg.supportUrl ||
        cfg.discordUrl
    );

    setText(
      '#year',
      new Date()
        .getFullYear()
    );
  }

  function applyMaintenance() {
    const maintenance =
      cfg.maintenance ||
      {};

    const bar =
      $('#maintenanceBar');

    if (
      !maintenance.enabled ||
      !bar
    ) {
      return;
    }

    document.body.classList.add(
      'maintenance-active'
    );

    setText(
      '#heroStatus',
      'MAINTENANCE'
    );

    setText(
      '#systemState',
      'MAINTENANCE'
    );

    setText(
      '#statStatusValue',
      'MAINT'
    );

    setText(
      '#statStatus',
      'Bảo trì'
    );

    bar.classList.remove(
      'hidden'
    );

    bar.innerHTML = `
      <div class="maintenance-inner container">

        <span
          class="maintenance-pulse"
          aria-hidden="true"
        ></span>

        <div>

          <strong>
            ${escapeHtml(
              maintenance.title ||
              'Website đang bảo trì'
            )}
          </strong>

          <p>
            ${escapeHtml(
              maintenance.message ||
              ''
            )}
          </p>

        </div>

        ${
          maintenance.detail
            ? `
              <span class="maintenance-detail">
                ${escapeHtml(
                  maintenance.detail
                )}
              </span>
            `
            : ''
        }

      </div>
    `;
  }

  function renderStats() {
    setText(
      '#updateCount',
      visiblePosts.length
    );

    setText(
      '#statUpdates',
      visiblePosts.length
    );

    setText(
      '#statTopics',
      allTags.length
    );

    const latest =
      visiblePosts[0];

    if (!latest) {
      setText(
        '#latestVersion',
        '—'
      );

      setText(
        '#latestType',
        '—'
      );

      setText(
        '#statVersion',
        '—'
      );

      setText(
        '#lastUpdated',
        'Chưa có cập nhật'
      );

      return;
    }

    setText(
      '#latestVersion',
      latest.version ||
        'latest'
    );

    setText(
      '#latestType',
      latest.type ||
        'UPDATE'
    );

    setText(
      '#statVersion',
      latest.version ||
        'latest'
    );

    setText(
      '#lastUpdated',
      `Cập nhật ${formatDate(
        latest.date
      )}`
    );
  }

  function renderImportantNotice() {
    const box =
      $('#importantNotice');

    const notice =
      cfg.importantNotice ||
      {};

    if (
      !box ||
      !notice.enabled
    ) {
      return;
    }

    box.classList.remove(
      'hidden'
    );

    box.innerHTML = `
      <div
        class="notice-card notice-${escapeAttr(
          String(
            notice.type ||
            'WARNING'
          ).toLowerCase()
        )}"
      >

        <div class="notice-icon">
          ${noticeIcon(
            notice.type
          )}
        </div>

        <div class="notice-content">

          <div class="notice-kicker">
            ${escapeHtml(
              notice.type ||
              'NOTICE'
            )}
          </div>

          <h3>
            ${escapeHtml(
              notice.title ||
              'Thông báo quan trọng'
            )}
          </h3>

          <p>
            ${escapeHtml(
              notice.message ||
              ''
            )}
          </p>

          ${
            notice.detail
              ? `
                <small>
                  ${escapeHtml(
                    notice.detail
                  )}
                </small>
              `
              : ''
          }

        </div>

        ${
          notice.updateId
            ? `
              <button
                type="button"
                class="notice-btn"
                id="noticeUpdateBtn"
              >
                Xem chi tiết →
              </button>
            `
            : ''
        }

      </div>
    `;

    if (
      notice.updateId
    ) {
      const button =
        $('#noticeUpdateBtn');

      if (button) {
        button.onclick =
          () => {
            const post =
              visiblePosts.find(
                (item) =>
                  item.id ===
                  notice.updateId
              );

            if (post) {
              openPost(
                post,
                true
              );
            } else {
              showToast(
                'Không tìm thấy bài cập nhật được liên kết.'
              );
            }
          };
      }
    }
  }

  function renderFeatured(post) {
    const box =
      $('#featuredUpdate');

    if (
      !box ||
      !post
    ) {
      return;
    }

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
            post.summary ||
            ''
          )}
        </p>

        <div class="featured-meta">
          ${escapeHtml(
            post.version ||
            'UPDATE'
          )}
          ·
          ${formatDate(
            post.date
          )}
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
      .querySelector(
        'button'
      )
      .onclick =
      () =>
        openPost(
          post,
          true
        );
  }

  function renderFilters() {
    const box =
      $('#filters');

    if (!box) {
      return;
    }

    box.innerHTML = '';

    typeFilters.forEach(
      (type) => {

        const button =
          document.createElement(
            'button'
          );

        button.type =
          'button';

        button.className =
          `filter${
            type ===
            activeFilter
              ? ' active'
              : ''
          }`;

        button.textContent =
          type;

        button.addEventListener(
          'click',
          () => {

            activeFilter =
              type;

            box
              .querySelectorAll(
                '.filter'
              )
              .forEach(
                (item) =>
                  item.classList.remove(
                    'active'
                  )
              );

            button.classList.add(
              'active'
            );

            renderUpdates();
          }
        );

        box.appendChild(
          button
        );
      }
    );

    if (
      allTags.length
    ) {

      const select =
        document.createElement(
          'select'
        );

      select.id =
        'tagSelect';

      select.className =
        'tag-select';

      select.setAttribute(
        'aria-label',
        'Lọc theo chủ đề'
      );

      select.innerHTML =
        '<option value="">Tất cả chủ đề</option>' +
        allTags
          .map(
            (tag) =>
              `
                <option value="${escapeAttr(
                  tag
                )}">
                  ${escapeHtml(
                    tag
                  )}
                </option>
              `
          )
          .join('');

      select.value =
        activeTag;

      select.addEventListener(
        'change',
        () => {

          activeTag =
            select.value;

          renderUpdates();

        }
      );

      box.appendChild(
        select
      );
    }

    $('#searchInput')
      .addEventListener(
        'input',
        renderUpdates
      );

    $('#sortSelect')
      .addEventListener(
        'change',
        renderUpdates
      );

    $('#clearSearch')
      .addEventListener(
        'click',
        clearFilters
      );
  }

  function renderUpdates() {
    const query =
      (
        $('#searchInput')
          ?.value ||
        ''
      )
        .trim()
        .toLowerCase();

    const sort =
      $('#sortSelect')
        ?.value ||
      'newest';

    let list =
      visiblePosts.filter(
        (post) => {

          const tags =
            Array.isArray(
              post.tags
            )
              ? post.tags
              : [];

          const changes =
            Array.isArray(
              post.changes
            )
              ? post.changes
              : [];

          const hay =
            [
              post.title,
              post.summary,
              post.content,
              post.version,
              post.type,
              ...tags,
              ...changes
            ]
              .join(' ')
              .toLowerCase();

          return (
            (
              activeFilter ===
                'Tất cả' ||
              post.type ===
                activeFilter
            ) &&
            (
              !activeTag ||
              tags.includes(
                activeTag
              )
            ) &&
            (
              !query ||
              hay.includes(
                query
              )
            )
          );
        }
      );

    if (
      sort ===
      'oldest'
    ) {

      list.sort(
        (a, b) =>
          dateValue(
            a.date
          ) -
          dateValue(
            b.date
          )
      );

    } else if (
      sort ===
      'important'
    ) {

      list.sort(
        (a, b) =>
          priorityScore(
            b
          ) -
          priorityScore(
            a
          ) ||
          dateValue(
            b.date
          ) -
          dateValue(
            a.date
          )
      );

    } else {

      list.sort(
        (a, b) =>
          dateValue(
            b.date
          ) -
          dateValue(
            a.date
          )
      );
    }

    const grid =
      $('#updatesGrid');

    grid.innerHTML = '';

    list.forEach(
      (post, index) => {

        const card =
          postCard(
            post
          );

        card.style.setProperty(
          '--delay',
          `${Math.min(
            index,
            8
          ) * 50}ms`
        );

        grid.appendChild(
          card
        );

        requestAnimationFrame(
          () =>
            card.classList.add(
              'card-enter'
            )
        );
      }
    );

    $('#emptyState')
      .classList.toggle(
        'hidden',
        list.length !==
          0
      );

    setText(
      '#resultsMeta',
      `${list.length} kết quả`
    );

    $('#clearSearch')
      .classList.toggle(
        'hidden',
        !query &&
        !activeTag &&
        activeFilter ===
          'Tất cả'
      );
  }

  function clearFilters() {
    $('#searchInput')
      .value = '';

    $('#sortSelect')
      .value = 'newest';

    activeFilter =
      'Tất cả';

    activeTag =
      '';

    const tagSelect =
      $('#tagSelect');

    if (
      tagSelect
    ) {
      tagSelect.value =
        '';
    }

    $('#filters')
      .querySelectorAll(
        '.filter'
      )
      .forEach(
        (item) => {

          item.classList.toggle(
            'active',
            item.textContent ===
              'Tất cả'
          );

        }
      );

    renderUpdates();

    $('#searchInput')
      .focus();
  }

  function postCard(post) {
    const card =
      document.createElement(
        'article'
      );

    card.className =
      'update-card';

    const tags =
      (post.tags || [])
        .slice(0, 3)
        .map(
          (tag) =>
            `
              <span class="mini-tag">
                ${escapeHtml(
                  tag
                )}
              </span>
            `
        )
        .join('');

    const priority =
      post.priority ===
      'high'
        ? `
          <span class="priority">
            IMPORTANT
          </span>
        `
        : '';

    const fresh =
      isRecent(
        post.date
      )
        ? `
          <span class="new-badge">
            MỚI
          </span>
        `
        : '';

    const type =
      updateTypeMeta(
        post.type
      );

    card.innerHTML = `
      <div class="update-top">

        <div class="tag-row">

          <span class="tag">
            ${type.icon}
            ${escapeHtml(
              post.type ||
              'UPDATE'
            )}
          </span>

          ${priority}
          ${fresh}

        </div>

        <span class="date">
          ${formatDate(
            post.date
          )}
        </span>

      </div>

      <h3>
        ${escapeHtml(
          post.title
        )}
      </h3>

      <p>
        ${escapeHtml(
          post.summary ||
          ''
        )}
      </p>

      <div class="mini-tags">
        ${tags}
      </div>

      <div class="update-footer">

        <span class="version">
          ${escapeHtml(
            post.version ||
            ''
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

    card
      .querySelector(
        '.read-btn'
      )
      .onclick =
      () =>
        openPost(
          post,
          true
        );

    return card;
  }

  function renderTimeline() {
    const box =
      $('#timelineList');

    if (!box) {
      return;
    }

    box.innerHTML = '';

    visiblePosts.forEach(
      (post, index) => {

        const item =
          document.createElement(
            'article'
          );

        item.className =
          'timeline-item reveal reveal-left';

        item.style.setProperty(
          '--delay',
          `${Math.min(
            index,
            8
          ) * 60}ms`
        );

        const type =
          updateTypeMeta(
            post.type
          );

        const priority =
          post.priority ===
          'high'
            ? `
              <span class="priority">
                IMPORTANT
              </span>
            `
            : '';

        item.innerHTML = `
          <div
            class="timeline-marker"
            aria-hidden="true"
          ></div>

          <div class="timeline-date">
            ${formatDate(
              post.date
            )}
          </div>

          <div class="timeline-card">

            <div class="timeline-card-top">

              <div class="tag-row">

                <span class="tag">
                  ${type.icon}
                  ${escapeHtml(
                    post.type ||
                    'UPDATE'
                  )}
                </span>

                ${priority}

              </div>

              <span class="version">
                ${escapeHtml(
                  post.version ||
                  ''
                )}
              </span>

            </div>

            <h3>
              ${escapeHtml(
                post.title
              )}
            </h3>

            <p>
              ${escapeHtml(
                post.summary ||
                ''
              )}
            </p>

            <button
              type="button"
              class="read-btn"
            >
              Xem thay đổi →
            </button>

          </div>
        `;

        item
          .querySelector(
            '.read-btn'
          )
          .onclick =
          () =>
            openPost(
              post,
              true
            );

        box.appendChild(
          item
        );
      }
    );

    initAnimations(
      box
    );
  }

  function renderFaq() {
    const box =
      $('#faqList');

    if (!box) {
      return;
    }

    box.innerHTML = '';

    faqs.forEach(
      (faq, index) => {

        const item =
          document.createElement(
            'div'
          );

        item.className =
          'faq reveal reveal-up';

        item.style.setProperty(
          '--delay',
          `${Math.min(
            index,
            8
          ) * 40}ms`
        );

        item.innerHTML = `
          <button
            type="button"
            aria-expanded="false"
          >

            <span>
              ${escapeHtml(
                faq.question
              )}
            </span>

            <span>
              ＋
            </span>

          </button>

          <div class="faq-answer">
            ${escapeHtml(
              faq.answer
            )}
          </div>
        `;

        item
          .querySelector(
            'button'
          )
          .onclick =
          () => {

            const open =
              item.classList.toggle(
                'open'
              );

            item
              .querySelector(
                'button'
              )
              .setAttribute(
                'aria-expanded',
                String(
                  open
                )
              );

            item
              .querySelectorAll(
                'span'
              )[1]
              .textContent =
              open
                ? '−'
                : '＋';
          };

        box.appendChild(
          item
        );
      }
    );

    initAnimations(
      box
    );
  }

  function openPost(
    post,
    updateHash = true
  ) {

    if (!post) {
      return;
    }

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
                  (change) =>
                    `
                      <li>
                        ${escapeHtml(
                          change
                        )}
                      </li>
                    `
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
            `
              <span class="mini-tag">
                ${escapeHtml(
                  tag
                )}
              </span>
            `
        )
        .join('');

    const shareUrl =
      `${window.location.origin}` +
      `${window.location.pathname}` +
      `#update=${encodeURIComponent(
        post.id || ''
      )}`;

    $('#modalContent')
      .innerHTML = `

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
              ? `
                <span class="priority">
                  IMPORTANT
                </span>
              `
              : ''
          }

          ${
            isRecent(
              post.date
            )
              ? `
                <span class="new-badge">
                  MỚI
                </span>
              `
              : ''
          }

        </div>

      </div>

      <div class="meta">

        ${formatDate(
          post.date
        )}

        ${
          post.version
            ? `
              •
              ${escapeHtml(
                post.version
              )}
            `
            : ''
        }

      </div>

      <div class="mini-tags modal-tags">
        ${tags}
      </div>

      ${changes}

      <div class="modal-body">
        ${renderMarkdownLite(
          post.content ||
          ''
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

    $('#copyUpdateLink')
      .onclick =
      async () => {

        const ok =
          await copyText(
            shareUrl
          );

        showToast(
          ok
            ? 'Đã sao chép liên kết.'
            : 'Không thể sao chép liên kết.'
        );
      };

    $('#shareUpdate')
      .onclick =
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
                  shareUrl
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
              ? 'Đã sao chép liên kết để chia sẻ.'
              : 'Không thể chia sẻ.'
          );

        }

      };

    $('#postModal')
      .classList.remove(
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
    const modal =
      $('#postModal');

    if (
      !modal ||
      modal.classList.contains(
        'hidden'
      )
    ) {
      return;
    }

    modal.classList.add(
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

    if (!match) {
      return;
    }

    const id =
      decodeURIComponent(
        match[1]
      );

    const post =
      visiblePosts.find(
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

  function initMenu() {
    const button =
      $('#menuBtn');

    const nav =
      $('.nav');

    if (
      !button ||
      !nav
    ) {
      return;
    }

    button.addEventListener(
      'click',
      () => {

        const open =
          nav.classList.toggle(
            'open'
          );

        button.setAttribute(
          'aria-expanded',
          String(
            open
          )
        );
      }
    );

    document
      .querySelectorAll(
        '.nav-links a'
      )
      .forEach(
        (link) => {

          link.addEventListener(
            'click',
            () => {

              nav.classList.remove(
                'open'
              );

              button.setAttribute(
                'aria-expanded',
                'false'
              );

            }
          );

        }
      );
  }

  function initModal() {
    $('#modalClose')
      .onclick =
      closePost;

    $('.modal-backdrop')
      .onclick =
      closePost;
  }

  function initKeyboard() {
    window.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key ===
          'Escape'
        ) {
          closePost();
        }

        if (
          event.key ===
            '/' &&
          document.activeElement !==
            $('#searchInput') &&
          !isTypingTarget(
            event.target
          )
        ) {

          event.preventDefault();

          $('#searchInput')
            .focus();
        }

      }
    );
  }

  function initBackTop() {
    $('#backTop')
      .onclick =
      () => {

        window.scrollTo(
          {
            top: 0,
            behavior:
              'smooth'
          }
        );

      };
  }

  function initAnimations(
    root = document
  ) {

    const items =
      root.querySelectorAll
        ? root.querySelectorAll(
            '.reveal:not(.in-view)'
          )
        : [];

    if (
      !(
        'IntersectionObserver' in
        window
      )
    ) {

      items.forEach(
        (item) =>
          item.classList.add(
            'in-view'
          )
      );

      return;
    }

    const observer =
      new IntersectionObserver(
        (
          entries,
          currentObserver
        ) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  'in-view'
                );

                currentObserver.unobserve(
                  entry.target
                );

              }

            }
          );
        },
        {
          threshold:
            0.12,

          rootMargin:
            '0px 0px -40px 0px'
        }
      );

    items.forEach(
      (item) =>
        observer.observe(
          item
        )
    );
  }

  function findImportantPost() {
    return (
      visiblePosts.find(
        (post) =>
          post.priority ===
          'high'
      ) ||
      null
    );
  }

  function updateTypeMeta(
    type
  ) {

    const map = {

      FEATURE: {
        icon: '✨'
      },

      IMPROVEMENT: {
        icon: '🔧'
      },

      FIX: {
        icon: '🐛'
      },

      RELEASE: {
        icon: '🚀'
      },

      SECURITY: {
        icon: '🛡️'
      },

      ANNOUNCEMENT: {
        icon: '📢'
      }

    };

    return (
      map[type] || {
        icon: '•'
      }
    );
  }

  function noticeIcon(
    type
  ) {

    const map = {

      WARNING:
        '⚠️',

      INFO:
        'ℹ️',

      SUCCESS:
        '✓',

      SECURITY:
        '🛡️',

      MAINTENANCE:
        '🔧'

    };

    return (
      map[
        String(
          type ||
          ''
        ).toUpperCase()
      ] ||
      '📢'
    );
  }

  function priorityScore(
    post
  ) {

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

  function dateValue(
    date
  ) {

    const value =
      new Date(
        date
      ).getTime();

    return Number.isNaN(
      value
    )
      ? 0
      : value;
  }

  function isRecent(
    date
  ) {

    const diff =
      Date.now() -
      dateValue(
        date
      );

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

  function formatDate(
    date
  ) {

    const value =
      new Date(
        date
      );

    if (
      Number.isNaN(
        value.getTime()
      )
    ) {
      return String(
        date ||
        ''
      );
    }

    return new Intl.DateTimeFormat(
      'vi-VN',
      {
        day:
          '2-digit',

        month:
          '2-digit',

        year:
          'numeric'
      }
    ).format(
      value
    );
  }

  function setText(
    selector,
    value
  ) {

    const element =
      $(
        selector
      );

    if (element) {
      element.textContent =
        String(
          value ??
          ''
        );
    }
  }

  function setLink(
    selector,
    value
  ) {

    const element =
      $(
        selector
      );

    if (element) {
      element.href =
        value ||
        '#';
    }
  }

  function escapeHtml(
    value
  ) {

    return String(
      value ??
      ''
    ).replace(
      /[&<>'"]/g,
      (char) =>
        ({
          '&':
            '&amp;',

          '<':
            '&lt;',

          '>':
            '&gt;',

          "'":
            '&#39;',

          '"':
            '&quot;'
        })[char]
    );
  }

  function escapeAttr(
    value
  ) {
    return escapeHtml(
      value
    );
  }

  function renderMarkdownLite(
    text
  ) {

    const lines =
      String(
        text ||
        ''
      ).split(
        '\n'
      );

    let html =
      '';

    let inCode =
      false;

    let codeBuffer =
      [];

    for (
      const line
      of lines
    ) {

      if (
        line
          .trim()
          .startsWith(
            '```'
          )
      ) {

        if (
          !inCode
        ) {

          inCode =
            true;

          codeBuffer =
            [];

        } else {

          html +=
            `
              <pre>
                <code>
${escapeHtml(
  codeBuffer.join(
    '\n'
  )
)}
                </code>
              </pre>
            `;

          inCode =
            false;

          codeBuffer =
            [];
        }

        continue;
      }

      if (
        inCode
      ) {

        codeBuffer.push(
          line
        );

        continue;
      }

      if (
        /^### /.test(
          line
        )
      ) {

        html +=
          `
            <h3>
              ${escapeHtml(
                line.slice(
                  4
                )
              )}
            </h3>
          `;

      } else if (
        /^- /.test(
          line
        )
      ) {

        html +=
          `
            <p class="markdown-list">
              •
              ${escapeHtml(
                line.slice(
                  2
                )
              )}
            </p>
          `;

      } else if (
        !line.trim()
      ) {

        html +=
          `
            <div class="markdown-gap"></div>
          `;

      } else {

        const safe =
          escapeHtml(
            line
          ).replace(
            /`([^`]+)`/g,
            '<code>$1</code>'
          );

        html +=
          `
            <p>
              ${safe}
            </p>
          `;
      }
    }

    if (
      inCode &&
      codeBuffer.length
    ) {

      html +=
        `
          <pre>
            <code>
${escapeHtml(
  codeBuffer.join(
    '\n'
  )
)}
            </code>
          </pre>
        `;
    }

    return html;
  }

  async function copyText(
    value
  ) {

    try {

      await navigator
        .clipboard
        .writeText(
          value
        );

      return true;

    } catch (_) {

      const area =
        document.createElement(
          'textarea'
        );

      area.value =
        value;

      area.setAttribute(
        'readonly',
        ''
      );

      area.style.position =
        'fixed';

      area.style.opacity =
        '0';

      document.body.appendChild(
        area
      );

      area.select();

      const ok =
        document.execCommand(
          'copy'
        );

      area.remove();

      return ok;
    }
  }

  function showToast(
    message
  ) {

    const toast =
      $('#siteToast');

    if (!toast) {
      return;
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
        'SELECT'
      ].includes(
        target.tagName
      )
    );
  }

})();
