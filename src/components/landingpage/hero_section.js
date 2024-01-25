import Image from "next/legacy/image";
import { useRef } from "react";
import classes from "./hero_section.module.css";

const HeroSection = () => {
  const gewerk = useRef();
  const auftragstyp = useRef();
  const bundesland = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const gewerkWert = gewerk.current.value;
    const auftragstypWert = auftragstyp.current.value;
    const bundeslandWert = bundesland.current.value;

    console.log(gewerkWert + " " + auftragstypWert + " " + bundeslandWert);
  };

  return (
    <section className="boxed-hero hero-video-bg padding-top-xxxl padding-bottom-xxl has-section-divider-bottom">
      <Image
        src="/images/hero6.jpg"
        alt="hero section background image"
        layout="fill"
        objectFit="cover"
      />
      <div className="position-relative container max-width-adaptive-md boxed-hero__target js-boxed-hero__target">
        <div className="position-relative z-index-2 bg bg-opacity-60% radius-lg padding-md inner-glow backdrop-blur-10 padding-lg@md">
          <div className="text-component line-height-lg text-space-y-md text-center">
            <div className="margin-bottom-xs">
              <span className="badge badge--success-light text-sm font-bold">
                GAP - Gesetzliche Anlagen Prüfung
              </span>
            </div>

            <h1 className="text-xxxl feature-v4__text-offset@md ">
              Unternehmen gesucht?
            </h1>
            <p className="text-md padding-y-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, rem
              neque doloribus impedit explicabo minus laborum cupiditate atque
              esse consectetur.
            </p>
          </div>
          <form
            className={`margin-top-md ${classes.controls}`}
            onSubmit={submitHandler}
          >
            <div className="grid gap-sm items-end">
              <div
                className={`col-4@md col-12sm autocomplete position-relative select-auto js-select-auto js-autocomplete ${classes.control}`}
                data-autocomplete-dropdown-visible-class="autocomplete--results-visible"
              >
                <label
                  className="form-label margin-bottom-xxs"
                  htmlFor="autocomplete-input-id"
                >
                  Wählen Sie ein Gewerk aus:
                </label>

                <select className={`js-select-auto__select`} ref={gewerk}>
                  <optgroup label="Gewerke">
                    <option>Gewerke</option>
                    <option value="0">Option 1</option>
                    <option value="1">Option 2</option>
                    <option value="2">Option 3</option>
                    <option value="3">Option 4</option>
                    <option value="4">Option 5</option>
                  </optgroup>
                </select>
              </div>

              <div
                className={`col-4@md col-12sm autocomplete position-relative select-auto js-select-auto js-autocomplete ${classes.control}`}
                data-autocomplete-dropdown-visible-class="autocomplete--results-visible"
              >
                <label
                  className="form-label margin-bottom-xxs"
                  htmlFor="autocomplete-input-id"
                >
                  Auftragstyp:
                </label>

                <select className="js-select-auto__select" ref={auftragstyp}>
                  <optgroup label="Auftragstyp">
                    <option>Auftragstyp</option>
                    <option value="0">Option 1</option>
                    <option value="1">Option 2</option>
                    <option value="2">Option 3</option>
                    <option value="3">Option 4</option>
                    <option value="4">Option 5</option>
                  </optgroup>
                </select>
              </div>

              <div
                className={`col-4@md col-12sm autocomplete position-relative select-auto js-select-auto js-autocomplete ${classes.control}`}
                data-autocomplete-dropdown-visible-class="autocomplete--results-visible"
              >
                <label
                  className={`form-label margin-bottom-xxs ${classes.form_label}`}
                  htmlFor="autocomplete-input-id"
                >
                  Bundesland:
                </label>

                <select className="js-select-auto__select" ref={bundesland}>
                  <optgroup label="Bundesland">
                    <option>Bundesland</option>
                    <option value="0">Option 1</option>
                    <option value="1">Option 2</option>
                    <option value="2">Option 3</option>
                    <option value="3">Option 4</option>
                    <option value="4">Option 5</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="padding-top-md text-center ">
              <a className="btn btn--md btn--accent">
                <button className="margin-left-sm">Jetzt Auftrag finden</button>
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

            <div className="padding-top-md text-center ">
              <ul className="flex flex-wrap gap-sm justify-center text-sm">
                <li className="inline-flex items-center">
                  <svg
                    className="icon margin-right-xxs"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <polyline
                      points="1 9.75 5.5 14.25 15 1.75"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Kostenlos anmelden</span>
                </li>

                <li className="inline-flex items-center">
                  <svg
                    className="icon margin-right-xxs"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <polyline
                      points="1 9.75 5.5 14.25 15 1.75"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>Unverbindlich testen</span>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>

      <div className="section-divider">
        <svg viewBox="0 0 1920 60" aria-hidden="true">
          <path
            fill="var(--color-bg)"
            d="M1920,60H0V0S387,59,960,59,1920,0,1920,0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
