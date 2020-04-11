/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormsState, FormJSON } from "../../index";
import {
  getForms,
  updateForm,
  createForm,
  deleteForm,
  submitForm
} from "../../api/forms";
import { ActionContext } from "vuex";
import FormWrapper from "@/api/FormWrapper";
import { notEmpty } from "../../utils/helpers";

const state = {
  currentFormSlug: null,
  forms: []
};

const wrapForm = (form: FormJSON): Form => {
  return new FormWrapper(form, true);
};

const wrapFormData = (data: { forms: [FormJSON] }): Form[] => {
  return (
    data &&
    data.forms &&
    data.forms
      .map(form => {
        try {
          return wrapForm(form);
          // eslint-disable-next-line no-empty
        } catch (e) {}
      })
      .filter(notEmpty)
  );
};

const getters = {
  currentForm: (state: FormsState): Form | null => {
    const matches = state.forms.filter(
      form => form.slug == state.currentFormSlug
    );
    return matches.length > 0 ? matches[0] : null;
  }
};

const actions = {
  getAll: (context: ActionContext<any, unknown>) => {
    getForms().then((data: any) => {
      context.commit("setForms", wrapFormData(data));
    });
  },
  update: (
    context: ActionContext<any, unknown>,
    data: { formId: number; config: any }
  ) => {
    return new Promise((resolve, reject) => {
      try {
        const current = getters.currentForm(context.state);
        if (!current) {
          throw new Error("No current form");
        }
        const json = current.getJSON();
        json.config = data.config;
        console.log(data.formId);
        console.log(json);
        const updated = new FormWrapper(json);
        console.log("hmm");
        updateForm(data.formId, updated.getJSON())
          .then(() => {
            resolve();
          })
          .catch(e => {
            reject(e);
          })
          .finally(() => {
            context.commit("updateCurrentForm", updated);
          });
      } catch (e) {
        reject(e);
      }
    });
  },
  continueToNextPage: (
    context: ActionContext<any, unknown>,
    pageIndex: number
  ) => {
    return new Promise((resolve, reject) => {
      const currentForm = getters.currentForm(context.state);
      try {
        context.commit("setPageValidated", pageIndex);
        currentForm?.validatePage(pageIndex);
      } catch (e) {
        return reject(e);
      }
      resolve();
    });
  },
  submit: (context: ActionContext<any, unknown>) => {
    return new Promise((resolve, reject) => {
      try {
        const currentForm = getters.currentForm(context.state);
        if (currentForm) {
          context.commit("setPageValidated", currentForm.pages.length - 1);
          const results = currentForm.getResults();
          if (results.length > 0) {
            submitForm(currentForm.id, { results });
            resolve();
          } else {
            throw new Error("Nothing to submit");
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  create: (context: ActionContext<any, unknown>, slug: string) => {
    return new Promise((resolve, reject) => {
      try {
        if (!slug) {
          return reject("slug must be defined");
        }
        slug = slug.trim();
        if (slug.indexOf(" ") >= 0) {
          return reject("slug must not contian spaces");
        }
        createForm(slug)
          .then((form: any) => {
            context.commit("addForm", wrapForm(form));
            resolve();
          })
          .catch((e: string) => {
            reject(e);
          });
      } catch (e) {
        reject("Error occured in creating new form");
      }
    });
  },
  delete: (context: ActionContext<any, unknown>, formId: number) => {
    return new Promise((resolve, reject) => {
      try {
        if (!formId) {
          return reject("formId must be given");
        }
        deleteForm(formId)
          .then(() => {
            context.commit("deleteForm", formId);
            resolve();
          })
          .catch((e: string) => {
            reject(e);
          });
      } catch (e) {
        reject("Error occured in deleting form");
      }
    });
  }
};

const mutations = {
  setCurrentFormSlug: (state: FormsState, formName: string) => {
    state.currentFormSlug = formName;
  },
  setForms(state: FormsState, forms: Form[]) {
    state.forms = forms || [];
  },
  updateCurrentForm(state: FormsState, form: Form) {
    const matches = state.forms.filter(
      form => form.slug == state.currentFormSlug
    );
    if (matches.length > 0) {
      matches[0] = form;
    }
  },
  setPageValidated(state: FormsState, pageIndex: number) {
    const form = getters.currentForm(state);
    if (form) {
      form.setPageValidated(pageIndex);
    }
  },
  deleteForm(state: FormsState, formId: number) {
    state.forms = state.forms.filter(form => form.id !== formId);
  },
  addForm(state: FormsState, form: Form) {
    state.forms.push(form);
  },
  updateElement(
    state: FormsState,
    payload: {
      pageIndex: number;
      elementIndex: number;
      value: string;
    }
  ) {
    const form = getters.currentForm(state);
    if (form) {
      form.setValue(payload.pageIndex, payload.elementIndex, payload.value);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
