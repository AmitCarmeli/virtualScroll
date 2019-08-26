import listItem from './innerListItemTemplate.js';

export default class listComp {
    constructor(opts) {
        this.data = opts.data;
        this.rowHeight = opts.rowHeight;
        this.mainWrap = opts.mainWrap;
        window.addEventListener("resize", onResize.bind(this));
    }

    init() {
        // Create virtual scroller element
        this.virtualScroller = document.createElement("div");
        this.virtualScroller.id = "virtualScroller";

        // Give the virtual scroller the actual height of all list items
        this.virtualScroller.setAttribute("style", "height:" + (this.rowHeight * this.data.length) + "px");

        // Add the virtual scroller only after main element created so we can identify scroll event on parent element
        this.mainWrap.appendChild(this.virtualScroller);

        this.mainWrap.addEventListener("scroll", onScroll.bind(this));

        // This is the list wrap of relevant elements that will be displayed on the screen.
        this.list = this.mainWrap.children.list;

        this.printListRows(0, 0);
    }

    printListRows(from, scrollTop) {
        // Maximum elements that can be displayed on screen
        let itemsOnScreen = window.innerHeight / this.rowHeight;

        // Clear the list on each calculation
        this.list.innerHTML = "";
        
        // Check if we reached to end of list (last displayed index needs to be no more than data.length)- we can't display more elements than what we have..
        let to = ((from + itemsOnScreen)) > this.data.length ? this.data.length : (from + itemsOnScreen);
      
        for (let i = from; i < to; i++) {
            // Create the inner template of the list item
            let listItemCont = listItem(this.data[i], this.rowHeight);

            // Create the list item element and set its inner template.
            let liWrap = document.createElement("li");
            liWrap.id = i;
            liWrap.setAttribute("style", "height:" + this.rowHeight + "px");
            liWrap.innerHTML = listItemCont
          
            this.list.appendChild(liWrap);
        }

        // Always keep the list position according to scroll value
        this.list.style.marginTop = scrollTop + "px";
      };

}

/**
 * On scroll of the main wrap - calculate the first div needs to be shown at the top of the list.
*/
function onScroll(e) {
    let scrollTop = e.target.scrollTop;
    let from = Math.ceil(parseInt(scrollTop / this.rowHeight));
    this.printListRows(from, scrollTop);
}

/**
 * On window resize - recalculate the virtual scroller & the elements shown on screen to utilize the view.
 */
function onResize() {
    this.mainWrap.scrollTop = 0;
    this.mainWrap.removeChild(document.getElementById("virtualScroller"));
    this.init();
}