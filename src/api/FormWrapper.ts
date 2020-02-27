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
 type!: string
 content: TextInput | RadioGroup | null
 beemind: BeeminderConfig | null
 enabled!: boolean
 required!: boolean

 constructor(data: any) {
  this.addType(data.type)
  this.beemind = this.getBeeminderConfig(data.beemind)
  this.content = this.getContent(data.type, data.content)
  this.addEnabled(data.enabled)
  this.addRequired(data.required)
 }

 addType(type: string) {
  if (!type) {
   throw new Error('Type is a required field of an element')
  }
  this.type = type
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

 addEnabled(enabled: boolean) {
  if (typeof enabled !== 'boolean') {
   throw new Error('Enabled value must be boolean in beemind config')
  }
  this.enabled = enabled
 }

 addRequired(required: boolean) {
  if (typeof required !== 'boolean') {
   throw new Error('Required value must be boolean in beemind config')
  }
  this.required = required
 }

 setValue(value: string) {
  if (this.content) {
   this.content.value = value
  }
 }
}

class RandomCollectionWrapper implements RandomCollection {
 elements!: FormElement[]
 selected: number

 constructor(data: any) {
  this.addElements(data.elements)
  this.selected = Math.floor(Math.random() * this.elements.length)
 }

 addElements(elements: any[]) {
  if (!elements) {
   throw new Error('elements is required field of form')
  }
  if (!Array.isArray(elements)) {
   throw new Error('page elements must be an array')
  }
  if (elements.length === 0) {
   throw new Error('page elements must have length of more than 0')
  }
  this.elements = elements.map(
   (element: any) => new FormElementWrapper(element)
  )
 }

 getElement(index: number) {
  return this.elements && this.elements.length > index
   ? this.elements[index]
   : null
 }
}

class PageWrapper implements Page {
 name!: string
 elements!: (FormElement | RandomCollection)[]

 constructor(data: any) {
  this.addName(data.name)
  this.addElements(data.elements)
 }

 addName(name: string) {
  if (!name) {
   throw new Error('name is required field of a page')
  }
  if (typeof name !== 'string') {
   throw new Error('name must be of type string')
  }
  this.name = name
 }

 addElements(elements: any[]) {
  if (!elements) {
   throw new Error('elements is required field of form')
  }
  if (!Array.isArray(elements)) {
   throw new Error('page elements must be an array')
  }
  if (elements.length === 0) {
   throw new Error('page elements must have length of more than 0')
  }
  this.elements = elements.map((element: any) => this.getFormElement(element))
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
}

export default class FormWrapper implements Form {
 slug!: string
 name!: string
 pages!: Page[]

 constructor(data: any) {
  this.addSlug(data.slug)
  this.addName(data.name)
  this.addPages(data.pages)
 }

 addSlug(slug: string) {
  if (!slug) {
   throw new Error('Slug for form is required')
  }
  if (typeof slug !== 'string') {
   throw new Error('Slug must be of type string')
  }
  if (isAlphaNumericAndLowercase(slug)) {
   throw new Error('Slug must be alphanumeric and lowercase')
  }

  this.slug = slug
 }

 addName(name: string) {
  if (!name) {
   throw new Error('name is required field of form')
  }
  if (typeof name !== 'string') {
   throw new Error('name must be of type string')
  }
  this.name = name
 }

 addPages(pages: any[]) {
  if (!pages) {
   throw new Error('form pages is required field of form')
  }
  if (!Array.isArray(pages)) {
   throw new Error('form pages must be an array')
  }
  if (pages.length === 0) {
   throw new Error('form pages must have length of more than 0')
  }
  this.pages = pages.map((page: any) => new PageWrapper(page))
 }

 getPage(index: number) {
  return this.pages && this.pages.length > index ? this.pages[index] : null
 }
}
