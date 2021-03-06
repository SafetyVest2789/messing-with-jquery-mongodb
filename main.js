$(document).ready(function () {
    $('#name').autocomplete({
        source: async function(request,response) {
            let data= await fetch(`http://localhost:8000/search?query=${request.term}`)
                    .then(results => results.json())
                    .then(results => results.map(result => {
                        return {
                            label: result.name,
                            value: result.name,
                            id: result._id
                        }
                    }))
                response(data)
                //console.log(response)
        },
        minLength: 2,
        select: function(event, ui) {
            console.log(ui.item.id)
            fetch(`http://localhost:8000/get/${ui.item.id}`)
                .then(result => result.json())
                .then(result => {
                    $('#food').empty()
                    result.food.forEach(food =>
                        {
                            $("#food").append(`<li>${food}</li>`)
                        })
                        $('img').attr('src',result.image)
                })
        }
    })
})