class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer-section">
        <div class="footer-top-wrappers">
          <div class="w-layout-blockcontainer container w-container">
            <div class="footer-top-wrapper">
              <div slideup="up" class="footer-top-left-box">
                <h3 textcolor="color" class="footer-top-title">
                  Challenges in business? We provide solutions.
                </h3>
                <div class="footer-button">
                  <a
                    data-w-id="0e6a5b3a-5f48-a002-fad2-6f17aea5003e"
                    href="/contact.html"
                    class="primary-button two w-inline-block"
                  >
                    <div class="text-box-button">
                      <div class="front-text-button two">Grow Your Business</div>
                      <div class="back-text-button two">Grow Your Business</div>
                    </div>
                    <div class="box-icon-button">
                      <img
                        alt="Button Icon "
                        src="/images/69ccda26bca3ac7667d2a3e2_Vector.svg"
                        class="button-icon-front"
                      />
                      <img
                        alt="Button Icon "
                        src="/images/69ccda26bca3ac7667d2a3e2_Vector.svg"
                        class="button-icon-back"
                      />
                    </div>
                    <div class="button-overlay"></div>
                  </a>
                </div>
              </div>
              <div slideup="up" class="footer-top-right-box">
                <div class="footer-menu-block">
                  <div class="footer-menu-title-box">
                    <div class="footer-menu-title">Navigation</div>
                  </div>
                  <div class="footer-menu-list">
                    <a href="/index.html" class="footer-menu-link">Home</a>
                    <a href="/about.html" class="footer-menu-link">About Us</a>
                    <a href="/services.html" class="footer-menu-link">Our Services</a>
                    <a href="/team.html" class="footer-menu-link">Our Experts</a>
                    <a href="/blog.html" class="footer-menu-link">Blogs</a>
                    <a href="/faq.html" class="footer-menu-link">FAQs</a>
                    <a href="/contact.html" class="footer-menu-link">Contact Us</a>
                  </div>
                </div>
                <div
                  id="w-node-a1dac826-6b4b-8271-ee2c-da32b15a3d42-b15a3d22"
                  class="footer-menu-block _02"
                >
                  <div class="footer-menu-title-box">
                    <div class="footer-menu-title">Industry Solutions</div>
                  </div>
                  <div class="footer-menu-list">
                    <a href="/services.html" class="footer-menu-link">Brand & Product</a>
                    <a href="/services/digital-transformation.html" class="footer-menu-link">Transformation</a>
                    <a href="/services/financial-strategy-insights.html" class="footer-menu-link">Financial Growth</a>
                    <a href="/services/marketing-brand-consulting.html" class="footer-menu-link">Consultation</a>
                    <a href="/services/risk-compliance-management.html" class="footer-menu-link">Risk & Compliance</a>
                  </div>
                </div>
                <div
                  id="w-node-a1dac826-6b4b-8271-ee2c-da32b15a3d51-b15a3d22"
                  class="footer-menu-block"
                >
                  <div class="footer-menu-title-box">
                    <div class="footer-menu-title">Essentials</div>
                  </div>
                  <div class="footer-menu-list">
                    <a href="/style-guide.html" class="footer-menu-link">Style Guide</a>
                    <a href="/changelog.html" class="footer-menu-link">Changelog</a>
                    <a href="/license.html" class="footer-menu-link">Licenses</a>
                    <a href="/404.html" class="footer-menu-link">404 Error Page</a>
                  </div>
                </div>
                <div
                  id="w-node-a1dac826-6b4b-8271-ee2c-da32b15a3d5e-b15a3d22"
                  class="footer-menu-block"
                >
                  <div class="footer-menu-title-box">
                    <div class="footer-menu-title">Social</div>
                  </div>
                  <div class="footer-menu-list">
                    <a href="https://linkedin.com/company/pixora-agency" target="_blank" class="footer-menu-link">Linkedin</a>
                    <a href="https://dribbble.com/pixoora" target="_blank" class="footer-menu-link">Dribbble</a>
                    <a href="https://x.com/pixoora" target="_blank" class="footer-menu-link">Instagram</a>
                    <a href="https://www.youtube.com/@Pixoorabd" target="_blank" class="footer-menu-link">Youtube</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-middel-wrapper">
              <div class="footer-middel-one">
                <div class="footer-bottom-text">
                  Powered by&nbsp;<a href="https://webflow.com/" target="_blank" class="footer-bottom-link">Webflow</a>
                </div>
              </div>
              <div class="footer-middel-two">
                <div class="footer-bottom-text">
                  © All rights reserved by&nbsp;OPTINA&nbsp;
                </div>
              </div>
              <div class="footer-middel-three">
                <div class="footer-bottom-text">
                  Design & Developed by
                  <a href="https://pixoora.com/" target="_blank" class="footer-bottom-link">PIXOORA</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom-wrapper">
          <div class="w-layout-blockcontainer container w-container">
            <img
              loading="lazy"
              src="/images/69edc4881e0c274586aa35aa_Logo%20Text.svg"
              alt="image"
              class="footer-bottom-image"
            />
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
