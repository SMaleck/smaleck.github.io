(function (global) {

    let crafting = {
        miniatures: [
            {
                id: 0,
                title: "Item 1",
                createdAt: "2020-12-11",
                description: "Desc Text",
                images: ["./image/crafting/miniatures/20190829_W40K_DeathMarines_1.jpg"]
            },
            {
                id: 1,
                title: "Item 2",
                createdAt: "2020-12-11",
                description: "Desc Text",
                images: ["./image/crafting/miniatures/20201210_WizKids_DragonAge_1.jpg"]
            },]
    }

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