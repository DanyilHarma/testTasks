document.getElementById("apply-dates").addEventListener("click", function () {
    const fromDate = document.getElementById("from-date").value;
    const toDate = document.getElementById("to-date").value;

    if (fromDate && toDate) {
        const fromDateToTimestep = new Date(fromDate).getTime();
        const toDateToTimestep = new Date(toDate).getTime();

        updateTaskByDate(fromDateToTimestep, toDateToTimestep);
    }
})


function getMonthIndex(monthName) {
    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return months.indexOf(monthName);
}


function updateTaskByDate(from, to) {
    // const fromDate = new Date(year, monthIndex - 1, day).getTime()
    console.log(`Обновляем задачи для даты: ${from}  ${to}`);
    $.ajax({
        url: "http://localhost:3001/api/todos/date",
        method: "GET",
        data: { from, to },
        success: function (data) {
            console.log(data)
        },
        error: function (error) {
            console.log(error)
        }
    })
}
