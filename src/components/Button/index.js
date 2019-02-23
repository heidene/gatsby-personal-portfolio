import React from 'react';

import './index.scss';

export default (props) => {
  const {
    children,
    onclick,
    href,
    submit,
    contained,
    disabled = false,
  } = props;
  let content;
  let clickAction;
  if (href) {
    const link = React.createRef();
    content = (
      <a ref={link} href={href} target="_blank">
        {children}
      </a>
    );
    clickAction = () => {
      link.current.click();
    };
  } else {
    content = children;
    clickAction = onclick;
  }
  let type = 'button';
  if (submit) {
    type = 'submit';
  }
  const classes = ['btn'];
  if (contained) {
    classes.push('contained');
  }
  return (
    <button
      className={classes.join(' ')}
      type={type}
      onClick={clickAction}
      href={href}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
