import React from "react";

const GVideoSection = () => {
  return (
    <section className="feature-v8 padding-bottom-xxl">
      <div className="feature-v8__main-content bg-contrast-lower bg-opacity-50% padding-top-xxl">
        <div className="container max-width-adaptive-md">
          <div className="grid gap-sm gap-lg@sm">
            <div className="col-6@sm">
              <h2 className="text-xxl">
                Unternehmenssuche
                <br /> leicht gemacht!
              </h2>
            </div>

            <div className="col-6@sm">
              <div className="text-component">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam ullam minus cupiditate voluptatibus ab, sequi magni,
                  labore necessitatibus aliquam expedita, natus tenetur corrupti
                  dolorum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-width-adaptive-md feature-v8__sub-content">
        <figure className="width-100% radius-lg overflow-hidden col-8@md shadow-lg">
          <div className="aspect-ratio-16:9">
            <iframe
              src="https://player.vimeo.com/video/308876956?title=0&byline=0&portrait=0&badge=0"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default GVideoSection;
