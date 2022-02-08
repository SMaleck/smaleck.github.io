(function (global) {

    const crafting = JSON.parse(craftingProjectsJson);

    function start() {
        // ToDo Get page from url
        // ToDo Take sub-array

        initVue();
    }

    function initVue() {
        new Vue({
            el: '#app',
            data: {
                crafting
            },
        });
    }

    // ------------------------ INIT LISTENER
    global.document.addEventListener('DOMContentLoaded', () => { start(); });
})(window);