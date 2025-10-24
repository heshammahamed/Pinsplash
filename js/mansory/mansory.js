export class Mansory {
    columns = 0
    width = 0
    paddingLeft = 0
    paddingTop = 0
    RowsHeight = Array(3)
    gap = 8;
    coordinate = {
        currentCol : 1,
        currentRow : 1
    }

    constructor (container){
        this.container = container;
    }
}


function extract_number (str) {
    return Number(str.slice(0 , str.indexOf('p')))
}

// class Mansory {
//     #columns = 0
//     #width = 0
//     #paddingLeft = 0
//     #paddingTop = 0
//     #RowsHeight = Array(3)
//     #gap = 8;
//     #coordinate = {
//         currentCol : 1,
//         currentRow : 1
//     }

//     #extract_number (str) {
//     return Number(str.slice(0 , str.indexOf('p')))
//     }

//     #init () {
//         const screenWidth = window.innerWidth;

//         const containerWidth = this.container.getBoundingClientRect().width
//         const containerStyle = window.getComputedStyle(this.container)

//         this.#paddingLeft= extract_number(containerStyle.paddingLeft)
//         this.#paddingTop = extract_number(containerStyle.paddingTop)

//         /*
//             computed_width without gap
//         */
//         const content_space = (containerWidth - (this.#paddingLeft * 2));

//         if (screenWidth <= 768) {
//             let ColMumber = 2

//             this.#columns = ColMumber
//             this.#width = (content_space - this.#gap ) / ColMumber

//             return
//         }

//         if (screenWidth > 375) {
//             let ColMumber = 3

//             this.#columns = ColMumber
//             this.#width = (content_space - (this.#gap * 2)) / ColMumber

//             return
//         }
//     }

//     constructor (container){
//         this.container = container;
//         this.#init()
//     }

// } 


// const container = document.getElementById('images-container');

/*
    know this data is global so we can now use it when a new data added

    i think to make it as a class and then make from it an instances so 
    i can have many layout in my website all with his own data
*/

// const currentLayout = {
//     columns : 0,
//     width : 0,
//     paddingLeft : 0,
//     paddingTop : 0,
//     RowsHeight : Array(3),
//     coordinate : {
//         currentCol : 1,
//         currentRow : 1
//     }
// }

/*
    i think i will make function for them to coumpute the results when i need
*/




// function init () {
//     const screenWidth = window.innerWidth;

//     const containerWidth = container.getBoundingClientRect().width
//     const containerStyle = window.getComputedStyle(container)
//     const paddingLeft = extract_number(containerStyle.paddingLeft)
//     const paddingTop = extract_number(containerStyle.paddingTop)

//     /*
//         computed_width without gap
//     */
//     const content_space = (containerWidth - (paddingLeft * 2));

//     if (screenWidth <= 768) {
//         let ColMumber = 2
//         return [ColMumber , (content_space - gap ) / ColMumber , paddingLeft , paddingTop]
//     }

//     if (screenWidth > 375) {
//         let ColMumber = 3
//         return [ColMumber , (content_space - (gap * 2)) / ColMumber , paddingLeft , paddingTop]
//     }
// }

function init (mansory) {
    const screenWidth = window.innerWidth;

    const containerWidth = mansory.container.getBoundingClientRect().width
    const containerStyle = window.getComputedStyle(mansory.container)

    mansory.paddingLeft = extract_number(containerStyle.paddingLeft)
    mansory.paddingTop = extract_number(containerStyle.paddingTop)

    /*
        computed_width without gap
    */

    const content_space = (containerWidth - (mansory.paddingLeft * 2));

    if (screenWidth <= 768) {
        mansory.columns = 2
        mansory.width = (content_space - mansory.gap ) / mansory.columns
        return
    }

    if (screenWidth > 768) {
        mansory.columns = 3
        mansory.width = (content_space - (mansory.gap * 2)) / mansory.columns
        return 
    }
}

/*
    the function could have a paramter that reflect if 
    this an a initilize layout or we just add a new elements
*/

// export function setLayout (layoutFormItemIndex) {
//     const items = Array.from(container.children).slice(layoutFormItemIndex)


//     let stylePerItem;

//     if (layoutFormItemIndex === 0) {
//         [currentLayout.columns , currentLayout.width , currentLayout.paddingLeft, currentLayout.paddingTop] = init();
//         currentLayout.RowsHeight.fill(currentLayout.paddingTop)
//         currentLayout.coordinate.currentLayout = 1
//         currentLayout.coordinate.currentRow = 1
//     }

//     items.map((ele , index) => {
//         stylePerItem = window.getComputedStyle(ele);

//         ele.style.width = `${currentLayout.width}px`;
//         ele.style.position = `absolute`;

//         ele.style.top = `${currentLayout.RowsHeight[currentLayout.coordinate.currentCol - 1]}px`

//         if (currentLayout.coordinate.currentCol === 1) {
//             ele.style.left = `${currentLayout.paddingLeft}px`
//         }else {
//             ele.style.left = `${currentLayout.paddingLeft + (currentLayout.width * (currentLayout.coordinate.currentCol - 1 ) + (gap * (currentLayout.coordinate.currentCol - 1)))}px`
//         }


//         currentLayout.RowsHeight[currentLayout.coordinate.currentCol - 1]+=extract_number(stylePerItem.height) + gap

//         if ((currentLayout.coordinate.currentCol % currentLayout.columns) === 0) {
//             currentLayout.coordinate.currentCol = 1;
//             currentLayout.coordinate.currentRow++;
//         }else {
//             currentLayout.coordinate.currentCol++
//         }

//         if (index === items.length - 1) {
//             container.style.height = `${Math.max(...currentLayout.RowsHeight) + currentLayout.paddingTop}px`
//         }

//         ele.classList.remove('hide');
//     })
// }

export function setLayout (mansory,layoutFormItemIndex) {
    const items = Array.from(mansory.container.children).slice(layoutFormItemIndex)

    let stylePerItem;

    if (layoutFormItemIndex === 0) {
        init(mansory);
        mansory.RowsHeight.fill(mansory.paddingTop)
        mansory.coordinate.currentRow = 1
        mansory.coordinate.currentCol = 1
    }

    items.map((ele , index) => {
        stylePerItem = window.getComputedStyle(ele);

        ele.style.width = `${mansory.width}px`;
        ele.style.position = `absolute`;

        ele.style.top = `${mansory.RowsHeight[mansory.coordinate.currentCol - 1]}px`

        if (mansory.coordinate.currentCol === 1) {
            ele.style.left = `${mansory.paddingLeft}px`
        }else {
            ele.style.left = `${mansory.paddingLeft + (mansory.width * (mansory.coordinate.currentCol - 1 ) + (mansory.gap * (mansory.coordinate.currentCol - 1)))}px`
        }


        mansory.RowsHeight[mansory.coordinate.currentCol - 1]+=extract_number(stylePerItem.height) + mansory.gap

        if ((mansory.coordinate.currentCol % mansory.columns) === 0) {
            mansory.coordinate.currentCol = 1;
            mansory.coordinate.currentRow++;
        }else {
            mansory.coordinate.currentCol++
        }

        if (index === items.length - 1) {
            mansory.container.style.height = `${Math.max(...mansory.RowsHeight) + mansory.paddingTop}px`
        }

        ele.classList.remove('hide');
    })
}


