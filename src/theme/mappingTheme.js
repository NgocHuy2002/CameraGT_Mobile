export default {
  strict: {
    'text-paragraph-1-font-size': 14,
    'text-label-font-size': 14,
    'text-label-font-weight': 'bold',
  },
  components: {
    Button: {
      appearances: {
        filled: {
          variantGroups: {
            size: {
              tiny: {
                paddingHorizontal: 2,
                paddingVertical: 2,
                textMarginHorizontal: 2,
                iconMarginHorizontal: 2,
              },
              small: {
                paddingHorizontal: 4,
                paddingVertical: 4,
                textMarginHorizontal: 2,
                iconMarginHorizontal: 2,
              },
              medium: {
                paddingHorizontal: 8,
                paddingVertical: 6,
                textMarginHorizontal: 2,
                iconMarginHorizontal: 2,
              },
              large: {
                paddingHorizontal: 8,
                paddingVertical: 6,
                textMarginHorizontal: 4,
                iconMarginHorizontal: 4,
              },
              giant: {
                paddingHorizontal: 8,
                paddingVertical: 6,
                textMarginHorizontal: 4,
                iconMarginHorizontal: 4,
              },
            },
          },
        },
      },
    },
    Box: {
      meta: {
        scope: 'all',
        parameters: {},
        appearances: {},
        variantGroups: {},
        states: {},
      },
      appearances: {},
    },
    Avatar: {
      meta: {
        parameters: {
          color: {
            type: 'string',
          },
          backgroundColor: {
            type: 'string',
          },
        },
        variantGroups: {
          level: {
            1: {
              default: false,
            },
            2: {
              default: false,
            },
            3: {
              default: false,
            },
            4: {
              default: false,
            },
          },
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          variantGroups: {
            level: {
              1: {
                backgroundColor: 'background-basic-color-1',
              },
              2: {
                backgroundColor: 'background-basic-color-2',
              },
              3: {
                backgroundColor: 'background-basic-color-3',
              },
              4: {
                backgroundColor: 'background-basic-color-4',
              },
            },
            status: {
              basic: {
                color: 'text-basic-color',
                backgroundColor: 'background-basic-color-2',
              },
              primary: {
                color: 'color-basic-100',
                backgroundColor: 'color-primary-default',
              },
              success: {
                color: 'color-basic-100',
                backgroundColor: 'color-success-default',
              },
              info: {
                color: 'color-basic-100',
                backgroundColor: 'color-info-default',
              },
              warning: {
                color: 'color-basic-100',
                backgroundColor: 'color-warning-default',
              },
              danger: {
                color: 'color-basic-100',
                backgroundColor: 'color-danger-default',
              },
            },
          },
        },
      },
    },
    Card: {
      appearances: {
        outline: {
          mapping: {
            headerPaddingHorizontal: 16,
            headerPaddingVertical: 8,
            bodyPaddingHorizontal: 16,
            bodyPaddingVertical: 8,
            footerPaddingHorizontal: 16,
            footerPaddingVertical: 8,
          },
        },
      },
    },
    Divider: {
      meta: {
        appearances: {
          ghost: {
            default: false,
          },
        },
      },
      appearances: {
        ghost: {
          mapping: {
            backgroundColor: 'background-basic-color-4',
          },
        },
      },
    },
    Input: {
      meta: {
        parameters: {
          borderBottomWidth: {
            type: 'number',
          },
        },
        variantGroups: {
          variant: {
            none: {
              default: false,
            },
            filled: {
              default: true,
            },
            outlined: {
              default: false,
            },
            standard: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 0,
          },
          variantGroups: {
            variant: {
              none: {
                borderWidth: 0,
                borderRadius: 0,
                backgroundColor: 'background-basic-color-1',
                textMarginHorizontal: 0,
                iconMarginHorizontal: 0,
              },
              filled: {},
              outlined: {
                backgroundColor: 'background-basic-color-1',
              },
              standard: {
                borderWidth: 0,
                borderRadius: 0,
                backgroundColor: 'background-basic-color-1',
                borderBottomWidth: 'border-width',
                textMarginHorizontal: 0,
                iconMarginHorizontal: 0,
              },
            },
          },
        },
      },
    },
    Select: {
      meta: {
        parameters: {
          borderBottomWidth: {
            type: 'number',
          },
        },
        variantGroups: {
          variant: {
            none: {
              default: false,
            },
            filled: {
              default: true,
            },
            outlined: {
              default: false,
            },
            standard: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 0,
            textFontFamily: 'text-font-family',
          },
          variantGroups: {
            variant: {
              none: {
                borderWidth: 0,
                borderRadius: 0,
                backgroundColor: 'background-basic-color-1',
                textMarginHorizontal: 0,
                iconMarginHorizontal: 0,
                placeholderMarginHorizontal: 0,
              },
              filled: {},
              outlined: {
                backgroundColor: 'background-basic-color-1',
              },
              standard: {
                borderWidth: 0,
                borderRadius: 0,
                backgroundColor: 'background-basic-color-1',
                borderBottomWidth: 'border-width',
                textMarginHorizontal: 0,
                iconMarginHorizontal: 0,
                placeholderMarginHorizontal: 0,
              },
            },
          },
        },
      },
    },
    SelectOption: {
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 0,
            textFontFamily: 'text-font-family',
          },
        },
      },
    },
    CalendarCell: {
      meta: {
        scope: 'all',
        parameters: {
          marginHorizontal: {
            type: 'number',
          },
          marginVertical: {
            type: 'number',
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            marginHorizontal: 0,
            marginVertical: 1,
          },
        },
      },
    },
    Datepicker: {
      meta: {
        variantGroups: {
          variant: {
            filled: {
              default: true,
            },
            outlined: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          mapping: {
            paddingHorizontal: 0,
          },
          variantGroups: {
            variant: {
              filled: {},
              outlined: {
                backgroundColor: 'background-basic-color-1',
              },
            },
          },
        },
      },
    },
    ListItem: {
      meta: {
        parameters: {
          borderRadius: {
            type: 'number',
          },
          borderLeftWidth: {
            type: 'number',
          },
          borderLeftColor: {
            type: 'string',
          },
        },
        variantGroups: {
          variant: {
            filled: {
              default: false,
            },
            standard: {
              default: true,
            },
          },
          status: {
            basic: {
              default: false,
            },
            primary: {
              default: false,
            },
            success: {
              default: false,
            },
            info: {
              default: false,
            },
            warning: {
              default: false,
            },
            danger: {
              default: false,
            },
            control: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          variantGroups: {
            variant: {
              filled: {
                borderRadius: 'border-radius',
                backgroundColor: 'background-basic-color-2',
                paddingVertical: 12,
              },
              standard: {},
            },
            status: {
              basic: {
                borderLeftWidth: 4,
                borderLeftColor: 'color-basic-default',
              },
              primary: {
                borderLeftWidth: 4,
                borderLeftColor: 'color-primary-default',
              },
              success: {
                borderLeftWidth: 4,
                borderLeftColor: 'color-success-default',
              },
              info: {
                borderLeftWidth: 4,
                borderLeftColor: 'color-info-default',
              },
              warning: {
                borderLeftWidth: 4,
                borderLeftColor: 'color-warning-default',
              },
              danger: {
                borderLeftWidth: 4,
                borderLeftColor: 'color-danger-default',
              },
              control: {
                borderLeftWidth: 4,
                borderLeftColor: 'color-control-default',
              },
            },
          },
        },
      },
    },
    Tab: {
      meta: {
        parameters: {
          borderRadius: {
            type: 'number',
          },
          paddingVertical: {
            type: 'number',
          },
          backgroundColor: {
            type: 'string',
          },
        },
        variantGroups: {
          variant: {
            filled: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          variantGroups: {
            variant: {
              filled: {
                state: {
                  selected: {
                    textColor: 'color-primary-default',
                    iconTintColor: 'color-primary-default',
                    borderRadius: 'border-radius',
                    paddingVertical: 10,
                    backgroundColor: 'color-primary-transparent-default',
                  },
                },
              },
            },
          },
        },
      },
    },
    TopNavigation: {
      meta: {
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          variantGroups: {
            status: {
              primary: {
                backgroundColor: 'color-primary-default',
                titleColor: 'color-basic-100',
                subtitleColor: 'color-basic-200',
              },
            },
          },
        },
      },
    },
    TopNavigationAction: {
      meta: {
        variantGroups: {
          status: {
            basic: {
              default: true,
            },
            primary: {
              default: false,
            },
          },
        },
      },
      appearances: {
        default: {
          variantGroups: {
            status: {
              primary: {
                iconTintColor: 'color-basic-100',
              },
            },
          },
        },
      },
    },
  },
};
