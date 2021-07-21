import { addComma } from "../utils/addComma";
import { formatAuthor } from "../utils/formatAuthor";
import { default as Link } from "./StyledLink";

const FormatAuthorToLink = ({ author }) => {
  return formatAuthor(author).map(([name, githubUserName], index) => {
    if (!!githubUserName) {
      return (
        <Link key={name} href={`https://github.com/${githubUserName}`}>
          {addComma(name, index)}
        </Link>
      );
    }

    return addComma(name, index);
  });
};

export default FormatAuthorToLink;
