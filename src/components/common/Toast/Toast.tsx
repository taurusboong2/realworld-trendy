import React from 'react';
import ToastPortal from './Portal';
import { Props } from './types';
import { CONTAINER_CLASSNAME } from '.';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import classnames from 'classnames';

const Toast: React.FC<Props> = props => {
  const { message, type = 'default', duration = 10000 } = props;
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
      <div className={classnames('toastBox', type)} ref={ref} onClick={remove}>
        <span className="toast_message">
          <AiOutlineInfoCircle className="icon" />
          &nbsp;&nbsp;
          {message}
        </span>
      </div>
    </ToastPortal>
  );
};

export default Toast;
