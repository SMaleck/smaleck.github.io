(function(global){

    // --------------------- DETAILS
    var details = [
        { label: 'Race', value: 'IT-People' },
        { label: 'Class', value: 'Developer' },
        { label: 'Affinity', value: 'Full-Stack' }
    ];

    // --------------------- STATS
    var stats = [
        { label: 'Coding', value: 9 },        
        { label: 'Willpower', value: 10 },
        { label: 'Agility', value: 8 },
        { label: 'Charisma', value: 7 },
    ];

    // --------------------- SKILLS
    var skillGroups = [
        {
            title: 'Programming Languages',
            items:[
                { name: 'C#', level: 9 },
                { name: 'JavaScript', level: 8 },
                { name: 'Java', level: 6 }
            ]                
        },
        {
            title: 'Platforms & Frameworks',
            items:[
                { name: 'ASP.Net / ASP.Net Core', level: 9 },
                { name: 'NodeJS', level: 7 },
                { name: 'Unity', level: 7 }
            ]                
        }
    ];



    /* ------------------------ CHARACTER MODEL ------------------------ */
    var characterModel = {
        name: "Sebastian Maleck",        
        details,
        stats,
        skillGroups
    }

    /* ------------------------ VUE INIT ------------------------ */
    var app;
    global.document.addEventListener('DOMContentLoaded', () => {
        app = new Vue({
            el: '#app',
            data: {
                characterModel
            }
        });
    } );

})(window);