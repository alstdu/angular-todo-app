export type ColorSchemeType = 'default' | 'protanopia' | 'deuteranopia' | 'tritanopia';

export interface ColorScheme {
  name: string;
  primaryColor: string;
  successColor: string;
  warningColor: string;
  dangerColor: string;
  backgroundColor: string;
  textColor: string;
}

export const COLOR_SCHEMES: Record<ColorSchemeType, ColorScheme> = {
  default: {
    name: 'Default',
    primaryColor: '#0048a3',
    successColor: '#276749',
    warningColor: '#854d0e',
    dangerColor: '#b91c1c',
    backgroundColor: '#ffffff',
    textColor: '#1a2234'
  },
  protanopia: {
    name: 'Protanopia',
    primaryColor: '#0066CC',
    successColor: '#006699',
    warningColor: '#996600',
    dangerColor: '#660033',
    backgroundColor: '#ffffff',
    textColor: '#000033'
  },
  deuteranopia: {
    name: 'Deuteranopia',
    primaryColor: '#0052CC',
    successColor: '#005580',
    warningColor: '#805500',
    dangerColor: '#800033',
    backgroundColor: '#ffffff',
    textColor: '#000033'
  },
  tritanopia: {
    name: 'Tritanopia',
    primaryColor: '#0066FF',
    successColor: '#006666',
    warningColor: '#666600',
    dangerColor: '#660066',
    backgroundColor: '#ffffff',
    textColor: '#000066'
  }
};
