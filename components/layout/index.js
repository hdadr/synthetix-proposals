import Header from "./Header";
import Footer from "./Footer";
import { grid, content } from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <>
      <Header />

      <main className={grid}>
        <div className={content}>{children}</div>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
