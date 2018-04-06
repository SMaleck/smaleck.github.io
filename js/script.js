(function(global){

    var data = {
        skillGroups:[
            {
                title: 'Programming Languages',
                items:[
                    { 
                        name: 'C#',
                        level: 9
                    },
                    { 
                        name: 'JavaScript',
                        level: 8
                    },
                    { 
                        name: 'Java',
                        level: 6
                    }
                ]                
            },
            {
                title: 'Platforms & Frameworks',
                items:[
                    { 
                        name: 'ASP.Net / ASP.Net Core',
                        level: 9
                    },
                    { 
                        name: 'NodeJS',
                        level: 7
                    },
                    { 
                        name: 'Unity',
                        level: 7
                    }
                ]                
            }
        ]
    };

    /* ------------------------ VUE INIT ------------------------ */
    var app;
    global.document.addEventListener('DOMContentLoaded', () => {
        app = new Vue({
            el: '#app',
            data: data
        });
    } );

})(window);