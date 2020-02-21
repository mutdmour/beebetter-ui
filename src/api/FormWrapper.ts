import {Page, Form} from '../index'

class PageWrapper implements Page {
  
}

export default class FormWrapper implements Form {
 slug: string
 name: string
 pages: Page[]

 constructor(data: any) {
  this.slug = data.slug
  this.name = data.name
  this.pages = data.pages.map(page => new Page(
 }
}