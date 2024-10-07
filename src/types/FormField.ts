export interface FormField {
  id: string;
  type: 'text' | 'number' | 'email' | 'phone' | 'textarea' | 'checkbox' | 'radio' | 'dropdown' | 'date' | 'time' | 'file' | 'heading';
  label: string;
  required: boolean;
  options?: string[]; // For radio, checkbox, and dropdown fields
}