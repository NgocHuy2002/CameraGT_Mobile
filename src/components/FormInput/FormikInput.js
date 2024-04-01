import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

import FormControl from '@components/FormControl/FormControl';
import FormHelperText from '@components/FormHelperText/FormHelperText';
import FormLabel from '@components/FormLabel/FormLabel';

import renderNode from '@helpers/renderNode';

import FormInput from './FormInput';

function FormikInput(props, ref) {
  const {
    name,
    label,
    variant,
    readonly,
    required,
    validate,
    parseValue = (v) => v,
    formatValue = (v) => `${v ?? ''}`,
    labelProps,
    helperText,
    helperTextProps,
    containerStyle,
    ...restProps
  } = props;

  const [field, meta, helpers] = useField({ name, validate });
  const { submitCount } = useFormikContext();

  const value = formatValue(field.value);
  const { error, touched } = meta;

  const isTouched = !!touched || submitCount > 0;

  const showError = isTouched && !!error;
  const fieldStatus = isTouched ? (showError ? 'danger' : 'primary') : 'basic';

  const onBlur = (event) => {
    helpers.setTouched(true);
    if (restProps.onBlur) restProps.onBlur(event);
  };

  const onChange = (nextValue) => {
    helpers.setValue(parseValue(nextValue));
    if (restProps.onChangeText) restProps.onChangeText(parseValue(nextValue));
  };

  return (
    <FormControl
      status={fieldStatus}
      variant={variant}
      readonly={readonly}
      required={required}
      containerStyle={containerStyle}
    >
      {renderNode(FormLabel, label, labelProps)}
      <FormInput
        ref={ref}
        value={value}
        {...restProps}
        onBlur={onBlur}
        onChangeText={onChange}
      />
      {(helperText || showError) &&
        renderNode(FormHelperText, showError ? error : helperText, {
          ...helperTextProps,
          status: fieldStatus,
        })}
    </FormControl>
  );
}

export default React.forwardRef(FormikInput);
