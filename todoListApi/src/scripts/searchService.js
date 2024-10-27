function searchTasks(query, successCallback) {
    const url = "http://localhost:3001/api/todos/find"
    const data = {
        q: query,
        limit: 10
    }

    $.ajax({
        url: url,
        method: "GET",
        data: data,
        success: function (response) {
            console.log(response);
            successCallback(response, query)
        },
        error: function (error) {
            console.error("Ошибка при получении данных:", error);
        }
    });
}

function addSearchHandler() {
    $("#search").on("input", function () {
        const query = $(this).val().trim();
        if (query.length > 0) {
            searchTasks(query, renderSearchResults)
        } else {
            $("#inputResults").empty().hide();
        }
    })
};

function renderSearchResults(results, query) {
    $("#inputResults").empty();

    const filteredResults = results.filter(task => task.name.toLowerCase().startsWith(query))

    if (filteredResults.length > 0) {
        filteredResults.forEach(task => {
            const $result = $("<div>").text(task.name).addClass("dropdownMenu").data("task", task).on("click", function () {
                const selectedTask = $(this).data("task");
                openPopup(selectedTask.name, selectedTask.fullDesc, formatDate(selectedTask.date, false), selectedTask.status ? "true" : "false");
            });

            $("#inputResults").append($result);
        });
        $("#inputResults").show();
    } else {
        $("#inputResults").hide();
    }
}

$(document).ready(function () {
    addSearchHandler();
})