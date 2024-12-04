import { StylesConfig } from 'react-select';

// Custom styles for react-select
const customStyles: StylesConfig<SelectOption, true> = {
  control: (provided, state) => ({
    ...provided,
    'height': 'auto',
    'minHeight': '2.25rem',
    'width': '100%',
    'borderRadius': '0.375rem',
    'borderColor': state.isFocused ? 'rgb(209, 213, 219)' : 'rgb(209, 213, 219)',
    'backgroundColor': 'transparent',
    'boxShadow': state.isFocused ? '0 0 0 0.5px rgb(229, 231, 235)' : 'none',
    'padding': '0.1rem 0.75rem',
    'transition': 'colors 0.2s ease-in-out',
    '&:hover': {
      borderColor: state.isFocused ? 'rgb(209, 213, 219)' : 'rgb(209, 213, 219)',
    },
    'fontSize': '0.875rem',
    'color': 'inherit',
  }),
  valueContainer: provided => ({
    ...provided,
    padding: 0,
  }),
  input: provided => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: 'rgb(229, 231, 235)',
    borderRadius: '0.25rem',
    margin: '0.125rem',
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: 'inherit',
    padding: '0.25rem 0.5rem',
  }),
  multiValueRemove: provided => ({
    ...provided,
    'color': 'rgb(209, 213, 219)',
    'cursor': 'pointer',
    ':hover': {
      backgroundColor: 'rgb(209, 213, 219)',
      color: 'rgb(31, 41, 55)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    'backgroundColor': state.isSelected ? 'rgb(213, 225, 249)' : state.isFocused ? 'rgb(229, 231, 235)' : 'white',
    'color': state.isSelected ? 'rgb(31, 41, 55)' : 'inherit',
    ':active': {
      backgroundColor: 'rgb(209, 213, 219)',
    },
  }),
  placeholder: provided => ({
    ...provided,
    color: 'rgb(156, 163, 175)',
  }),
};

export default customStyles;
