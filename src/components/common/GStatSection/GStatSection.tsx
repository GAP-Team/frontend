import React, { ReactNode } from 'react'
import classes from "./GStatSection.module.scss";
import { Button } from 'flowbite-react';
import GBadge from '@/components/badge/GBadge';
import GCountDown from '@/components/countdown/GCountDown';

interface GStatSectionProps {
    title?: string;
    subtitle?: string;
    badge?: ReactNode;
}

const GStatSection: React.FC<GStatSectionProps> = ({
    title = "GAP ist Ihr Partner für Anlagen Prüfung!",
    subtitle = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Eaque sed tenetur rem quam nihil dolorum expedita maxime nisi recusandae sequi magni culpa fuga accusamus eveniet fugiat ipsum ab consequuntur.",
    badge = <GBadge title="Darum GAP" color="#ccdfeb" />,
}) => {

    return (
        <div className="w-full mx-auto flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-20 py-16 md:py-40 p-12 bg-[#e4e4e7] w-full text-lg">
            <div className="w-full lg:max-w-2xl p-8 text-center xl:text-left">
                {badge}
                <h1 className="text-4xl font-bold my-5">{title}</h1>
                <p className="text-lg font-normal max-w-4xl mx-auto">{subtitle}</p>
                <div className="flex justify-center xl:justify-start">
                    <Button as="a" href="#" className='mt-10 bg-[#005e99] hover:bg-[#0071b8]' size="lg" >Jetzt anmeldung</Button>
                </div>
                <div className='flex flex-row gap-5 sm:gap-7 md:gap-10 lg:gap-20 mt-14 justify-center lg:justify-start'>
                    <GCountDown label="Ausschreibungen" counter={12000} />
                    <GCountDown label="Offene Aufträge" counter={77} />
                    <GCountDown label="Immobilien" counter={100} />
                </div>
            </div>
            <div className={`hidden 2xl:block ${classes.diamond_container}`}>
                <div className={classes.diamond_grid__inner}>
                    <div className={classes.diamond_grid__item}>
                        <img className={classes.diamond_grid__img} src="https://source.unsplash.com/random/300x300?water" alt="Image description" />
                    </div>
                    <div className={classes.diamond_grid__item}>
                        <img className={classes.diamond_grid__img} src="https://source.unsplash.com/random/300x300?flower" alt="Image description" />
                    </div>
                    <div className={classes.diamond_grid__item}>
                        <img className={classes.diamond_grid__img} src="https://source.unsplash.com/random/300x300?office" alt="Image description" />
                    </div>
                    <div className={classes.diamond_grid__item}>
                        <img className={classes.diamond_grid__img} src="https://source.unsplash.com/random/300x300?building" alt="Image description" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default GStatSection