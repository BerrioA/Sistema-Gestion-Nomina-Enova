import { Navbar } from "../Components/Navbar/Navbar";
import { Sidebar } from "../Components/Sidebar/Sidebar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="columns mt-6" style={{ minHeight: "100vh"}}>
        <div className="column is-2">
          <Sidebar />
        </div>
        <div className="column has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};
