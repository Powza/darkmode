window.DarkMode=function(e={}){const t={default:e.default||"system",selector:e.selector||".darkmode",storageKey:e.storageKey||"darkmode-theme",type:e.type||"dropdown",dropdownToggleName:e.dropdownToggleName||"Theme",dynamicAdjust:e.dynamicAdjust||!1,dynamicAdjustStartHour:e.dynamicAdjustStartHour||18,dynamicAdjustEndHour:e.dynamicAdjustEndHour||6},d=document.documentElement;let a=t.default;const o=t.storageKey;!function(e){if(e){const e=(new Date).getHours();a=e>=t.dynamicAdjustStartHour||e<t.dynamicAdjustEndHour?"dark":"light"}}(t.dynamicAdjust);const s=localStorage.getItem(o)||a;function n(e){localStorage.setItem(o,e)}function r(e){return"light"===e?"light":"dark"===e?"dark":matchMedia("(prefers-color-scheme: light)").matches?"light":matchMedia("(prefers-color-scheme: dark)").matches?"dark":void 0}function c(e){d.setAttribute("theme-mode",e)}function l(e){d.setAttribute("theme",e)}d.setAttribute("theme",s);let i=s;const m=r("system");function u(){let e=function(e){return{system:"light",light:"dark",dark:"light"}[e]||"system"}(i);"system"===i&&(e=r("system")),i=e,n(e),c(r(e)),l(e)}"system"===i&&(i=m),c(r(i)),document.addEventListener("DOMContentLoaded",(()=>{const e="darkmode";if("button"===t.type&&document.querySelectorAll(t.selector).forEach((e=>{e.classList.add("darkmode__toggle"),e.onclick=u})),"dropdown"===t.type){document.querySelectorAll(t.selector).forEach((function(d){var a=document.createElement("div");a.classList.add(e,"darkmode__dropdown");var o=document.createElement("button");o.classList.add("darkmode__toggle"),o.innerText=t.dropdownToggleName,o.setAttribute("aria-expanded","false"),a.appendChild(o);var s=document.createElement("ul");s.classList.add("darkmode__dropdown--menu"),[{className:"darkmode-light",text:"Light",theme:"light"},{className:"darkmode-dark",text:"Dark",theme:"dark"},{className:"darkmode-system",text:"OS System",theme:"system"}].forEach((e=>{var t=document.createElement("li"),d=document.createElement("button");d.type="button",d.classList.add(e.className),d.dataset.theme=e.theme,d.innerText=e.text,t.appendChild(d),s.appendChild(t)})),a.appendChild(s),d.parentNode.replaceChild(a,d)})),document.querySelectorAll(".darkmode__dropdown").forEach((e=>{const d=e.querySelector(".darkmode__toggle"),a=e.querySelector(".darkmode__dropdown--menu"),o=a.querySelectorAll("button");function s(e){const t=e.getBoundingClientRect(),d=t.height,a=window.innerHeight;if(t.top+d>a){const t=a-d-10;e.style.top=t+"px"}}d.addEventListener("click",(()=>{a.classList.toggle("darkmode--open");var e=a.classList.contains("darkmode--open");d.setAttribute("aria-expanded",e?"true":"false"),s(a)})),window.addEventListener("resize",(()=>{a.classList.contains("darkmode--open")&&(a.style.top="",s(a))})),window.addEventListener("click",(e=>{d.contains(e.target)||(a.classList.remove("darkmode--open"),d.setAttribute("aria-expanded","false"))})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&a.classList.contains("darkmode--open")&&(a.classList.remove("darkmode--open"),d.setAttribute("aria-expanded","false"))})),o.forEach((e=>{e.addEventListener("click",(d=>{d.preventDefault(),d.stopPropagation(),function(e,t){const d=e.dataset.theme;e.classList.contains("active")||(t.forEach((e=>e.classList.remove("active"))),e.classList.add("active"),i=d,n(d),c(r(d)),l(d))}(e,o),document.querySelectorAll(".darkmode__dropdown--menu button").forEach((e=>e.classList.remove("active"))),e.classList.add("active");const a=e.dataset.theme;localStorage.setItem(t.storageKey,a),document.querySelectorAll(".darkmode__dropdown--menu button").forEach((e=>{e.dataset.theme===a&&e.classList.add("active")}))}))}))}));let d=localStorage.getItem(t.storageKey);d||(d=a),document.querySelectorAll(".darkmode__dropdown--menu button").forEach((e=>{e.dataset.theme===d&&e.classList.add("active")}))}}))};