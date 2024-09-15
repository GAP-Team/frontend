import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { GapLogo } from "@/components/logo/GapLogo";
function GFooter(): JSX.Element {
  return (
    <>
      <Footer container className="bg-[#37383f] py-8">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-evenly md:flex md:grid-cols-1">
            <GapLogo />
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle className="text-white" title="about" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Flowbite</FooterLink>
                  <FooterLink href="#">Tailwind CSS</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle className="text-white" title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Github</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle className="text-white" title="Legal" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <hr className="w-3/5 h-px mx-auto my-4 bg-gray-600 border-0 rounded md:my-10 dark:bg-gray-100" />
          <div className="w-full flex items-center justify-around">
            <FooterCopyright href="#" by="GAP™" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
}

export default GFooter;
