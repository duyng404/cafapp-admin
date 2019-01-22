import * as axios from 'axios';
// import 'whatwg-fetch';
// import 'es6-promise';

const getAxiosInstance = () => {
  return axios.default.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
		},
		withCredentials: true,
  });
};

export function fetchUrl(url , extraHeaders = {}) {
  return getAxiosInstance().get(url, {
    headers: { ...extraHeaders },
  });
}

export function postUrl(url, data, extraHeaders = {}) {
  return getAxiosInstance().post(url, data, {
    method: 'POST',
    headers: { ...extraHeaders },
  });
}

export function putUrl(url, data, extraHeaders = {}) {
  return getAxiosInstance().post(url, data, {
    method: 'PUT',
    headers: { ...extraHeaders },
  });
}

export function deleteUrl(url, extraHeaders = {}) {
  return getAxiosInstance().post(url, {
    method: 'DELETE',
    headers: { ...extraHeaders },
  });
}

// export const fetchBooks = (authors, tags, languages, sortBy) => {
//   let url = "/api/v1/book";
//   if (authors.length > 0 || tags.length > 0 || languages.length > 0 || sortBy !== "") url = `${url}?`;
//   const params = [];
//   if (authors.length > 0)
//     params.push(`${authors.map(i => `authorid=${i}`).join('&')}`);
//   if (tags.length > 0)
//     params.push(`${tags.map(i => `tagid=${i}`).join('&')}`);
//   if (languages.length > 0)
//     params.push(`${languages.map(i => `languageid=${i}`).join('&')}`);
//   if (sortBy !== "")
//     params.push(`order=${sortBy}`);
//   url = `${url}${params.join('&')}`;
//   return fetchUrl(url)
//     .then(response => response)
//     .catch(error => error.response);
// };
