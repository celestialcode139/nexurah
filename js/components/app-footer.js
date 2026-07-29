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
              
            </div>
            <div class="footer-middel-wrapper">
            
              <div class="footer-middel-two">
                <div class="footer-bottom-text">
                  © All rights reserved Nexurah
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="footer-bottom-wrapper">
          <div class="w-layout-blockcontainer container w-container">
            <img
              loading="lazy"
              src="/images/footer-logo.svg"
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
