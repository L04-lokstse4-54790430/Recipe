var el_up = document.getElementById("GFG_UP");
var totalData = 0;
var totalPage = 1;
var offset = 5
var cuisine = '';
var activeFilter = 'all';

$('.pp-filter-button').on('click', function(e) {
  // remove btn-primary from all buttons first
  $('.pp-filter-button').removeClass('btn-primary');
  $('.pp-filter-button').addClass('btn-outline-primary');

  // add btn-primary to active button
  var button = $(this);
  button.removeClass('btn-outline-primary');
  button.addClass('btn-primary');
  filterItems(button.data("filter"));
  e.preventDefault();
})

function constructTable(selector, cuisines) {
            var keywords = document.getElementById('keywords').value.trim();
            if(cuisines == ''){
              cuisine = cuisine;
            }else if (cuisines == 'All'){
              cuisine = '';
            }else{
              cuisine = cuisines;
            }
            var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='+ config.apiKey +'&number=5&offset=' + offset*selector + '&query=' + keywords +'&cuisine=' + cuisine;
            console.log(apiUrl);
            fetch(apiUrl).then(response => {
              return response.json();
            }).then(data => {
              // Work with JSON data here
              console.log(data);
              totalPage = data.totalResults/5;
              document.getElementById('card-columns').innerHTML = ''
              document.getElementById('pp-pagination').innerHTML = ''

              if(selector>5){

                for (var i = selector - 5; i < totalPage && i < selector + 5; i++) {
                  if(i == selector){
                    document.getElementById('pp-pagination').innerHTML += '<li><a><div style="color:red">'+ i + '</div></a></li>'
                  }else{
                    document.getElementById('pp-pagination').innerHTML += '<li><a onclick="return constructTable('+ i + ',\'' + cuisines +'\')" >'+ i + '</a></li>'
                  }
                }
              } else {
                for (var i = 1; i < totalPage && i < 10; i++) {
                  if(i == selector){
                    document.getElementById('pp-pagination').innerHTML += '<li><a><div style="color:red">'+ i + '</div></a></li>'
                  }else{
                    document.getElementById('pp-pagination').innerHTML += '<li><a onclick="return constructTable('+ i + ',\'' + cuisines +'\')" >'+ i + '</a></li>'
                  }
                }
              }
              for (var i = 0; i < data.results.length; i++) {
                 document.getElementById('card-columns').innerHTML += '<div class="card" data-groups="[&quot;nature&quot;]"><a href="image-detail.html?id='+ data.results[i].id +'"><figure class="pp-effect"><img class="img-fluid" src="'+ data.results[i].image +'" alt="'+ data.results[i].title +'"/><figcaption><div class="h4">'+ data.results[i].title +'</div></figcaption></figure></a></div>';

            }
             if (data.results.length == 0){
                document.getElementById('card-columns').innerHTML += '<div>There is no recipe.</div>';
             } 
            

            }).catch(err => {
                $(selector).append($('There is something wrong.'));
            });
}

function getRecipe(id) {
            var apiUrl = "https://api.spoonacular.com/recipes/"+ id +"/information?apiKey="+config.apiKey;
            console.log(apiUrl);
            fetch(apiUrl).then(response => {
              return response.json();
            }).then(data => {
              // Work with JSON data here
              console.log(data);
              document.getElementById('title').innerHTML = data.title;
              document.getElementById("foodImage").src=data.image;
              if(data.vegan){
                document.getElementById('vegan').innerHTML += 'Yes';
              }else{
                document.getElementById('vegan').innerHTML += 'No';
              }
              if(data.vegetarian){
                document.getElementById('vegetarian').innerHTML += 'Yes';
              }else{
                document.getElementById('vegetarian').innerHTML += 'No';
              }
              if(data.veryHealthy){
                document.getElementById('veryHealthy').innerHTML += 'Yes';
              }else{
                document.getElementById('veryHealthy').innerHTML += 'No';
              }
              if(data.glutenFree){
                document.getElementById('glutenFree').innerHTML += 'Yes';
              }else{
                document.getElementById('glutenFree').innerHTML += 'No';
              }
              if(data.dairyFree){
                document.getElementById('dairyFree').innerHTML += 'Yes';
              }else{
                document.getElementById('dairyFree').innerHTML += 'No';
              }
              document.getElementById('healthScore').innerHTML += data.healthScore;

 
            for (var i = 0; i < data.extendedIngredients.length; i++) {
                var inName= data.extendedIngredients[i].name;
                var measure = data.extendedIngredients[i].measures.metric.amount + ' ' + data.extendedIngredients[i].measures.metric.unitShort;
                
                 
                // Adding each row to the table
                document.getElementById('ingredients').innerHTML += "<tr><td>"+inName+"</td><td>"+measure+ "</td></tr>";
            }

              document.getElementById('instrcutions').innerHTML = data.instructions;
              
            

            }).catch(err => {
               console.log("There are something wrong.");
            });
        }
