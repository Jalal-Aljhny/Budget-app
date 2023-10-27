import "./Header.css";
import logo from "../../assets/images/logo.png";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Model from "../ui/Model";
import Form from "../budget/Form";

const Header = () => {
  const isMount = useRef(false);
  const [scrolled, setSecrolled] = useState(false);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    if (!isMount.current) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
          setSecrolled(true);
        } else {
          setSecrolled(false);
        }
      });
    }
    isMount.current = true;
  }, []);
  return (
    <header className={`${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header-brand">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <h1>Budget app</h1>
        </div>
        <div className="header-action">
          <Button
            onClick={() => {
              setShowModel(true);
            }}
          >
            +
          </Button>
        </div>
      </div>
      <Model
        visible={showModel}
        closeModel={() => {
          setShowModel(false);
        }}
      >
        <Form
          closeModel={() => {
            setShowModel(false);
          }}
        />
      </Model>
    </header>
  );
};

export default Header;
