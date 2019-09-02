import React from 'react';

const FormField = ({ label, name, type, placeholder, className, onChange  }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input name={name} className={className} type={type} placeholder={placeholder} onChange={onChange}/>
      </div>
    </div>
  );
}

export default FormField;