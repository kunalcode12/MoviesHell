import { state } from "./content.js";
import { mainContent } from "./content.js";

export const generateMarkup = function (n) {
  const numPage = Math.ceil(
    state.resultPage.length / state.search.resultsPerPage
  );

  const pageSize = Array.from({ length: numPage }, (curr, i) => i + 1);

  //1.
  if (numPage === 1) {
    return `
    <div class="">
    <div class=" btn p-10">
          <div class="btnc flex justify-center gap-3">
            <span
              class="bt text-white bg-yellow-500 border-gray-500 border-[2px] w-12 flex justify-center items-center"
              >1</span
            >
          </div>
        </div>
        </div>
        `;
  }
  //2.
  if (numPage > 1) {
    return `
    <div class="pagination">
    <div class=" btn p-10">
      <div class="btnc flex justify-center gap-3">
        ${pageSize
          .map((el, index) => {
            return `
              <span
                class="bt text-white ${
                  index === 0 ? "bg-yellow-500" : ""
                } hover:bg-yellow-500 cursor-pointer border-gray-500 border-[2px] w-12 flex justify-center items-center"
                >${el}</span>
            `;
          })
          .join("")}
      </div>
    </div>
    </div>
    `;
  }
};

//export const datapage=
//console.log(state.search.page);

export const pages = function () {
  const btnContainer = document.querySelector(".btnc");

  if (btnContainer) {
    btnContainer.addEventListener("click", function (e) {
      e.preventDefault();

      const clicked = e.target.closest(".bt");
      const value = clicked.textContent.trim();

      // document.querySelectorAll(".bt").forEach((el) => {
      //   el.classList.remove("bg-yellow-500");
      // });

      // if (clicked) {
      //   if (clicked.classList.contains("bg-yellow-500") && value === "1")
      //     return;

      //   clicked.classList.add("bg-yellow-500");
      // }
      state.search.page = clicked.textContent.trim();
      mainContent(clicked.textContent.trim());

      console.log(clicked.textContent.trim());
    });
  } else {
    console.log("btnc element not found!");
  }
};

// export const pageNo=function(){
//   const btnContainer = document.querySelector(".btnc");
//   btnContainer.addEventListener('click',function(e){
//     const value=e.target.closest(".bt");
//     const pag=value.textContent.trim();
//     return pag;
//   })
//   return
// }
