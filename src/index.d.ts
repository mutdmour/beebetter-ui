declare namespace beebetter {
  interface ElementUpdateEvent {
    value: string;
    state: string | null;
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
    state: string | null;
    timestamp: number | null;
    options: RadioGroupOption[];

    getValue: () => string;
    setValue: (value: string, state: string | null) => void;
    getJSON: () => RadioGroupJSON;
    addPreviousResult: (prevResult: PrevResult) => void;
    canTrack: () => boolean;
  }

  interface TextInputJSON {
    repeat: boolean;
    label: string;
    expected: string | null;
  }

  interface TextInput extends TextInputJSON {
    value: string;
    state: string | null;
    timestamp: number | null;

    getValue: () => string;
    setValue: (value: string, state: string | null) => void;
    getJSON: () => TextInputJSON;
    addPreviousResult: (prevResult: PrevResult) => void;
    canTrack: () => boolean;
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
    state: string | null;
    timestamp: number;
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

    setValue: (value: string, state: string | null) => void;
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
    state: string | null;
    timestamp: number | null;

    getValue: (required: boolean) => string;
    setValue: (value: string, state: string | null) => void;
    getJSON: () => CheckboxJSON;
    addPreviousResult: (prevResult: PrevResult) => void;
    canTrack: () => boolean;
  }

  interface TimerJSON {
    label: string;
  }

  interface Timer extends TimerJSON {
    value: string;
    state: string | null;
    timestamp: number | null;

    getValue: () => string;
    setValue: (value: string, state: string | null) => void;
    getJSON: () => TimerJSON;
    addPreviousResult: (prevResult: PrevResult) => void;
    canTrack: () => boolean;
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

    setValue: (value: string, state: string | null) => void;
    getResult: () => ResultData | null;
    getJSON: () => FormElementJSON;
    setValidated: () => void;
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
    setValue: (
      elementIndex: number,
      value: string,
      state: string | null
    ) => void;
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
    submittedToday: boolean;

    getPage: (index: number) => Page | null;
    setValue: (
      pageIndex: number,
      elementIndex: number,
      value: string,
      state: string | null
    ) => void;
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
