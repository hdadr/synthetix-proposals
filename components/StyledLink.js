import { useRouter } from "next/router";
import { useState } from "react";

function StyledLink({ children, href }) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const active = router.asPath === href;
  const style = {
    color: active ? "#111" : "#1976d2",
    textDecoration: hover ? "underline" : "none",
    fontWeight: active ? "500" : "",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={style}>
      {children}
    </a>
  );
}

export default StyledLink;
