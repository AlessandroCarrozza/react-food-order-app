import { forwardRef } from "react";
import { memo } from "react";

export default forwardRef(function Input(
  { label, type = "text", inpStyle = "user-detail", ...props },
  ref
) {
  console.log("input render");
  return (
    <div className={inpStyle}>
      <label>{label}</label>
      <input
        ref={ref}
        {...props}
        required
        placeholder="Type here..."
        type={type}
      />
    </div>
  );
});
