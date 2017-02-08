var searchText;
//Butonul de cautare
$( "#searchBtn" ).on( "click", function searchStart() {
  searchText = document.getElementById("inputText").value;
  $(".wikiText").remove(""); //sterge textul existent
  wikiJson (searchText);
});
//Cauta cand se apasa "enter"
$("#inputText").keyup(function(event){
  if(event.keyCode == 13){
    searchText = document.getElementById("inputText").value;
    $(".wikiText").remove(""); //sterge textul existent
    wikiJson (searchText);
  }
});
//Butonul random
$( "#randomBtn" ).on( "click", function() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
});
function wikiJson (name)
{
  $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&datatype=json&limit=8&search='+ name + '&callback=?', function(data) {
    var titleArr = data[1];
    for (var i = 0; i < titleArr.length ; i++)
    {
      //Apeleaza functia displayText la un interval de 400ms
      (function(i){
        setTimeout(function(){
          displayText (data[1][i], data[2][i], data[3][i], i);
        },400 * i)
      })(i);
    };
  });
}

function displayText (title, text, link, i)
{
  var textWiki = document.createElement('div');
   //Aloca cate o clasa diferita pentru fiecare iteratie pentru a putea aplica .hide/.fadeIn
  textWiki.className = 'wikiText wikiEffect' + i;
  textWiki.innerHTML ='<a style=" text-decoration: none;" href ="' + link + '" target="_blank"><h2>' + title + '</h2>' + '<p>' + text + "..." +'</p></a>';
  document.getElementById("bodyT").appendChild(textWiki);
  $('.wikiEffect'+i ).hide();
  $('.wikiEffect'+ i).fadeIn(400);
}
