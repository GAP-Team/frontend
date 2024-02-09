import React from "react";

const GFooter = () => {
  return (
    <footer className="footer bg-contrast-high padding-y-md">
      <div className="container max-width-lg">
        <div className="padding-y-md">
          <div className="grid gap-lg">
            <div className="col-3@lg">
              <a className="main-footer__logo" href="#0">
                <svg width="104" height="30" viewBox="0 0 104 30">
                  <title>Go to homepage</title>
                  <path
                    d="M37.54 24.08V3.72h4.92v16.37h8.47v4zM60.47 24.37a7.82 7.82 0 01-5.73-2.25 8.36 8.36 0 01-2-5.62 8.32 8.32 0 012.08-5.71 8 8 0 015.64-2.18 8.07 8.07 0 015.68 2.2 8.49 8.49 0 012 5.69 8.63 8.63 0 01-1.78 5.38 7.6 7.6 0 01-5.89 2.49zm0-3.67c2.42 0 2.73-3 2.73-4.23s-.31-4.26-2.73-4.26-2.79 3-2.79 4.26.32 4.23 2.82 4.23zM95.49 24.37a7.82 7.82 0 01-5.73-2.25 8.36 8.36 0 01-2-5.62 8.32 8.32 0 012.08-5.71 8.4 8.4 0 0111.31 0 8.43 8.43 0 012 5.69 8.6 8.6 0 01-1.77 5.38 7.6 7.6 0 01-5.89 2.51zm0-3.67c2.42 0 2.73-3 2.73-4.23s-.31-4.26-2.73-4.26-2.8 3-2.8 4.26.31 4.23 2.83 4.23zM77.66 30c-5.74 0-7-3.25-7.23-4.52l4.6-.26c.41.91 1.17 1.41 2.76 1.41a2.45 2.45 0 002.82-2.53v-2.68a7 7 0 01-1.7 1.75 6.12 6.12 0 01-5.85-.08c-2.41-1.37-3-4.25-3-6.66 0-.89.12-3.67 1.45-5.42a5.67 5.67 0 014.64-2.4c1.2 0 3 .25 4.46 2.82V8.81h4.85v15.33a5.2 5.2 0 01-2.12 4.32A9.92 9.92 0 0177.66 30zm.15-9.66c2.53 0 2.81-2.69 2.81-3.91s-.31-4-2.81-4-2.81 2.8-2.81 4 .27 3.91 2.81 3.91zM55.56 3.72h9.81v2.41h-9.81z"
                    fill="var(--color-contrast-higher)"
                  />
                  <circle cx="15" cy="15" r="15" fill="var(--color-primary)" />
                </svg>
              </a>
            </div>

            <div className="col-9@lg">
              <div className="grid gap-lg">
                <div className="col-6@xs col-4@md">
                  <h4 className="margin-bottom-xs text-base@md color-white">
                    Immobilienbetreiber
                  </h4>
                  <p className="color-contrast-low margin-bottom-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul className="grid gap-xs text-sm">
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Menu 1
                      </a>
                    </li>
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Menu 2
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-6@xs col-4@md">
                  <h4 className="margin-bottom-xs text-base@md color-white">
                    Dienstleister
                  </h4>
                  <p className="color-contrast-low margin-bottom-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul className="grid gap-xs text-sm">
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Menu 1
                      </a>
                    </li>
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Menu 2
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-6@xs col-4@md">
                  <h4 className="margin-bottom-xs text-base@md color-white">
                    GAP
                  </h4>
                  <p className="color-contrast-low margin-bottom-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <ul className="grid gap-xs text-sm">
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Über Uns
                      </a>
                    </li>
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Jobs
                      </a>
                    </li>
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Presse
                      </a>
                    </li>
                    <li>
                      <a className="color-contrast-low" href="#0">
                        Hilfe
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top border-bg-lighter border-opacity-20% padding-y-sm text-sm@md grid gap-0@md gap-md items-center">
          <div className="col-12 col-3@md">
            <div className="text-sm text-xs@md justify-center justify-start@md color-contrast-lower flex flex-wrap gap-xs">
              <span>&copy; GAP 2023</span>
              <a href="#0" className="color-contrast-lower">
                Impressum
              </a>
              <a href="#0" className="color-contrast-lower">
                Datenschutz
              </a>
              <a href="#0" className="color-contrast-lower">
                Cookies
              </a>
            </div>
          </div>

          <div className="col-10 col-6@md">
            <ul className="flex flex-wrap items-center gap-xs justify-center@md">
              <li>
                <a href="#0" className="socials-v2__btn">
                  <svg className="icon" viewBox="0 0 32 32">
                    <title>Follow us on Twitter</title>
                    <g>
                      <path d="M32,6.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6C25.7,3.8,24,3,22.2,3 c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5C10.3,10.8,5.5,8.2,2.2,4.2c-0.6,1-0.9,2.1-0.9,3.3c0,2.3,1.2,4.3,2.9,5.5 c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1C2.9,27.9,6.4,29,10.1,29c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C30,8.5,31.1,7.4,32,6.1z"></path>
                    </g>
                  </svg>
                </a>
              </li>

              <li>
                <a href="#0" className="socials-v2__btn">
                  <svg className="icon" viewBox="0 0 32 32">
                    <title>Follow us on Facebook</title>
                    <path d="M32,16A16,16,0,1,0,13.5,31.806V20.625H9.438V16H13.5V12.475c0-4.01,2.389-6.225,6.043-6.225a24.644,24.644,0,0,1,3.582.312V10.5H21.107A2.312,2.312,0,0,0,18.5,13v3h4.438l-.71,4.625H18.5V31.806A16,16,0,0,0,32,16Z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a href="#0" className="socials-v2__btn">
                  <svg className="icon" viewBox="0 0 32 32">
                    <title>Follow us on Youtube</title>
                    <path d="M31.7,9.6c0,0-0.3-2.2-1.3-3.2c-1.2-1.3-2.6-1.3-3.2-1.4C22.7,4.7,16,4.7,16,4.7h0c0,0-6.7,0-11.2,0.3 c-0.6,0.1-2,0.1-3.2,1.4c-1,1-1.3,3.2-1.3,3.2S0,12.2,0,14.8v2.4c0,2.6,0.3,5.2,0.3,5.2s0.3,2.2,1.3,3.2c1.2,1.3,2.8,1.2,3.5,1.4 C7.7,27.2,16,27.3,16,27.3s6.7,0,11.2-0.3c0.6-0.1,2-0.1,3.2-1.4c1-1,1.3-3.2,1.3-3.2s0.3-2.6,0.3-5.2v-2.4 C32,12.2,31.7,9.6,31.7,9.6z M12.7,20.2l0-9l8.6,4.5L12.7,20.2z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a href="#0" className="socials-v2__btn">
                  <svg className="icon" viewBox="0 0 32 32">
                    <title>Join our Slack channel</title>
                    <rect x="17" y="1" width="6" height="14" rx="3"></rect>
                    <rect x="1" y="9" width="14" height="6" rx="3"></rect>
                    <rect x="17" y="17" width="14" height="6" rx="3"></rect>
                    <rect x="9" y="17" width="6" height="14" rx="3"></rect>
                    <path d="M12,1a3,3,0,0,0,0,6h3V4A3,3,0,0,0,12,1Z"></path>
                    <path d="M1,20a3,3,0,0,0,6,0V17H4A3,3,0,0,0,1,20Z"></path>
                    <path d="M31,12a3,3,0,0,0-6,0v3h3A3,3,0,0,0,31,12Z"></path>
                    <path d="M20,31a3,3,0,0,0,0-6H17v3A3,3,0,0,0,20,31Z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a href="#0" className="socials-v2__btn">
                  <svg className="icon" viewBox="0 0 32 32">
                    <title>Follow us on Instagram</title>
                    <path d="M16,3.7c4,0,4.479.015,6.061.087a6.426,6.426,0,0,1,4.51,1.639,6.426,6.426,0,0,1,1.639,4.51C28.282,11.521,28.3,12,28.3,16s-.015,4.479-.087,6.061a6.426,6.426,0,0,1-1.639,4.51,6.425,6.425,0,0,1-4.51,1.639c-1.582.072-2.056.087-6.061.087s-4.479-.015-6.061-.087a6.426,6.426,0,0,1-4.51-1.639,6.425,6.425,0,0,1-1.639-4.51C3.718,20.479,3.7,20.005,3.7,16s.015-4.479.087-6.061a6.426,6.426,0,0,1,1.639-4.51A6.426,6.426,0,0,1,9.939,3.79C11.521,3.718,12,3.7,16,3.7M16,1c-4.073,0-4.584.017-6.185.09a8.974,8.974,0,0,0-6.3,2.427,8.971,8.971,0,0,0-2.427,6.3C1.017,11.416,1,11.927,1,16s.017,4.584.09,6.185a8.974,8.974,0,0,0,2.427,6.3,8.971,8.971,0,0,0,6.3,2.427c1.6.073,2.112.09,6.185.09s4.584-.017,6.185-.09a8.974,8.974,0,0,0,6.3-2.427,8.971,8.971,0,0,0,2.427-6.3c.073-1.6.09-2.112.09-6.185s-.017-4.584-.09-6.185a8.974,8.974,0,0,0-2.427-6.3,8.971,8.971,0,0,0-6.3-2.427C20.584,1.017,20.073,1,16,1Z"></path>
                    <path d="M16,8.3A7.7,7.7,0,1,0,23.7,16,7.7,7.7,0,0,0,16,8.3ZM16,21a5,5,0,1,1,5-5A5,5,0,0,1,16,21Z"></path>
                    <circle cx="24.007" cy="7.993" r="1.8"></circle>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-2 col-3@md">
            <a className="back-to-top float-right" href="#">
              <svg className="icon" viewBox="0 0 20 20">
                <polyline
                  points="2 13 10 5 18 13"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GFooter;
