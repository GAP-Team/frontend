import Link from "next/link"
import Image from "next/legacy/image";

const CallToAction = () => {
  return (
    <section className="diagonal-section-top bg-darker">
      <div className="container max-width-adaptive-lg padding-y-xxxl">
        <div className="grid gap-lg items-center">
          <div className="col-6@md text-center text-left@lg">
            <div className="margin-bottom-xs">
              <span className="badge badge--primary-light text-sm font-bold">
                Darum GAP
              </span>
            </div>
            <h2 className="text-xxl">
              GAP ist Ihr Partner
              <br /> für Anlagen Prüfung
            </h2>
            <div className="text-component margin-top-md">
              <p className="line-height-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa,
                rem neque doloribus impedit explicabo minus laborum cupiditate
                atque esse consectetur.
              </p>
            </div>
            <div className="margin-top-sm">
              <div className="flex flex-wrap gap-sm items-center justify-center justify-start@lg">
                <Link href="#0" className="btn btn--primary">
                  Jetzt anmelden
                </Link>
              </div>
            </div>

            {/*    <div className="grid gap-md items-start margin-top-xl text-center text-left@lg">
              <div className="col">
                <h5 className="countup text-xxxl color-primary-darker font-semibold">
                  <span className="js-countup">12000</span>
                </h5>
                <p className="text-sm">Ausschreibungen</p>
              </div>

              <div className="col">
                <h5 className="countup text-xxxl color-primary-darker font-semibold">
                  <span className="js-countup">77</span>
                </h5>
                <p className="text-sm">Offene Aufträge</p>
              </div>

              <div className="col">
                <h5 className="countup text-xxxl color-primary-darker font-semibold">
                  <span className="js-countup">6900</span>
                </h5>
                <p className="text-sm">Immobilien</p>
              </div>
            </div>
  */}
          </div>

          <div className="col-6@md">
            <div className="diamond-grid ">
              <div className="diamond-grid__inner">
                <div className="diamond-grid__item bg-contrast-lower shadow-md">
                  <Image
                    className="diamond-grid__img"
                    src="/images/promo1.jpg"
                    alt="Image description"
                    layout="fill"
                  />
                </div>

                <div className="diamond-grid__item bg-contrast-lower shadow-md">
                  <Image
                    className="diamond-grid__img"
                    src="/images/promo2.jpg"
                    alt="Image description"
                    layout="fill"
                  />
                </div>

                <div className="diamond-grid__item bg-contrast-lower shadow-md">
                  <Image
                    className="diamond-grid__img"
                    src="/images/promo3.jpg"
                    alt="Image description"
                    layout="fill"
                  />
                </div>

                <div className="diamond-grid__item bg-contrast-lower shadow-md">
                  <Image
                    className="diamond-grid__img"
                    src="/images/promo4.jpg"
                    alt="Image description"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
