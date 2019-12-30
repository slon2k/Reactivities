import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

interface IProps extends FieldRenderProps<Date, HTMLElement>, FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
  ...rest
}) => {
  console.log("DateInput props", input);
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input
        type="datetime-local"
        name="date"
      />

      {/*       <DateTimePicker 
        placeholder={placeholder}
        value={new Date(input.value) || null}
        onChange={() => console.log("picker")}
      /> */}
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
