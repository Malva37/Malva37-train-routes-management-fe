import classNames from 'classnames';
import React, { useState } from 'react';

type Props = {
  name: string,
  value: string,
  label: string,
  required: boolean,
  pattern: string,
  onChange: (newValue: string) => void,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const NumberField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = false,
  pattern,
  onChange = () => {},
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setTouched] = useState(false);
  const hasError = touched && required
    && !RegExp(pattern).test(value);

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="string"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => {
            onChange(event.target.value)}
          }
          onBlur={() => setTouched(true)}
        />
      </div>

      {hasError && (
        <p className="help is-danger">
          Please enter a number
        </p>
      )}
    </div>
  );
};
