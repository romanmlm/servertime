import { createTheme } from '@material-ui/core';
import {
  PRIMARY,
  GREY_DARK,
  ERROR,
  WARNING,
  SUCCESS,
  WHITE,
  FONT_COLOR
} from './GCApp.style';

const GCAppTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: GREY_DARK
    },
    warning: {
      main: WARNING
    },
    error: {
      main: ERROR
    },
    success: {
      main: SUCCESS
    }
  },
  typography: {
    fontFamily: ['noto sans', 'sans-serif'].join(','),
    allVariants: {
      color: FONT_COLOR
    },
    // used as Title of page
    h4: {
      fontSize: 32,
      lineHeight: '48px'
    },
    // used as Card Headers
    h5: {
      fontSize: 20,
      lineHeight: '28px'
    },
    // used as Small Headers (Above Labels)
    h6: {
      fontSize: 18,
      lineHeight: '28px'
    },
    // used as Small Headers (Above Labels)
    subtitle1: {
      fontSize: 18,
      lineHeight: '28px'
    },
    // used as Labels for form Fields
    subtitle2: {
      fontSize: 16,
      lineHeight: '24px'
    },
    // used for Normal body text
    body1: {
      fontSize: 18,
      lineHeight: '22px'
    },
    // used for small body text
    body2: {
      fontSize: 14,
      lineHeight: '22px'
    },
    caption: {
      opacity: 0.8
    }
  },
  overrides: {
    MuiIconButton: {
      root: {
        color: GREY_DARK,
        backgroundColor: '#C5C5C5',
        padding: 6,
        borderRadius: 0,
        '&.Mui-disabled': {
          border: '2px solid #979797',
          backgroundColor: '#F2F2F2'
        },
        '&:hover, &:active, &:focus': {
          backgroundColor: `${GREY_DARK} !important`,
          color: WHITE
        }
      }
    },
    MuiButton: {
      root: {
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: '28px',
        textTransform: 'none',
        boxShadow: 'none',
        '&.MuiButton-contained.Mui-disabled': {
          border: '2px solid #979797',
          backgroundColor: '#F2F2F2',
          padding: '2px 16px'
        },
        '&.MuiButton-containedPrimary:hover': {
          boxShadow: 'none',
          backgroundColor: '#092A7D'
        },
        '&.MuiButton-containedPrimary:active': {
          boxShadow: 'none',
          backgroundColor: '#092A7D'
        },
        '&.MuiButton-containedPrimary:focus': {
          boxShadow: 'none',
          backgroundColor: '#092A7D'
        },
        '&.MuiButton-containedSecondary': {
          backgroundColor: '#C5C5C5',
          borderRadius: 0,
          boxShadow: 'none',
          color: GREY_DARK,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: GREY_DARK,
            color: WHITE
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: GREY_DARK,
            color: WHITE
          },
          '&:focus': {
            boxShadow: 'none',
            backgroundColor: GREY_DARK,
            color: WHITE
          }
        }
      }
    },
    MuiRadio: {
      root: {
        background: 'none',
        '&:hover, &:active, &:focus': {
          backgroundColor: 'none',
          background: 'none',
          color: GREY_DARK
        },
        '&.Mui-disabled': {
          border: 'none',
          background: 'none'
        },
        '&.MuiRadio-colorSecondary.Mui-checked:hover': {
          backgroundColor: 'none',
          background: 'none',
          color: GREY_DARK
        }
      }
    },
    MuiSwitch: {
      root: {
        background: 'none',
        '&.Mui-disabled': {
          border: 'none',
          background: 'none'
        }
      },
      switchBase: {
        background: 'none',
        '&.Mui-disabled': {
          border: 'none',
          background: 'none'
        }
      }
    },
    MuiFormLabel: {},
    MuiInputLabel: {
      root: {
        color: FONT_COLOR,
        fontSize: 16,
        LineWeight: '22px'
      }
    },
    MuiInput: {
      root: {
        color: '#6D6D6D',
        fontSize: 18,
        LineWeight: '22px'
      }
    }
  }
});

export { GCAppTheme };
