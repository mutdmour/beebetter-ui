/* eslint-disable @typescript-eslint/no-explicit-any */
import {
 Page,
 Form,
 FormElement,
 RadioGroup,
 TextInput,
 RadioGroupOption,
 BeeminderConfig,
} from '../index'

class RadioGroupOptionWrapper implements RadioGroupOption {
 label: string
 value: number

 constructor(data: any) {
  this.label = data.label || ''
  this.value = data.value
 }
}

class RadioGroupWrapper implements RadioGroup {
 label: string
 options: RadioGroupOption[]
 value: string

 constructor(data: any) {
  this.label = data.label
  this.options = data.options
   ? data.options.map((opt: any) => new RadioGroupOptionWrapper(opt))
   : []
  this.value = ''
 }
}

class TextInputWrapper implements TextInput {
 label: string
 value: string
 expected: string | null

 constructor(data: any) {
  this.label = data.label
  this.value = ''
  this.expected = data.expected || null
 }
}

class FormElementWrapper implements FormElement {
 type: string
 name: string
 content: TextInput | RadioGroup | null
 beemind: BeeminderConfig | null
 enabled: boolean
 required: boolean

 constructor(data: any) {
  this.type = data.type
  this.name = data.name
  this.content = this.getContent(data.type, data.content)
  this.beemind = this.getBeeminderConfig(data.beemind)
  this.enabled = typeof data.enabled === 'boolean' ? data.enabled : true
  this.required =
   this.enabled && typeof data.required === 'boolean' ? data.required : false
 }

 getBeeminderConfig(config: any): BeeminderConfig | null {
  if (config) {
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
    return null
  }
 }

 setValue(value: string) {
  if (this.content) {
   this.content.value = value
  }
 }
}

class PageWrapper implements Page {
 name: string
 elements: FormElement[]

 constructor(data: any) {
  this.name = data.name
  this.elements = data.elements
   ? data.elements.map((element: any) => new FormElementWrapper(element))
   : []
 }

 getElement(index: number) {
  return this.elements && this.elements.length > index
   ? this.elements[index]
   : null
 }
}

export default class FormWrapper implements Form {
 slug: string
 name: string
 pages: Page[]

 constructor(data: any) {
  this.slug = data.slug || ''
  this.name = data.name || ''
  this.pages = data.pages
   ? data.pages.map((page: any) => new PageWrapper(page))
   : []
 }

 getPage(index: number) {
  return this.pages && this.pages.length > index ? this.pages[index] : null
 }
}
