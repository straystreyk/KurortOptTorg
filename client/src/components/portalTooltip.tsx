import { ReactPortal } from "./reactPortal";
import {
  FC,
  useState,
  useRef,
  ReactElement,
  ReactNode,
  useEffect,
  memo,
} from "react";
import classes from "@styles/tooltip.module.scss";
import cn from "classnames";

type TPlacement =
  | "top-middle"
  | "bottom-middle"
  | "right-middle"
  | "left-middle";

const transformConfig: { [p: string]: string } = {
  "top-middle": "translate(-50%, -100%)",
  "bottom-middle": "translate(-50%, 0%)",
  "right-middle": "translate(0%, -50%)",
  "left-middle": "translate(-100%, -50%)",
};

export const PortalTooltip: FC<{
  children: ReactElement;
  placement?: TPlacement;
  showDelay?: number;
  stayTooltipOnHover?: boolean;
  hideDelay?: number;
  hideTooltip?: boolean;
  tooltipContent: ReactNode;
  offset?: number;
  classes?: {
    contentClassName?: string;
    tooltipWrapperClassName?: string;
    childrenWrapperClassName?: string;
  };
  triangle?: boolean;
  showOnMobile?: boolean;
}> = memo(
  ({
    children,
    placement = "top-middle",
    showDelay = 50,
    hideDelay = 350,
    hideTooltip,
    tooltipContent,
    offset = 8,
    classes: classNames,
    triangle = true,
    stayTooltipOnHover = false,
    showOnMobile = false,
  }) => {
    const {
      contentClassName,
      tooltipWrapperClassName,
      childrenWrapperClassName,
    } = classNames || {};

    const [pos, setPos] = useState({ x: 0, y: 0, active: false });
    const ref = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onMouseEnter = () => {
      if (
        !ref.current ||
        pos.active ||
        !tooltipContent ||
        typeof window === "undefined"
      )
        return;
      timeoutRef.current && clearTimeout(timeoutRef.current);
      let x =
        ref.current.getBoundingClientRect().x + ref.current.clientWidth / 2;
      let y = ref.current.getBoundingClientRect().y + window.scrollY;

      if (placement === "bottom-middle") y = y + ref.current.clientHeight;
      if (placement === "right-middle") {
        x = ref.current.getBoundingClientRect().x + ref.current.clientWidth;
        y = y + ref.current.clientHeight / 2;
      }
      if (placement === "left-middle") {
        x = ref.current.getBoundingClientRect().x;
        y = y + ref.current.clientHeight / 2;
      }

      const yWithOffset =
        placement === "bottom-middle"
          ? y + offset
          : placement === "top-middle"
          ? y - offset
          : y;
      const xWithOffset =
        placement === "right-middle"
          ? x + offset
          : placement === "left-middle"
          ? x - offset
          : x;

      setPos((p) => ({ ...p, x: xWithOffset, y: yWithOffset }));
      timeoutRef.current = setTimeout(
        () => setPos((p) => ({ ...p, active: true })),
        showDelay
      );
    };

    const onMouseLeave = () => {
      if (!tooltipContent) return;
      timeoutRef.current && clearTimeout(timeoutRef.current);
      setPos((p) => ({ ...p, active: false }));
      if (pos.x && pos.y)
        timeoutRef.current = setTimeout(
          () => setPos((p) => ({ ...p, x: 0, y: 0 })),
          hideDelay
        );
    };

    useEffect(() => {
      if (!tooltipContent) return;
      if (!pos.x && !pos.y && !pos.active)
        timeoutRef.current && clearTimeout(timeoutRef.current);
      if (hideTooltip && pos.active)
        setPos((p) => ({ ...p, x: 0, y: 0, active: false }));
    }, [hideTooltip, pos, tooltipContent]);

    if (hideTooltip) return children;

    return (
      <>
        <ReactPortal wrapperId="tooltipWrapper">
          {pos.x && pos.y && tooltipContent ? (
            <div
              {...(stayTooltipOnHover && {
                onMouseEnter: onMouseEnter,
                onMouseLeave: onMouseLeave,
              })}
              className={cn(
                classes.portalTooltipWrapper,
                tooltipWrapperClassName && tooltipWrapperClassName
              )}
              style={{
                transform: transformConfig[placement],
                opacity: pos.active ? 1 : 0,
                left: pos.x,
                top: pos.y,
              }}
            >
              <div
                className={cn(
                  classes.portalTooltipContent,
                  triangle && classes.triangledContent,
                  placement && placement,
                  contentClassName && contentClassName,
                  "tooltipContent"
                )}
              >
                {tooltipContent}
              </div>
            </div>
          ) : null}
        </ReactPortal>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={cn(
            "tooltipChildrenWrapper",
            classes.tooltipChildrenWrapper,
            childrenWrapperClassName && childrenWrapperClassName
          )}
          ref={ref}
        >
          {children}
        </div>
      </>
    );
  }
);
