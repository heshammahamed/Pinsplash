// Write custom JavaScript here.
// You may ignore this file and delete if if JavaScript is not required for your challenge.
import { generate_topic } from "./fetch/get_topics.js";
import { generate_photos } from "./fetch/fetch_images.js";
import { setLayout , Mansory } from "./mansory/mansory.js";
import { loadMore } from "./elements.js";
import { fetchFilter , DISCOVER } from "./data.js"


initilize()

function initilize () {
    const params = new URLSearchParams(window.location.search)
    const selected_topic_id = params.get("topicid") || DISCOVER
    console.log(selected_topic_id)
    generate_topic(selected_topic_id);
    generate_photos();
}


// for main page 
export let main_object_mansory = new Mansory(document.getElementById('images-container'))

const search_input = document.getElementById("search-input");
const search_logo = document.getElementById("search-logo");
const close_logo = document.getElementById("close-logo");
const navcontainer = document.getElementById("topics-container") 


function fetch_topic_pic(id) {
    const params = new URLSearchParams(window.location.search)

    if (id === DISCOVER) {
        params.delete("topicid")
        const newUrl = `${window.location.pathname}`;
        window.history.replaceState({}, '', newUrl);
    }else {
        params.set("topicid" , id)
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl)
    }

    fetchFilter.tobicId = id;
    fetchFilter.first_time = true;
    generate_photos();
}

/*
    it can be selection of already selected item so i will not do any thin
*/
function handleSelection (e) {
    const section = e.target.closest("section")

    if (!section) return;

    if (section.classList.contains("selected_topic")) return

    navcontainer.querySelector('.selected_topic')?.classList.remove('selected_topic')

    section.classList.add('selected_topic')

    fetch_topic_pic(section.dataset.topicid)
}


function search (search_value) {
    console.log(search_value)
}

close_logo.addEventListener("click" , () => {
    search_input.value = "";
})

search_logo.addEventListener("click" , () => {
    const search_value = search_input.value;
    search_value ? search(search_value) : search_input.focus();
})

navcontainer.addEventListener("keydown" , (e) => {
    if (e.key == 'Enter') {
        handleSelection(e)
    }

})
navcontainer.addEventListener("click" , handleSelection)

let resizeTimeOut;

// adjust it for better performance 
window.addEventListener("resize",() => {
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(() => {
        setLayout(main_object_mansory , 0)
    } , 500)
})

/*
    so i think i will move this part to another folder.

    create function.
    add observer to footer after fetched image 
    remove obsere when you reach to the element 

    repeat
*/


/*
    interface has tow values 0 for first time to fetch image
    1 if it not the first one
*/
export const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(loadMore);
            generate_photos()
        }
    });

} , {
    threshold : 1.0
})


window.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("warningPopup");
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 10000); 
});