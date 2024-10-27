function getDateRange(rangeType) {
    const today = new Date();
    let fromDate, toDate;

    switch (rangeType) {
        case 'today':
            today.setHours(0, 0, 0, 0);
            fromDate = today.getTime();
            toDate = new Date(today).setHours(23, 59, 59, 999);
            break;
        case 'week':
            fromDate = today.getTime();
            toDate = new Date(today).setDate(today.getDate() + 7);
            break;
        default:
            throw new Error("Неверный тип диапазона");
    }

    return { fromDate, toDate };
}

$(".today, .toWeek").on("click", function () {
    const rangeType = $(this).hasClass("today") ? 'today' : 'week';
    const { fromDate, toDate } = getDateRange(rangeType);

    updateTaskByDate(fromDate, toDate, function (data) {
        allTasks = data;
        renderAssign(allTasks, $("#checkboxStatus").is(":checked"), false);
        addTaskClickHandler();
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