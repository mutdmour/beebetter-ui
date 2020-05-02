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
    addPreviousResult: (prevResult: PrevResult) => void;
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
    addPreviousResult: (prevResult: PrevResult) => void;
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

  interface ResultData {
    elementId: string;
    beemind: BeeminderResult | null;
    value: string;
  }

  interface PrevResult {
    id: number;
    data: {
      results: ResultData[];
      date: string;
    };
    userId: number;
    formId: number;
    createdAt: string;
    contextId: string | null;
  }

  interface RandomCollection extends RandomCollectionJSON {
    selected: number;
    elements: FormElement[];

    setValue: (value: string) => void;
    getResult: () => ResultData | null;
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
    addPreviousResult: (prevResult: PrevResult) => void;
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
    addPreviousResult: (prevResult: PrevResult) => void;
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
    getResult: () => ResultData | null;
    getJSON: () => FormElementJSON;
    setValidated: () => void;
    getContextId: () => string | null;
    addPreviousResult: (prevResult: PrevResult) => void;
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
    getResults: () => ResultData[];
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
    getResults: () => ResultData[];
    getJSON: () => FormJSON;
    getConfig: () => { pages: PageJSON[]; name: string };
    setPageValidated: (pageIndex: number) => void;
    validatePage: (pageIndex: number) => void;
    setDate: (value: string) => void;
    getElement: (elementId: string) => FormElement | null;
    addPreviousResult: (result: PrevResult) => void;
  }

  interface FormsState {
    forms: Form[];
    currentFormSlug: string;
  }
}

export = beebetter;
