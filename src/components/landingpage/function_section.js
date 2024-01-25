import React from "react";

const FunctionSection = () => {
  return (
    <section className="hiw-v2 position-relative z-index-1 padding-top-xxl">
      <div className="container max-width-adaptive-lg padding-bottom-md">
        <div className="margin-bottom-xl text-center ">
          <div className="margin-bottom-xs">
            <span className="badge badge--warning-light text-sm font-bold">
              In 3 Schritten zum Erfolg
            </span>
          </div>
          <h2 className="text-xxl">So funktioniert GAP</h2>
          <div className="text-component margin-top-md max-width-adaptive-md margin-left-auto margin-right-auto  line-height-lg text-space-y-lg">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta
              maxime, maiores reiciendis fuga animi, quidem similique
              perspiciatis neque doloremque ut veniam modi earum non iste
              assumenda voluptates impedit velit debitis, voluptas aspernatur
              dolore incidunt pariatur beatae?
            </p>
          </div>
        </div>

        <ul className="hiw-v2__grid">
          <li className="hiw-v2__item">
            <div className="hiw-v2__figure margin-bottom-md">
              <a
                className="card-v14 col-6@xs col-4@lg items-center items-start@md"
                href="#0"
              >
                <figure className="card-v14__icon-wrapper" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="card-v14__icon icon fill-current"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
                    <path d="M16 4h2a2 2 0 0 1 1.73 1" />
                    <path d="M18.42 9.61a2.1 2.1 0 1 1 2.97 2.97L16.95 17 13 18l.99-3.95 4.43-4.44Z" />
                    <path d="M8 18h1" />
                  </svg>
                </figure>

                <h3 className="text-md">Auftrag beschreiben</h3>

                <p className="color-contrast-medium line-height-lg margin-y-xs text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente dolorem officia consequatur inventore omnis.
                </p>
              </a>

              <svg className="hiw-v2__arrow" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  className="color-accent-lighter fill-current"
                />
                <polyline
                  points="29 17 20 26 11 17"
                  fill="none"
                  stroke="var(--color-white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </li>

          <li className="hiw-v2__item">
            <div className="hiw-v2__figure margin-bottom-md">
              <a
                className="card-v14 col-6@xs col-4@lg items-center items-start@md"
                href="#0"
              >
                <figure className="card-v14__icon-wrapper" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="card-v14__icon icon fill-current"
                  >
                    <path d="M3 2v6h6" />
                    <path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
                    <path d="M21 22v-6h-6" />
                    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
                    <circle cx="12" cy="12" r="1" />
                  </svg>{" "}
                </figure>

                <h3 className="text-md">Angebote erhalten</h3>

                <p className="color-contrast-medium line-height-lg margin-y-xs text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente dolorem officia consequatur inventore omnis.
                </p>
              </a>

              <svg className="hiw-v2__arrow" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  className="color-accent-lighter fill-current"
                />
                <polyline
                  points="29 17 20 26 11 17"
                  fill="none"
                  stroke="var(--color-white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </li>

          <li className="hiw-v2__item">
            <div className="hiw-v2__figure margin-bottom-md">
              <a
                className="card-v14 col-6@xs col-4@lg items-center items-start@md"
                href="#0"
              >
                <figure className="card-v14__icon-wrapper" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="card-v14__icon icon fill-current"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </figure>

                <h3 className="text-md">Problem gelöst</h3>

                <p className="color-contrast-medium line-height-lg margin-y-xs text-sm">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente dolorem officia consequatur inventore omnis.
                </p>
              </a>

              <svg className="hiw-v2__arrow bg-success" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  className="color-accent-lighter fill-current"
                />
                <polyline
                  points="29 17 20 26 11 17"
                  fill="none"
                  stroke="var(--color-white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </li>
        </ul>

        <div className="margin-top-md text-center">
          <a className="btn btn--md btn--accent">
            <span className="margin-left-sm">Jetzt loslegen</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon--sm margin-x-sm"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </a>
        </div>
      </div>

      <div className="bg-contrast-high margin-top-lg inner-shadow">
        <div className="max-width-lg container">
          <ul className="padding-y-sm list list--icons color-bg-lighter grid gap-lg justify-center@xs items-center">
            <li className="col-10 col-4@xs col-content@lg">
              <div className="flex items-start">
                <svg
                  className="list__icon icon color-success"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="12" opacity="0.2" />
                  <path d="M9.5,17a1,1,0,0,1-.707-.293l-3-3a1,1,0,0,1,1.414-1.414L9.5,14.586l7.293-7.293a1,1,0,1,1,1.414,1.414l-8,8A1,1,0,0,1,9.5,17Z" />
                </svg>
                <div>Kostenlos & Unverbindlich</div>
              </div>
            </li>
            <li className="col-10 col-4@xs col-content@lg">
              <div className="flex items-start">
                <svg
                  className="list__icon icon color-success"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="12" opacity="0.2" />
                  <path d="M9.5,17a1,1,0,0,1-.707-.293l-3-3a1,1,0,0,1,1.414-1.414L9.5,14.586l7.293-7.293a1,1,0,1,1,1.414,1.414l-8,8A1,1,0,0,1,9.5,17Z" />
                </svg>
                <div>von mehr als 1. Mio Auftraggebern genutzt</div>
              </div>
            </li>
            <li className="col-10 col-4@xs col-content@lg">
              <div className="flex items-start">
                <svg
                  className="list__icon icon color-success"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="12" opacity="0.2" />
                  <path d="M9.5,17a1,1,0,0,1-.707-.293l-3-3a1,1,0,0,1,1.414-1.414L9.5,14.586l7.293-7.293a1,1,0,1,1,1.414,1.414l-8,8A1,1,0,0,1,9.5,17Z" />
                </svg>
                <div>mehr als 150.000 Handwerksbetriebe</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <figure className="bg-decoration-v4 z-index-1" aria-hidden="true">
        <svg
          className="bg-decoration-v4__svg color-bg top-0 left-50% -translate-x-50% flip-y"
          viewBox="0 0 1440 109"
        >
          <defs>
            <linearGradient
              id="bg-decoration-v4-fx-5-linear-gradient"
              x1="2738"
              y1="-106"
              x2="2793"
              y2="-106"
              gradientTransform="matrix(-1, 0, 0, 1, 4068, 188)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="currentColor" stopOpacity="0.41" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="bg-decoration-v4-fx-5-linear-gradient-2"
              x1="2902.973"
              y1="-25.99"
              x2="2793.027"
              y2="-23.01"
              gradientTransform="matrix(-1, 0, 0, 1, 4178, 80)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="currentColor" stopOpacity="0.15" />
              <stop offset="1" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <rect
            x="1330"
            y="55"
            width="55"
            height="54"
            fill="currentColor"
            opacity="0.37"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="1275"
            y="55"
            width="55"
            height="54"
            fill="url(#bg-decoration-v4-fx-5-linear-gradient)"
          />
          <rect
            x="1385"
            y="55"
            width="55"
            height="54"
            fill="currentColor"
            opacity="0.11"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="1385"
            width="55"
            height="55"
            fill="currentColor"
            opacity="0.4"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="1065"
            y="54"
            width="55"
            height="55"
            fill="currentColor"
            opacity="0.4"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="350"
            y="54"
            width="55"
            height="55"
            fill="currentColor"
            opacity="0.4"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="1385"
            y="55"
            width="28"
            height="28"
            fill="currentColor"
            opacity="0.88"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="1092"
            y="81"
            width="28"
            height="28"
            fill="currentColor"
            opacity="0.88"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="945"
            y="67"
            width="28"
            height="28"
            fill="currentColor"
            opacity="0.88"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="589"
            y="81"
            width="28"
            height="28"
            fill="currentColor"
            opacity="0.88"
            style={{ isolation: "isolate" }}
          />
          <rect
            x="1275"
            y="55"
            width="110"
            height="1"
            fill="url(#bg-decoration-v4-fx-5-linear-gradient-2)"
          />
        </svg>
      </figure>
    </section>
  );
};

export default FunctionSection;
