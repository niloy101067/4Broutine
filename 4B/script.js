// Schedule data
const scheduleData = {
    Saturday: [
      { time: "2:30 PM-3:45 PM", subject: "Database Management Systems", code: "CSE 2221", room: "910", teacher: "Asif Mohammed Saad" },
      { time: "3:45 PM-5:00 PM", subject: "Biology for Engineers", code: "BIO 2101", room: "613", teacher: "Mahbubur Rahman" },
    ],
    Sunday: [
      {
        time: "9:45 AM-11:00 AM",
        subject: "Matrix, Linear Algebra, Differential Equation",
        code: "MAT 2207",
        room: "410",
        teacher: "Kollol Das",
      },
      { time: "11:00 AM-1:30 PM", subject: "Database Management Systems Lab", code: "", room: "905", teacher: "Asif Mohammed Saad" },
      { time: "2:30 PM-5:00 PM", subject: "Algorithms Laboratory", code: "CSE 2416", room: "608", teacher: "Ms. Tashin Hossain" },
    ],
    Monday: [
      {
        time: "9:45 AM-11:00 AM",
        subject: "Microprocessors & Microcontrollers",
        code: "CSE 3815",
        room: "903",
        teacher: "Kazi Md. Abrar Yeaser",
      },
      { time: "11:00 AM-12:15 PM", subject: "Database Management Systems", code: "CSE 2221", room: "903", teacher: "Asif Mohammed Saad" },
    ],
    Tuesday: [
      { time: "9:45 AM-11:00 AM", subject: "Algorithms", code: "CSE 2415", room: "409", teacher: "Ms. Tashin Hossain" },
      {
        time: "11:00 AM-1:30 PM",
        subject: "Microprocessors & Microcontrollers Laboratory",
        code: "CSE 3816",
        room: "503",
        teacher: "Kazi Md. Abrar Yeaser",
      },
      { time: "2:30 PM-3:45 PM", subject: "Biology for Engineers", code: "BIO 2101", room: "612", teacher: "Mahbubur Rahman" },
    ],
    Wednesday: [
      {
        time: "9:45 AM-11:00 AM",
        subject: "Microprocessors & Microcontrollers",
        code: "CSE 3815",
        room: "409",
        teacher: "Kazi Md. Abrar Yeaser",
      },
      {
        time: "11:00 AM-12:15 PM",
        subject: "Matrix, Linear Algebra, Differential Equation",
        code: "MAT 2207",
        room: "409",
        teacher: "Kollol Das",
      },
      { time: "12:15 PM-1:30 PM", subject: "Algorithms", code: "CSE 2415", room: "409", teacher: "Ms. Tashin Hossain" },
    ],
  }
  
  // Bangladesh holidays 2025
  const bangladeshHolidays = [
    { name: "New Year's Day", date: "January 1, 2025" },
    { name: "Shaheed Dibosh", date: "February 21, 2025" },
    { name: "Independence Day", date: "March 26, 2025" },
    { name: "Bengali New Year", date: "April 14, 2025" },
    { name: "May Day", date: "May 1, 2025" },
    { name: "Eid ul-Fitr", date: "March 30, 2025" },
    { name: "Eid ul-Adha", date: "June 6, 2025" },
    { name: "National Mourning Day", date: "August 15, 2025" },
    { name: "Victory Day", date: "December 16, 2025" },
    { name: "Christmas Day", date: "December 25, 2025" },
  ]
  
  // Global variables
  let currentFilter = "all"
  let searchQuery = ""
  let nextClassAlertShown = false
  
  // DOM elements
  const elements = {
    clock: document.getElementById("clock"),
    digitalTime: document.getElementById("digitalTime"),
    dateInfo: document.getElementById("dateInfo"),
    hourHand: document.getElementById("hourHand"),
    minuteHand: document.getElementById("minuteHand"),
    secondHand: document.getElementById("secondHand"),
    todayDate: document.getElementById("todayDate"),
    statusCard: document.getElementById("statusCard"),
    statusTitle: document.getElementById("statusTitle"),
    statusMessage: document.getElementById("statusMessage"),
    statusEmoji: document.getElementById("statusEmoji"),
    todayClasses: document.getElementById("todayClasses"),
    scheduleContainer: document.getElementById("scheduleContainer"),
    searchInput: document.getElementById("searchInput"),
    clearSearch: document.getElementById("clearSearch"),
    filterButtons: document.querySelectorAll(".filter-btn"),
    totalClasses: document.getElementById("totalClasses"),
    thisWeek: document.getElementById("thisWeek"),
    nextClassDay: document.getElementById("nextClassDay"),
    nextRoom: document.getElementById("nextRoom"),
    darkModeToggle: document.getElementById("darkModeToggle"),
    nextClassAlert: document.getElementById("nextClassAlert"),
    closeAlert: document.getElementById("closeAlert"),
    alertMessage: document.getElementById("alertMessage"),
    holidayCalendar: document.getElementById("holidayCalendar"),
    holidayModal: document.getElementById("holidayModal"),
    closeModal: document.getElementById("closeModal"),
    holidayList: document.getElementById("holidayList"),
  }
  
  // Initialize the application
  function init() {
    updateClock()
    updateSchedule()
    updateStats()
    setupEventListeners()
    loadDarkMode()
    populateHolidays()
  
    // Update every second
    setInterval(updateClock, 1000)
  
    // Update schedule every minute
    setInterval(() => {
      updateSchedule()
      checkNextClassAlert()
    }, 60000)
  }
  
  // Clock functions
  function updateClock() {
    const now = new Date()
  
    // Update digital time
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    elements.digitalTime.textContent = timeString
  
    // Update date
    const dateString = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    elements.dateInfo.textContent = dateString
    elements.todayDate.textContent = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  
    // Update analog clock hands
    const hours = now.getHours() % 12
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
  
    const hourDeg = hours * 30 + minutes * 0.5
    const minuteDeg = minutes * 6
    const secondDeg = seconds * 6
  
    elements.hourHand.style.transform = `rotate(${hourDeg}deg)`
    elements.minuteHand.style.transform = `rotate(${minuteDeg}deg)`
    elements.secondHand.style.transform = `rotate(${secondDeg}deg)`
  }
  
  // Time parsing function
  function parseTime(timeStr) {
    const [time, period] = timeStr.split(" ")
    let [hours, minutes] = time.split(":").map(Number)
  
    if (period === "PM" && hours !== 12) hours += 12
    if (period === "AM" && hours === 12) hours = 0
  
    return hours * 60 + minutes
  }
  
  // Get current day name
  function getCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days[new Date().getDay()]
  }
  
  // Get next day name
  function getNextDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date().getDay()
    let nextDay = (today + 1) % 7
  
    // Skip Thursday and Friday (off days)
    while (nextDay === 4 || nextDay === 5) {
      nextDay = (nextDay + 1) % 7
    }
  
    return days[nextDay]
  }
  
  // Update schedule and status
  function updateSchedule() {
    const now = new Date()
    const currentDay = getCurrentDay()
    const currentTime = now.getHours() * 60 + now.getMinutes()
  
    // Check if it's a weekend or off day
    if (currentDay === "Thursday" || currentDay === "Friday") {
      updateStatusCard("off-day", "Weekend Holiday! 🎉", "Enjoy your day off. Classes resume on Saturday.", "🏖️")
      elements.todayClasses.innerHTML = '<div class="no-classes">No classes today - Weekend Holiday!</div>'
      return
    }
  
    const todaySchedule = scheduleData[currentDay] || []
  
    if (todaySchedule.length === 0) {
      updateStatusCard(
        "no-class",
        "No Classes Today! 🎉",
        "Enjoy your free day. Next classes on " + getNextDay() + ".",
        "📚",
      )
      elements.todayClasses.innerHTML = '<div class="no-classes">No classes scheduled for today!</div>'
      return
    }
  
    let currentClass = null
    let nextClass = null
    let allClassesDone = true
  
    // Find current and next class
    for (let i = 0; i < todaySchedule.length; i++) {
      const classItem = todaySchedule[i]
      const [startTime, endTime] = classItem.time.split("-")
      const startMinutes = parseTime(startTime.trim())
      const endMinutes = parseTime(endTime.trim())
  
      if (currentTime >= startMinutes && currentTime < endMinutes) {
        currentClass = classItem
        allClassesDone = false
        break
      } else if (currentTime < startMinutes) {
        nextClass = classItem
        allClassesDone = false
        break
      }
    }
  
    // Update status card
    if (currentClass) {
      updateStatusCard(
        "current-class",
        "Currently in Class! 📚",
        `${currentClass.subject} - Room ${currentClass.room}`,
        "👨‍🏫",
      )
    } else if (nextClass) {
      const [startTime] = nextClass.time.split("-")
      const startMinutes = parseTime(startTime.trim())
      const timeUntil = startMinutes - currentTime
      const hours = Math.floor(timeUntil / 60)
      const minutes = timeUntil % 60
  
      let timeText = ""
      if (hours > 0) timeText += `${hours}h `
      if (minutes > 0) timeText += `${minutes}m`
  
      if (timeUntil <= 30) {
        updateStatusCard("next-class", "Next Class Soon! ⏰", `${nextClass.subject} starts in ${timeText}`, "🚀")
      } else {
        updateStatusCard("break-time", "Break Time! ☕", `Next class: ${nextClass.subject} in ${timeText}`, "😊")
      }
    } else if (allClassesDone) {
      const nextDay = getNextDay()
      const nextDaySchedule = scheduleData[nextDay]
      if (nextDaySchedule && nextDaySchedule.length > 0) {
        updateStatusCard("classes-done", "Classes Done for Today! 🎉", `Great job! Next classes on ${nextDay}`, "✅")
        displayNextDayClasses(nextDay)
      } else {
        updateStatusCard("classes-done", "All Classes Done! 🎉", "Great job! Enjoy your free time.", "🎊")
      }
    }
  
    // Display today's classes
    displayTodayClasses(todaySchedule, currentTime)
  
    // Display weekly schedule
    displayWeeklySchedule()
  }
  
  // Update status card
  function updateStatusCard(type, title, message, emoji) {
    elements.statusCard.className = `status-card ${type}`
    elements.statusTitle.textContent = title
    elements.statusMessage.textContent = message
    elements.statusEmoji.textContent = emoji
  }
  
  // Display today's classes
  function displayTodayClasses(classes, currentTime) {
    if (classes.length === 0) return
  
    elements.todayClasses.innerHTML = classes
      .map((classItem) => {
        const [startTime, endTime] = classItem.time.split("-")
        const startMinutes = parseTime(startTime.trim())
        const endMinutes = parseTime(endTime.trim())
  
        let status = ""
        if (currentTime >= startMinutes && currentTime < endMinutes) {
          status = "current"
        } else if (currentTime < startMinutes && startMinutes - currentTime <= 60) {
          status = "next"
        }
  
        return `
              <div class="class-card ${status}">
                  <div class="class-time">
                      <i class="fas fa-clock"></i>
                      ${classItem.time}
                  </div>
                  <div class="class-info">
                      <div class="class-subject">${classItem.subject}</div>
                      ${classItem.code ? `<div class="class-code">${classItem.code}</div>` : ""}
                  </div>
                  <div class="class-details">
                      <div class="class-room">
                          <i class="fas fa-door-open"></i>
                          ${classItem.room}
                      </div>
                      ${classItem.teacher ? `<div class="class-teacher">${classItem.teacher}</div>` : ""}
                  </div>
              </div>
          `
      })
      .join("")
  }
  
  // Display next day classes when today's classes are done
  function displayNextDayClasses(nextDay) {
    const nextDaySchedule = scheduleData[nextDay]
    if (!nextDaySchedule) return
  
    const nextDayHtml = `
          <div class="next-day-section">
              <h3 class="next-day-title">
                  <i class="fas fa-arrow-right"></i>
                  Next Classes - ${nextDay}
              </h3>
              <div class="next-day-classes">
                  ${nextDaySchedule
                    .map(
                      (classItem) => `
                      <div class="class-card">
                          <div class="class-time">
                              <i class="fas fa-clock"></i>
                              ${classItem.time}
                          </div>
                          <div class="class-info">
                              <div class="class-subject">${classItem.subject}</div>
                              ${classItem.code ? `<div class="class-code">${classItem.code}</div>` : ""}
                          </div>
                          <div class="class-details">
                              <div class="class-room">
                                  <i class="fas fa-door-open"></i>
                                  ${classItem.room}
                              </div>
                              ${classItem.teacher ? `<div class="class-teacher">${classItem.teacher}</div>` : ""}
                          </div>
                      </div>
                  `,
                    )
                    .join("")}
              </div>
          </div>
      `
  
    elements.todayClasses.innerHTML = nextDayHtml
  }
  
  // Display weekly schedule
  function displayWeeklySchedule() {
    const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"]
    const currentDay = getCurrentDay()
  
    elements.scheduleContainer.innerHTML = days
      .map((day) => {
        const daySchedule = scheduleData[day] || []
        const isToday = day === currentDay
  
        if (currentFilter === "today" && !isToday) return ""
        if (currentFilter === "tomorrow" && day !== getNextDay()) return ""
  
        // Filter by search query
        const filteredSchedule = daySchedule.filter((classItem) => {
          if (!searchQuery) return true
          const query = searchQuery.toLowerCase()
          return (
            classItem.subject.toLowerCase().includes(query) ||
            classItem.code.toLowerCase().includes(query) ||
            classItem.room.toLowerCase().includes(query) ||
            (classItem.teacher && classItem.teacher.toLowerCase().includes(query))
          )
        })
  
        if (filteredSchedule.length === 0 && searchQuery) return ""
  
        return `
              <div class="day-schedule ${isToday ? "today" : ""}">
                  <div class="day-header">
                      <div class="day-name">
                          <i class="fas fa-calendar-day"></i>
                          ${day}
                          ${isToday ? '<span style="margin-left: 10px; font-size: 0.8em;">(Today)</span>' : ""}
                      </div>
                      <div class="class-count">${filteredSchedule.length} classes</div>
                  </div>
                  <div class="day-classes">
                      ${
                        filteredSchedule.length > 0
                          ? filteredSchedule
                              .map(
                                (classItem) => `
                              <div class="class-card">
                                  <div class="class-time">
                                      <i class="fas fa-clock"></i>
                                      ${classItem.time}
                                  </div>
                                  <div class="class-info">
                                      <div class="class-subject">${classItem.subject}</div>
                                      ${classItem.code ? `<div class="class-code">${classItem.code}</div>` : ""}
                                  </div>
                                  <div class="class-details">
                                      <div class="class-room">
                                          <i class="fas fa-door-open"></i>
                                          ${classItem.room}
                                      </div>
                                      ${classItem.teacher ? `<div class="class-teacher">${classItem.teacher}</div>` : ""}
                                  </div>
                              </div>
                          `,
                              )
                              .join("")
                          : '<div class="no-classes">No classes scheduled</div>'
                      }
                  </div>
              </div>
          `
      })
      .filter((html) => html)
      .join("")
  }
  
  // Update statistics
  function updateStats() {
    let totalClasses = 0
    let thisWeekClasses = 0
  
    Object.values(scheduleData).forEach((daySchedule) => {
      totalClasses += daySchedule.length
      thisWeekClasses += daySchedule.length
    })
  
    elements.totalClasses.textContent = totalClasses
    elements.thisWeek.textContent = thisWeekClasses
  
    // Find next class
    const currentDay = getCurrentDay()
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
  
    let nextClass = null
    let nextDay = currentDay
  
    // Check today first
    if (scheduleData[currentDay]) {
      for (const classItem of scheduleData[currentDay]) {
        const [startTime] = classItem.time.split("-")
        const startMinutes = parseTime(startTime.trim())
        if (currentTime < startMinutes) {
          nextClass = classItem
          break
        }
      }
    }
  
    // If no class today, check next days
    if (!nextClass) {
      const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"]
      const dayIndex = days.indexOf(currentDay)
  
      for (let i = 1; i < days.length; i++) {
        const checkDay = days[(dayIndex + i) % days.length]
        if (scheduleData[checkDay] && scheduleData[checkDay].length > 0) {
          nextClass = scheduleData[checkDay][0]
          nextDay = checkDay
          break
        }
      }
    }
  
    if (nextClass) {
      if (nextDay === currentDay) {
        const [startTime] = nextClass.time.split("-")
        const startMinutes = parseTime(startTime.trim())
        const timeUntil = startMinutes - currentTime
        const hours = Math.floor(timeUntil / 60)
        const minutes = timeUntil % 60
  
        if (hours > 0) {
          elements.nextClassDay.textContent = `${hours}h ${minutes}m`
        } else {
          elements.nextClassDay.textContent = `${minutes}m`
        }
      } else {
        elements.nextClassDay.textContent = nextDay
      }
      elements.nextRoom.textContent = nextClass.room
    } else {
      elements.nextClassDay.textContent = "-"
      elements.nextRoom.textContent = "-"
    }
  }
  
  // Check for next class alert
  function checkNextClassAlert() {
    const currentDay = getCurrentDay()
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
  
    if (!scheduleData[currentDay]) return
  
    for (const classItem of scheduleData[currentDay]) {
      const [startTime] = classItem.time.split("-")
      const startMinutes = parseTime(startTime.trim())
      const timeUntil = startMinutes - currentTime
  
      if (timeUntil === 30 && !nextClassAlertShown) {
        showNextClassAlert(classItem)
        nextClassAlertShown = true
        setTimeout(() => {
          nextClassAlertShown = false
        }, 60000)
        break
      }
    }
  }
  
  // Show next class alert
  function showNextClassAlert(classItem) {
    elements.alertMessage.textContent = `${classItem.subject} starts in 30 minutes - Room ${classItem.room}`
    elements.nextClassAlert.classList.remove("hidden")
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Search functionality
    elements.searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value
      elements.clearSearch.classList.toggle("hidden", !searchQuery)
      displayWeeklySchedule()
    })
  
    elements.clearSearch.addEventListener("click", () => {
      elements.searchInput.value = ""
      searchQuery = ""
      elements.clearSearch.classList.add("hidden")
      displayWeeklySchedule()
    })
  
    // Escape key to clear search
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchQuery) {
        elements.searchInput.value = ""
        searchQuery = ""
        elements.clearSearch.classList.add("hidden")
        displayWeeklySchedule()
      }
    })
  
    // Filter buttons
    elements.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        elements.filterButtons.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        currentFilter = btn.dataset.filter
        displayWeeklySchedule()
      })
    })
  
    // Dark mode toggle
    elements.darkModeToggle.addEventListener("click", toggleDarkMode)
  
    // Alert close button
    elements.closeAlert.addEventListener("click", () => {
      elements.nextClassAlert.classList.add("hidden")
    })
  
    // Holiday calendar
    elements.holidayCalendar.addEventListener("click", () => {
      elements.holidayModal.classList.remove("hidden")
    })
  
    elements.closeModal.addEventListener("click", () => {
      elements.holidayModal.classList.add("hidden")
    })
  
    // Close modal on outside click
    elements.holidayModal.addEventListener("click", (e) => {
      if (e.target === elements.holidayModal) {
        elements.holidayModal.classList.add("hidden")
      }
    })
  }
  
  // Dark mode functions
  function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
  
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  
    const icon = elements.darkModeToggle.querySelector("i")
    icon.className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
  }
  
  function loadDarkMode() {
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
  
    const icon = elements.darkModeToggle.querySelector("i")
    icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon"
  }
  
  // Populate holidays
  function populateHolidays() {
    elements.holidayList.innerHTML = bangladeshHolidays
      .map(
        (holiday) => `
          <div class="holiday-item">
              <div class="holiday-name">${holiday.name}</div>
              <div class="holiday-date">${holiday.date}</div>
          </div>
      `,
      )
      .join("")
  }
  
  // Initialize the application when DOM is loaded
  document.addEventListener("DOMContentLoaded", init)
  