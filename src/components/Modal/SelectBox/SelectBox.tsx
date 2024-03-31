import React from "react";
import Select, { StylesConfig } from "react-select";

interface OptionsProps {
  value: string;
  label: string;
}

interface SelectBoxProps extends OptionsProps {
  setValue: (color: string) => void;
}

const SelectBox = ({ value, setValue, label: labelText }: SelectBoxProps) => {
  const colors = [
    { value: "#f1f3f5", label: "white" },
    { value: "#ff6b6b", label: "red" },
    { value: "#69db7c", label: "green" },
    { value: "#4dabf7", label: "blue" },
    { value: "#ffd43b", label: "yellow" },
  ];

  const priority = [
    { value: "low", label: "Low" },
    { value: "high", label: "High" },
  ];

  const options = labelText === "Color" ? colors : priority;

  const defaultValue = options.filter((option) => {
    if (option.value === value) {
      return option;
    }
  });

  const colorStyles: StylesConfig<OptionsProps> = {
    // const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      if (labelText === "Color") {
        return {
          ...styles,
          backgroundColor: isDisabled
            ? undefined
            : isSelected
            ? data.value
            : isFocused
            ? data.value
            : "white",
          color: isDisabled
            ? "#ccc"
            : isSelected
            ? "white"
            : isFocused
            ? "white"
            : "black",
          cursor: isDisabled ? "not-allowed" : "default",
          ":active": {
            ...styles[":active"],
            backgroundColor: !isDisabled
              ? isSelected
                ? data.value
                : "#ccc"
              : undefined,
          },
        };
      }
      return {
        ...styles,
      };
    },
  };

  const handleOptions = (e: OptionsProps) => {
    setValue(e.value);
  };

  return (
    <>
      <Select
        options={options}
        value={defaultValue.length > 0 ? defaultValue[0] : undefined}
        onChange={(e) => {
          handleOptions(e as OptionsProps);
        }}
        styles={colorStyles}
      />
    </>
  );
};

export default SelectBox;
