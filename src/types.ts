import * as Yup from "yup";

export type FormField = {
  name: string;
  label: string;
} & (OtherFormField | OptionFormField);

interface OtherFormField {
  type: "text" | "password";
}

export interface AutoCompleteOption {
  label: string;
  value: string;
}

interface OptionFormField {
  type: "option";
  choices: AutoCompleteOption[];
  defaultValue?: AutoCompleteOption;
}

export type ValidationSchemaInterface = Yup.ObjectSchema<
  { [key: string]: string },
  Yup.AnyObject,
  { [key: string]: undefined },
  ""
>;

export type UserData = {
  id: 1;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
