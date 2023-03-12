(function (global) {

    const today = new Date();
    const refTimestampTotalXP = new Date(2014, 03, 01);
    const refTimestampUnityXP = new Date(2018, 07, 01);

    // --------------------- DETAILS
    var details = {
        totalXPYears: getXPYears(today, refTimestampTotalXP),
        unityXPYears: getXPYears(today, refTimestampUnityXP),
    }

    function getXPYears(today, refDate) {
        var diff = Math.floor(today.getTime() - refDate.getTime());
        var day = 1000 * 60 * 60 * 24;

        var days = Math.floor(diff / day);
        var months = Math.floor(days / 31);
        return Math.floor(months / 12);
    }

    /* ------------------------ CHARACTER MODEL ------------------------ */
    var characterModel = {
        name: "Sebastian Maleck",
        details,
    }

    /* ------------------------ VUE INIT ------------------------ */
    var app;
    global.document.addEventListener('DOMContentLoaded', () => {
        app = new Vue({
            el: '#app',
            data: {
                characterModel
            },
        });
    });

})(window);