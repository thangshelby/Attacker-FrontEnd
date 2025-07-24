import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ButtonVariants";

const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Button = forwardRef(
  ({ className, children, to, variant, size, ...props }, ref) => {
    const classes = combineClasses(
      buttonVariants({ variant, size }),
      className,
    );

    if (to) {
      return (
        <Link to={to} className={classes} ref={ref} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);

export default Button;
