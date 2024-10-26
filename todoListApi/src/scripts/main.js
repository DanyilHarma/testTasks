// Получение всех заданий
let allTasks = [];

$("#apply-dates").on("click", function () {
    const fromDate = $("#from-date").val();
    const toDate = $("#to-date").val();

    if (fromDate && toDate) {
        const fromDateToTimestep = new Date(fromDate).getTime();
        const toDateToTimestep = new Date(toDate).getTime();

        updateTaskByDate(fromDateToTimestep, toDateToTimestep, function (data) {
            allTasks = data;
            renderAssign(allTasks, $("#checkboxStatus").is(":checked"));
        });
    }
})

$("#checkboxStatus").on("change", function () {
    const showOnlyOncompleted = $(this).is(":checked");
    renderAssign(allTasks, showOnlyOncompleted);
})


function getMonthIndex(monthName) {
    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return months.indexOf(monthName);
}



// Получение заданий на сегодня