// const { getJSON } = require("./helper");
import { getJSON } from "./helper.js";
import { generateMarkup } from "./paginationView.js";
import { pages } from "./paginationView.js";

export const state = {
  movies: {},
  resultPage: [],
  search: {
    query: "",
    result: [],
    resultsPerPage: 8,
    page: 1,
  },
  bookMarks: [],
};

console.log(state.search.page);

const searchContent1 = document.querySelector(".inp");
const searchBtn1 = document.querySelector(".btn");
const content = document.querySelector(".cont1");
const mainDiv = document.querySelector(".main1");
const reviewCont = document.querySelector(".reviews1");

export const renderError = function (error, parentEl, len) {
  const markup = `
  <div class="result m-6 p-4">
      <span class="text-3xl font-bold text-white">
        Your Search results -> Found ${len.length} Responses
      </span>
    </div>
  <div class="flex justify-center">
          <svg
            class="w-20 h-44"
            xmlns="http://www.w3.org/2000/svg"
            height="48px"
            viewBox="0 -960 960 960"
            width="48px"
            fill="#e8eaed"
          >
            <path
              d="m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm340.18-57q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5ZM454-348h60v-224h-60v224Zm26-122Z"
            />
          </svg>
          <p
            class="flex justify-center items-center text-red-600 font-bold text-lg"
          >
            ${error}
          </p>
        </div>`;

  mainDiv.innerHTML = "";
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

export const renderSpinner = function (parentEl) {
  const markup = `
  <div class="status flex justify-center items-center my-4">
        <svg
          aria-hidden="true"
          class="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>`;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

export const mainContent = function (n, p) {
  // Function to chunk the array into smaller arrays of specified size

  renderSpinner(content);
  const moviesMain = getSearchResultPage(n);

  const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  let movieChunks;
  if (screen.width < 1200) {
    movieChunks = chunkArray(moviesMain, 2);
  } else {
    movieChunks = chunkArray(moviesMain, 4); // Split into chunks of 4
  }
  const btns = document.querySelector(".btnc");

  const display = `
<div class="result m-6 p-4">
<span class="text-3xl font-bold text-white">
  Your Search results -> Found ${state.resultPage.length} Responses
</span>
</div>
${movieChunks
  .map((chunk) => {
    return `
    <div class="cont grid grid-flow-col md:m-16 ">
      ${chunk
        .map((el) => {
          return `
            <div class="child w-full md:w-3/4 p-4 cursor-pointer relative hover:opacity-70  ">
              <img
                class="img11  shadow-2xl shadow-white "
                src="https://media.themoviedb.org/t/p/w440_and_h660_face${el.poster_path}"
                alt="${el.poster_path}"
              />
              <div class="absolute text-white bottom-6">
                <span class="flex justify-center m-3 font-thin md:font-bold">${el.release_date}</span>
                <h2 class="hidden  justify-center m-3 font-bold">${el.overview}</h2>
                <h2 class="video hidden">${el.id}</h2>
                <h3 class="hover:text-red-500 font-thin md:font-extrabold">
                  <a
                    href=""
                    title=""
                    >${el.title}</a
                  >
                </h3>
              </div>
            </div>`;
        })
        .join("")}
    </div>
    `;
  })
  .join("")}
    
    ${generateMarkup(n)}
    `;

  reviewCont.innerHTML = "";
  mainDiv.innerHTML = "";
  content.innerHTML = ""; // Use innerHTML to replace previous content

  content.insertAdjacentHTML("afterbegin", display);

  const btButtons = document.querySelectorAll(".bt");

  btButtons.forEach((btn) => {
    // if (btn.textContent.trim() === 1 && n === "1") {
    //   btn.classList.add("bg-yellow-500");
    // }

    const value = btn.textContent.trim();

    // Remove the highlight from all buttons
    if (btn.classList.contains("bg-yellow-500") && value === "1") return;

    btn.classList.remove("bg-yellow-500");

    // Highlight the button for the current page (`n`)
    if (value === n) {
      btn.classList.add("bg-yellow-500");
    }
  });
  pages();

  state.search.page = 1;
};

export const getResult = async function (query) {
  //state.search.query = query;
  renderSpinner(content);
  try {
    // const data = await fetch(`https://search.imdbot.workers.dev/?q=${query}`);
    // const res = await data.json();

    const res = await getJSON(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=01b6201067f4ff02a82a8500e3a09594`
    );

    // const moviesMain = res.description;
    state.resultPage = res.results;

    state.search.result = res.results;

    if (res.results.length === 0) {
      const err = "could not find your query";
      renderError(`${err}`, content, state.search.result);
      return;
    }

    mainContent();

    /////////////////

    ////////////////////

    // Ensure that the elements are present before adding the event listener
  } catch (err) {
    const err1 = "sorry! could not find your query";
    console.error(`${err}!!!!!!!`);
    renderError(`${err}`, content, state.search.result);
  }
};

const reviewBtn1 = document.querySelector(".inp1");
//const btns = document.querySelector(".btnc");
const main = document.querySelector(".main");

searchBtn1.addEventListener("click", function () {
  getResult(searchContent1.value);
  searchContent1.value = "";
  main.scrollIntoView({ behavior: "smooth" });
});

export function enterClick() {
  const searchContent1 = document.querySelector(".inp");
  const main = document.querySelector(".main");
  const searchBtn = document.querySelector(".btn");

  searchContent1.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      getResult(searchContent1.value);
      searchContent1.value = "";
      main.scrollIntoView({ behavior: "smooth" });
    }
  });
}
enterClick();

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.result.slice(start, end);
};
