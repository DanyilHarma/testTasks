$(".toWeek").on("click", function () {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const fromDate = today.getTime();
    const toDate = nextWeek.getTime();

    updateTaskByDate(fromDate, toDate, function (data) {
        allTasks = data;
        renderAssign(allTasks, $("#checkboxStatus").is(":checked"));
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
        renderAssign(allTasks, $("#checkboxStatus").is(":checked"));
    });
});