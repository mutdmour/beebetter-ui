/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Page,
  Form,
  FormElement,
  RadioGroup,
  TextInput,
  RadioGroupOption,
  RandomCollection,
  BeeminderConfig,
  RadioGroupOptionJSON,
  RadioGroupJSON,
  ResultData,
  TextInputJSON,
  FormElementJSON,
  RandomCollectionJSON,
  PageJSON,
  ElementType,
  ElementJSONType,
  FormJSON,
  CheckboxJSON,
  Checkbox,
  Timer,
  TimerJSON,
  PrevResult
} from "../index";
import { isValidSlugName } from "../utils/helpers";
import { notEmpty } from "../utils/helpers";

class TimerWrapper implements Timer {
  label: string;
  value: string;
  interval: any;
  previousResult: PrevResult | null;
  state: string | null;
  timestamp: number;
  timeSoFar: number;

  constructor(data: TimerJSON) {
    this.label = data.label;
    this.timeSoFar = 0;
    this.timestamp = Date.now();
    this.value = "0";
    this.state = "reset";
    this.previousResult = null;
  }

  getLabel(label: string): string {
    if (!label) {
      throw new Error("Label field in timer must have value");
    }
    return label;
  }

  getJSON() {
    return {
      label: this.label
    };
  }

  canTrack() {
    return this.state === "stopped";
  }

  setValue(value: string, state: string | null) {
    this.timeSoFar = parseInt(value);
    this.value = `${parseInt(value) / 60}`;
    this.state = state;
    this.timestamp = Date.now();

    if (this.state === "reset") {
      this.previousResult = null;
      this.value = "0";
      this.timeSoFar = 0;
    }
  }

  getValue() {
    return this.value;
  }

  addPreviousResult(prevResult: PrevResult) {
    this.state = prevResult.data.results[0].state;
    this.value = prevResult.data.results[0].value;
    this.timestamp =
      prevResult.data.results[0].timestamp ||
      parseInt(prevResult.createdAt) * 1000;
    this.timeSoFar = Math.floor(parseFloat(this.value) * 60);
    this.previousResult = prevResult;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isTimer(type: any, x: any): x is TimerJSON {
  return type === "timer";
}

class RadioGroupOptionWrapper implements RadioGroupOption {
  label: string;
  value: string;

  constructor(data: RadioGroupOptionJSON) {
    this.label = this.getLabel(data.label);
    this.value = this.getOptionValue(data.value);
  }

  getLabel(label: string): string {
    if (!label) {
      throw new Error("Label field in radio group must have value");
    }
    return label;
  }

  getOptionValue(value: string): string {
    if (typeof value !== "string") {
      throw new Error("value field in radio group must be a string");
    }
    if (!value) {
      throw new Error("value field in radio group must have value");
    }

    return value;
  }

  getJSON(): RadioGroupOptionJSON {
    return {
      label: this.label,
      value: this.value
    };
  }
}

function isRadioGroup(type: string, x: any): x is RadioGroupJSON {
  return x && type === "radio";
}

class RadioGroupWrapper implements RadioGroup {
  label: string;
  options: RadioGroupOption[];
  value: string;
  type: "radio";
  state: string | null;
  timestamp: number | null;

  constructor(data: RadioGroupJSON) {
    this.label = this.getLabel(data.label);
    this.options = this.getOptions(data.options);
    this.value = "";
    this.type = "radio";
    this.state = null;
    this.timestamp = null;
  }

  canTrack() {
    return true;
  }

  getJSON(): RadioGroupJSON {
    return {
      label: this.label,
      options: this.options.map(opt => opt.getJSON())
    };
  }

  getOptions(options: RadioGroupOptionJSON[]): RadioGroupOption[] {
    if (!options) {
      throw new Error("Options field in radio group must have value");
    }
    if (!Array.isArray(options)) {
      throw new Error("Options field in radio group must be an array");
    }
    if (options.length === 0) {
      throw new Error("Options field in radio group must not be empty");
    }
    return options.map(
      (opt: RadioGroupOptionJSON) => new RadioGroupOptionWrapper(opt)
    );
  }

  getLabel(label: string): string {
    if (!label) {
      throw new Error("Label field in radio group must have value");
    }
    return label;
  }

  setValue(value: string): void {
    this.value = value;
  }

  getValue(): string {
    if (!this.value) {
      throw new Error("Value for radio group must be given");
    }
    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPreviousResult(prevResult: PrevResult) {
    //
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isCheckbox(type: any, x: any): x is CheckboxJSON {
  return type === "checkbox";
}

class CheckboxWrapper implements Checkbox {
  label: string;
  value: string;
  unCheckedValue: string;
  checkedValue: string;
  state: string | null;
  timestamp: number | null;

  constructor(content: CheckboxJSON) {
    if (!content.label) {
      throw new Error("Label is required for checkbox");
    }
    this.label = content.label;
    this.unCheckedValue = content.unCheckedValue || "0";
    this.checkedValue = content.checkedValue || "1";
    this.value = this.unCheckedValue;
    this.state = null;
    this.timestamp = null;
  }

  canTrack() {
    return true;
  }

  setValue(value: string) {
    this.value = value;
  }

  getJSON(): CheckboxJSON {
    return {
      label: this.label,
      unCheckedValue: this.unCheckedValue,
      checkedValue: this.checkedValue
    };
  }

  getValue(required: boolean): string {
    if (required && this.value !== this.checkedValue) {
      return "";
    }

    return this.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPreviousResult(prevResult: PrevResult) {
    //
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isTextInput(type: any, x: any): x is TextInputJSON {
  return type === "text";
}

class TextInputWrapper implements TextInput {
  label: string;
  value: string;
  expected: string | null;
  repeat: boolean;
  state: string | null;
  timestamp: number | null;

  constructor(data: TextInputJSON) {
    this.timestamp = null;
    this.label = this.getLabel(data.label);
    this.expected = data.expected || null;
    this.value = "";
    this.repeat = Boolean(data.repeat);
    this.state = null;
  }

  canTrack() {
    return true;
  }

  getJSON(): TextInputJSON {
    return {
      label: this.label,
      expected: this.expected,
      repeat: this.repeat
    };
  }

  getValue(): string {
    const expected = this.repeat ? this.label : this.expected;
    if (
      expected &&
      expected.trim().toLowerCase() !== this.value.trim().toLowerCase()
    ) {
      throw new Error(`Value is not as expected: ${expected}`);
    }
    return this.value;
  }

  getLabel(label: string): string {
    if (!label) {
      throw new Error("Label field in text input must have value");
    }
    return label;
  }

  setValue(value: string): void {
    this.value = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addPreviousResult(prevResult: PrevResult) {
    //
  }
}

class FormElementWrapper implements FormElement {
  id: string;
  type: string;
  content: TextInput | RadioGroup | Checkbox | Timer;
  beemind: BeeminderConfig | null;
  enabled: boolean;
  required: boolean;
  validated: boolean;

  constructor(data: FormElementJSON) {
    this.id = this.getId(data.id);
    this.type = this.getType(data.type);
    this.beemind = this.getBeeminderConfig(data.beemind);
    this.content = this.getContent(data.type, data.content);
    this.enabled = this.getEnabled(data.enabled);
    this.required = this.getRequired(data.required);
    this.validated = false;
  }

  setValidated(): void {
    this.validated = true;
  }

  getJSON(): FormElementJSON {
    return {
      id: this.id,
      type: this.type,
      content: this.content.getJSON(),
      enabled: this.enabled,
      required: this.required,
      beemind: this.beemind
    };
  }

  get invalid(): boolean {
    if (this.enabled && this.required && this.validated) {
      try {
        this.getResult();
      } catch (e) {
        return true;
      }
    }
    return false;
  }

  getResult(): ResultData | null {
    if (!this.enabled) {
      return null;
    }
    try {
      const value = this.content.getValue(this.required);
      if (this.required && !value) {
        throw new Error("Missing required field");
      }
      const beemind =
        this.beemind && this.beemind.enabled && this.content.canTrack()
          ? { goalName: this.beemind.goalName }
          : null;

      return {
        elementId: this.id,
        beemind,
        value,
        state: this.content.state,
        timestamp: this.content.timestamp || Date.now()
      };
    } catch (e) {
      if (this.required) {
        throw e;
      }
    }
    return null;
  }

  getId(id: string): string {
    if (!id) {
      throw new Error("Id is a required field of an element");
    }

    if (typeof id !== "string") {
      throw new Error("Id must be a string");
    }

    if (id.indexOf(" ") > -1) {
      throw new Error("Element id must not contain any spaces");
    }

    return id;
  }

  getType(type: string): string {
    if (!type) {
      throw new Error("Type is a required field of an element");
    }
    return type;
  }

  getBeeminderConfig(config: BeeminderConfig | null): BeeminderConfig | null {
    if (config) {
      if (typeof config !== "object") {
        throw new Error("Beemind config must be an object");
      }
      if (!Object.prototype.hasOwnProperty.call(config, "enabled")) {
        throw new Error("Beemind config must have enabled key");
      }
      if (typeof config.enabled !== "boolean") {
        throw new Error("Enabled value must be boolean in beemind config");
      }
      if (!config.goalName) {
        throw new Error("goalName is required field of beemind config");
      }
      return {
        enabled: config.enabled,
        goalName: config.goalName
      };
    }

    return null;
  }

  getContent(type: string, content: unknown) {
    if (!type) {
      throw new Error("type must be given for element");
    }
    if (!content) {
      throw new Error("content object must be given for element");
    }
    if (isTextInput(type, content)) {
      return new TextInputWrapper(content);
    } else if (isRadioGroup(type, content)) {
      return new RadioGroupWrapper(content);
    } else if (isCheckbox(type, content)) {
      return new CheckboxWrapper(content);
    } else if (isTimer(type, content)) {
      return new TimerWrapper(content);
    }
    throw new Error(`Unknown element type: ${type}`);
  }

  getEnabled(enabled: boolean): boolean {
    if (typeof enabled !== "boolean") {
      throw new Error("Enabled value must be boolean in beemind config");
    }
    return enabled;
  }

  getRequired(required: boolean): boolean {
    if (typeof required !== "boolean") {
      throw new Error("Required value must be boolean in beemind config");
    }
    return required;
  }

  setValue(value: string, state: string | null): void {
    this.content.setValue(value, state);
  }

  addPreviousResult(prevResult: PrevResult) {
    if (prevResult.data.results[0].elementId === this.id) {
      this.content.addPreviousResult(prevResult);
    }
  }
}

function isRandomCollection(x: any): x is RandomCollectionJSON {
  return x && x.type === "random";
}

class RandomCollectionWrapper implements RandomCollection {
  type: "random";
  elements: FormElement[];
  selected: number;

  constructor(
    data: RandomCollectionJSON,
    elementMap: Map<string, FormElement>
  ) {
    if (!data) {
      throw new Error("Element must have necessarily details");
    }
    if (data.type !== "random") {
      throw new Error("Element must have type: random");
    }
    this.elements = this.getElements(data.elements, elementMap);
    this.selected = this.elements.length > 0 ? this.getSelected() : -1;
    this.type = "random";
  }

  setValidated(): void {
    this.elements[this.selected].setValidated();
  }

  getJSON(): RandomCollectionJSON {
    return {
      type: this.type,
      elements: this.elements.map(element => element.getJSON())
    };
  }

  getResult(): ResultData | null {
    return this.selected > -1 ? this.elements[this.selected].getResult() : null;
  }

  getSelected() {
    const enabled = this.elements
      .map((el, i) => ({ el, i }))
      .filter(item => item.el.enabled);
    const selected = Math.floor(Math.random() * this.elements.length);
    return enabled[selected].i;
  }

  getElements(
    elements: FormElementJSON[],
    elementMap: Map<string, FormElement>
  ) {
    if (!elements) {
      throw new Error("elements is required field of form");
    }
    if (!Array.isArray(elements)) {
      throw new Error("page elements must be an array");
    }
    const res = elements.map(
      (element: FormElementJSON) => new FormElementWrapper(element)
    );

    res.forEach((element: FormElement) => {
      if (elementMap.has(element.id)) {
        throw new Error("Element id must be unique in form");
      }
      elementMap.set(element.id, element);
    });

    return res;
  }

  getElement(index: number) {
    return this.elements && this.elements.length > index
      ? this.elements[index]
      : null;
  }

  setValue(value: string, state: string | null) {
    const element = this.selected > -1 ? this.getElement(this.selected) : null;
    if (element) {
      element.setValue(value, state);
    }
  }
}

class PageWrapper implements Page {
  name: string;
  elements: ElementType[];

  constructor(data: PageJSON, elementMap: Map<string, FormElement>) {
    this.name = this.getName(data.name);
    this.elements = this.getElements(data.elements, elementMap);
  }

  setValidated(): void {
    this.elements.forEach(element => element.setValidated());
  }

  getJSON(): PageJSON {
    return {
      name: this.name,
      elements: this.elements.map(element => element.getJSON())
    };
  }

  getResults(): ResultData[] {
    return this.elements.map(el => el.getResult()).filter(notEmpty);
  }

  getName(name: string) {
    if (!name) {
      throw new Error("name is required field of a page");
    }
    if (typeof name !== "string") {
      throw new Error("name must be of type string");
    }
    return name;
  }

  getElements(
    elements: ElementJSONType[],
    elementMap: Map<string, FormElement>
  ) {
    if (!elements) {
      throw new Error("elements is required field of form");
    }
    if (!Array.isArray(elements)) {
      throw new Error("page elements must be an array");
    }
    return elements.map((element: ElementJSONType) =>
      this.getFormElement(element, elementMap)
    );
  }

  getFormElement(element: any, elementMap: Map<string, FormElement>) {
    if (isRandomCollection(element)) {
      return new RandomCollectionWrapper(element, elementMap);
    }
    const elem = new FormElementWrapper(element);
    if (elementMap.has(elem.id)) {
      throw new Error("Element id must be unique in form");
    }
    elementMap.set(elem.id, elem);
    return elem;
  }

  getElement(index: number) {
    return this.elements && this.elements.length > index
      ? this.elements[index]
      : null;
  }

  setValue(elementIndex: number, value: string, state: string | null) {
    const element = this.getElement(elementIndex);
    if (element) {
      element.setValue(value, state);
    }
  }
}

export default class FormWrapper implements Form {
  type: string;
  canSubmit: boolean;
  slug: string;
  name: string;
  pages: Page[];
  id: number;
  elementMap: Map<string, FormElement>;
  date: string;
  showDatePicker: boolean;

  constructor(data: FormJSON) {
    if (!data) {
      throw new Error("data must be given to create form");
    }
    this.id = this.getId(data.id);
    this.slug = this.getSlug(data.slug);
    this.name = data.config.name || this.slug;
    this.elementMap = new Map();
    this.type =
      data.config.type === "checklist" || data.config.type === "timer"
        ? data.config.type
        : "form";
    this.canSubmit = this.type === "form";
    this.showDatePicker = this.type !== "timer";
    this.pages = this.getPages(data.config.pages, this.elementMap);
    this.date = this.getDate(new Date());

    if (this.type === "timer" && this.elementMap.size > 1) {
      throw new Error("timer forms can only have one timer");
    }
  }

  getElement(elementId: string) {
    return this.elementMap.get(elementId) || null;
  }

  setDate(value: string) {
    this.date = value;
  }

  getDate(date: Date) {
    const format = (n: number) => (n < 10 ? `0${n}` : n);
    return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(
      date.getDate()
    )}`;
  }

  getJSON(): FormJSON {
    return {
      id: this.id,
      slug: this.slug,
      config: this.getConfig()
    };
  }

  getConfig(): { pages: PageJSON[]; name: string; type: string } {
    return {
      pages: this.pages.map(page => page.getJSON()),
      name: this.name,
      type: this.type
    };
  }

  getResults(): ResultData[] {
    return this.pages.flatMap(page => {
      return page.getResults();
    });
  }

  setPageValidated(pageIndex: number): void {
    this.pages[pageIndex].setValidated();
  }

  validatePage(index: number): void {
    this.pages[index].getResults();
  }

  getId(id: number) {
    if (!id) {
      throw new Error("Id for form is required");
    }
    if (typeof id !== "number") {
      throw new Error("Id must be of type number");
    }

    return id;
  }

  getSlug(slug: string) {
    if (!slug) {
      throw new Error("Slug for form is required");
    }
    if (typeof slug !== "string") {
      throw new Error("Slug must be of type string");
    }
    if (!isValidSlugName(slug)) {
      throw new Error("Slug must be alphanumeric and lowercase");
    }

    return slug;
  }

  getPages(pages: PageJSON[], elementMap: Map<string, FormElement>) {
    if (!pages) {
      return [];
    }
    if (pages && !Array.isArray(pages)) {
      throw new Error("form pages must be an array");
    }
    return pages.map((page: PageJSON) => new PageWrapper(page, elementMap));
  }

  getPage(index: number) {
    return this.pages && this.pages.length > index ? this.pages[index] : null;
  }

  setValue(
    pageIndex: number,
    elementIndex: number,
    value: string,
    state: string | null
  ) {
    const page = this.getPage(pageIndex);
    if (page) {
      page.setValue(elementIndex, value, state);
    }
  }

  addPreviousResult(prevResult: PrevResult) {
    const iter = this.elementMap.keys();
    let next = iter.next();
    while (!next.done) {
      const element = this.elementMap.get(next.value);
      element?.addPreviousResult(prevResult);
      next = iter.next();
    }
  }
}
