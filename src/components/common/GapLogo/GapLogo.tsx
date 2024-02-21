import PropTypes from "prop-types";
import React from "react";
import gapLogo from "../../../../public/gap-logo.svg";
import Image from 'next/image';
import { Roboto, Lalezar } from "next/font/google";
import classes from "./GapLogo.module.scss";
const roboto = Roboto({ subsets: ["latin"], weight: ['500'] });
const lalezar = Lalezar({ subsets: ['latin'], weight: ['400'] });

export const GapLogo = (): JSX.Element => {
    return (
        <div className="flex flex-row justify-start items-center gap-4 p-8"> {/* Ensure full screen height and center alignment */}
            <div className="flex justify-center items-center">
                <Image
                    width={60}
                    height={60}
                    alt="Follow us on Twitter"
                    src={gapLogo}
                />
            </div>
            <span className={`${lalezar.className} text-white text-3xl md:text-5xl  text-center md:mt-3  `}> {/* Ensure text is centered */}
                GAP
            </span>
            <div className={`inline-block w-[1px]  bg-white mx-[3px] h-16`} />
            <div className={`${roboto.className}  text-white text-base`}>
                Gesetzliche <br />
                Anlagen <br />
                Prüfung
            </div>
        </div>
    );
};
