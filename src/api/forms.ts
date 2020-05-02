import { FormJSON } from "../index";

const GET_FORM_ENDPOINT = "/api/v1/form?slug=";
const GET_ALL_FORMS_ENDPOINT = "/api/v1/forms";
const GET_FORM_RESULTS_ENDPOINT = "/api/v1/forms/results?formId=";
const UPDATE_FORM_ENDPOINT = "/api/v1/forms/update?formId=";
const DELETE_FORM_ENDPOINT = "/api/v1/forms/delete?formId=";
const CREATE_FORM_ENDPOINT = "/api/v1/forms/create?slug=";
const SUBMIT_FORM_ENDPOINT = "/api/v1/forms/submit?formId=";

export function getForm(slug: string) {
  return new Promise((resolve, reject) => {
    fetch(`${GET_FORM_ENDPOINT}${slug}`).then(response => {
      response.ok ? resolve(response.json()) : reject();
    });
  });
}

export function getForms() {
  return new Promise((resolve, reject) => {
    fetch(GET_ALL_FORMS_ENDPOINT).then(response => {
      response.ok ? resolve(response.json()) : reject();
    });
  });
}

export function createForm(slug: string) {
  return new Promise((resolve, reject) => {
    const url = `${CREATE_FORM_ENDPOINT}${slug}`;
    fetch(url, {
      method: "POST"
    }).then(response => {
      response.ok ? resolve(response.json()) : reject();
    });
  });
}

export function updateForm(formId: number, form: FormJSON) {
  const url = `${UPDATE_FORM_ENDPOINT}${formId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(async response => {
      const body = await response.text();
      response.ok ? resolve() : reject(body);
    });
  });
}

export function deleteForm(formId: number) {
  const url = `${DELETE_FORM_ENDPOINT}${formId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST"
    }).then(async response => {
      const body = await response.text();
      response.ok ? resolve() : reject(body);
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function submitForm(formId: number, results: any) {
  const url = `${SUBMIT_FORM_ENDPOINT}${formId}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(results)
    }).then(async response => {
      const body = await response.text();
      response.ok ? resolve() : reject(body);
    });
  });
}

export function getAllResults(
  formId: number,
  startTime: number | null,
  endTime: number | null
) {
  return new Promise((resolve, reject) => {
    let endpoint = `${GET_FORM_RESULTS_ENDPOINT}${formId}`;
    if (startTime) {
      endpoint = `${endpoint}&startTime=${startTime}`;
    }
    if (endTime) {
      endpoint = `${endpoint}&startTime=${endTime}`;
    }

    fetch(endpoint).then(response => {
      response.ok ? resolve(response.json()) : reject();
    });
  });
}
