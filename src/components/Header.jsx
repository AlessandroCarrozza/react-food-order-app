import logo from "../assets/logo.jpg";
import Button from "./ui/Button";
import Cart from "./Order/Cart";
import { useRef } from "react";
import Modal from "./ui/Modal";

export default function Header() {
  const dialog = useRef();
  function handleOpenCartClick() {
    console.log("open modal");
    dialog.current.open();
  }
  return (
    <>
      <Modal ref={dialog}></Modal>
      <header>
        <div id="logo">
          <img src={logo} alt="Logo" />
          <h1>reactfood</h1>
        </div>

        <div>
          <Button
            onClick={() => handleOpenCartClick()}
            text={`Cart(${0})`}
            btnStyle="btn-cart"
          />
        </div>
      </header>
    </>
  );
}
