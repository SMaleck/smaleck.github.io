(function(global){

    // --------------------- DETAILS
    var details = [
        { label: 'Race', value: 'IT-People' },
        { label: 'Class', value: 'Developer' },
        { label: 'Affinity', value: 'Full-Stack' }
    ];

    // --------------------- STATS
    var statsInitial = [
        { label: 'Coding', value: 9 },        
        { label: 'Willpower', value: 10 },
        { label: 'Agility', value: 8 },
        { label: 'Charisma', value: 7 },
    ];

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
                { label: 'C#', value: 9 },
                { label: 'JavaScript', value: 8 },
                { label: 'Java', value: 6 }
            ]                
        },
        {
            title: 'Platforms & Frameworks',
            items:[
                { label: 'ASP.Net / ASP.Net Core', value: 9 },
                { label: 'NodeJS', value: 7 },
                { label: 'Unity', value: 7 }
            ]                
        }
    ];

    /* Delayed Updating for progress bars and such*/
    
    var delayMs = 150;
    var delayOffset = 250;

    // Updater for skill bars
    var SEM_Updating = [];
    function delayedUpdate(item){               
        if(!SEM_Updating[item.label]){
            // Set SEMAPHORE, otherwise we will enter an infinite loop with Vue's binding
            SEM_Updating[item.label] = true;

            var originalVal = item.value;
            item.value = 0;             

            setTimeout(() => { item.value = originalVal;}, getNextDelay());
        }        
    }

    // Counter for attributes
    var SEM_Counting = [];
    function delayedCount(item){               
        if(!SEM_Counting[item.label]){
            // Set SEMAPHORE, otherwise we will enter an infinite loop with Vue's binding
            SEM_Counting[item.label] = true;

            var originalVal = item.value;
            item.value = 0;             

            var interval = setInterval(() => { 
                if(item.value >= originalVal){
                    clearInterval(interval);
                    return;
                }
                item.value++;
            }, 100);
        }        
    }
    
    function getNextDelay () { 
        delayMs = delayMs + delayOffset;

        return delayMs;
    }

    // EXPOSE to global scope
    global.delayedUpdate =  delayedUpdate;   
    global.delayedCount =  delayedCount;   

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
            },            
        });        
    } );

})(window);