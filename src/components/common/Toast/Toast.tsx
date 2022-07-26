import React from 'react';
import ToastPortal from './Portal';
import { Props } from './types';
import { CONTAINER_CLASSNAME } from '.';

const Toast: React.FC<Props> = props => {
  const { message, type = 'default', duration = 3500 } = props;
  const ref = React.useRef<HTMLDivElement>(null);
  const [isDestroying, setIsDestroying] = React.useState<boolean>(false);
  const [isDestroyed, setIsDestroyed] = React.useState<boolean>(false);
  const [duraion, setDuraion] = React.useState<number>(duration);

  const remove = () => {
    setDuraion(400);
  };

  React.useEffect(() => {
    let t1: any;
    let t2: any;
    if (!isDestroyed) {
      t1 = setTimeout(() => {
        setIsDestroying(true);
      }, duraion - 400);
      t2 = setTimeout(() => {
        const container = document.querySelector(`.${CONTAINER_CLASSNAME}`) as Element;
        container.removeChild(ref.current as HTMLDivElement);
        setIsDestroyed(true);
      }, duraion);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isDestroyed, duraion]);

  return (
    <ToastPortal>
      <div ref={ref} onClick={remove}>
        <span className="typeIcon">아이콘 아이콘</span>
        <span>{message}</span>
      </div>
    </ToastPortal>
  );
};

export default Toast;
