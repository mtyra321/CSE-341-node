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
var typeDict = {
    "Character": "name",
    "Comic": "title",
    "Event": "title",
    "Series": "title"

};
var urlDict = {
    "Character": "characters?nameStartsWith=",
    "Comic": "comics?titleStartsWith=",
    "Event": "series?titleStartsWith=",
    "Series": "events?nameStartsWith="

};
var nameDict = {
    "Character": "characters",
    "Comic": "comics",
    "Event": "events",
    "Series": "series"

};

function search(event) {
    var timestamp = event.timeStamp;
    var name = document.getElementById("searchBar").value;
    var hash = md5(timestamp + pkey + key);

    //            var hash = md5(timestamp + pkey + key);
    var type = document.getElementById("type").value;
    web = url + urlDict[type] + name + '&ts=' + timestamp + '&limit=100&apikey=' + key + '&hash=' + hash;

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
    let name = document.createElement('p');
    name.classList.add("name")
    name.innerText = result[typeDict[type]];
    let div = document.createElement('div');
    div.classList.add("result");
    div.appendChild(name);
    div.onclick = function() {
        let details = create_details(type, result);
        details.style.display = "block"
        let found = false;

        div.childNodes.forEach(element => {
            if (element.innerHTML == details.innerHTML) {
                div.removeChild(element)
                found = true;
            }
        });
        if (found == false) {
            div.appendChild(details);

        }

    };
    return div;
}




function create_details(type, result) {
    console.log(result)
    let outer_div = document.createElement('div');
    let details = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = 'X';
    span.classList.add("close");
    outer_div.classList.add("details");
    details.classList.add("details-content")
    span.onclick = function() {
        outer_div.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == outer_div) {
            outer_div.style.display = "none";
        }
    }


    details.appendChild(span);
    details.appendChild(display_all_details(type, result));
    outer_div.appendChild(details);
    return outer_div;
}

function display_all_details(type, result) {
    var details = document.createElement("div");
    details.classList.add("character_details")
    var details_content = document.createElement('p')
    details_content.innerHTML += type + " Details: ";
    details_content.innerHTML += result[typeDict[type]] + '<br><br>';
    details_content.innerHTML += result.description + '<br><br>';
    details.appendChild(details_content)
    var image = document.createElement("img");
    image.classList.add("thumbnail")
    image.src = result.thumbnail.path + "." + result.thumbnail.extension
    details.appendChild(image)
    for (var element in typeDict) {
        var div_type = document.createElement('div');
        var types = document.createElement('p');
        types.classList.add(element)
        if (type != element) {
            types.innerHTML += nameDict[element] + ": <br>";
            var put_it = true;
            if (type == "Series") {
                if (element == "Event") {
                    put_it = false
                }
            }
            if (type == "Event" || type == "Comic") {
                if (element == "Series") {
                    put_it = false
                }
            }
            if (put_it == true) {
                for (var index = 0; index < result[nameDict[element]].items.length; index++) {
                    var single_comic = result[nameDict[element]].items[index];
                    types.innerHTML += single_comic.name + '<br>';
                }
            } else {
                break
            }
            types.innerHTML += '<br>';
            div_type.appendChild(types);
            details.appendChild(div_type);
        }


    }
    for (x in result.urls) {
        var link = document.createElement('a')
        link.href = result.urls[x].url
        link.innerText = result.urls[x].type
        console.log("x is " + x)
        details.appendChild(link)
        details.innerHTML += '<br><br>'
    }
    details.innerHTML += '<br><br><br><br><br>';
    return details;
}