
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
                totalItems: totalItems,
                lightbox: {
                    open: false,
                    images: [],
                    index: 0
                }
            },
            computed: {
                hasMore() {
                    return this.visibleCount < this.totalItems;
                },
                lightboxSrc() {
                    return this.lightbox.images[this.lightbox.index] || '';
                },
                lightboxHasMultiple() {
                    return this.lightbox.images.length > 1;
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
                },
                openLightbox(images, index) {
                    this.lightbox.images = images;
                    this.lightbox.index = index;
                    this.lightbox.open = true;
                    document.body.classList.add('lightbox-open');
                },
                closeLightbox() {
                    this.lightbox.open = false;
                    document.body.classList.remove('lightbox-open');
                },
                lightboxNext() {
                    const count = this.lightbox.images.length;
                    this.lightbox.index = (this.lightbox.index + 1) % count;
                },
                lightboxPrev() {
                    const count = this.lightbox.images.length;
                    this.lightbox.index = (this.lightbox.index - 1 + count) % count;
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

                document.addEventListener('keydown', (event) => {
                    if (!this.lightbox.open) {
                        return;
                    }
                    if (event.key === 'Escape') {
                        this.closeLightbox();
                    } else if (event.key === 'ArrowRight' && this.lightboxHasMultiple) {
                        this.lightboxNext();
                    } else if (event.key === 'ArrowLeft' && this.lightboxHasMultiple) {
                        this.lightboxPrev();
                    }
                });
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