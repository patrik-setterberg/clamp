import gear from "../assets/gear.svg";
import clsx from "clsx/lite";

const Gear = (props: {
  animationClass?: string;
  classNames?: string;
}): JSX.Element => {
  const { animationClass, classNames } = props;
  return (
    <div className={clsx("fixed", classNames)}>
      {<img src={gear} className={animationClass} alt="Gear" />}
    </div>
  );
};

export default Gear;
