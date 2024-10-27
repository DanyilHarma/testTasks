function renderAssign(data, showOnlyOncompleted = false, isReverse = false) {
    if (showOnlyOncompleted) {
        data = data.filter(task => task.status === false);
    };

    if (isReverse) {
        data = data.reverse();
    };

    $(".assignContainer").empty();

    const groupedTask = groupTaskByDate(data);

    for (const date in groupedTask) {
        if (groupedTask.hasOwnProperty(date)) {
            renderDateHeader(date);
            groupedTask[date].forEach(element => {
                const $assignDiv = createTaskElement(element);
                $(".assignContainer").append($assignDiv);
            });
        };
    };

};

function groupTaskByDate(data) {
    return data.reduce((grouped, task) => {
        const formattedData = formatDate(task.date, true);
        if (!grouped[formattedData]) {
            grouped[formattedData] = [];
        }
        grouped[formattedData].push(task);
        return grouped;
    }, {})
};

function renderDateHeader(date) {
    const $dateHeader = $("<div>").addClass("dateHeader").text(date);
    $(".assignContainer").append($dateHeader);
};

function createTaskElement(element) {
    const $assignDiv = $("<div>").addClass("assign").attr("data-full-desk", element.fullDesc);
    $("<span>").addClass("name").text(element.name).appendTo($assignDiv);
    const $assignContent = $("<div>").addClass("assignContent").appendTo($assignDiv);
    $("<p>").text(truncateText(element.shortDesc, 100)).appendTo($assignContent);
    const $statusContainer = $("<div>").addClass("statusContainer").appendTo($assignContent);
    const date = formatDate(element.date, false);
    $("<span>").addClass("date").text(date).appendTo($assignDiv);
    addStatusClass(element.status, $statusContainer);
    return $assignDiv;
};

function addStatusClass(status, statusContainer) {
    if (status === true) {
        statusContainer.addClass("true");
    };
};

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    };
    return text;
};