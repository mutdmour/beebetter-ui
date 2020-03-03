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
} from '../index'
import { isAlphaNumericAndLowercase } from './helpers'

class RadioGroupOptionWrapper implements RadioGroupOption {
 label: string
 value: string

 constructor(data: any) {
  this.label = this.getLabel(data.label)
  this.value = this.getValue(data.value)
 }

 getLabel(label: string): string {
  if (!label) {
   throw new Error('Label field in radio group must have value')
  }
  return label
 }

 getValue(value: string): string {
  if (typeof value !== 'string') {
   throw new Error('value field in radio group must be a string')
  }
  if (!value) {
   throw new Error('value field in radio group must have value')
  }

  return value
 }
}

class RadioGroupWrapper implements RadioGroup {
 label: string
 options: RadioGroupOption[]
 value: string

 constructor(data: any) {
  this.label = this.getLabel(data.label)
  this.options = this.getOptions(data.options)
  this.value = ''
 }

 getOptions(options: any[]): RadioGroupOption[] {
  if (!options) {
   throw new Error('Options field in radio group must have value')
  }
  if (!Array.isArray(options)) {
   throw new Error('Options field in radio group must be an array')
  }
  if (options.length === 0) {
   throw new Error('Options field in radio group must not be empty')
  }
  return options.map((opt: any) => new RadioGroupOptionWrapper(opt))
 }

 getLabel(label: string): string {
  if (!label) {
   throw new Error('Label field in radio group must have value')
  }
  return label
 }

 setValue(value: string): void {
  this.value = value
 }

 canSubmit(): boolean {
  return Boolean(this.value)
 }
}

class TextInputWrapper implements TextInput {
 label: string
 value: string
 expected: string | null

 constructor(data: any) {
  this.label = this.getLabel(data.label)
  this.expected = data.expected || null
  this.value = ''
 }

 canSubmit(): boolean {
  const res = this.expected
   ? this.expected.trim().toLowerCase() === this.value.trim().toLowerCase()
   : Boolean(this.value)
  return res
 }

 getLabel(label: string): string {
  if (!label) {
   throw new Error('Label field in text input must have value')
  }
  return label
 }

 setValue(value: string): void {
  this.value = value
 }
}

class FormElementWrapper implements FormElement {
 type: string
 content: TextInput | RadioGroup
 beemind: BeeminderConfig | null
 enabled: boolean
 required: boolean

 constructor(data: any) {
  this.type = this.getType(data.type)
  this.beemind = this.getBeeminderConfig(data.beemind)
  this.content = this.getContent(data.type, data.content)
  this.enabled = this.getEnabled(data.enabled)
  this.required = this.getRequired(data.required)
 }

 canSubmit(): boolean {
  return this.enabled && this.required ? this.content.canSubmit() : true
 }

 getType(type: string): string {
  if (!type) {
   throw new Error('Type is a required field of an element')
  }
  return type
 }

 getBeeminderConfig(config: any): BeeminderConfig | null {
  if (config) {
   if (typeof config !== 'object') {
    throw new Error('Beemind config must be an object')
   }
   if (!Object.prototype.hasOwnProperty.call(config, 'enabled')) {
    throw new Error('Beemind config must have enabled key')
   }
   if (typeof config.enabled !== 'boolean') {
    throw new Error('Enabled value must be boolean in beemind config')
   }
   if (!config.goalName) {
    throw new Error('goalName is required field of beemind config')
   }
   return {
    enabled: config.enabled,
    goalName: config.goalName,
   }
  }

  return null
 }

 getContent(type: string, content: any) {
  switch (type) {
   case 'text':
    return new TextInputWrapper(content)
   case 'radiogroup':
    return new RadioGroupWrapper(content)
   default:
    throw new Error(`Unknown element type: ${type}`)
  }
 }

 getEnabled(enabled: boolean): boolean {
  if (typeof enabled !== 'boolean') {
   throw new Error('Enabled value must be boolean in beemind config')
  }
  return enabled
 }

 getRequired(required: boolean): boolean {
  if (typeof required !== 'boolean') {
   throw new Error('Required value must be boolean in beemind config')
  }
  return required
 }

 setValue(value: string): void {
  this.content.setValue(value)
 }
}

class RandomCollectionWrapper implements RandomCollection {
 type: string
 elements: FormElement[]
 selected: number

 constructor(data: any) {
  if (!data) {
   throw new Error('Element must have necessarily details')
  }
  if (data.type !== 'random') {
   throw new Error('Element must have type: random')
  }
  this.type = data.type
  this.elements = this.getElements(data.elements)
  this.selected = this.getSelected()
 }

 canSubmit(): boolean {
  return this.elements[this.selected].canSubmit()
 }

 getSelected() {
  const enabled = this.elements
   .map((el, i) => ({ el, i }))
   .filter(item => item.el.enabled)
  const selected = Math.floor(Math.random() * this.elements.length)
  return enabled[selected].i
 }

 getElements(elements: any[]) {
  if (!elements) {
   throw new Error('elements is required field of form')
  }
  if (!Array.isArray(elements)) {
   throw new Error('page elements must be an array')
  }
  if (elements.length === 0) {
   throw new Error('page elements must have length of more than 0')
  }
  return elements.map((element: any) => new FormElementWrapper(element))
 }

 getElement(index: number) {
  return this.elements && this.elements.length > index
   ? this.elements[index]
   : null
 }

 setValue(value: string) {
  const element = this.getElement(this.selected)
  if (element) {
   element.setValue(value)
  }
 }
}

class PageWrapper implements Page {
 name: string
 elements: (FormElement | RandomCollection)[]

 constructor(data: any) {
  this.name = this.getName(data.name)
  this.elements = this.getElements(data.elements)
 }

 canSubmit() {
  return this.elements.reduce(
   (prev, element) => prev && element.canSubmit(),
   true
  )
 }

 getName(name: string) {
  if (!name) {
   throw new Error('name is required field of a page')
  }
  if (typeof name !== 'string') {
   throw new Error('name must be of type string')
  }
  return name
 }

 getElements(elements: any[]) {
  if (!elements) {
   throw new Error('elements is required field of form')
  }
  if (!Array.isArray(elements)) {
   throw new Error('page elements must be an array')
  }
  if (elements.length === 0) {
   throw new Error('page elements must have length of more than 0')
  }
  return elements.map((element: any) => this.getFormElement(element))
 }

 getFormElement(element: any) {
  if (element.type === 'random') {
   return new RandomCollectionWrapper(element)
  }

  return new FormElementWrapper(element)
 }

 getElement(index: number) {
  return this.elements && this.elements.length > index
   ? this.elements[index]
   : null
 }

 setValue(elementIndex: number, value: string) {
  const element = this.getElement(elementIndex)
  if (element) {
   element.setValue(value)
  }
 }
}

export default class FormWrapper implements Form {
 slug: string
 name: string
 pages: Page[]

 constructor(data: any) {
  this.slug = this.getSlug(data.slug)
  this.name = this.getName(data.name)
  this.pages = this.getPages(data.pages)
 }

 canSubmit(): boolean {
  return this.pages.reduce(
   (prev: boolean, page) => prev && page.canSubmit(),
   true
  )
 }

 canSubmitPage(index: number): boolean {
  return this.pages[index].canSubmit()
 }

 getSlug(slug: string) {
  if (!slug) {
   throw new Error('Slug for form is required')
  }
  if (typeof slug !== 'string') {
   throw new Error('Slug must be of type string')
  }
  if (!isAlphaNumericAndLowercase(slug)) {
   throw new Error('Slug must be alphanumeric and lowercase')
  }

  return slug
 }

 getName(name: string) {
  if (!name) {
   throw new Error('name is required field of form')
  }
  if (typeof name !== 'string') {
   throw new Error('name must be of type string')
  }
  return name
 }

 getPages(pages: any[]) {
  if (!pages) {
   throw new Error('form pages is required field of form')
  }
  if (!Array.isArray(pages)) {
   throw new Error('form pages must be an array')
  }
  if (pages.length === 0) {
   throw new Error('form pages must have length of more than 0')
  }
  return pages.map((page: any) => new PageWrapper(page))
 }

 getPage(index: number) {
  return this.pages && this.pages.length > index ? this.pages[index] : null
 }

 setValue(pageIndex: number, elementIndex: number, value: string) {
  const page = this.getPage(pageIndex)
  if (page) {
   page.setValue(elementIndex, value)
  }
 }
}
