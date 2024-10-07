import React from 'react';
import { FormField } from '../types/FormField';

interface FormPreviewProps {
  formFields: FormField[];
}

const FormPreview: React.FC<FormPreviewProps> = ({ formFields }) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'phone':
      case 'date':
      case 'time':
        return (
          <input
            type={field.type}
            className="w-full p-2 border rounded"
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <textarea
            className="w-full p-2 border rounded"
            required={field.required}
          />
        );
      case 'checkbox':
        return (
          <div>
            {field.options?.map((option, index) => (
              <label key={index} className="block">
                <input type="checkbox" className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div>
            {field.options?.map((option, index) => (
              <label key={index} className="block">
                <input type="radio" name={field.id} className="mr-2" />
                {option}
              </label>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <select className="w-full p-2 border rounded" required={field.required}>
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'file':
        return (
          <input
            type="file"
            className="w-full p-2 border rounded"
            required={field.required}
          />
        );
      case 'heading':
        return <h2 className="text-xl font-bold">{field.label}</h2>;
      default:
        return null;
    }
  };

  return (
    <form className="space-y-4">
      {formFields.map((field) => (
        <div key={field.id} className="mb-4">
          {field.type !== 'heading' && (
            <label className="block mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {renderField(field)}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormPreview;