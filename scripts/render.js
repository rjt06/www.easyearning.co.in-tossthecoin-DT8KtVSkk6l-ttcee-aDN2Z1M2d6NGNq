import { bettingAmountObj, pointObj } from "./data.js";
import { removeCoinSection, removeAddMoneySection, removeWithdrawSection, randomResult, checkCriteriaAndToss, computerChoice, setPoints, generateQR, addMoneyToWallet } from "./functions.js";

export const playerChoice = {
  heads: false,
  tails: false,
};
function renderCoinSection() {
  const coinSection = document.querySelector(".coin-section");
  coinSection.style.display = "flex";
  const html = `
    <div class="coin-container">
      <h2 class="heading-secondary">Fair & Random Coin Flip</h2>
      <div class="betting-amount-container">
        <button class="plus-10">+10</button>
        <div class="betting-amount"></div>
        <button class="minus-10">-10</button>
      </div>
      <div class="coin">
        <div class="coin-inner">
          <img class="coin-img-1" src="imgs/heads.png" alt="">
          <img class="coin-img-2" src="imgs/tails.png" alt="">
        </div>
      </div>
    </div>
    <div class="toss-btns">
      <button class="heads-btn">HEADS</button>
      <button class="tails-btn">TAILS</button>
    </div>
    <div class="demo-btns">
      <button class="demo-btn heads-btn">PLAY FREE</button>
    </div>
    <div class="withdraw-list-container">
      <ul class="withdraw-list">
      </ul>
    </div>
  `;
  coinSection.innerHTML = html;
  const withdrawList = document.querySelector(".withdraw-list");
  withdrawList.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    const random4Digits = Math.floor(1000 + Math.random() * 9000);
    const random = Math.floor(Math.random() * (100 - 10) + 1) + 10;
    withdrawList.innerHTML += `
        <li>+91******${random4Digits} has successfully withdrawn ${random * 10} ruppees just now...</li>`;
  }
  const bettingAmount = document.querySelector(".betting-amount");
  bettingAmount.textContent = bettingAmountObj.bettingAmount;
  const bettingAmountContainer = document.querySelector(".betting-amount-container");
  bettingAmountContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("plus-10")) {
      if (bettingAmountObj.bettingAmount < pointObj.point) {
        bettingAmountObj.bettingAmount += 10;
        bettingAmount.textContent = bettingAmountObj.bettingAmount;
      }
    } else if (e.target.classList.contains("minus-10")) {
      if (bettingAmountObj.bettingAmount > 10) {
        bettingAmountObj.bettingAmount -= 10;
        bettingAmount.textContent = bettingAmountObj.bettingAmount;
      }
    }
  })

  const headsBtn = document.querySelector(".heads-btn");
  const tailsBtn = document.querySelector(".tails-btn");
  const demoBtn = document.querySelector(".demo-btn");
  const coinInner = document.querySelector(".coin-inner");


  headsBtn.addEventListener("click", () => {
    playerChoice.heads = true;
    playerChoice.tails = false;
    headsBtn.disabled = true;
    tailsBtn.disabled = true;
    demoBtn.disabled = true;
    checkCriteriaAndToss();
  })

  tailsBtn.addEventListener("click", () => {
    playerChoice.heads = false;
    playerChoice.tails = true;
    tailsBtn.disabled = true;
    headsBtn.disabled = true;
    demoBtn.disabled = true;
    checkCriteriaAndToss();
  })

  demoBtn.addEventListener("click", () => {
    demoBtn.disabled = true;
    tailsBtn.disabled = true;
    headsBtn.disabled = true;
    coinInner.style.animation = "flip 10s ease";
    setTimeout(() => {
      randomResult();
    }, 3000)
    setTimeout(() => {
      demoBtn.disabled = false;
      headsBtn.disabled = false;
      tailsBtn.disabled = false;
      coinInner.style.animation = "";
    }, 10000)
  })
}

export function renderResultMessage(playerChoice, computerChoice) {
  let youChoseString;
  let emoji;
  let resultString;
  let resultAmount;

  setTimeout(() => {
    if (playerChoice.heads === true && computerChoice.heads === true) {
      youChoseString = "You chose Heads";
      emoji = "🎉";
      resultString = "You Won";
      resultAmount = `Won Amount ${bettingAmountObj.bettingAmount * 2}`;
      pointObj.point = pointObj.point + (bettingAmountObj.bettingAmount * 2);
      setPoints()
    } else if (playerChoice.heads === true && computerChoice.heads === false) {
      youChoseString = "You chose Heads";
      emoji = "😓";
      resultString = "You Lose";
      resultAmount = "Won Amount 0";
      // pointObj.point = pointObj.point - 10;
      //setPoints()
    } else if (playerChoice.heads === false && computerChoice.heads === true) {
      youChoseString = "You chose Tails";
      emoji = "😓";
      resultString = "You Lose";
      resultAmount = "Won Amount 0";
      // pointObj.point = pointObj.point - 10;
      //setPoints()
    } else if (playerChoice.tails === true && computerChoice.tails === true) {
      youChoseString = "You chose Tails";
      emoji = "🎉";
      resultString = "You Won";
      resultAmount = `Won Amount ${bettingAmountObj.bettingAmount * 2}`;
      pointObj.point = pointObj.point + (bettingAmountObj.bettingAmount * 2);
      setPoints()
    }

    const overlaySection = document.querySelector(".overlay-section");
    overlaySection.style.display = "flex";
    overlaySection.innerHTML = `
        <div class="dialog-box">
      <img class="close-dialog" src="svgs/x.svg" alt="X">
      <div class="your-choice">${youChoseString}</div>
      <span class="result-emoji">${emoji}</span>
      <div class="message">${resultString}</div>
      <div class="result-amount">${resultAmount} <span style="color: rgb(98, 0, 0)">₹</span></div>
    </div>
    `;
    const closeDialog = document.querySelector(".close-dialog");
    closeDialog.addEventListener("click", () => {
      overlaySection.style.display = "none";
      overlaySection.innerHTML = "";
    })
  }, 10001);
}

function renderAddMoneySection() {
  const addMoneySection = document.querySelector(".add-section");
  addMoneySection.style.display = "grid";
  const html = `
    <input class="add-money-input" name="add-money" type="number" placeholder="Enter amount manually">
    <button class="add-btn">ADD</button>
    <div class="add-money-spans">
      <span class="add-50">Rs. 50</span>
      <span class="add-100">Rs. 100</span>
      <span class="add-200">Rs. 200</span>
      <span class="add-500">Rs. 500</span>
      <span class="add-1000">Rs. 1000</span>
      <span class="add-2000">Rs. 2000</span>
    </div>
    <div class="qr-div"></div>
    <div class="qr-details"></div>
  `;
  addMoneySection.innerHTML = html;
  // <img class="generate-qr">



  const addMoneyInput = document.querySelector(".add-money-input");
  const addBtn = document.querySelector(".add-btn");
  addBtn.addEventListener("click", () => {
    const amount = addMoneyInput.value;
    generateQR(amount)
    //addMoneyToWallet(amount)
    addMoneyInput.value = "";
  })

  const addMoneySpans = document.querySelector(".add-money-spans");
  addMoneySpans.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-50")) {
      generateQR(50)
      addMoneySpans.disabled = true;
      //addMoneyToWallet(50)
    } else if (e.target.classList.contains("add-100")) {
      generateQR(100)
      //addMoneyToWallet(100)
    } else if (e.target.classList.contains("add-200")) {
      generateQR(200)
      //addMoneyToWallet(200)
    } else if (e.target.classList.contains("add-500")) {
      generateQR(500)
      //addMoneyToWallet(500)
    } else if (e.target.classList.contains("add-1000")) {
      generateQR(1000)
      //addMoneyToWallet(1000)
    } else if (e.target.classList.contains("add-2000")) {
      generateQR(2000)
      //addMoneyToWallet(2000)
    }
  })
}


function renderWithdrawSection() {
  const withdrawSection = document.querySelector(".withdraw-section");
  withdrawSection.style.display = "flex";
  withdrawSection.innerHTML = `
      <label class="upi-input-label" for="upi-input">Enter UPI ID or Phone number</label>
    <input class="upi-input" id="upi-input" type="text" placeholder="e.g. xyz@paytm or ******9545">
    <label class="amount-input-label" for="amount-input">Enter amount to withdraw</label>
      <input class="amount-input" id="amount-input" type="number" placeholder="e.g. 10">
      <button class="withdraw-btn">Withdraw</button>
    <div class="heading-secondary money-equals">10 points = 10 Ruppees</div>
  `;
  const amountInputContainer = document.querySelector(".amount-input-container");
  const withdrawBtn = document.querySelector(".withdraw-btn");
  withdrawBtn.addEventListener("click", () => {
    renderwithdrawMessage()
    localStorage.setItem("upi", JSON.stringify(upiInput.value))
  })
  const upiInput = document.querySelector(".upi-input");
  const savedUPI = JSON.parse(localStorage.getItem("upi"));
  upiInput.value = savedUPI ? savedUPI : upiInput.value;
}

function renderwithdrawMessage() {
  let youChoseString = "You are trying to withdraw";
  let emoji = "😢";
  let resultString = "Can't withdraw !";
  let resultAmount;
  resultAmount = pointObj.point > 100 ? "You have to deposit minimum amount Rs. 50 to withdraw" : "Minimum withdrawal amount should be 100";
  const overlaySection = document.querySelector(".overlay-section");
  overlaySection.style.display = "flex";
  overlaySection.innerHTML = `
        <div class="dialog-box">
      <img class="close-dialog" src="svgs/x.svg" alt="X">
      <div class="your-choice">${youChoseString}</div>
      <span class="result-emoji">${emoji}</span>
      <div class="message">${resultString}</div>
      <div class="result-amount">${resultAmount}</div>
    </div>
    `;
  const closeDialog = document.querySelector(".close-dialog");
  closeDialog.addEventListener("click", () => {
    overlaySection.style.display = "none";
    overlaySection.innerHTML = "";
  })
}



renderCoinSection()
const radios = document.querySelectorAll('input[name="radio-input"]');
radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    switch (radio.value) {
      case "home":
        renderCoinSection();
        removeAddMoneySection();
        removeWithdrawSection();
        break;
      case "add":
        removeCoinSection();
        renderAddMoneySection();
        removeWithdrawSection();
        break;
      case "withdraw":
        removeCoinSection();
        removeAddMoneySection();
        renderWithdrawSection();
        break;
    }
  })

})



