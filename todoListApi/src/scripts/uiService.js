function renderAssign(data, showOnlyOncompleted) {
    if (showOnlyOncompleted) {
        data = data.filter(task => task.status === false)
    }
    $(".assignContainer").empty();
    data.forEach(element => {
        const $assignDiv = createTaskElement(element);
        $(".assignContainer").append($assignDiv);
    });
}

function createTaskElement(element) {
    const $assignDiv = $("<div>").addClass("assign")
    $("<span>").addClass("name").text(element.name).appendTo($assignDiv);
    const $assignContent = $("<div>").addClass("assignContent").appendTo($assignDiv);
    $("<p>").text(truncateText(element.shortDesc, 100)).appendTo($assignContent);
    const $statusContainer = $("<div>").addClass("statusContainer").appendTo($assignContent);
    addStatusClass(element.status, $statusContainer);
    return $assignDiv;
}

function addStatusClass(status, statusContainer) {
    if (status === true) {
        statusContainer.addClass("true");
    } else {
        return statusContainer;
    }
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}   