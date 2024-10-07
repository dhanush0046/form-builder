import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from '../types/FormField';

interface SortableFormFieldProps {
  field: FormField;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  index: number;
}

const SortableFormField: React.FC<SortableFormFieldProps> = ({ field, updateField, removeField, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderFieldOptions = () => {
    switch (field.type) {
      case 'radio':
      case 'checkbox':
      case 'dropdown':
        return (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Add options (comma-separated)"
              value={field.options?.join(', ') || ''}
              onChange={(e) => updateField(field.id, { options: e.target.value.split(',').map(opt => opt.trim()) })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200 ease-in-out"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="mr-2 text-gray-500">{index + 1}.</span>
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
            className="text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
          />
        </div>
        <button
          onClick={() => removeField(field.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-150 ease-in-out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="flex items-center mb-2">
        <select
          value={field.type}
          onChange={(e) => updateField(field.id, { type: e.target.value as FormField['type'] })}
          className="mr-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="textarea">Long Text</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Multiple Choice</option>
          <option value="dropdown">Dropdown</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="file">File Upload</option>
          <option value="heading">Heading</option>
        </select>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => updateField(field.id, { required: e.target.checked })}
            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <span className="ml-2 text-sm text-gray-700">Required</span>
        </label>
      </div>
      {renderFieldOptions()}
    </div>
  );
};

export default SortableFormField;