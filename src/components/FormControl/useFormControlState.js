import useFormControl from './useFormControl';

export default function useFormControlState({ props, states }) {
  const formControl = useFormControl();

  return states.reduce((acc, state) => {
    acc[state] = props[state];
    if (formControl && typeof props[state] === 'undefined') {
      acc[state] = formControl[state];
    }
    return acc;
  }, {});
}
