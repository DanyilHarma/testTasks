$(".toWeek").on("click", function () {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const fromDate = today.getTime();
    const toDate = nextWeek.getTime();

    updateTaskByDate(fromDate, toDate, function (data) {
        allTasks = data;
        renderAssign(allTasks, $("#checkboxStatus").is(":checked"), false);
    });
});

$(".today").on("click", function () {
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    const fromDate = today.getTime();

    const endDay = new Date(today);
    endDay.setHours(23, 59, 59, 999);
    const toDate = endDay.getTime();

    updateTaskByDate(fromDate, toDate, function (data) {
        allTasks = data;
        renderAssign(allTasks, $("#checkboxStatus").is(":checked"), false);
    });
});

function formatDate(dateFull, onlyDate = false) {
    const formattedDateString = dateFull.slice(0, -2) + ":" + dateFull.slice(-2);

    const date = new Date(formattedDateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    if (onlyDate) {
        const monthName = getMonthName(month);
        return `${day} ${monthName} ${year}`
    } else {
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}
function getMonthName(monthIndex) {
    const months = [
        "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];
    return months[monthIndex - 1];
}