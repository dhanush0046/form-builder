import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { FormField } from '../types/FormField';
import SortableFormField from './SortableFormField';
import { SlashCommand } from './SlashCommand';

interface FormBuilderProps {
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ formFields, setFormFields }) => {
  const [showSlashCommand, setShowSlashCommand] = useState(false);
  const [slashCommandPosition, setSlashCommandPosition] = useState({ top: 0, left: 0 });

  const addField = useCallback((type: string) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: type as FormField['type'],
      label: `New ${type} field`,
      required: false,
    };
    setFormFields((prev) => [...prev, newField]);
    setShowSlashCommand(false);
    
    // Focus on the editor and move cursor to the end after adding a field
    setTimeout(() => {
      editor?.commands.focus('end');
    }, 0);
  }, [setFormFields]);

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  }, [setFormFields]);

  const removeField = useCallback((id: string) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id));
  }, [setFormFields]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type / to add a field',
      }),
      SlashCommand,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from - 1, to, '\n');
      if (text === '/') {
        const coordinates = editor.view.coordsAtPos(from);
        setSlashCommandPosition({ top: coordinates.top, left: coordinates.left });
        setShowSlashCommand(true);
      } else {
        setShowSlashCommand(false);
      }
    },
  });

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <EditorContent editor={editor} className="p-4 border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200 ease-in-out" />
      {showSlashCommand && (
        <div
          className="absolute z-10 w-64 mt-1 bg-white border rounded-md shadow-lg slash-command-menu"
          style={{ top: `${slashCommandPosition.top}px`, left: `${slashCommandPosition.left}px` }}
        >
          {['text', 'number', 'email', 'phone', 'textarea', 'checkbox', 'radio', 'dropdown', 'date', 'time', 'file', 'heading'].map((type) => (
            <div
              key={type}
              className="p-2 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ease-in-out"
              onClick={() => {
                addField(type);
                editor.commands.deleteRange({ from: editor.state.selection.from - 1, to: editor.state.selection.from });
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-4">
        {formFields.map((field, index) => (
          <SortableFormField
            key={field.id}
            field={field}
            updateField={updateField}
            removeField={removeField}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;