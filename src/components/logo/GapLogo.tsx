
import React from "react";
import gapLogo from "../../../public/icons/gap-logo.svg";
import Image from 'next/image';
import { Roboto, Lalezar } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ['500'] });
const lalezar = Lalezar({ subsets: ['latin'], weight: ['400'] });

interface GapLogoProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    src?: string;
  }

export const GapLogo = ({ size, color = 'white', src }: GapLogoProps): JSX.Element => {
    const inlineStyles = {
        textColor: { color: color },
        dividerBg: { backgroundColor: color },
      };
    let textSize, imageSize, detailTextSize, dividerWidth;
    switch (size) {
        case 'sm':
            textSize = 'text-5xl';
            imageSize = 40;
            detailTextSize = 'text-xs md:text-sm';
            dividerWidth = 'w-[1px]';
            break;
        case 'md':
            textSize = 'text-3xl md:text-5xl';
            imageSize = 60;
            detailTextSize = 'text-sm md:text-base';
            dividerWidth = 'w-[2px]';
            break;
        case 'lg':
            textSize = 'text-4xl md:text-6xl';
            imageSize = 80;
            detailTextSize = 'text-base md:text-lg';
            dividerWidth = 'w-[3px]';
            break;
        default:
            textSize = 'text-3xl md:text-5xl';
            imageSize = 60;
            detailTextSize = 'text-sm md:text-base';
            dividerWidth = 'w-[1px]';
    }
    
    return (
        <div className={`flex flex-row justify-start items-center gap-4 p-8`} style={inlineStyles.textColor}> 
           <div className="flex justify-center items-center">
                <Image
                width={imageSize}
                height={imageSize}
                alt="Follow us on Twitter"
                src={src??gapLogo}
                />
            </div>
            <span className={`${lalezar.className} ${textSize}  text-center md:mt-3`}> 
                GAP
            </span>
            <div className={`inline-block ${dividerWidth} mx-[1px] h-12`} style={inlineStyles.dividerBg}/>
            <div className={`${detailTextSize}`}>
                Gesetzliche <br />
                Anlagen <br />
                Prüfung
            </div>
        </div>
    );
};
