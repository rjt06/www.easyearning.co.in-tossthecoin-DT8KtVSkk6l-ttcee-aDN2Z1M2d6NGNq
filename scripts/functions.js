import { pointObj, bettingAmountObj } from "./data.js";
import { playerChoice, renderResultMessage } from "./render.js";

export function removeCoinSection() {
  const coinSection = document.querySelector(".coin-section");
  coinSection.style.display = "none";
}

export function removeAddMoneySection() {
  const addMoneySection = document.querySelector(".add-section");
  addMoneySection.style.display = "none";
}

export function removeWithdrawSection() {
  const withdrawSection = document.querySelector(".withdraw-section");
  withdrawSection.style.display = "none";
}

export function checkCriteriaAndToss() {
  const pointsEl = document.querySelector(".points");
  const headsBtn = document.querySelector(".heads-btn");
  const tailsBtn = document.querySelector(".tails-btn");
  const demoBtn = document.querySelector(".demo-btn");
  if (pointObj.point >= 10 && pointObj.point >= bettingAmountObj.bettingAmount) {
    pointObj.point = pointObj.point - bettingAmountObj.bettingAmount;
    setPoints()
    const coinInner = document.querySelector(".coin-inner");
    coinInner.style.animation = "flip 10s ease";
    randomResult();
    renderResultMessage(playerChoice, computerChoice);
    setTimeout(() => {

      headsBtn.disabled = false;
      tailsBtn.disabled = false;
      demoBtn.disabled = false;
      coinInner.style.animation = "";
    }, 10000)
  } else {
    headsBtn.disabled = false;
    tailsBtn.disabled = false;
    demoBtn.disabled = false;
  }
}


export const computerChoice = {
  heads: false,
  tails: false,
}

export function randomResult() {
  const coinImg1 = document.querySelector(".coin-img-1");
  const coinImg2 = document.querySelector(".coin-img-2");
  const random = Math.floor(Math.random() * 2) + 1;
  if (random === 1) {
    computerChoice.heads = true;
    computerChoice.tails = false;

  } else if (random === 2) {
    computerChoice.heads = false;
    computerChoice.tails = true;
  }

  setTimeout(() => {
    switch (random) {
      case 1:
        coinImg1.src = "imgs/heads.png";
        coinImg2.src = "imgs/tails.png";
        break;
      case 2:
        coinImg1.src = "imgs/tails.png";
        coinImg2.src = "imgs/heads.png";

        break;
    }
  }, 3000);
}

export function getPoints() {
  let savedPoitns = localStorage.getItem("points");
  let points = savedPoitns ? Number(savedPoitns) : pointObj.point;
  pointObj.point = points;
  const pointsEl = document.querySelector(".points");
  pointsEl.textContent = pointObj.point;
}
getPoints()

export function setPoints() {
  localStorage.setItem("points", pointObj.point);
  const pointsEl = document.querySelector(".points");
  pointsEl.textContent = pointObj.point;
}


export function generateQR(amount) {
  const upiId = "rjt@slc";
  const name = "Easy Earning";
  const note = "easyearning.co.in";

  const link = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  const qrCode = new QRCodeStyling({
    width: 260,
    height: 260,
    data: link,
    dotsOptions: {
      color: "rgba(214, 107, 0, 0.5)",
      type: "rounded"
    },
    backgroundOptions: {
      color: "transparent"
    },
    cornerSquareOptions: {
      type: "extra-rounded",
      color: "#ff0000"
    },
    cornersDotOptions: {
      type: "dots",
      color: "rgba(214, 107, 0, 0.9)"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5
    }
  });

  const qrDiv = document.querySelector(".qr-div");
  qrCode.append(qrDiv);
  qrCode.update({ data: link })


  const qrDetails = document.querySelector(".qr-details");
  qrDetails.innerHTML = `
    <div class="timer"></div>
    <div style="color: rgb(98, 0, 0); margin-bottom: 1rem; font-size: 1.8rem; font-weight: 700;">This is QR Code for amount Rs. ${amount}</div
    <div>Scan this code in another smartphone or Take Screenshot and pay to make payment</div>
    `;

  let time = 300;
  const timerEl = document.querySelector(".timer");


  let timer = setInterval(() => {
    const m = Math.floor(time / 60);
    const s = time % 60;

    timerEl.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      qrCode.update({ data: "" });
      qrDetails.innerHTML = `
    <div class="timer"></div>
    `;
      const timerEl2 = document.querySelector(".timer");
      timerEl2.textContent = "QR Code expired!!! Select amount again...";
    }
  }, 1000)
}


export function addMoneyToWallet(amount) {
  pointObj.point = Number(pointObj.point) + Number(amount);
  setPoints()
}
