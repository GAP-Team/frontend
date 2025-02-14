import { Button } from "@mui/material";
import classes from "./HeroSection.module.scss";
import GCountDown from "@/components/countdown/GCountDown";

const HeroSection = () => {
    return (
        // <>
        //     <section className="bg-white w-full dark:bg-gray-900">
        //         <div className="relative grid grid-cols-2" style={styles.containerDiv}>
        //             <div className="bg-gray-600">Real Estate Hero Section 1</div>
        //             <div className="bg-gray-900">Real Estate Hero Section 2</div>
        //         </div>
        //     </section>
        // </>

        <div className="w-full mx-auto flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-20 py-16 md:py-40 bg-white text-lg">
            <div className="w-full text-center xl:text-left bg-gray-600">
                <h2>Wir sind immocloud</h2>
                <h1 className="text-4xl font-bold my-5">
                    Die Software fur Deine
                    Immobilienverwaltung
                </h1>
                <p className="text-lg font-normal max-w-4xl mx-auto">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. 
                    Eaque sed tenetur rem quam nihil dolorum expedita maxime nisi 
                    recusandae sequi magni culpa fuga accusamus eveniet fugiat ipsum ab consequuntur.
                </p>
                <div className="flex justify-center xl:justify-start">
                <Button
                    component="a"
                    href="/login"
                    className="block px-5 py-2 mt-4 text-center rounded-lg text-md"
                    size="small"
                    style={styles.registerButton}
                    sx={{
                        textTransform: "none",
                        whiteSpace: "pre",
                    }}
                >
                    Jetzt anmeldung
                </Button>
                </div>
                <div className="flex flex-row gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14 justify-center lg:justify-start">
                    <GCountDown label="Ausschreibungen" counter={12000} />
                    <GCountDown label="Offene Aufträge" counter={77} />
                    <GCountDown label="Immobilien" counter={100} />
                </div>
            </div>
            <div className={` 2xl:block bg-gray-900 `}>
                <div className={classes.diamond_grid__inner}>
                <div className={classes.diamond_grid__item}>
                    <img
                    className={classes.diamond_grid__img}
                    src="https://source.unsplash.com/random/300x300?water"
                    alt="Image description"
                    />
                </div>
                <div className={classes.diamond_grid__item}>
                    <img
                    className={classes.diamond_grid__img}
                    src="https://source.unsplash.com/random/300x300?flower"
                    alt="Image description"
                    />
                </div>
                <div className={classes.diamond_grid__item}>
                    <img
                    className={classes.diamond_grid__img}
                    src="https://source.unsplash.com/random/300x300?office"
                    alt="Image description"
                    />
                </div>
                <div className={classes.diamond_grid__item}>
                    <img
                    className={classes.diamond_grid__img}
                    src="https://source.unsplash.com/random/300x300?building"
                    alt="Image description"
                    />
                </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection

const styles = {
    containerDiv: {
        paddingRight: '0.1rem',
        paddingLeft: '0.1rem',
    },
    registerButton: {
        background: "#005e99",
        color: "#FFFFFF",
        padding: "0.7rem",
        paddingRight: "1.7rem",
        paddingLeft: "1.7rem",
        borderRadius: 7,
        fontSize: "15px",
        "&:hover": {
          background: "#0071b8",
        },
    },
}