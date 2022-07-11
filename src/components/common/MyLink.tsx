import React from 'react';
import { Link, To } from 'react-router-dom';

type Props = {
  href: To;
  className?: string;
  children?: React.ReactNode;
};

const MyLink = ({ className, href, children }: Props) => (
  <Link to={href} className={className}>
    {children}
  </Link>
);

export default MyLink;
