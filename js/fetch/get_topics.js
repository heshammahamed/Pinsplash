import config from "../config.js"
import { topics , DISCOVER } from "../data.js";

const topics_container = document.getElementById("topics-container");

export async function generate_topic(selected_topic) {
    const data = await get_topics()

    /* this is the default topic { discover }*/

    topics_container.innerHTML = `
        <section data-topicid=${selected_topic} class=${selected_topic == DISCOVER ? "selected_topic" : ""} tabindex=0>
            <img src="../../img/Ellipse 1.png">
            <p>Discover</p>
        </section>
        `
    data.forEach(element => {
        topics_container.innerHTML+=`
            <section data-topicid=${element.id} class=${selected_topic == element.id ? "selected_topic" : ""} tabindex=0>
                <img src=${element.cover_photo.urls.thumb}>
                <p>${element.title}</p>
            </section>
        `
    });
}

async function get_topics () {
    const res = await fetch("https://api.unsplash.com/topics/?per_page=20" , {
        method : "GET",
        headers : {
            "Authorization" : `Client-ID ${config.ACCESS_KEY}`
        }
    })
    const data = await res.json()

    /* 
        what the duck i was pus this data to the array
        and why there is an array named topics
     */
    
    topics.push(...data)
    return data
}