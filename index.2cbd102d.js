const e={searchInput:document.querySelector("input"),searchBtn:document.querySelector("button"),searchForm:document.querySelector("#search-form"),galleryListEl:document.querySelector(".gallery")};e.searchForm.addEventListener("submit",(function(e){e.preventDefault(),console.log("Hello JS!!!")}));(n="flowers",fetch(`https://pixabay.com/api/?key=31433732-587fed4cb039ee24c3149a17c&q=${n}&image_type=photo&orientation=horizontal&safesearch=true`).then((e=>{if(!e.ok)throw new Error(e.status);return e.json()}))).then((n=>function(n){const t=(o=n,o.map((e=>{const{webformatURL:n,tags:t,likes:o,views:s,comments:r,downloads:a}=e;return`\n                <div class="photo-card">\n                    <img src="${n}" alt="${t}" loading="lazy" width="320px" height="210px"/>\n                    <div class="info">\n                        <p class="info-item">\n                            <b>Likes</b>${o}\n                        </p>\n                        <p class="info-item">\n                            <b>Views</b>${s}\n                        </p>\n                        <p class="info-item">\n                            <b>Comments</b>${r}\n                        </p>\n                        <p class="info-item">\n                            <b>Downloads</b>${a}\n                        </p>\n                    </div>\n                </div>\n            `})).join(""));var o;e.galleryListEl.insertAdjacentHTML("beforeend",t)}(n.hits))).catch((e=>console.log(e)));var n;
//# sourceMappingURL=index.2cbd102d.js.map
