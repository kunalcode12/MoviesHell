import { getResult, renderError } from "./content.js";
import { scrollingFun } from "./index.js";
import { renderSpinner } from "./content.js";
import { enterClick } from "./content.js";

// const cont1 = document.querySelector(".cont1");

// const cont = document.querySelectorAll(".cont");

// const section = document.querySelector(".sect");
// const grid = document.querySelectorAll(".child");

// const searchContent1 = document.querySelector(".inp");
// const searchBtn1 = document.querySelector(".btn");

let revArr = [];
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWI2MjAxMDY3ZjRmZjAyYTgyYTg1MDBlM2EwOTU5NCIsIm5iZiI6MTcyMTg0MDI4Ni4xNzg1ODMsInN1YiI6IjY2OTkyZDkwNDc5NGFjNTY0NGQyNDdlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YkFckNcpoc_LTZlZcz3uEa-3cOmk_WlYqSHrjJaxsgU",
  },
};

const movieId = async function (id) {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  );
  // const revData = await fetch(
  //   `https://api.themoviedb.org/3/movie/${id}/reviews`,
  //   options
  // );
  const res = await data.json();
  // const revRes = await revData.json();

  // revRes.results.forEach((el) =>
  //   revArr.push({
  //     author: el.author,
  //     review: el.content,
  //     time: el.created_at,
  //   })
  // );

  let arr = [];
  res.results.forEach((el) => arr.push(el.key));
  const iframeContainer = document.getElementById("iframe-container");
  iframeContainer.innerHTML = ""; // Clear previous iframes

  arr.forEach((key) => {
    const youtubeUrl = `https://www.youtube.com/embed/${key}`;
    const iframe = document.createElement("iframe");
    iframe.classList =
      "hover:-translate-y-6 transform transition-transform duration-300";
    iframe.src = youtubeUrl;
    iframe.width = "560";
    iframe.height = "315";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframeContainer.appendChild(iframe);
  });
};

const movieReview = async function (id) {
  const revData = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews`,
    options
  );
  const revRes = await revData.json();
  revRes.results.forEach((el) =>
    revArr.push({
      author: el.author,
      review: el.content,
      time: el.created_at,
    })
  );
};
const dataReview = function () {
  const reviewCont = document.querySelector(".reviews1");
  // if(revArr.length===0){

  // }

  const noRes = `
  <span
        class="text-white bg-black w-full h-40 flex justify-center items-center gap-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100px"
          viewBox="0 -960 960 960"
          width="100px"
          fill="#e8eaed"
        >
          <path
            d="M132-160v-60h123l-14-14q-60-60-86.5-121.5T128-476q0-109 62.5-195T355-790v62q-76 30-121.5 99T188-476q0 52 17.5 98.5T265-293l30 27v-117h60v223H132Zm348-122q-12 0-21-9t-9-21q0-12 9-21t21-9q12 0 21 9t9 21q0 12-9 21t-21 9Zm-28-148v-249h60v249h-60Zm153 261v-63q76-29 121.5-98T772-483q0-54-18-100.5T695-667l-30-27v117h-60v-223h223v60H704l15 14q62 57 87.5 120T832-483q0 108-63 194.5T605-169Z"
          />
        </svg>
        <h1 class="font-extrabold text-3xl">Could Not find any Reviews</h1>
      </span>`;
  const data = `
         <hr/>
        <div class="reviewC flex flex-row overflow-x-auto p-4 no-scrollbar gap-5 ">
        
        
        ${revArr
          .map((el) => {
            return `
          <div
            class="reviwCont bg-gray-500  gap-4 flex flex-row p-10 w-full hover:bg-gray-700"
          >
            <span class="text-white w-[60vw] h-fit ">
              <h1 class="font-bold text-lg py-4" >${el.author}</h1>
              <p>${el.review}</p>
              <h2>${el.time}</h2>
              
            </span>
          </div>
          `;
          })
          .join("")}
          <hr/>
      </div>
      `;
  reviewCont.innerHTML = "";
  if (revArr.length === 0) {
    reviewCont.insertAdjacentHTML("afterbegin", noRes);
  } else {
    reviewCont.insertAdjacentHTML("afterbegin", data);
  }
};

const cont1 = document.querySelector(".cont1");
const section = document.querySelector(".sect");

function removeOpacity() {
  document
    .querySelectorAll(".child")
    .forEach((el) => el.classList.remove("bg-black"));
}

if (cont1) {
  cont1.addEventListener("click", function (e) {
    const clickedChild = e.target.closest(".child");

    if (!clickedChild) return;
    const isOpacityApplied = clickedChild.classList.contains("bg-black");

    removeOpacity();
    if (!isOpacityApplied) {
      clickedChild.classList.add("bg-black");
    }
    const inner = `
<div
    class="h-[110vh] bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg')]"
  >
    <div
      class="search relative p-8 mt-12 rounded-lg shadow-lg w-full top-32"
    >
      <div class="flex flex-col justify-center items-center space-y-4">
        <span class="text-6xl font-extrabold text-center text-white"
          >UNLIMITED MOVIES, FOR EVERYONE</span
        >
        <span class="text-3xl text-white font-bold">Watch Anywhere</span>
        <span class="text-2xl font-bold text-red-500">Search HERE!</span>
      </div>
      <div class="search1 flex justify-center mt-8">
        <input
          type="text"
          class="inp w-1/2 h-16 p-4 text-white font-bold text-lg border border-gray-300 rounded-lg bg-[rgba(25,34,71,1)] opacity-75"
          placeholder="Search"
        />
      </div>
      <div class="btn flex justify-center mt-4">
        <button
          class="btn bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:translate-y-2 hover:text-blue-600 transition duration-200"
        >
          SEARCH
        </button>
      </div>
    </div>
  </div>`;

    if (isOpacityApplied) {
      const reviewCont = document.querySelector(".reviews1");
      reviewCont.innerHTML = "";

      section.innerHTML = "";
      section.insertAdjacentHTML("afterbegin", inner);
      attachSearchEvent();
      enterClick();

      return;
    }

    if (clickedChild) {
      console.log("Clicked .child element:", clickedChild);
      clickedChild.classList.add("bg-black");
    }

    const goToClicked = document.querySelector(".sect");
    goToClicked.scrollIntoView({ behavior: "smooth" });
    /////////////////////////////////////////

    const img = clickedChild.querySelector(".img11");
    const date = clickedChild.querySelector("span");
    const title = clickedChild.querySelector("h3");
    const des = clickedChild.querySelector("h2");
    const video = clickedChild.querySelector(".video");

    renderSpinner(section);
    movieId(video.textContent);

    movieReview(video.textContent);
    // renderSpinner(section);
    const reviewCont1 = document.querySelector(".reviews1");
    reviewCont1.innerHTML = "";

    const renderClickedData = `
    <div class="flex flex-col md:flex-row">
        <div class="book opacity-75 w-full md:w-[50%] ">
          <div class="p-4">
            <div class="flex items-center gap-6 flex-col">
              <img
                src="${img.src}"
                alt=""
                class=" sm:w-[600px] imgCon shadow-[0_35px_60px_15px_rgba(0.3,0.3,0.3,0.3)] shadow-red-700"
              />
            </div>
          </div>
        </div>
        <div class="content">
          <div class="p-8">
            <span class="space-y-4">
              <h1 class="font-semibold text-white text-3xl">${title.textContent}</h1>
              <h2 class="font-semibold text-white">${date.textContent}</h2>
              <h2 class="font-semibold text-white text-2xl">Description</h2>
              <h2 class="font-bold text-white">
              ${des.textContent}
              </h2>
            </span>
          </div>
        </div>
      </div>
      <div class="">
        <span class="text-white font-bold text-xl">Trailer</span>
        <div class="video1 overflow-x-scroll md:w-full flex no-scrollbar">
          <div
            class="videocontainer w-fit flex flex-row gap-4 p-6"
            id="iframe-container"
          >
            
          </div>
        </div>
      </div>
      <div class="review">
        <button
          class="btnRe bg-white text-black font-bold w-60 h-10 rounded-2xl"
        >
          Reviews
        </button>
      </div>
`;

    section.innerHTML = "";
    section.insertAdjacentHTML("afterbegin", renderClickedData);
    scrollingFun();

    const reviewBtn = document.querySelector(".btnRe");
    const reviewCont = document.querySelector(".reviews1");

    reviewBtn.classList.add("bg-white");
    reviewCont.classList.add("hidden");

    reviewBtn.addEventListener("click", function () {
      if (reviewBtn.classList.contains("bg-white")) {
        reviewBtn.classList.remove("bg-white");
        reviewBtn.classList.add("bg-blue-600");
      } else {
        reviewBtn.classList.add("bg-white");
      }
      if (reviewCont.classList.contains("hidden")) {
        reviewCont.classList.remove("hidden");
      } else {
        reviewCont.classList.add("hidden");
      }

      dataReview();
    });

    revArr = [];
    //dataReview();

    console.log(revArr);

    //attachSearchEvent();
  });
} else {
  console.log(".cont1 container not found.");
}

function attachSearchEvent() {
  const searchBtn = document.querySelector(".btn");
  const searchContent = document.querySelector(".inp");
  const main = document.querySelector(".main");

  searchBtn.addEventListener("click", function () {
    getResult(searchContent.value);
    searchContent.value = "";
    main.scrollIntoView({ behavior: "smooth" });
    if (searchContent.value === "") return;
  });
}
//attachSearchEvent();
