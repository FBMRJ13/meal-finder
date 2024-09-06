const search=document.getElementById('search');
const submit=document.getElementById('submit'),
random=document.getElementById('random'),
mealsEl=document.getElementById('meals'),
resultHeading=document.getElementById('result-heading'),
single_mealEl=document.getElementById('single-meal');

function searchMeal(e){
e.preventDefault();
single_mealEl.innerHTML="";
const term=search.value;
console.log(term);
if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}
`)
.then((res)=>res.json())
.then((data)=> {
    console.log(data);
    resultHeading.innerHTML=`<h2>Search Result for '${term}':</h2>`;
    if(data.meals===null){
        resultHeading.innerHTML=`<p>there is no search result. Try again</p>`;

    }
    else{
        mealsEl.innerHTML=data.meals
        .map(meal=>`
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3></div>
            </div>
            `)
            .join("")
    }
    
});
search.value="";

}
else
alert("please enter a search term");





}
function getElementById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res)=>res.json())
    .then((data)=>{
        const meal=data.meals[0];
        addMealToDOM(meal)
    });
}
function addMealToDOM(meal){
    const ingredients=[];
    for(let i=1;i<=20;i++){
        if(meal[`strIngredients{i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`
            );
        }
        else break;
    }
    single_mealEl.innerHTML=`
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>`:""}
    ${meal.strArea ?`<p>${meal.strArea}</p>`:""}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map((ing)=>`<li>${ing}</li>`).join("")}
    </ul>
    </div>
    `
}
submit.addEventListener("submit",searchMeal);
mealsEl.addEventListener("click",e=>{
const mealInfo=e.composedPath.find(item=>{
    if(item.classlist){
        return item.classlist.contains('meal-info')
    }
    else
    return false;
});
if(mealInfo){

    const mealId=mealInfo.getAttribute('data-mealid')
    getMealById(mealId);
}


});
