/**
 * Blog CMS Dashboard
 * Create, edit, delete, and manage blog posts via localStorage
 */

(function () {
  'use strict';

  let currentFilter = 'all';
  let searchQuery = '';
  let editingPostId = null;
  let deletePostId = null;
  let currentStatus = 'draft';
  let slugManuallyEdited = false;

  const els = {
    statTotal: document.getElementById('stat-total'),
    statPublished: document.getElementById('stat-published'),
    statDraft: document.getElementById('stat-draft'),
    statCategories: document.getElementById('stat-categories'),
    search: document.getElementById('cms-search'),
    filters: document.getElementById('cms-filters'),
    postsBody: document.getElementById('cms-posts-body'),
    postsCount: document.getElementById('cms-posts-count'),
    emptyState: document.getElementById('cms-empty-state'),
    postsTable: document.getElementById('cms-posts-table'),
    editorModal: document.getElementById('editor-modal'),
    deleteModal: document.getElementById('delete-modal'),
    editorTitle: document.getElementById('editor-modal-title'),
    postForm: document.getElementById('post-form'),
    postId: document.getElementById('post-id'),
    postTitle: document.getElementById('post-title'),
    postExcerpt: document.getElementById('post-excerpt'),
    postMetaTitle: document.getElementById('post-meta-title'),
    postMetaDescription: document.getElementById('post-meta-description'),
    postSlug: document.getElementById('post-slug'),
    postAuthor: document.getElementById('post-author'),
    postAuthorRole: document.getElementById('post-author-role'),
    postAuthorImage: document.getElementById('post-author-image'),
    postAuthorImageFile: document.getElementById('post-author-image-file'),
    postCategory: document.getElementById('post-category'),
    postDate: document.getElementById('post-date'),
    postReadTime: document.getElementById('post-read-time'),
    postThumbnail: document.getElementById('post-thumbnail'),
    postThumbnailFile: document.getElementById('post-thumbnail-file'),
    postHeroImage: document.getElementById('post-hero-image'),
    postHeroImageFile: document.getElementById('post-hero-image-file'),
    postContent: document.getElementById('post-content'),
    thumbPreview: document.getElementById('thumb-preview'),
    statusToggle: document.getElementById('post-status-toggle'),
    categorySuggestions: document.getElementById('category-suggestions'),
    deletePostName: document.getElementById('delete-post-name'),
    toastContainer: document.getElementById('toast-container')
  };

  const DEFAULT_AUTHOR_IMAGE =
    'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif';

  function init() {
    bindEvents();
    refreshDashboard();
  }

  function bindEvents() {
    document.getElementById('cms-new-post-btn').addEventListener('click', () => openEditor());
    document.getElementById('cms-empty-new-btn').addEventListener('click', () => openEditor());
    document.getElementById('editor-modal-close').addEventListener('click', closeEditor);
    document.getElementById('editor-cancel-btn').addEventListener('click', closeEditor);
    document.getElementById('editor-save-btn').addEventListener('click', savePost);
    document.getElementById('delete-cancel-btn').addEventListener('click', closeDeleteModal);
    document.getElementById('delete-confirm-btn').addEventListener('click', confirmDelete);
    document.getElementById('cms-export-btn').addEventListener('click', exportData);
    document.getElementById('cms-logout-btn').addEventListener('click', () => Auth.logout());

    els.search.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderPosts();
    });

    els.filters.addEventListener('click', (e) => {
      const pill = e.target.closest('.cms-filter-pill');
      if (!pill) return;
      currentFilter = pill.dataset.filter;
      els.filters.querySelectorAll('.cms-filter-pill').forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      renderPosts();
    });

    els.postTitle.addEventListener('input', () => {
      if (!slugManuallyEdited) {
        els.postSlug.value = BlogData.generateSlug(els.postTitle.value);
      }
    });

    els.postSlug.addEventListener('input', () => {
      slugManuallyEdited = els.postSlug.value.length > 0;
    });

    handleImageUpload(els.postThumbnailFile, els.postThumbnail, updateThumbPreview);
    handleImageUpload(els.postAuthorImageFile, els.postAuthorImage);
    handleImageUpload(els.postHeroImageFile, els.postHeroImage);

    els.postThumbnail.addEventListener('input', updateThumbPreview);

    els.statusToggle.addEventListener('click', (e) => {
      const option = e.target.closest('.cms-status-option');
      if (!option) return;
      currentStatus = option.dataset.status;
      els.statusToggle.querySelectorAll('.cms-status-option').forEach((o) => o.classList.remove('active'));
      option.classList.add('active');
    });

    document.getElementById('editor-toolbar').addEventListener('click', (e) => {
      const btn = e.target.closest('.cms-editor-btn');
      if (!btn) return;
      e.preventDefault();
      const cmd = btn.dataset.cmd;
      const value = btn.dataset.value || null;
      els.postContent.focus();
      if (cmd === 'createLink') {
        const url = prompt('Enter link URL:');
        if (url) document.execCommand(cmd, false, url);
      } else {
        document.execCommand(cmd, false, value);
      }
    });

    els.editorModal.addEventListener('click', (e) => {
      if (e.target === els.editorModal) closeEditor();
    });

    els.deleteModal.addEventListener('click', (e) => {
      if (e.target === els.deleteModal) closeDeleteModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (els.editorModal.classList.contains('active')) closeEditor();
        if (els.deleteModal.classList.contains('active')) closeDeleteModal();
      }
    });
  }

  function refreshDashboard() {
    const stats = BlogData.getStats();
    els.statTotal.textContent = stats.total;
    els.statPublished.textContent = stats.published;
    els.statDraft.textContent = stats.draft;
    els.statCategories.textContent = stats.categories;
    updateCategorySuggestions();
    renderPosts();
  }

  function updateCategorySuggestions() {
    const categories = BlogData.getCategories();
    els.categorySuggestions.innerHTML = categories
      .map((c) => `<option value="${escapeAttr(c)}">`)
      .join('');
  }

  function getFilteredPosts() {
    let posts = BlogData.getAllPosts();

    if (currentFilter === 'published') {
      posts = posts.filter((p) => p.status === 'published');
    } else if (currentFilter === 'draft') {
      posts = posts.filter((p) => p.status === 'draft');
    }

    if (searchQuery) {
      posts = BlogData.searchPosts(searchQuery).filter((p) => {
        if (currentFilter === 'published') return p.status === 'published';
        if (currentFilter === 'draft') return p.status === 'draft';
        return true;
      });
    }

    return posts;
  }

  function renderPosts() {
    const posts = getFilteredPosts();
    els.postsCount.textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`;

    if (posts.length === 0) {
      els.emptyState.hidden = false;
      els.postsTable.querySelector('.cms-post-row.header').style.display = 'none';
      els.postsBody.innerHTML = '';
      return;
    }

    els.emptyState.hidden = true;
    els.postsTable.querySelector('.cms-post-row.header').style.display = '';

    els.postsBody.innerHTML = posts
      .map(
        (post) => `
      <div class="cms-post-row" data-id="${escapeAttr(post.id)}">
        <div class="cms-post-thumb">
          ${
            post.thumbnail
              ? `<img src="${escapeAttr(post.thumbnail)}" alt="" />`
              : '<div style="width:100%;height:100%;background:var(--cms-surface-elevated)"></div>'
          }
        </div>
        <div class="cms-post-info">
          <div class="cms-post-title-text">${escapeHtml(post.title)}</div>
          <div class="cms-post-author">by ${escapeHtml(post.author)}</div>
        </div>
        <div class="cms-post-category">${escapeHtml(post.category)}</div>
        <div class="cms-post-date">${escapeHtml(post.displayDate)}</div>
        <div>
          <span class="cms-post-status ${post.status}">
            <span class="cms-post-status-dot"></span>
            ${post.status === 'published' ? 'Published' : 'Draft'}
          </span>
        </div>
        <div class="cms-post-actions">
          ${
            post.status === 'published'
              ? `<a href="${getPostUrl(post.slug)}" class="cms-btn-icon" title="View" target="_blank" rel="noopener">&#128065;</a>`
              : ''
          }
          <button type="button" class="cms-btn-icon" data-action="edit" title="Edit">&#9998;</button>
          <button type="button" class="cms-btn-icon danger" data-action="delete" title="Delete">&#128465;</button>
        </div>
      </div>`
      )
      .join('');

    els.postsBody.querySelectorAll('[data-action="edit"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.cms-post-row').dataset.id;
        openEditor(id);
      });
    });

    els.postsBody.querySelectorAll('[data-action="delete"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('.cms-post-row');
        openDeleteModal(row.dataset.id, row.querySelector('.cms-post-title-text').textContent);
      });
    });
  }

  function openEditor(postId) {
    editingPostId = postId || null;
    slugManuallyEdited = false;
    currentStatus = 'draft';

    if (postId) {
      const post = BlogData.getPostById(postId);
      if (!post) return;
      els.editorTitle.textContent = 'Edit Post';
      els.postId.value = post.id;
      els.postTitle.value = post.title;
      els.postExcerpt.value = post.excerpt || '';
      els.postMetaTitle.value = post.metaTitle || '';
      els.postMetaDescription.value = post.metaDescription || '';
      els.postSlug.value = post.slug;
      els.postAuthor.value = post.author;
      els.postAuthorRole.value = post.authorRole;
      els.postAuthorImage.value = post.authorImage || '';
      els.postCategory.value = post.category;
      els.postDate.value = post.date;
      els.postReadTime.value = post.readTime;
      els.postThumbnail.value = post.thumbnail || '';
      els.postHeroImage.value = post.heroImage || '';
      els.postContent.innerHTML = post.content || '';
      currentStatus = post.status;
      slugManuallyEdited = true;
    } else {
      els.editorTitle.textContent = 'New Post';
      els.postForm.reset();
      els.postId.value = '';
      els.postExcerpt.value = '';
      els.postMetaTitle.value = '';
      els.postMetaDescription.value = '';
      els.postAuthor.value = 'Admin';
      els.postAuthorRole.value = 'Writer';
      els.postAuthorImage.value = DEFAULT_AUTHOR_IMAGE;
      els.postReadTime.value = '5 min read';
      els.postDate.value = new Date().toISOString().split('T')[0];
      els.postContent.innerHTML = '';
      currentStatus = 'draft';
    }

    setStatusToggle(currentStatus);
    updateThumbPreview();
    els.editorModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    els.postTitle.focus();

    els.postThumbnailFile.value = '';
    els.postAuthorImageFile.value = '';
    els.postHeroImageFile.value = '';
  }

  function handleImageUpload(inputEl, targetUrlEl, callback) {
    if (!inputEl || !targetUrlEl) return;
    inputEl.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        targetUrlEl.value = event.target.result;
        if (callback) callback();
      };
      reader.readAsDataURL(file);
    });
  }

  function closeEditor() {
    els.editorModal.classList.remove('active');
    document.body.style.overflow = '';
    editingPostId = null;
  }

  function setStatusToggle(status) {
    currentStatus = status;
    els.statusToggle.querySelectorAll('.cms-status-option').forEach((o) => {
      o.classList.toggle('active', o.dataset.status === status);
    });
  }

  function savePost() {
    const title = els.postTitle.value.trim();
    if (!title) {
      showToast('Please enter a post title', 'error');
      els.postTitle.focus();
      return;
    }

    const content = els.postContent.innerHTML.trim();
    if (!content) {
      showToast('Please add some content to your post', 'error');
      els.postContent.focus();
      return;
    }

    const postData = {
      title,
      excerpt: els.postExcerpt.value.trim(),
      metaTitle: els.postMetaTitle.value.trim(),
      metaDescription: els.postMetaDescription.value.trim(),
      slug: els.postSlug.value.trim() || BlogData.generateSlug(title),
      author: els.postAuthor.value.trim() || 'Admin',
      authorRole: els.postAuthorRole.value.trim() || 'Writer',
      authorImage: els.postAuthorImage.value.trim() || DEFAULT_AUTHOR_IMAGE,
      category: els.postCategory.value.trim() || 'General',
      date: els.postDate.value || new Date().toISOString().split('T')[0],
      readTime: els.postReadTime.value.trim() || '5 min read',
      thumbnail: els.postThumbnail.value.trim(),
      heroImage: els.postHeroImage.value.trim() || els.postThumbnail.value.trim(),
      status: currentStatus,
      content
    };

    if (editingPostId) {
      BlogData.updatePost(editingPostId, postData);
      showToast('Post updated successfully', 'success');
    } else {
      BlogData.createPost(postData);
      showToast('Post created successfully', 'success');
    }

    closeEditor();
    refreshDashboard();
  }

  function openDeleteModal(postId, title) {
    deletePostId = postId;
    els.deletePostName.textContent = title;
    els.deleteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDeleteModal() {
    els.deleteModal.classList.remove('active');
    document.body.style.overflow = '';
    deletePostId = null;
  }

  function confirmDelete() {
    if (!deletePostId) return;
    const deleted = BlogData.deletePost(deletePostId);
    if (deleted) {
      showToast('Post deleted', 'success');
      refreshDashboard();
    } else {
      showToast('Could not delete post', 'error');
    }
    closeDeleteModal();
  }

  function updateThumbPreview() {
    const url = els.postThumbnail.value.trim();
    if (url) {
      els.thumbPreview.classList.add('has-image');
      els.thumbPreview.innerHTML = `
        <img src="${escapeAttr(url)}" alt="Thumbnail preview" onerror="this.parentElement.classList.remove('has-image')" />
        <button type="button" class="cms-thumb-remove" id="thumb-remove-btn" title="Clear">&times;</button>`;
      document.getElementById('thumb-remove-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        els.postThumbnail.value = '';
        resetThumbPreview();
      });
    } else {
      resetThumbPreview();
    }
  }

  function resetThumbPreview() {
    els.thumbPreview.classList.remove('has-image');
    els.thumbPreview.innerHTML = `
      <div class="cms-thumb-placeholder">
        <div class="cms-thumb-placeholder-icon">&#128247;</div>
        <div class="cms-thumb-placeholder-text">Paste image URL to preview</div>
      </div>`;
  }

  function exportData() {
    const posts = BlogData.getAllPosts();
    const blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optina-blog-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Blog data exported', 'info');
  }

  function getPostUrl(slug) {
    return `/blogs/post.html?slug=${encodeURIComponent(slug)}`;
  }

  function showToast(message, type) {
    const icons = { success: '&#10003;', error: '&#10007;', info: '&#8505;' };
    const toast = document.createElement('div');
    toast.className = `cms-toast ${type}`;
    toast.innerHTML = `
      <div class="cms-toast-icon">${icons[type] || icons.info}</div>
      <div class="cms-toast-message">${escapeHtml(message)}</div>
      <button type="button" class="cms-toast-close">&times;</button>`;

    toast.querySelector('.cms-toast-close').addEventListener('click', () => removeToast(toast));
    els.toastContainer.appendChild(toast);

    setTimeout(() => removeToast(toast), 4000);
  }

  function removeToast(toast) {
    if (!toast.parentElement) return;
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
