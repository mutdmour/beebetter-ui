declare namespace beebetter {
  interface ElementUpdateEvent {
    value: string;
  }

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

    getValue: () => string;
    setValue: (value: string) => void;
    getJSON: () => RadioGroupJSON;
    getContextId: () => string | null;
  }

  interface TextInputJSON {
    repeat: boolean;
    label: string;
    expected: string | null;
  }

  interface TextInput extends TextInputJSON {
    value: string;

    getContextId: () => string | null;
    getValue: () => string;
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
    id: string;
    beemind: BeeminderResult | null;
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

  interface CheckboxJSON {
    label: string;
    checkedValue: string;
    unCheckedValue: string;
  }

  interface Checkbox extends CheckboxJSON {
    value: string;

    getValue: () => string;
    setValue: (value: string) => void;
    getJSON: () => CheckboxJSON;
    getContextId: () => string | null;
  }

  interface TimerJSON {
    label: string;
  }

  interface Timer extends TimerJSON {
    value: string;

    getValue: () => string;
    setValue: (value: string) => void;
    getJSON: () => TimerJSON;
    getContextId: () => string | null;
  }

  interface FormElementJSON {
    id: string;
    type: string;
    enabled: boolean;
    required: boolean;
    beemind: BeeminderConfig | null;
    content: TextInputJSON | RadioGroupJSON | CheckboxJSON | TimerJSON;
  }

  interface FormElement extends FormElementJSON {
    content: TextInput | RadioGroup | Checkbox | Timer;
    invalid: boolean;

    setValue: (value: string) => void;
    getResult: () => Result | null;
    getJSON: () => FormElementJSON;
    setValidated: () => void;
    getContextId: () => string | null;
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
      type: string;
    };
  }

  interface Form {
    id: number;
    slug: string;
    name: string;
    pages: Page[];
    canSubmit: boolean;
    showDatePicker: boolean;
    type: string;
    date: string;

    getPage: (index: number) => Page | null;
    setValue: (pageIndex: number, elementIndex: number, value: string) => void;
    getResults: () => Result[];
    getJSON: () => FormJSON;
    getConfig: () => { pages: PageJSON[]; name: string };
    setPageValidated: (pageIndex: number) => void;
    validatePage: (pageIndex: number) => void;
    setDate: (value: string) => void;
    getElement: (elementId: string) => FormElement | null;
  }

  interface FormsState {
    forms: Form[];
    currentFormSlug: string;
  }
}

export = beebetter;
