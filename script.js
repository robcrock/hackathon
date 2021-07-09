import { differenceInWeeks, addYears } from "date-fns"
import flatpickr from "flatpickr"

const fp = flatpickr("#basicDate", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
})

fp.config.onChange.push(function (selectedDate) {
  // Declare variables needed.
  let today = new Date()
  let weeksLived = differenceInWeeks(today, selectedDate[0])
  let dateAtEighty = addYears(selectedDate[0], 80)
  let weeksUntilEighty = differenceInWeeks(dateAtEighty, today)
  // Build the output message
  let message = `You have lived ${weeksLived} weeks up to this point. If you make it 80, you've got ${weeksUntilEighty} weeks to go. You are ${
    parseFloat(weeksLived / (weeksLived + weeksUntilEighty)).toFixed(2) * 100
  }% of the way there 😬`
  // Insert the message
  let output = document.querySelector("#output")
  output.innerHTML = message
})
