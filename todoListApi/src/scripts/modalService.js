function addTaskClickHandler() {
    $(".assign").on("click", function () {
        const taskName = $(this).find(".name").text();
        const taskDescription = $(this).data("fullDesk");
        const taskDate = $(this).find(".date").text();
        const taskStatus = $(this).find(".statusContainer").clone();
        console.log(taskDescription)
        openPopup(taskName, taskDescription, taskDate, taskStatus);
    })
}

function openPopup(taskName, taskDescription, taskDate, taskStatus) {
    const $modal = $("<div>").addClass("modal");
    const $modalContainer = $("<div>").addClass("modalContainer").appendTo($modal);
    const $modalHeader = $("<div>").addClass("modalHeader").appendTo($modalContainer);

    const $modalInfo = $("<div>").addClass("modalInfo").appendTo($modalHeader);

    const $statusContainer = $("<div>")
        .addClass("statusContainer")
        .addClass(taskStatus === "true" ? "true" : "").appendTo($modalHeader);

    const $overlay = $("<div>").addClass("overlay");
    $("<h2>").text(taskName).appendTo($modalInfo);
    $("<span>").text(taskDate).appendTo($modalInfo);
    $("<hr>").appendTo($modalInfo)

    const $modalContent = $("<div>").addClass("modalContent").appendTo($modalContainer);
    $("<button>").text("Готово").appendTo($modalContainer).on("click", function () {
        closePopup($modal, $overlay);
    });

    $("<p>").text(taskDescription).appendTo($modalContent);

    $(".todoContainer").append($modal, $overlay);
}

function closePopup(modal, overlay) {
    modal.remove();
    overlay.remove();
}