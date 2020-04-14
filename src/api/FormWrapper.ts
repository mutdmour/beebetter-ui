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
  Result,
  TextInputJSON,
  FormElementJSON,
  RandomCollectionJSON,
  PageJSON,
  ElementType,
  ElementJSONType,
  FormJSON
} from "../index";
import { isAlphaNumericAndLowercase } from "../utils/helpers";
import { notEmpty } from "../utils/helpers";

class RadioGroupOptionWrapper implements RadioGroupOption {
  label: string;
  value: string;

  constructor(data: RadioGroupOptionJSON) {
    this.label = this.getLabel(data.label);
    this.value = this.getValue(data.value);
  }

  getLabel(label: string): string {
    if (!label) {
      throw new Error("Label field in radio group must have value");
    }
    return label;
  }

  getValue(value: string): string {
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

  constructor(data: RadioGroupJSON) {
    this.label = this.getLabel(data.label);
    this.options = this.getOptions(data.options);
    this.value = "";
    this.type = "radio";
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

  getResult(): string {
    if (!this.value) {
      throw new Error("Value for radio group must be given");
    }
    return this.value;
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

  constructor(data: TextInputJSON) {
    this.label = this.getLabel(data.label);
    this.expected = data.expected || null;
    this.value = "";
    this.repeat = Boolean(data.repeat);
  }

  getJSON(): TextInputJSON {
    return {
      label: this.label,
      expected: this.expected,
      repeat: this.repeat
    };
  }

  getResult(): string {
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
}

class FormElementWrapper implements FormElement {
  id: string;
  type: string;
  content: TextInput | RadioGroup;
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

  getResult(): Result | null {
    if (!this.enabled) {
      return null;
    }
    try {
      const value = this.content.getResult();
      if (this.required && !value) {
        throw new Error("Missing required field");
      }
      if (this.beemind && this.beemind.enabled) {
        return {
          beemind: {
            goalName: this.beemind.goalName
          },
          value
        };
      }
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

  setValue(value: string): void {
    this.content.setValue(value);
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

  getResult(): Result | null {
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

  setValue(value: string) {
    const element = this.selected > -1 ? this.getElement(this.selected) : null;
    if (element) {
      element.setValue(value);
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

  getResults(): Result[] {
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

  setValue(elementIndex: number, value: string) {
    const element = this.getElement(elementIndex);
    if (element) {
      element.setValue(value);
    }
  }
}

export default class FormWrapper implements Form {
  slug: string;
  name: string;
  pages: Page[];
  id: number;
  elementMap: Map<string, FormElement>;

  constructor(data: FormJSON) {
    if (!data) {
      throw new Error("data must be given to create form");
    }
    this.id = this.getId(data.id);
    this.slug = this.getSlug(data.slug);
    this.name = data.config.name || this.slug;
    this.elementMap = new Map();
    this.pages = this.getPages(data.config.pages, this.elementMap);
  }

  getJSON(): FormJSON {
    return {
      id: this.id,
      slug: this.slug,
      config: this.getConfig()
    };
  }

  getConfig(): { pages: PageJSON[]; name: string } {
    return {
      pages: this.pages.map(page => page.getJSON()),
      name: this.name
    };
  }

  getResults(): Result[] {
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
    if (!isAlphaNumericAndLowercase(slug)) {
      throw new Error("Slug must be alphanumeric and lowercase");
    }

    return slug;
  }

  getPages(pages: PageJSON[], elementMap: Map<string, FormElement>) {
    if (!pages || !Array.isArray(pages)) {
      throw new Error("form pages must be an array");
    }
    return pages.map((page: PageJSON) => new PageWrapper(page, elementMap));
  }

  getPage(index: number) {
    return this.pages && this.pages.length > index ? this.pages[index] : null;
  }

  setValue(pageIndex: number, elementIndex: number, value: string) {
    const page = this.getPage(pageIndex);
    if (page) {
      page.setValue(elementIndex, value);
    }
  }
}
