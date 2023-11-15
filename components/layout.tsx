import Navbar from "./navbar";
import Footer from "./footer";
//nav bar have problem
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}
