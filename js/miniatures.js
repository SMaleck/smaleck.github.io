
(function (global) {

    // craftingData: [{ 
    //     category: "miniatures", 
    //     items: [{…}]
    // }]
    //
    const craftingData = JSON.parse(craftingProjectsJson);

    function initVue() {
        const currentCategory = getCategory();
        const currentCollection = getCurrentCollection(currentCategory);
        const sortedCollection = sortByDate(currentCollection);

        new Vue({
            el: '#app',
            data: {
                craftingData: craftingData,
                currentCategory: currentCategory,
                collection: sortedCollection
            },
        });
    }

    function getCategory() {
        const params = new URLSearchParams(window.location.search);
        return params.get("category");
    }

    function getCurrentCollection(category) {
        if (category) {
            for (const collection of craftingData) {
                if (collection.category === category) {
                    return [collection];
                }
            }
        }

        return GetCompleteCollection();
    }

    function GetCompleteCollection() {
        const allItems = [];
        for (const categoryCollection of craftingData) {
            for (const item of categoryCollection.items) {
                allItems.push(item);
            }
        }

        return [{
            category: "All",
            items: allItems
        }];
    }

    function sortByDate(collection) {
        collection[0].items = collection[0].items
            .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);

        return collection;
    }

    // ------------------------ INIT LISTENER
    global.document.addEventListener('DOMContentLoaded', () => { initVue(); });
})(window);