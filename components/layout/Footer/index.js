import { default as Link } from "../../StyledLink";
import Image from "next/image";
import { grid, content } from "../layout.module.scss";
import { footer, link, container, description, github, twitter } from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={`${grid} ${footer}`}>
      <div className={`${content} ${container}`}>
        <div className={github}>
          <Link href="https://github.com/Synthetixio/SIPs">
            <div className={link}>
              <Image src="/logos/GitHub-Mark-32px.png" alt="github" width="16" height="16" />
              <span>Synthetixio/SIPs</span>
            </div>
          </Link>
        </div>
        <div className={twitter}>
          <Link href="https://twitter.com/synthetix_io">
            <div className={link}>
              <Image src="/logos/2021_Twitter_logo_blue.png" alt="twitter" width="16" height="13" />
              <span>synthetix_io</span>
            </div>
          </Link>
        </div>

        <div className={description}>
          Synthetix Improvement Proposals (SIPs) describe standards for the Synthetix platform, including core protocol specifications,
          client APIs, and contract standards.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
