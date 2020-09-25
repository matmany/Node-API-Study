const ulAll = document.querySelector("ul")
const ulMylist = document.getElementById("myList");
let myjsonList = [];
let listId = 0; 

async function loadList(){
    const res = await fetch("http://localhost:7000/?type=0")
    .then((data) => data.json());
    res.movies.map(movie => addElement(movie, ulAll,3));
}

async function requestUpdate({Title, type},id){
    
    if(myjsonList.find(element => element.Title == Title) && type == 3)
        return;

    url = `http://localhost:7000?type=${type}&title=${Title}`;
    const response = await fetch(url,{
        method: 'GET'
    });
    upDateList(id, type, Title);
}

async function loadMyList(){
    const res = await fetch("http://localhost:7000/?type=1").then((data) => data.json());
    res.movies.map(movie => addElement(movie, ulMylist,2));
    myjsonList = res.movies;
}

loadList()
loadMyList()

function upDateList(id, type, Title){
    //window.location = window.location
    const aElement = document.getElementById(id);
    
    if(type == 2) {
        console.log(myjsonList);

        myjsonList = myjsonList.filter((item) =>{
            return item.Title != Title
        });

        console.log(myjsonList);
        return aElement.remove()
    }
    movie = {
        Title: aElement.childNodes[1].textContent,
        Plot: aElement.childNodes[2].textContent,
        Images: [aElement.childNodes[0].src],
    }
    addElement(movie,ulMylist,2)
    

}

function addElement({Title, Plot, Images}, ul, type){
    const li = document.createElement('li')
    const img = document.createElement('img') 
    const span = document.createElement('span')
    const p = document.createElement('p')
    const a = document.createElement('a');

    li.classList.add("collection-item", "avatar");
    img.classList.add("circle");
    span.classList.add("title");
    a.classList.add("secondary-content");

    span.innerText = Title;
    p.innerText = Plot;
    img.src = Images[0];
    a.innerText = 'add';
    a.href = `rs`;
    li.id = listId;
    

    a.onclick= function(){requestUpdate({Title, type}, li.id ); return false};
    listId++; 
    li.append(img);
    li.append(span);
    li.append(p);
    li.append(a);
    ul.append(li);
}

