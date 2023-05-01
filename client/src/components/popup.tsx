import { ReactPortal } from "./reactPortal";
import classes from "@styles/modal.module.scss";
import { FC, ReactNode, useEffect, useState } from "react";
import { Backdrop } from "./backdrop";
import cn from "classnames";
import { CustomIcon } from "./customIcon/customIcon";

export const Popup: FC<{
  children: ReactNode;
  show: boolean;
  handleClose: () => void;
  title?: string;
  description?: string;
  crossEnabled?: boolean;
  className?: string;
}> = ({
  children,
  show,
  handleClose,
  crossEnabled = true,
  title,
  description,
  className,
}) => {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    show &&
      (document.body.style.cssText = "overflow: hidden; position:relative;");

    if (show) {
      setMounted(true);
      timeout = setTimeout(() => setActive(true), 50);
    }

    if (!show) {
      setActive(false);
      document.body.style.cssText = "";
      timeout && clearTimeout(timeout);
    }

    return () => {
      timeout && clearTimeout(timeout);
      document.body.style.cssText = "";
    };
  }, [show]);

  if (!mounted) return null;

  return (
    <ReactPortal>
      <>
        <Backdrop zIndex={101} show={active} onClick={handleClose} />
        <div
          onTransitionEnd={() => !active && mounted && setMounted(false)}
          className={cn(
            classes.popupContent,
            active && classes.popupContentActive,
            className && className
          )}
          style={{ zIndex: 101 }}
        >
          {title && (
            <div>
              <div className={classes.popupTitle}>
                <h3>{title}</h3>
                {crossEnabled && (
                  <button
                    className={classes.popupCloseBtn}
                    onClick={handleClose}
                  >
                    <CustomIcon icon="cross" />
                  </button>
                )}
              </div>
              <div className={cn("custom-t1", classes.popupDescription)}>
                {description}
              </div>
            </div>
          )}
          {children}
        </div>
      </>
    </ReactPortal>
  );
};
