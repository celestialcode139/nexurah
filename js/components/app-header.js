class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <div class="header-content-wrapper">
          <div class="w-layout-blockcontainer container w-container">
            <div
              data-animation="default"
              data-collapse="medium"
              data-duration="400"
              data-easing="ease"
              data-easing2="ease"
              role="banner"
              class="navbar w-nav"
            >
              <div class="navbar-content-area">
                <div class="logo-and-navbar">
                  <a href="/index.html" class="nav-logo w-nav-brand">
                    <img alt="logo" src="/images/logo.svg" class="nav-logo-image" />
                  </a>
                  <div class="humburger-button">
                    <div class="nav-button-wrap">
                      <div
                        data-w-id="1f3c6ca5-0a96-dbdf-9747-d9bc6b712173"
                        class="humberger-menu-wrap w-nav-button"
                      >
                        <div class="mobaile-bar">
                          <div class="path-bar _01"></div>
                          <div class="path-bar _02"></div>
                          <div class="path-bar _03"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="header-button">
                  <a href="/contact.html" class="primary-button w-inline-block">
                    <div class="text-box-button">
                      <div class="front-text-button">Book Consultation</div>
                      <div class="back-text-button">Book Consultation</div>
                    </div>
                    <div class="box-icon-button">
                      <img
                        alt="Button Icon "
                        src="/images/69ccb71d3d6d5fbb07e6dbbb_arrow.svg"
                        class="button-icon-front"
                      />
                      <img
                        alt="Button Icon "
                        src="/images/69ccb71d3d6d5fbb07e6dbbb_arrow.svg"
                        class="button-icon-back"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
