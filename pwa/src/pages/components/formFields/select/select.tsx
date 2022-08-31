import * as React from "react";
import * as styles from "./select.module.css";
import { Control, Controller, FieldValues } from "react-hook-form";
import ReactSelect from "react-select";
import { IReactHookFormProps } from "../types";

interface ISelectProps {
  control: Control<FieldValues, any>;
  options: { label: string; value: string }[];
  name: string;
  defaultValue?: any;
  disabled?: boolean;
}

export const SelectMultiple: React.FC<ISelectProps & IReactHookFormProps> = ({
  name,
  options,
  errors,
  control,
  validation,
  defaultValue,
  disabled,
}) => {
  return (
    <Controller
      {...{ control, name }}
      rules={validation}
      render={({ field: { onChange, value } }) => {
        return (
          <ReactSelect
            className={styles.select}
            isMulti
            isDisabled={disabled}
            {...{ options, value, onChange, errors, defaultValue }}
          />
        );
      }}
    />
  );
};

export const SelectSingle: React.FC<ISelectProps & IReactHookFormProps> = ({
  name,
  options,
  errors,
  control,
  validation,
  defaultValue,
}) => {
  return (
    <Controller
      {...{ control, name }}
      rules={validation}
      render={({ field: { onChange, value } }) => {
        return <ReactSelect className={styles.select} {...{ options, onChange, value, errors, defaultValue }} />;
      }}
    />
  );
};
