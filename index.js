import { currencyOptions } from "./currency.js";

// 입력 받은 input
const number = document.getElementById("number");
// Convert Button
const convertBtn = document.getElementById("convertBtn");
// From
const fromSelect = document.getElementById("fromSelect");
// To
const toSelect = document.getElementById("toSelect");
// Result
const resultInnerText = document.getElementById("result");

const API_KEY = "oeeaqiQMd5s3TXeq62s8ag==xYD66jjliLndw15H";

let want = "USD";
let have = "USD";
let amount = 0;

// Amount
number.addEventListener("input", (event) => {
  amount = +event.target.value;
  updateAPI();
});

// FROM Currency
currencyOptions.forEach((option) => {
  const optionElem = document.createElement("option");
  optionElem.value = Object.values(option).join("");
  optionElem.textContent = Object.values(option).join("");

  fromSelect.appendChild(optionElem);
});

fromSelect.addEventListener("change", () => {
  have = fromSelect.value;

  updateAPI();
});

// To Currency Select
currencyOptions.forEach((option) => {
  const optionElem = document.createElement("option");
  optionElem.value = Object.values(option).join("");
  optionElem.textContent = Object.values(option).join("");

  toSelect.appendChild(optionElem);
});

// To Currency
toSelect.addEventListener("change", () => {
  want = toSelect.value;

  updateAPI();
});

const returnAPI = (want, have, amount) => {
  return `https://api.api-ninjas.com/v1/convertcurrency?want=${want}&have=${have}&amount=${amount}`;
};

const updateAPI = () => {
  convertBtn.addEventListener("click", () => {
    fetch(returnAPI(want, have, amount), {
      headers: {
        "X-Api-Key": API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const result = Math.round(data.new_amount)
          .toString()
          .replaceAll(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        resultInnerText.innerHTML = `Result : ${result} ${want}`;
      })
      .catch((err) => {
        console.error("Request failed", err);
        result.innerHTML = `An error occured place try again later`;
      });
  });
};

const getSelectedText = () => {
  let selectedText = "";
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    selectedText = range.toString();
  }

  return selectedText;
};

document.addEventListener("mouseup", () => {
  const selectedText = getSelectedText().trim();

  if (!isNaN(+selectedText)) {
    console.log(+selectedText, typeof +selectedText);
    console.log("선택된 텍스트: " + selectedText.trim());

    if (amount === 0 && selectedText) {
      number.value = selectedText;
      amount = +selectedText;
    }

    // chrome.runtime.sendMessage({ text: +selectedText });
  }
});

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   // request.text에 선택된 텍스트가 전달됩니다.
//   const selectedText = request.text;
//
//   console.log({ selectedText });
// });
