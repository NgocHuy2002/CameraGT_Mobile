import React from 'react';

export default function renderNode(Component, content, defaultProps = {}) {
  if (content == null || content === false) {
    return null;
  }
  if (React.isValidElement(content)) {
    return React.cloneElement(content, defaultProps);
  }
  if (typeof content === 'function') {
    return content(defaultProps);
  }
  if (content === true) {
    return <Component {...defaultProps} />;
  }
  if (typeof content === 'string' || typeof content === 'number') {
    return <Component {...defaultProps}>{content}</Component>;
  }
  return <Component {...defaultProps} {...content} />;
}
