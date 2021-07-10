import { differenceInWeeks, addYears } from "date-fns"
import flatpickr from "flatpickr"

const fp = flatpickr("#basicDate", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
})

window.onload = function () {
  if (localStorage.getItem("selected") !== null) {
    document.querySelector("#form").style.display = "none"
    const pickedDate = new Date(localStorage.getItem("selected"))
    calledStatus(pickedDate)
  }
  return
}

// Render the first time
fp.config.onChange.push(function (selectedDate) {
  localStorage.setItem("selected", selectedDate[0])
  const pickedDate = new Date(localStorage.getItem("selected"))
  calledStatus(pickedDate)
})

function once(selectedDate) {
  let called = false

  function closure(selectedDate) {
    if (called) {
      // Second time called we don't want anything to happen
      return
    } else {
      // The first time we want to update the called var
      called = true
      // Declare variables needed.
      let today = new Date()
      let weeksLived = differenceInWeeks(today, selectedDate)
      let dateAtEighty = addYears(selectedDate, 80)
      let weeksUntilEighty = differenceInWeeks(dateAtEighty, today)
      // Build the output message
      let message = `You have lived ${weeksLived
        .toString()
        .replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )} weeks up to this point. If you make it 80, you've got ${weeksUntilEighty
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} weeks to go. You are ${
        parseFloat(weeksLived / (weeksLived + weeksUntilEighty)).toFixed(2) *
        100
      }% of the way there.`
      // Insert the message
      let output = document.querySelector("#output")
      output.innerHTML = message

      ////////// Create the chart //////////

      // CREATE SPACE FOR A CHART TITLE
      const xAxis = document.createElement("div")
      xAxis.innerHTML = "weeks"
      document.querySelector(".col-9").appendChild(xAxis)
      // const yAxis = document.createElement("div")

      // CREATE A SECTION FOR THE CHART AND Y-AXIS
      const chartSection = document.createElement("section")
      document.querySelector(".col-9").appendChild(chartSection)

      // Add y-axis
      const yAxisContainer = document.createElement("div")
      yAxisContainer.classList.add("y-axis-container")
      chartSection.appendChild(yAxisContainer)

      const yAxis = document.createElement("div")
      yAxis.innerHTML = "age"
      yAxis.classList.add("y-axis")
      yAxisContainer.appendChild(yAxis)

      // CREATE A PLACEHOLDER FOR THE CHART
      const chart = document.createElement("div")
      chart.classList.add("grid")
      chartSection.appendChild(chart)

      const weeksAtEighty = 80 * 52
      for (let i = 0; i < weeksAtEighty; i++) {
        let emptyCircle = document.createElement("div")
        if (i < weeksLived) {
          emptyCircle.classList.add("fullLife")
        } else {
          emptyCircle.classList.add("emptyLife")
        }
        document.querySelector(".grid").appendChild(emptyCircle)
      }
    }
  }

  return closure
}

let calledStatus = once()
