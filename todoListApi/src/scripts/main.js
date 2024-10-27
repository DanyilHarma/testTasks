// Получение заданий при выборе диапазона дат
let allTasks = [];

$("#apply-dates").on("click", function () {
    const fromDate = $("#from-date").val();
    const toDate = $("#to-date").val();

    if (fromDate && toDate) {
        const fromDateToTimestep = new Date(fromDate).getTime();
        const toDateToTimestep = new Date(toDate).getTime();

        updateTaskByDate(fromDateToTimestep, toDateToTimestep, function (data) {
            allTasks = data;
            renderAssign(allTasks, $("#checkboxStatus").is(":checked"), false);
        });
    }
})

// Получение только невыполненных заданий
$("#checkboxStatus").on("change", function () {
    const showOnlyOncompleted = $(this).is(":checked");
    renderAssign(allTasks, showOnlyOncompleted, false);
})

// Сортировка по дате
$(".sort").on("click", function () {
    const isReverse = true;
    renderAssign(allTasks, $("#checkboxStatus").is(":checked"), isReverse);
})
