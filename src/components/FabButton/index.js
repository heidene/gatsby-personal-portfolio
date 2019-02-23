import React from 'react';

import './index.scss';

const FabButtonWrapper = React.forwardRef(function fabButton(
    { children, onClick, mini, positionfree = false, className, blue, yellow },
    ref
) {
  const classes = ['fab-btn', className];

  if (mini) {
    classes.push('fab-btn__mini');
  }
  if (!positionfree) {
    classes.push('corner_stick');
  }
  if (blue) {
    classes.push('blue');
  }
  if (yellow) {
    classes.push('yellow');
  }
  return (
    <div ref={ref} className={classes.join(' ')} onClick={onClick}>
      {children}
    </div>
  );
});

export default FabButtonWrapper;
