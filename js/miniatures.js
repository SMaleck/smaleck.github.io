
(function (global) {

    const craftingData = JSON.parse(craftingProjectsJson);

    let currentCategory;
    let currentCollection = craftingData;

    function start() {

        const params = new URLSearchParams(window.location.search);
        currentCategory = params.get("category");

        if (currentCategory) {
            for (const collection of craftingData) {
                if (collection.category === currentCategory) {
                    currentCollection = [collection];
                    break;
                }
            }
        }

        initVue();
    }

    function initVue() {
        new Vue({
            el: '#app',
            data: {
                craftingData: craftingData,
                collection: currentCollection
            },
        });
    }

    // ------------------------ INIT LISTENER
    global.document.addEventListener('DOMContentLoaded', () => { start(); });
})(window);