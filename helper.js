import { getSearchResultPage } from "./content.js";
import { renderError } from "./content.js";

const content = document.querySelector(".cont1");
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! `));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "x-rapidapi-key": "b6a7fbc783mshc81411464bdfa20p1c6527jsne5e97314e8fc",
    //     "x-rapidapi-host": "moviedatabase8.p.rapidapi.com",
    //   },
    // };
    const data = await Promise.race([fetch(url), timeout(10)]);
    const res = await data.json();
    console.log(res);

    if (!data.ok) throw new Error(`${res.message} (${data.status})`);

    return res;
  } catch (err) {
    throw err;
  }
};
