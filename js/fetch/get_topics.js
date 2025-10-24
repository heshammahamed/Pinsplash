import config from "../config.js"
import { topics } from "../data.js";
const topics_container = document.getElementById("topics-container");


export async function generate_topic() {
    const data = await get_topics()

    data.forEach(element => {
        topics_container.innerHTML+=`
            <section data-topicid=${element.id} tabindex=0>
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
    topics.push(...data)
    console.log(topics)
    return data
}