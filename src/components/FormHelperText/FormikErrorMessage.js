import { useField, useFormikContext } from 'formik';
import React from 'react';

import FormHelperText from './FormHelperText';

export default function FormikErrorMessage(props) {
  const { name, children, component, ...restProps } = props;

  const [field, meta] = useField(name);
  const { submitCount } = useFormikContext();

  const { error, touched } = meta;

  const isTouched = !!touched || submitCount > 0;
  const showError = isTouched && !!error;

  const message = typeof error === 'string' ? error : null;
  const messages = typeof error === 'object' ? error : null;

  const renderError = React.useCallback(
    (msg) => (
      <FormHelperText status="danger" {...restProps}>
        {msg}
      </FormHelperText>
    ),
    [restProps],
  );

  return showError
    ? children
      ? typeof children === 'function'
        ? children({ message, messages, renderError })
        : null
      : component
        ? React.createElement(component, restProps, {
            message,
            messages,
            renderError,
          })
        : renderError(message)
    : null;
}
