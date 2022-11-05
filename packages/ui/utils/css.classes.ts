import { CSSObject } from '@mantine/core';

export const noSelect: CSSObject = {
  'WebkitTouchCallout': 'none', /* iOS Safari */
  'WebkitUserSelect': 'none', /* Safari */
  'KhtmlUserSelect': 'none', /* Konqueror HTML */
  'MozUserSelect': 'none', /* Old versions of Firefox */
  'MsUserSelect': 'none', /* Internet Explorer/Edge */
  'userSelect': 'none', /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
};