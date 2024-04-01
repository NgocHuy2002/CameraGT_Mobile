import { useMemo, useState, useContext, useCallback } from 'react';
import { MappingContext } from '@ui-kitten/components/theme/mapping/mappingContext';
import { ThemeContext } from '@ui-kitten/components/theme/theme/themeContext';
import { StyleConsumerService } from '@ui-kitten/components/theme/style/styleConsumer.service';

export default function useStyled(name, sourceProps) {
  const [interaction, setInteraction] = useState([]);
  const mappingStyle = useContext(MappingContext);
  const theme = useContext(ThemeContext);
  const service = useMemo(
    () => new StyleConsumerService(name, mappingStyle),
    [name, mappingStyle],
  );
  const defaultProps = useMemo(() => service.createDefaultProps(), [service]);
  const computedProps = useMemo(
    () => ({ ...defaultProps, ...sourceProps }),
    [defaultProps, sourceProps],
  );
  const dispatch = useCallback(
    (newInteraction: any) => setInteraction(newInteraction),
    [setInteraction],
  );
  const style = useMemo(
    () =>
      service?.createStyleProp(computedProps, mappingStyle, theme, interaction),
    [service, computedProps, mappingStyle, theme, interaction],
  );

  return useMemo(
    () => ({
      ...computedProps,
      eva: { theme, style, dispatch },
    }),
    [computedProps, theme, style],
  );
}
