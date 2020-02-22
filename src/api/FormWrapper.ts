/* eslint-disable @typescript-eslint/no-explicit-any */
import {
 Page,
 Form,
 FormElement,
 RadioGroup,
 TextInput,
 RadioGroupOption,
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

 constructor(data: any) {
  this.label = data.label
  this.options = data.options
   ? data.options.map((opt: any) => new RadioGroupOptionWrapper(opt))
   : []
 }
}

class TextInputWrapper implements TextInput {
 label: string
 value: string

 constructor(data: any) {
  this.label = data.label
  this.value = ''
 }
}

class FormElementWrapper implements FormElement {
 type: string
 name: string
 content: TextInput | RadioGroup | null

 constructor(data: any) {
  this.type = data.type
  this.name = data.name
  this.content = this.getContent(data.type, data.content)
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
}
