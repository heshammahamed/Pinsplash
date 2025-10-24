// /photos/:id
import { BASE_URL} from "../../js/data.js"
import { setLayout } from "../../js/mansory/mansory.js";
import config from "../../js/config.js"
import { Mansory } from "../../js/mansory/mansory.js";


const container_related_img = document.getElementById("related-imges")

let section_mansory_object = new Mansory(container_related_img);

const details = document.getElementById("img_details")

await get_photo_details()


/*
    this function could be in folder called utilit

    it switch from isoString "2025-01-01T13:09:01Z" to British style "1 January, 2025"
*/

function format (isoString) {
    const date = new Date(isoString)

    return date.toLocaleDateString("en-GB" , {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).replace(/(\d{4})$/, ", $1");
} 


function create_layout (data) {
    details.innerHTML = `
       <section class="first_section">
        <section class="info">
          <section id="owner_detail" class="owner-details">
            <img src=${data.user.profile_image.large}>
            <p>${data.user.username}</p>
          </section>

          <div>
            <p>Download</p>
            <img src="../../img/arrow_down.png">
            <div class="download">
              <a href= ${data.urls.full + "w=640"}>Small <span>(640 x 426)</span></a>
              <a href=${data.urls.full + "w=640"}">Medium <span>(1920 x 1080)</span></a>
              <a href=${data.urls.full + "w=640"}>Large <span>(2400 x 1600)</span></a>
            </div>
          </div>
        </section>
        <!-- second block -->
        <img class="main_img" src=${data.urls.full}>
       </section>


      <!-- details -->
      <section class="second_section">
        <h1>${data.alt_description}</h1>
        <section id="details" class="details">
          <div>
            <p class="title">Views</p>
            <p>${Number(data.views).toLocaleString("en-US")}</p>
          </div>
          <div>
            <p class="title">Date</p>
            <p>${format(data.created_at)}</p>
          </div>
          <div>
            <p class="title">Downloads</p>
            <p>${Number(data.downloads).toLocaleString("en-US")}</p>
          </div>
        </section>

        <section class="tags">
        ${data?.tags.map(e => `<p>${e.title}</p>`).join("")}
        </section>
      </section>
    `
    return
}

export async function  get_photo_details () {
    const urlParams = new URLSearchParams(window.location.search);
    const photoId = urlParams.get("photoId");

    const url = BASE_URL + `/photos/${photoId}` 

    const res = await fetch(url , {
        method : "GET",
        headers : {
            "Authorization" : `Client-ID ${config.ACCESS_KEY}`,
            "Accept-Version": `v1`
        }
    })

    const data = await res.json()
    console.log(data)
    create_layout(data);
    const related_imges = await get_realted(data.topics[0].id)
    await generate_photos(related_imges)
}

async function get_realted (topicid) {

    const url = BASE_URL + `/photos/random/?count=10&?topics=${topicid}` 

    const res = await fetch(url , {
        method : "GET",
        headers : {
            "Authorization" : `Client-ID ${config.ACCESS_KEY}`,
            "Accept-Version": `v1`
        }
    })

    const data = await res.json()

    return data
}


//  this function is repeated many times try to generlize it

async function generate_photos(data) {
  container_related_img.innerHTML=""

  data.forEach(element => {
      container_related_img.innerHTML+=`
          <section id="grid_item" data-itemId=${element.id} class="grid-item hide" >
              <img src=${element.urls.small}>
              <section data-itemId=${element.id}>
                  <img src=${element.user.profile_image.small}>
                  <p>${element.alt_description}</p>
              </section>
          </section>
      `
  });

    console.log(container_related_img.innerHTML)
  await imagesLoaded(container_related_img , () => {
    setLayout(section_mansory_object , 0)
  })

}

// repeated 
const imageContainer = document.getElementById('related-imges')

function handleSelection (e) {
    const section = e.target.closest("section")

    if (!section) return;
    window.location.href = `./photo_details.html?photoId=${section.dataset.itemid}`;
}

imageContainer.addEventListener("click" ,handleSelection)


// repeated part
let resizeTimeOut;

// adjust it for better performance 
window.addEventListener("resize",() => {
    clearTimeout(resizeTimeOut);
    resizeTimeOut = setTimeout(() => {
        setLayout(section_mansory_object , 0)
    } , 500)
})