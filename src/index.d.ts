declare namespace beebetter {
 interface RadioGroupOptionJSON {
  label: string
  value: string
 }

 interface RadioGroupOption extends RadioGroupOptionJSON {
  getJSON: () => RadioGroupOptionJSON
 }

 type RadioGroupType = 'radio'

 interface RadioGroupJSON {
  type: RadioGroupType
  label: string
  options: RadioGroupOptionJSON[]
 }

 interface RadioGroup extends RadioGroupJSON {
  value: string
  options: RadioGroupOption[]

  canSubmit: () => boolean
  setValue: (value: string) => void
  getJSON: () => RadioGroupJSON
 }

 type TextType = 'text'

 interface TextInputJSON {
  type: TextType
  label: string
  expected: string | null
 }

 interface TextInput extends TextInputJSON {
  value: string

  canSubmit: () => boolean
  setValue: (value: string) => void
  getJSON: () => TextInputJSON
 }

 interface BeeminderConfig {
  enabled: true
  goalName: string
 }

 type RandomCollectionType = 'random'

 interface RandomCollectionJSON {
  elements: FormElementJSON[]
  type: RandomCollectionType
 }

 interface RandomCollection extends RandomCollectionJSON {
  selected: number
  elements: FormElement[]

  setValue: (value: string) => void
  canSubmit: () => boolean
  getJSON: () => RandomCollectionJSON
  setValidated: (validated: boolean) => void
 }

 interface FormElementJSON {
  type: string
  enabled: boolean
  required: boolean
  beemind: BeeminderConfig | null
  content: TextInputJSON | RadioGroupJSON
 }

 interface FormElement extends FormElementJSON {
  content: TextInput | RadioGroup
  invalid: boolean

  setValue: (value: string) => void
  canSubmit: () => boolean
  getJSON: () => FormElementJSON
  setValidated: (validated: boolean) => void
 }

 type ElementJSONType = FormElementJSON | RandomCollectionJSON
 interface PageJSON {
  name: string
  elements: ElementJSONType[]
 }

 type ElementType = FormElement | RandomCollection

 interface Page extends PageJSON {
  elements: ElementType[]

  getElement: (index: number) => FormElement | RandomCollection | null
  setValue: (elementIndex: number, value: string) => void
  canSubmit: () => boolean
  getJSON: () => PageJSON
  validate: () => void
 }

 interface FormJSON {
  slug: string
  name: string
  pages: PageJSON[]
 }

 interface Form extends FormJSON {
  pages: Page[]

  getPage: (index: number) => Page | null
  setValue: (pageIndex: number, elementIndex: number, value: string) => void
  canSubmit: () => boolean
  canSubmitPage: (pageIndex: number) => boolean
  getJSON: () => FormJSON
  validatePage: (pageIndex: number) => void
 }

 interface FormsState {
  forms: Form[]
  currentFormSlug: string
 }
}

export = beebetter
