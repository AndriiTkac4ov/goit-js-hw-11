!function(){var e={searchInput:document.querySelector("input"),searchBtn:document.querySelector("button"),searchForm:document.querySelector("#search-form"),galleryListEl:document.querySelector(".gallery")};e.searchForm.addEventListener("submit",(function(e){e.preventDefault(),console.log("Hello JS!!!")})),console.log(e.searchInput),console.log(e.searchBtn),console.log(e.searchForm),fetch("https://pixabay.com/api/?key=31433732-587fed4cb039ee24c3149a17c&q=flowers&image_type=photo").then((function(e){if(!e.ok)throw new Error(e.status);return e.json()})).then((function(e){return console.log("Dont STOP!!!")}))}();
//# sourceMappingURL=index.8de589f4.js.map
