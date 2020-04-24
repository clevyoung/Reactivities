import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { FormFieldProps, Form, Label } from 'semantic-ui-react';

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {} //just extending the types that are provided is enough

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
  //What we want to do is just return a boolean if we have an error and we can do that by using a double exclamation mark and specifying error and that way this will
  //return a boolean true of false if if exists
};

export default TextInput;
