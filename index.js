import { state } from "./content.js";
import { getResult } from "./content.js";

const element = document.querySelector(".search");
window.addEventListener("load", function () {
  setTimeout(function () {
    element.classList.add("search2");
    //element.scrollIntoView({ behavior: "smooth" });
  }, 1000);
});

const header = document.querySelector(".headmain");
const nav = document.querySelector(".nav");
const drop = document.querySelector(".menu");

const handleHover = function (e, color) {
  if (e.target.classList.contains("home")) {
    header.style.backgroundColor = `${color}`;
  }
  if (e.target.classList.contains("ct")) {
    drop.classList.remove("hidden");
  }
};

nav.addEventListener("mouseover", function (e) {
  handleHover(e, "black");
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, "white");
  if (!e.target.classList.contains(".menu")) {
    drop.classList.add("hidden");
  }
});

//Reaveal Sections
const allSections = document.querySelectorAll(".main1");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("opacity-0");

  const childElements = entry.target.querySelectorAll("*");
  childElements.forEach((child) => child.classList.remove("opacity-0"));

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("opacity-0");

  const childElements = section.querySelectorAll("*");

  childElements.forEach((child) => child.classList.add("opacity-0"));
});

const allIcons = document.querySelector(".allIcon");
const navSearch = document.querySelector(".navSearch");
const boxCont = document.querySelector(".boxCon");
const boxIcon = document.querySelector(".boxIcon");

allIcons.addEventListener("click", function (e) {
  if (e.target.closest(".serachIcon")) {
    navSearch.classList.toggle("hidden");
    boxCont.classList.add("hidden");
    boxIcon.textContent = "menu";
  }
  if (e.target.closest(".boxIcon")) {
    boxIcon.textContent = boxIcon.textContent === "close" ? "menu" : "close";
    boxCont.classList.toggle("hidden");
    navSearch.classList.add("hidden");
  }
});

console.log(typeof screen.width);

const searchBtn = document.querySelector(".btn");
const main = document.querySelector(".main");
const serachRev = document.querySelector(".sect");
const searchContent = document.querySelectorAll(".inp1");

export const fun12 = function () {
  // searchContent.addEventListener("keydown", function (e) {
  //   const coords = main.getBoundingClientRect();
  //   if (e.key === "Enter") {
  //     console.log(e);
  //     getResult(searchContent.value);
  //     searchContent.value = "";
  //     main.scrollIntoView({ behavior: "smooth" });
  //   }
  // });
  searchContent.forEach((el) => {
    el.addEventListener("keydown", function (e) {
      const coords = main.getBoundingClientRect();
      if (e.key === "Enter") {
        console.log(e);
        getResult(el.value);
        el.value = "";
        main.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
};
fun12();

export const scrollingFun = function () {
  ScrollReveal({ reset: true, distance: "60px", duration: 2500, delay: 400 });

  ScrollReveal().reveal(".d1 ,.text123", { delay: 500, origin: "left" });
  ScrollReveal().reveal(".m1,.img16 ,.imgCon,.btnRe", {
    delay: 600,
    origin: "bottom",
  });
};
scrollingFun();

const revBtn = document.querySelectorAll(".revBtn");
revBtn.forEach((el) => {
  el.addEventListener("click", function () {
    serachRev.scrollIntoView({ behavior: "smooth" });
  });
});

const sections = document.querySelectorAll(".fade-in-up, .fade-in-up-delay");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
});

sections.forEach((section) => {
  observer.observe(section);
});
