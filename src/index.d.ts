declare namespace beebetter {
  interface RadioGroupOptionJSON {
    label: string;
    value: string;
  }

  interface RadioGroupOption extends RadioGroupOptionJSON {
    getJSON: () => RadioGroupOptionJSON;
  }

  type RadioGroupType = "radio";

  interface RadioGroupJSON {
    label: string;
    options: RadioGroupOptionJSON[];
  }

  interface RadioGroup extends RadioGroupJSON {
    value: string;
    options: RadioGroupOption[];

    getResult: () => string;
    setValue: (value: string) => void;
    getJSON: () => RadioGroupJSON;
  }

  interface TextInputJSON {
    label: string;
    expected: string | null;
  }

  interface TextInput extends TextInputJSON {
    value: string;

    getResult: () => string;
    setValue: (value: string) => void;
    getJSON: () => TextInputJSON;
  }

  interface BeeminderConfig {
    enabled: boolean;
    goalName: string;
  }

  type RandomCollectionType = "random";

  interface RandomCollectionJSON {
    elements: FormElementJSON[];
    type: RandomCollectionType;
  }

  interface BeeminderResult {
    goalName: string;
  }

  interface Result {
    beemind: BeeminderResult;
    value: string;
  }

  interface RandomCollection extends RandomCollectionJSON {
    selected: number;
    elements: FormElement[];

    setValue: (value: string) => void;
    getResult: () => Result | null;
    getJSON: () => RandomCollectionJSON;
    setValidated: () => void;
  }

  interface FormElementJSON {
    id: string;
    type: string;
    enabled: boolean;
    required: boolean;
    beemind: BeeminderConfig | null;
    content: TextInputJSON | RadioGroupJSON;
  }

  interface FormElement extends FormElementJSON {
    content: TextInput | RadioGroup;
    invalid: boolean;

    setValue: (value: string) => void;
    getResult: () => Result | null;
    getJSON: () => FormElementJSON;
    setValidated: () => void;
  }

  type ElementJSONType = FormElementJSON | RandomCollectionJSON;
  interface PageJSON {
    name: string;
    elements: ElementJSONType[];
  }

  type ElementType = FormElement | RandomCollection;

  interface Page extends PageJSON {
    elements: ElementType[];

    getElement: (index: number) => FormElement | RandomCollection | null;
    setValue: (elementIndex: number, value: string) => void;
    getResults: () => Result[];
    getJSON: () => PageJSON;
    setValidated: () => void;
  }

  interface FormJSON {
    id: number;
    slug: string;
    config: {
      name: string;
      pages: PageJSON[];
    };
  }

  interface Form {
    id: number;
    slug: string;
    name: string;
    pages: Page[];

    getPage: (index: number) => Page | null;
    setValue: (pageIndex: number, elementIndex: number, value: string) => void;
    getResults: () => Result[];
    getJSON: () => FormJSON;
    getConfig: () => { pages: PageJSON[]; name: string };
    setPageValidated: (pageIndex: number) => void;
    validatePage: (pageIndex: number) => void;
  }

  interface FormsState {
    forms: Form[];
    currentFormSlug: string;
  }
}

export = beebetter;
