import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input required ref={ref} {...props.input} onChange={props.onChange} />
    </div>
  );
});

export default Input;
