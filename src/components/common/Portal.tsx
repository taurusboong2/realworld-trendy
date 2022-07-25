import * as React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

function Portal(props: Props) {
  const { children } = props;

  const container = document.querySelector(`#portal`) as Element;

  return createPortal(children, container);
}
export default Portal;
