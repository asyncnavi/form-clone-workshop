export type FieldType = "text" | "checkbox" | "dropdown" | "multiple_choice";

export type Field = {
  id: string;
  type: FieldType;
  label: string;
  options?: string[]; 
};
export type Form = {
  id: string;
  title: string;
  description: string;
  fields: Field[];
};

export type FormSchema = Form & {
    user_id : string 
    created_at : string
    published : boolean
    is_private : boolean
    allowed_users : string[]
}

export type Response = {
    id: string; 
    form_id: string; 
    user_id?: string; 
    submitted_at: string;
    answers: {
      [fieldId: string]: string | boolean | string[]; 
    };
  };
  