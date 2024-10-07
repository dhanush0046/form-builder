import { useState } from 'react';
import FormBuilder from '../components/FormBuilder';
import FormPreview from '../components/FormPreview';
import { FormField } from '../types/FormField';

export default function Home() {
  const [formFields, setFormFields] = useState<FormField[]>([]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
        <FormBuilder formFields={formFields} setFormFields={setFormFields} />
      </div>
      <div className="w-1/2 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Form Preview</h1>
        <FormPreview formFields={formFields} />
      </div>
    </div>
  );
}