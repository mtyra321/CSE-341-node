//  import md5 from 'js-md5';
//  import md5;

const url = "https://gateway.marvel.com:443/v1/public/";

const key = "f4115560196924074bec30f1c2fb50c8";
const pkey = '534e8d4706e61fe271dead8840c7ee181fd87fe5';

function onload() {
    document.getElementById("button").addEventListener("click", search)
    document.getElementById("searchBar").addEventListener("keydown", function(e) {
        if (e.key === "Enter") { //checks whether the pressed key is "Enter"
            e.preventDefault();
            search(e);
        }

    });
    var web = '';
}

function search(event) {
    console.log("search");
    console.log("event is = " + event);
    var timestamp = event.timeStamp;
    var name = document.getElementById("searchBar").value;
    var hash = md5(timestamp + pkey + key);

    //            var hash = md5(timestamp + pkey + key);
    var type = document.getElementById("type").value;
    var urlType = "";
    console.log("type is " + type);
    if (type == "character") {
        urlType = 'characters?nameStartsWith=';
    } else if (type == "comic") {
        urlType = 'comics?titleStartsWith=';

    } else if (type == "series") {
        urlType = 'series?titleStartsWith=';

    } else if (type == "event") {
        urlType = "events?nameStartsWith=";
    }
    web = url + urlType + name + '&ts=' + timestamp + '&apikey=' + key + '&hash=' + hash;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var results = response.data.results;
            console.log(results);
            removeAllChildNodes(document.getElementById("results"));
            for (let index = 0; index < results.length; index++) {
                const element = results[index];
                document.getElementById("results").appendChild(display_single_result(type, element));
            }
        }
    };
    xmlhttp.open("GET", web, true);
    xmlhttp.send();
    event.preventDefault();
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function display_single_result(type, result) {
    if (type == "character") {
        return display_single_character(result);
    } else if (type == "comic") {
        return display_single_comic(result);

    } else if (type == "series") {
        return display_single_comic_series(result);

    } else if (type == "event") {
        return display_single_event(result);
    }
}


function display_single_character(result) {
    console.log("displaying single result");
    console.log(result);
    let div = document.createElement('div');
    div.classList.add("result");
    let name = document.createElement('p');
    name.innerText = result.name;
    div.appendChild(name);
    return div;
}

function display_single_comic(result) {
    console.log("displaying single result");
    console.log(result);
    let div = document.createElement('div');
    div.classList.add("result");
    let name = document.createElement('p');
    name.innerText = result.title;
    div.appendChild(name);
    return div;
}

function display_single_comic_series(result) {
    console.log("displaying single result");
    console.log(result);
    let div = document.createElement('div');
    div.classList.add("result");
    let name = document.createElement('p');
    name.innerText = result.title;
    div.appendChild(name);
    return div;
}

function display_single_event(result) {
    console.log("displaying single result");
    console.log(result);
    let div = document.createElement('div');
    div.classList.add("result");
    let name = document.createElement('p');
    name.innerText = result.title;
    div.appendChild(name);
    return div;
}