import clsx from 'clsx';
import Select from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/stateManager';
import { ErrorMessage, Label } from '@/components/common';

type Props = StateManagerProps & {
  label?: string;
  errorText?: string | any;
  isMulti?: boolean;
  controlClassName?: string;
  isMandatory?: boolean;
};

export const InputSelect = ({
  label,
  errorText,
  isMulti,
  controlClassName,
  isMandatory = false,
  ...props
}: Props) => {
  return (
    <div>
      <Label label={label ?? ''}>
        {isMandatory && <small className="text-danger">*</small>}
      </Label>
      <Select
        menuPlacement="bottom"
        classNames={{
          control: state =>
            clsx(
              'hover:!border-[#BBBFD1] text-[#838AA9] !border-[#e2e2e2]',
              'hover:focus-within:!border-[#a93030] focus-within:!border-[#2B3E9B] focus-within:text-[#151F4E]',
              'text-sm font-semibold !rounded-[6px] border-[1px] p-[3px]',
              controlClassName,
            ),
          indicatorSeparator: () => 'hidden',
          indicatorsContainer: () => 'cursor-pointer',
          menu: () => '!bg-[#F3F4F9]',
          singleValue: () => '!text-[currentColor]',
          option: state => {
            return clsx(
              '!text-[#151F4E] hover:!bg-[#2B3E9B] hover:!text-white !bg-transparent',
            );
          },
        }}
        isMulti={isMulti}
        styles={{
          option: (styles, state) => ({
            ...styles,
            ...(state.isSelected && {
              backgroundColor: '#2b3e9b !important',
              color: 'white !important',
            }),
          }),
        }}
        {...props}
      />
      {errorText && <ErrorMessage errorText={errorText} />}
    </div>
  );
};
