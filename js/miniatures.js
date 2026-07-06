
(function (global) {

    // craftingData: [{ 
    //     category: "miniatures", 
    //     items: [{…}]
    // }]
    //
    const craftingData = JSON.parse(craftingProjectsJson);
    const itemsPerBatch = 5;

    function initVue() {
        const currentCategory = getCategory();
        const currentCollection = getCurrentCollection(currentCategory);
        const sortedCollection = sortByDate(currentCollection);

        const totalItems = sortedCollection
            .reduce((sum, category) => sum + category.items.length, 0);

        new Vue({
            el: '#app',
            data: {
                craftingData: craftingData,
                currentCategory: currentCategory,
                collection: sortedCollection,
                visibleCount: itemsPerBatch,
                totalItems: totalItems
            },
            computed: {
                hasMore() {
                    return this.visibleCount < this.totalItems;
                }
            },
            methods: {
                // Returns the currently revealed slice of a category's items.
                // Referencing visibleCount here makes the render reactive to it.
                visibleItems(items) {
                    return items.slice(0, this.visibleCount);
                },
                loadMore() {
                    if (this.hasMore) {
                        this.visibleCount += itemsPerBatch;
                    }
                },
                // Fires when a lazy image finishes loading (or errors). Marks the
                // container as loaded so the placeholder shimmer stops and the
                // image fades in.
                onImgLoad(event) {
                    event.target.classList.add('is-loaded');
                    const container = event.target.closest('.miniature-image');
                    if (container) {
                        container.classList.add('is-loaded');
                    }
                }
            },
            mounted() {
                const sentinel = this.$refs.sentinel;
                if (!sentinel || !('IntersectionObserver' in window)) {
                    // Fallback: reveal everything if observers aren't supported.
                    this.visibleCount = this.totalItems;
                    return;
                }

                const observer = new IntersectionObserver((entries) => {
                    if (entries.some(entry => entry.isIntersecting)) {
                        this.loadMore();
                    }
                }, { rootMargin: '400px' });

                observer.observe(sentinel);
            }
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