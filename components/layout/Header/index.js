import { header, linkContainer, proposalLinks } from "./header.module.scss";
import { grid, content } from "../layout.module.scss";
import { default as Link } from "../../StyledLink";

const Header = () => {
  return (
    <header className={`${grid} ${header}`}>
      <div className={`${content} ${linkContainer}`}>
        <Link href="/">Home</Link>

        <div className={proposalLinks}>
          <span>
            <Link href="/sips">SIPs</Link>
          </span>
          <span>
            <Link href="/sccps">SCCPs</Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
