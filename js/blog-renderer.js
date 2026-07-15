/**
 * Blog Renderer
 * Dynamically renders blog posts from BlogData (localStorage) on listing pages
 */

const BlogRenderer = (() => {
  const ARROW_ICON =
    'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db17/69ccb71d3d6d5fbb07e6db21_Vector.svg';

  function getPostUrl(slug) {
    return `/blogs/post.html?slug=${encodeURIComponent(slug)}`;
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

  function renderBlogCard(post) {
    const imgAttrs = post.thumbnailSrcset
      ? `srcset="${escapeAttr(post.thumbnailSrcset)}" sizes="(max-width: 767px) 100vw, (max-width: 991px) 727px, 939px"`
      : '';

    return `
      <div class="blog-collection w-dyn-list">
        <div role="list" class="blog-list w-dyn-items">
          <div role="listitem" class="blog-item w-dyn-item">
            <div class="blog-data">
              <a href="${getPostUrl(post.slug)}" class="blog-link w-inline-block">
                <div class="blog-image-box">
                  <img
                    loading="lazy"
                    alt="${escapeAttr(post.title)}"
                    src="${escapeAttr(post.thumbnail)}"
                    ${imgAttrs}
                    class="blog-image"
                  />
                </div>
                <div class="blog-conent-box">
                  <div class="blog-content-top">
                    <div class="blog-content-top-left">
                      <div class="author-text">Author:</div>
                      <div class="author-text">${escapeHtml(post.author)}</div>
                    </div>
                    <div class="blog-content-top-right">
                      <div class="blog-date">${escapeHtml(post.displayDate)}</div>
                    </div>
                  </div>
                  <div class="blog-title-button">
                    <h2 class="blog-title" style="margin-bottom: 12px;">${escapeHtml(post.title)}</h2>
                    <p class="blog-excerpt" style="font-size: 14px; color: #5a5a6e; margin-bottom: 24px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(post.excerpt)}</p>
                    <div class="primary-button text-button">
                      <div class="text-box-button">
                        <div class="front-text-button text-link-button">Read more</div>
                      </div>
                      <div class="box-icon-button text-icon">
                        <img loading="lazy" alt="Button Icon" src="${ARROW_ICON}" class="button-icon-front" />
                        <img loading="lazy" alt="Button Icon" src="${ARROW_ICON}" class="button-icon-back" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderBlogList(container, options = {}) {
    if (!container || typeof BlogData === 'undefined') return;

    const limit = options.limit || 0;
    let posts = BlogData.getPublishedPosts();

    if (options.category && options.category !== 'All') {
      posts = posts.filter((p) => p.category === options.category);
    }

    if (limit > 0) {
      posts = posts.slice(0, limit);
    }

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="blog-collection w-dyn-list">
          <p style="padding: 40px 0; opacity: 0.6; text-align: center;">No blog posts published yet.</p>
        </div>`;
      return;
    }

    container.innerHTML = posts.map((post) => renderBlogCard(post)).join('');
  }

  function initDynamicContainers() {
    document.querySelectorAll('[data-blog-dynamic]').forEach((container) => {
      const limit = parseInt(container.dataset.blogLimit || '0', 10);
      const category = container.dataset.blogCategory || 'All';
      renderBlogList(container, { limit, category });
    });
  }

  function renderSinglePost() {
    const slug = getSlugFromUrl();
    if (!slug || typeof BlogData === 'undefined') return null;

    const post = BlogData.getPostBySlug(slug);
    if (!post || post.status !== 'published') return null;

    const displayTitle = post.metaTitle || post.title;
    const displayDesc = post.metaDescription || post.excerpt || `${post.author} — ${post.readTime}`;

    document.title = displayTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = displayDesc;

    setMeta('og:title', displayTitle);
    setMeta('og:description', displayDesc);
    setMeta('og:image', post.heroImage || post.thumbnail);
    setMeta('twitter:title', displayTitle);
    setMeta('twitter:description', displayDesc);
    setMeta('twitter:image', post.heroImage || post.thumbnail);

    const titleEl = document.querySelector('[data-blog-title]');
    if (titleEl) titleEl.textContent = post.title;

    const heroEl = document.querySelector('[data-blog-hero]');
    if (heroEl) {
      heroEl.src = post.heroImage || post.thumbnail;
      heroEl.alt = post.title;
    }

    const authorImgEl = document.querySelector('[data-blog-author-image]');
    if (authorImgEl) authorImgEl.src = post.authorImage;

    const authorNameEl = document.querySelector('[data-blog-author-name]');
    if (authorNameEl) authorNameEl.textContent = post.author;

    const authorRoleEl = document.querySelector('[data-blog-author-role]');
    if (authorRoleEl) authorRoleEl.textContent = post.authorRole;

    const readTimeEl = document.querySelector('[data-blog-read-time]');
    if (readTimeEl) readTimeEl.textContent = post.readTime;

    const contentEl = document.querySelector('[data-blog-content]');
    if (contentEl) contentEl.innerHTML = post.content;

    renderRelatedPosts(post);
    return post;
  }

  function renderRelatedPosts(currentPost) {
    const container = document.querySelector('[data-blog-related]');
    if (!container) return;

    const related = BlogData.getPublishedPosts()
      .filter((p) => p.id !== currentPost.id)
      .slice(0, 3);

    if (related.length === 0) {
      container.closest('.blog-section')?.remove();
      return;
    }

    container.innerHTML = related.map((post) => renderBlogCard(post)).join('');
  }

  function getSlugFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('slug')) return params.get('slug');

    const path = window.location.pathname;
    const match = path.match(/\/blogs\/([^/]+)\.html$/);
    if (match && match[1] !== 'post') return match[1];

    return null;
  }

  function setMeta(property, content) {
    if (!content) return;
    let el = document.querySelector(`meta[property="${property}"]`) ||
      document.querySelector(`meta[name="${property}"]`);
    if (el) el.content = content;
  }

  function showNotFound() {
    const main = document.querySelector('[data-blog-single]');
    if (main) {
      main.innerHTML = `
        <section class="blog-details-page">
          <div class="w-layout-blockcontainer container w-container" style="padding: 120px 0; text-align: center;">
            <h1 class="blog-details-title">Post Not Found</h1>
            <p style="margin: 20px 0 40px; opacity: 0.7;">This blog post doesn't exist or hasn't been published yet.</p>
            <a href="/blog.html" class="primary-button w-inline-block" style="display: inline-flex; padding: 16px 32px;">
              Back to Blog
            </a>
          </div>
        </section>`;
    }
  }

  function init() {
    if (document.querySelector('[data-blog-single]')) {
      const post = renderSinglePost();
      if (!post) showNotFound();
    } else {
      initDynamicContainers();
    }
  }

  return {
    renderBlogList,
    renderSinglePost,
    init,
    getPostUrl
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogRenderer;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BlogRenderer.init());
} else {
  BlogRenderer.init();
}
