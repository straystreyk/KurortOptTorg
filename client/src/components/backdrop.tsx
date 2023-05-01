import { FC, memo, useEffect, useState } from "react";

export interface IBackdrop {
  zIndex?: number;
  onClick: () => void;
  show: boolean;
}

export const Backdrop: FC<IBackdrop> = memo(({ zIndex, onClick, show }) => {
  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleClick = () => {
    onClick();
    setActive(false);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (show) {
      setMounted(true);
      timeout = setTimeout(() => setActive(true), 50);
    }

    if (!show) {
      setActive(false);
      timeout && clearTimeout(timeout);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [show]);

  if (!mounted) return null;

  return (
    <div
      onTransitionEnd={() => !active && mounted && setMounted(false)}
      onClick={handleClick}
      style={{
        zIndex: zIndex ?? 10,
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: " rgba(0,0,0,0.3)",
        opacity: active ? 1 : 0,
        transition: "0.35s all ease",
        top: 0,
        left: 0,
      }}
    />
  );
});
