/**
 * Optina CMS Authentication Module
 * 
 * Note: This is client-side authentication. It is not secure against
 * a determined attacker. It is meant to deter casual visitors.
 */

const Auth = (function() {
  const AUTH_KEY = 'optina_cms_auth';
  // Default password. In a real system, this should never be hardcoded on the client.
  const PASSWORD = 'admin'; 

  return {
    isAuthenticated: function() {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    },

    login: function(password) {
      if (password === PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        return true;
      }
      return false;
    },

    logout: function() {
      sessionStorage.removeItem(AUTH_KEY);
      window.location.href = '/login.html';
    },

    // To be called at the very top of protected pages (like blog-cms.html)
    requireAuth: function() {
      if (!this.isAuthenticated()) {
        window.location.href = '/login.html';
      }
    },

    // To be called at the very top of the login page
    redirectIfAuthenticated: function() {
      if (this.isAuthenticated()) {
        window.location.href = '/blog-cms.html';
      }
    }
  };
})();
