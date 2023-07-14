const submit = document.querySelector("#submit")
const form = document.querySelector("#form")
const curDate = new Date()

form.addEventListener("submit", validate)

// Month: 0 a 11
// Year: yyyy (4 digits)
function totalDaysInMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

function validate(e) {
  e.preventDefault()

  const day = document.querySelector("#day")
  const month = document.querySelector("#month")
  const year = document.querySelector("#year")

  const erroDay = document.querySelector("#erroDay")
  const erroMonth = document.querySelector("#erroMonth")
  const erroYear = document.querySelector("#erroYear")

  let labelDay = document.querySelector("[for='day']")
  let labelMonth = document.querySelector("[for='month']")
  let labelYear = document.querySelector("[for='year']")

  let newDay = ""
  let newMonth = ""
  let newYear = ""

  if (day.value == "") {
    erroDay.innerHTML = "This field is required"
    day.classList.add("border-lightRed")
    labelDay.classList.add("text-lightRed")
    labelDay.classList.remove("text-smokeyGrey")

  } else if (day.value < 1 || day.value > 31) {
    erroDay.innerHTML = "Must be a valid day"
    day.classList.add("border-lightRed")
    labelDay.classList.add("text-lightRed")
    labelDay.classList.remove("text-smokeyGrey")

  } else if (parseInt(day.value) > totalDaysInMonth(year.value, month.value - 1)) {
    erroDay.innerHTML = "Must be a valid date"
    erroMonth.innerHTML = ""
    erroYear.innerHTML = ""

    day.classList.add("border-lightRed")
    labelDay.classList.add("text-lightRed")
    labelDay.classList.remove("text-smokeyGrey")

  } else {
    newDay = day.value
    erroDay.innerHTML = ""
    day.classList.remove("border-lightRed")
    labelDay.classList.remove("text-lightRed")
    labelDay.classList.add("text-smokeyGrey")
  }

  if (month.value == "") {
    erroMonth.innerHTML = "This field is required"
    month.classList.add("border-lightRed")
    labelMonth.classList.add("text-lightRed")
    labelMonth.classList.remove("text-smokeyGrey")

  } else if (month.value < 1 || month.value > 12) {
    erroMonth.innerHTML = "Must be a valid month"
    month.classList.add("border-lightRed")
    labelMonth.classList.add("text-lightRed")
    labelMonth.classList.remove("text-smokeyGrey")

  } else {
    newMonth = month.value
    erroMonth.innerHTML = ""
    month.classList.remove("border-lightRed")
    labelMonth.classList.add("text-smokeyGrey")
    labelMonth.classList.remove("text-lightRed")
  }

  if (year.value == "") {
    erroYear.innerHTML = "This field is required"
    year.classList.add("border-lightRed")
    labelYear.classList.add("text-lightRed")
    labelYear.classList.remove("text-smokeyGrey")

  } else if (year.value < 0) {
    erroYear.innerHTML = "Must be a valid Year"
    year.classList.add("border-lightRed")
    labelYear.classList.add("text-lightRed")
    labelYear.classList.remove("text-smokeyGrey")

  } else {
    newYear = year.value
    erroYear.innerHTML = ""
    year.classList.remove("border-lightRed")
    labelYear.classList.add("text-smokeyGrey")
    labelYear.classList.remove("text-lightRed")
  }

  const strDate = newDay + "/" + newMonth + "/" + newYear;
  const partesDate = strDate.split("/");
  const date = new Date(partesDate[2], partesDate[1] - 1, partesDate[0]);

  if (newDay != "" && newMonth != "" && newYear != "") {
    if (date > new Date()) {
      erroYear.innerHTML = "Must be in the past"
      year.classList.add("border-lightRed")
      labelYear.classList.add("text-lightRed")
      labelYear.classList.remove("text-smokeyGrey")
    } else {
      ageCalculator(strDate)
      erroYear.innerHTML = ""
      year.classList.remove("border-lightRed")
      labelYear.classList.add("text-smokeyGrey")
      labelYear.classList.remove("text-lightRed")
    }
  }
}

function ageCalculator(date) {
  const partesData = date.split("/");

  const years = document.querySelector("#years")
  const months = document.querySelector("#months")
  const days = document.querySelector("#days")

  const year = partesData[2]
  const month = partesData[1]
  const day = partesData[0]

  var difYears = curDate.getFullYear() - parseInt(year);
  var difMonths = curDate.getMonth()+1 - parseInt(month);
  var difDays = curDate.getDate() - parseInt(day);

  if (difMonths < 0 || (difMonths === 0 && difDays < 0)) {
    difYears--;
    difMonths += 12;
  }

  if (difDays < 0) {
    var lastDayPreviousMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 0).getDate();
    difMonths--;
    difDays += lastDayPreviousMonth;
  }

  animateValue(years, 0, difYears, 1000)
  animateValue(months, 0, difMonths, 1000)
  animateValue(days, 0, difDays, 1000)
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}