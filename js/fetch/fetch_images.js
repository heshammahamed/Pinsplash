import config from "../config.js"
import { BASE_URL , fetchFilter, topics} from "../data.js"
import { setLayout } from "../mansory/mansory.js";
import { observer , main_object_mansory } from "../index.js";
import { loadMore } from "../elements.js";

const imageContainer = document.getElementById('images-container')
const topic_container = document.getElementById('topic_image')

function handleSelection (e) {
    const section = e.target.closest("section")

    if (!section) return;
    window.location.href = `./pages/photo_details/photo_details.html?photoId=${section.dataset.itemid}`;
}

imageContainer.addEventListener("click" ,handleSelection)

export async function generate_photos() {
  const data = await fetch_imgs(fetchFilter.tobicId);

  if (fetchFilter.first_time) {
    imageContainer.innerHTML=""
  } 

  if (fetchFilter.tobicId) {
    let topic = topics.find(e => e.id== fetchFilter.tobicId)
    topic_container.innerHTML=`
        <div class="hold_img" id="hold_img">
            <div class="text">
              <h1>${topic.title}</h1>
              <p>${topic.description}</p>
            </div>
      </div>
    `
    document.getElementById("hold_img").style.backgroundImage=`url(${topic.cover_photo.urls.full})`
    topic_container.classList.remove('none')
  }

  const itemsNumberBeforeFetch = imageContainer.children.length

  data.forEach(element => {
      imageContainer.innerHTML+=`
          <section id="grid_item" data-itemId=${element.id} class="grid-item hide" >
              <img src=${element.urls.small}>
              <section data-itemId=${element.id}>
                  <img src=${element.user.profile_image.small}>
                  <p>${element.alt_description}</p>
              </section>
          </section>
      `
  });

  /*
    the problem i have right now is that the observer run before even the set layout finish its work
    so i think of two options: 

    first is to make the image load inside promise and wait it but now
     i will make the front end to freeze untill it load and position items.

    second to read doc of IntersectionObserver to make perfect desition

    third to hide load and display it afetr layout 

  */
  loadMore.style.display = "none"

  await imagesLoaded(imageContainer , () => {
    setLayout(main_object_mansory , itemsNumberBeforeFetch)
    loadMore.style.display = "flex"
  })

  fetchFilter.first_time = false

  observer.observe(loadMore)
}

async function fetch_imgs (topicid) {
    let url = BASE_URL;

    if (topicid) {
        url+=`/photos/random/?count=20&topics=${topicid}`
    }else {
        url += "/photos/random/?count=20"
    }

    try {
        const res = await fetch(url , {
            method : "GET",
            headers : {
                "Authorization" : `Client-ID ${config.ACCESS_KEY}`
            }
        })
        const data = await res.json()

        console.log(data)

        return data
    }catch (err) {
        console.log(err)
    }
}