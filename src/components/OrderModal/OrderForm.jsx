import { useContext, useRef, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { OrderContext } from "../../store/food-order-context";
import { sendUserOrder } from "../../http";
import ErrorBox from "../ui/ErrorBox";
import Success from "./Success";

export default function OrderForm({ onClose, totPrice, onForm }) {
  // context
  const { cartCtx, setCartCtx, setIsFetchingCtx, isFetchingCtx } =
    useContext(OrderContext);

  // success or error unique state
  const [isSuccess, setIsSuccess] = useState({ result: false, error: "" });

  // input refs
  const fullName = useRef();
  const email = useRef();
  const street = useRef();
  const postalCode = useRef();
  const city = useRef();

  // customer details form submit
  async function handleSubmitOrder(event) {
    event.preventDefault();
    // object to send to backend
    const orderDatas = {
      items: [...cartCtx],
      customer: {
        name: fullName.current.value,
        email: email.current.value,
        street: street.current.value,
        "postal-code": postalCode.current.value,
        city: city.current.value,
      },
      totPrice: totPrice,
    };
    // loading on
    setIsFetchingCtx(true);
    try {
      await sendUserOrder(orderDatas); // fetch sending function
      setIsSuccess({
        result: true,
        error: null,
      });
      // reset cart post sending
      setCartCtx([]);
    } catch (error) {
      setIsSuccess({
        result: false,
        error: error.message || "Failed to send order",
      });
    }
    // loading off
    setIsFetchingCtx(false);
  }

  return (
    <div>
      {/* isSuccess true, show Success comp */}
      {!isSuccess.result ? (
        // customer details form
        <form id="order-form" onSubmit={handleSubmitOrder}>
          {isFetchingCtx ? "Loading" : ""}
          {isSuccess.error ? <ErrorBox error={isSuccess.error} /> : ""}

          <div className="checkout">
            <h1>Checkout</h1>
            <Button
              onClick={() => onForm(false)}
              text={<i className="fa-solid fa-backward"></i>}
              btnStyle="btn-back"
            />
          </div>

          <div>Total Amount: ${totPrice}</div>

          {/* inputs */}
          <Input ref={fullName} label="Full Name" />
          <Input ref={email} label="E-Email Address" type="email" />
          <Input ref={street} label="Street" />
          <div>
            <Input
              ref={postalCode}
              inpStyle="user-detail short"
              label="Postal Code"
            />
            <Input ref={city} inpStyle="user-detail short" label="City" />
          </div>

          {/* buttons actions */}
          <div className="cart-buttons">
            <Button
              text="Close"
              onClick={() => {
                onForm(false);
                onClose();
              }}
            />
            <Button text="Submit Order" btnStyle="btn-bg" type="submit" />
          </div>
        </form>
      ) : (
        <Success onClose={onClose} onForm={onForm} />
      )}
    </div>
  );
}
