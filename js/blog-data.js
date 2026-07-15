/**
 * Blog Data Manager
 * Central data layer for the Optina Blog CMS
 * Uses localStorage for persistence
 */

const BlogData = (() => {
  const STORAGE_KEY = 'optina_blog_posts';
  const INITIALIZED_KEY = 'optina_blog_initialized';

  // Default seed data matching the existing blog posts
  const defaultPosts = [
    {
      id: 'post_001',
      title: '5 Essential Steps to Build a Growth-Ready and Scalable Business',
      slug: '5-essential-steps-to-build-a-growth-ready-and-scalable-business',
      excerpt: 'Building a business that can grow consistently and scale efficiently requires the right foundation. Discover the five essential steps every growth-ready business must take.',
      author: 'Samantha',
      authorImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif',
      authorRole: 'Business Analyst',
      date: '2026-04-18',
      displayDate: '18 Apr 2026',
      category: 'Business Strategy',
      readTime: '8 min read',
      thumbnail: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc3c502d47ed21bc66853_01.webp',
      thumbnailSrcset: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc3c502d47ed21bc66853_01-p-500.webp 500w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc3c502d47ed21bc66853_01-p-800.webp 800w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc3c502d47ed21bc66853_01-p-1080.webp 1080w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc3c502d47ed21bc66853_01-p-1600.webp 1600w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc3c502d47ed21bc66853_01.webp 2080w',
      heroImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69e36895cd032e49f7281715_hh.webp',
      status: 'published',
      content: `<p>Building a business is one thing—building a business that can grow consistently and scale efficiently is another. Many companies hit a plateau not because of a lack of demand, but because their systems, strategy, and structure aren't designed for growth.</p>
<p>If you want to create a business that can expand without breaking, these five essential steps will help you lay the right foundation.</p>
<h3>1. Define a Clear Growth Strategy</h3>
<p>Growth doesn't happen by chance—it's intentional.</p>
<p>A growth-ready business starts with a clear strategy that outlines:</p>
<ul><li>Target market and positioning</li><li>Revenue goals and growth milestones</li><li>Competitive advantage</li></ul>
<p>Without a defined direction, businesses often chase too many opportunities and lose focus. A strong strategy ensures every decision supports long-term growth.</p>
<h3>2. Build Scalable Systems and Processes</h3>
<p>One of the biggest barriers to scaling is relying too heavily on manual work.</p>
<p>To grow efficiently, your business needs:</p>
<ul><li>Standardized processes</li><li>Automation where possible</li><li>Clear workflows across teams</li></ul>
<p>Scalable systems reduce errors, save time, and allow your business to handle increased demand without increasing complexity.</p>
<h3>3. Focus on Data-Driven Decision Making</h3>
<p>Growing businesses rely on data—not guesswork.</p>
<p>Tracking the right metrics helps you:</p>
<ul><li>Identify what's working (and what's not)</li><li>Optimize operations and marketing</li><li>Make faster, smarter decisions</li></ul>
<p>From customer acquisition costs to operational efficiency, data provides the clarity needed to scale confidently.</p>
<h3>4. Strengthen Your Team and Leadership</h3>
<p>Your business can only grow as fast as your team can support it.</p>
<p>A growth-ready organization:</p>
<ul><li>Invests in hiring the right talent</li><li>Builds strong leadership at every level</li><li>Encourages accountability and ownership</li></ul>
<p>Empowered teams make better decisions, move faster, and drive sustainable growth.</p>
<h3>5. Optimize and Adapt Continuously</h3>
<p>Scaling isn't a one-time effort—it's an ongoing process.</p>
<p>Markets change, customer needs evolve, and new challenges emerge. Businesses that succeed long-term are those that:</p>
<ul><li>Regularly review performance</li><li>Improve systems and strategies</li><li>Stay flexible and open to change</li></ul>
<p>Continuous optimization ensures your business remains competitive and ready for the next stage of growth.</p>
<h3>Final Thoughts</h3>
<p>Building a scalable business isn't about working harder—it's about working smarter. With the right strategy, systems, and mindset, you can create a business that not only grows but thrives under pressure.</p>`,
      createdAt: '2026-04-18T11:34:05.474Z',
      updatedAt: '2026-04-18T11:34:05.474Z'
    },
    {
      id: 'post_002',
      title: 'How to Optimize Business Operations for Maximum Efficiency',
      slug: 'how-to-optimize-business-operations-for-maximum-efficiency',
      excerpt: 'Operational efficiency is the backbone of every successful business. Learn how to identify bottlenecks, automate repetitive tasks, and build a streamlined operation.',
      author: 'Michael',
      authorImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif',
      authorRole: 'Operations Lead',
      date: '2026-04-18',
      displayDate: '18 Apr 2026',
      category: 'Operations',
      readTime: '6 min read',
      thumbnail: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc39688a0f6a9029ca30e_06.webp',
      thumbnailSrcset: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc39688a0f6a9029ca30e_06-p-500.webp 500w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc39688a0f6a9029ca30e_06-p-800.webp 800w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc39688a0f6a9029ca30e_06-p-1080.webp 1080w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc39688a0f6a9029ca30e_06-p-1600.webp 1600w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc39688a0f6a9029ca30e_06.webp 2080w',
      heroImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc39688a0f6a9029ca30e_06.webp',
      status: 'published',
      content: `<p>Operational efficiency is the backbone of every successful business. Without streamlined operations, even the best strategies fall short.</p>
<h3>Identify Bottlenecks</h3>
<p>The first step to optimizing operations is identifying where inefficiencies exist. Look at your workflows, communication channels, and resource allocation to find areas that slow your team down.</p>
<h3>Automate Repetitive Tasks</h3>
<p>Automation is one of the most powerful tools for improving efficiency. From email marketing to data entry, automating repetitive tasks frees your team to focus on high-value work.</p>
<h3>Streamline Communication</h3>
<p>Poor communication is a silent killer of productivity. Implement clear communication protocols and use tools that keep everyone aligned and informed.</p>
<h3>Measure and Improve</h3>
<p>You can't improve what you don't measure. Set clear KPIs for your operations and review them regularly to ensure continuous improvement.</p>`,
      createdAt: '2026-04-18T11:34:05.474Z',
      updatedAt: '2026-04-18T11:34:05.474Z'
    },
    {
      id: 'post_003',
      title: 'Financial Clarity: Use Data Insights to Drive Smarter Business Decisions',
      slug: 'financial-clarity-use-data-insights-to-drive-smarter-business-decisions',
      excerpt: 'Financial clarity isn\'t a luxury—it\'s a necessity. Discover how data-driven financial insights empower leaders to make smarter decisions with confidence.',
      author: 'Andrew',
      authorImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif',
      authorRole: 'Financial Advisor',
      date: '2026-04-18',
      displayDate: '18 Apr 2026',
      category: 'Finance',
      readTime: '7 min read',
      thumbnail: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc34581cca6f57ecb9502_05.webp',
      thumbnailSrcset: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc34581cca6f57ecb9502_05-p-500.webp 500w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc34581cca6f57ecb9502_05-p-800.webp 800w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc34581cca6f57ecb9502_05-p-1080.webp 1080w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc34581cca6f57ecb9502_05-p-1600.webp 1600w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc34581cca6f57ecb9502_05.webp 2080w',
      heroImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc34581cca6f57ecb9502_05.webp',
      status: 'published',
      content: `<p>In today's fast-paced business environment, financial clarity isn't a luxury—it's a necessity. Data-driven financial insights empower leaders to make smarter decisions with confidence.</p>
<h3>Understanding Your Numbers</h3>
<p>Every business decision has a financial impact. Understanding your revenue streams, cost structures, and profit margins gives you the foundation to make informed choices.</p>
<h3>Leveraging Data Analytics</h3>
<p>Modern analytics tools make it easier than ever to track financial performance in real-time. Use dashboards and reports to monitor key metrics and spot trends before they become problems.</p>
<h3>Forecasting for the Future</h3>
<p>Data insights aren't just about looking backward—they're about planning forward. Use historical data to build accurate forecasts and prepare for what's ahead.</p>`,
      createdAt: '2026-04-18T11:34:05.474Z',
      updatedAt: '2026-04-18T11:34:05.474Z'
    },
    {
      id: 'post_004',
      title: "Turning Today's Market Challenges into Long-Term Strategic Growth Opportunities",
      slug: 'turning-todays-market-challenges-into-long-term-strategic-growth-opportunities',
      excerpt: 'Every market challenge carries within it the seed of an opportunity. Learn how successful leaders reframe obstacles as stepping stones to strategic growth.',
      author: 'Carter',
      authorImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif',
      authorRole: 'Strategy Director',
      date: '2026-04-18',
      displayDate: '18 Apr 2026',
      category: 'Business Strategy',
      readTime: '5 min read',
      thumbnail: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2ad22e68c81477fa3c2_04.webp',
      thumbnailSrcset: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2ad22e68c81477fa3c2_04-p-500.webp 500w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2ad22e68c81477fa3c2_04-p-800.webp 800w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2ad22e68c81477fa3c2_04-p-1080.webp 1080w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2ad22e68c81477fa3c2_04-p-1600.webp 1600w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2ad22e68c81477fa3c2_04.webp 2080w',
      heroImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2ad22e68c81477fa3c2_04.webp',
      status: 'published',
      content: `<p>Every market challenge carries within it the seed of an opportunity. The businesses that thrive are the ones that learn to see obstacles as stepping stones to strategic growth.</p>
<h3>Reframing Challenges</h3>
<p>Instead of viewing market disruptions as threats, successful leaders reframe them as opportunities to innovate, differentiate, and capture new market share.</p>
<h3>Building Resilience</h3>
<p>Resilient businesses don't just survive challenges—they emerge stronger. Building resilience means diversifying revenue streams, maintaining financial reserves, and staying agile.</p>
<h3>Strategic Positioning</h3>
<p>Use challenging times to strengthen your market position. While competitors pull back, invest in your brand, your team, and your customer relationships.</p>`,
      createdAt: '2026-04-18T11:34:05.474Z',
      updatedAt: '2026-04-18T11:34:05.474Z'
    },
    {
      id: 'post_005',
      title: 'How Modern Smart Businesses Scale Faster with Data-Driven Decision Making',
      slug: 'how-modern-smart-businesses-scale-faster-with-data-driven-decision-making',
      excerpt: 'Data is the new currency of business success. Companies that harness the power of data-driven decision making are scaling faster and more sustainably than ever before.',
      author: 'Olivia',
      authorImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif',
      authorRole: 'Data Strategist',
      date: '2026-04-18',
      displayDate: '18 Apr 2026',
      category: 'Data & Analytics',
      readTime: '7 min read',
      thumbnail: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2250db5d101ca56b703_03.webp',
      thumbnailSrcset: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2250db5d101ca56b703_03-p-500.webp 500w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2250db5d101ca56b703_03-p-800.webp 800w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2250db5d101ca56b703_03-p-1080.webp 1080w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2250db5d101ca56b703_03-p-1600.webp 1600w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2250db5d101ca56b703_03.webp 2080w',
      heroImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc2250db5d101ca56b703_03.webp',
      status: 'published',
      content: `<p>Data is the new currency of business success. Companies that harness the power of data-driven decision making are scaling faster and more sustainably than ever before.</p>
<h3>The Data Advantage</h3>
<p>Data-driven businesses make decisions based on evidence, not intuition. This leads to better outcomes, reduced risk, and faster growth.</p>
<h3>Building a Data Culture</h3>
<p>Creating a data-driven organization starts with culture. Every team member should understand the value of data and have access to the insights they need.</p>
<h3>Tools and Technology</h3>
<p>Invest in the right analytics tools that give you real-time visibility into your business performance. From CRM analytics to financial dashboards, the right tools make all the difference.</p>`,
      createdAt: '2026-04-18T11:34:05.474Z',
      updatedAt: '2026-04-18T11:34:05.474Z'
    },
    {
      id: 'post_006',
      title: 'From Operational Inefficiencies to Scalable High-Performance Business Systems',
      slug: 'from-operational-inefficiencies-to-scalable-high-performance-business-systems',
      excerpt: 'Many businesses struggle with operational inefficiencies that drain resources and limit growth. Learn how to transition from chaotic operations to scalable, high-performance systems.',
      author: 'James',
      authorImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif',
      authorRole: 'Systems Architect',
      date: '2026-04-18',
      displayDate: '18 Apr 2026',
      category: 'Operations',
      readTime: '6 min read',
      thumbnail: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc1de9d8d99a670ac0cda_02.webp',
      thumbnailSrcset: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc1de9d8d99a670ac0cda_02-p-500.webp 500w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc1de9d8d99a670ac0cda_02-p-800.webp 800w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc1de9d8d99a670ac0cda_02-p-1080.webp 1080w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc1de9d8d99a670ac0cda_02-p-1600.webp 1600w, https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc1de9d8d99a670ac0cda_02.webp 2080w',
      heroImage: 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69dbc1de9d8d99a670ac0cda_02.webp',
      status: 'published',
      content: `<p>Many businesses struggle with operational inefficiencies that drain resources and limit growth. The transition from chaotic operations to scalable, high-performance systems is critical for long-term success.</p>
<h3>Diagnosing Inefficiencies</h3>
<p>Start by mapping your current processes. Identify redundancies, bottlenecks, and areas where manual work could be automated or eliminated.</p>
<h3>Designing Scalable Systems</h3>
<p>Build systems that can grow with your business. This means investing in technology, creating standardized procedures, and building flexibility into your operations.</p>
<h3>Implementation and Training</h3>
<p>The best systems are only as good as the people using them. Invest in training your team and creating a culture of continuous improvement.</p>`,
      createdAt: '2026-04-18T11:34:05.474Z',
      updatedAt: '2026-04-18T11:34:05.474Z'
    }
  ];

  /** Initialize localStorage with seed data if not already done */
  function initialize() {
    if (!localStorage.getItem(INITIALIZED_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
      localStorage.setItem(INITIALIZED_KEY, 'true');
    }
  }

  /** Get all posts from localStorage */
  function getAllPosts() {
    initialize();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /** Get only published posts */
  function getPublishedPosts() {
    return getAllPosts().filter(p => p.status === 'published');
  }

  /** Get only draft posts */
  function getDraftPosts() {
    return getAllPosts().filter(p => p.status === 'draft');
  }

  /** Get a single post by slug */
  function getPostBySlug(slug) {
    return getAllPosts().find(p => p.slug === slug) || null;
  }

  /** Get a single post by ID */
  function getPostById(id) {
    return getAllPosts().find(p => p.id === id) || null;
  }

  /** Generate a URL-friendly slug from a title */
  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /** Generate a unique post ID */
  function generateId() {
    return 'post_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  }

  /** Format a date string for display */
  function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  /** Save posts array to localStorage */
  function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  /** Auto-generate excerpt from content HTML */
  function generateExcerpt(content, maxLength = 160) {
    if (!content) return '';
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength).replace(/\s+\S*$/, '') + '…' : text;
  }

  /** Create a new post */
  function createPost(postData) {
    const posts = getAllPosts();
    const now = new Date().toISOString();
    const newPost = {
      id: generateId(),
      title: postData.title || 'Untitled Post',
      slug: postData.slug || generateSlug(postData.title || 'untitled-post'),
      excerpt: postData.excerpt || generateExcerpt(postData.content),
      metaTitle: postData.metaTitle || '',
      metaDescription: postData.metaDescription || '',
      author: postData.author || 'Admin',
      authorImage: postData.authorImage || 'https://cdn.prod.website-files.com/69ccb71d3d6d5fbb07e6db1d/69d373306caf0225da0f9584_Ellipse%201474.avif',
      authorRole: postData.authorRole || 'Writer',
      date: postData.date || now.split('T')[0],
      displayDate: postData.date ? formatDate(postData.date) : formatDate(now.split('T')[0]),
      category: postData.category || 'General',
      readTime: postData.readTime || '5 min read',
      thumbnail: postData.thumbnail || '',
      thumbnailSrcset: postData.thumbnailSrcset || '',
      heroImage: postData.heroImage || postData.thumbnail || '',
      status: postData.status || 'draft',
      content: postData.content || '',
      createdAt: now,
      updatedAt: now
    };

    // Ensure unique slug
    let slugBase = newPost.slug;
    let counter = 1;
    while (posts.some(p => p.slug === newPost.slug)) {
      newPost.slug = `${slugBase}-${counter}`;
      counter++;
    }

    posts.unshift(newPost); // Add to beginning
    savePosts(posts);

    // Dispatch event so other pages can react
    window.dispatchEvent(new CustomEvent('blogDataChanged', { detail: { action: 'create', post: newPost } }));
    return newPost;
  }

  /** Update an existing post */
  function updatePost(id, updates) {
    const posts = getAllPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedPost = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Auto-generate excerpt if not provided
    if (!updates.excerpt && updates.content) {
      updatedPost.excerpt = generateExcerpt(updates.content);
    }

    // Regenerate slug only if title changed AND no manual slug provided
    if (updates.title && updates.title !== posts[index].title && !updates.slugManual) {
      updatedPost.slug = generateSlug(updates.title);
      // Ensure unique slug
      let slugBase = updatedPost.slug;
      let counter = 1;
      while (posts.some((p, i) => i !== index && p.slug === updatedPost.slug)) {
        updatedPost.slug = `${slugBase}-${counter}`;
        counter++;
      }
    }

    // Update display date if date changed
    if (updates.date) {
      updatedPost.displayDate = formatDate(updates.date);
    }

    posts[index] = updatedPost;
    savePosts(posts);

    // Dispatch event
    window.dispatchEvent(new CustomEvent('blogDataChanged', { detail: { action: 'update', post: updatedPost } }));
    return updatedPost;
  }

  /** Delete a post by ID */
  function deletePost(id) {
    const posts = getAllPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    savePosts(filtered);

    // Dispatch event
    window.dispatchEvent(new CustomEvent('blogDataChanged', { detail: { action: 'delete', id } }));
    return true;
  }

  /** Get all unique categories */
  function getCategories() {
    const posts = getAllPosts();
    return [...new Set(posts.map(p => p.category))].filter(Boolean).sort();
  }

  /** Search posts by title, author, or category */
  function searchPosts(query) {
    const q = query.toLowerCase();
    return getAllPosts().filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.excerpt || '').toLowerCase().includes(q)
    );
  }

  /** Get posts filtered by category */
  function getPostsByCategory(category) {
    if (!category || category === 'All') return getAllPosts();
    return getAllPosts().filter(p => p.category === category);
  }

  /** Get post count stats */
  function getStats() {
    const posts = getAllPosts();
    return {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      categories: [...new Set(posts.map(p => p.category))].length
    };
  }

  /** Reset to default data (for development) */
  function resetToDefaults() {
    localStorage.removeItem(INITIALIZED_KEY);
    localStorage.removeItem(STORAGE_KEY);
    initialize();
    window.dispatchEvent(new CustomEvent('blogDataChanged', { detail: { action: 'reset' } }));
  }

  // Auto-initialize on load
  initialize();

  return {
    getAllPosts,
    getPublishedPosts,
    getDraftPosts,
    getPostBySlug,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getCategories,
    searchPosts,
    getPostsByCategory,
    getStats,
    generateSlug,
    generateExcerpt,
    formatDate,
    resetToDefaults
  };
})();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BlogData;
}
