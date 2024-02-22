const LeftOpenPageSelector = ".page:nth-last-child(1 of .flipped)";
const RightOpenPageSelector = ".page:nth-child(1 of :not(.flipped))";

const bookmarkFlipSpeed = 75;


for (const book of document.getElementsByClassName("book"))
{
   const pages = Array.from(book.getElementsByClassName("page"));
   const bookmarks = Array.from(book.getElementsByClassName("bookmark"));

   for (let i=0; i<pages.length; i++)
   {
      pages[i].style.zIndex = pages.length - i;
   }

   for (let i=0; i<bookmarks.length; i++)
   {
      bookmarks[i].style.top = ((i / bookmarks.length * 80) + 18) + "%";
      bookmarks[i].style.visibility = "visible";
   }

   for (const page of pages)
   {
      page.addEventListener("click", () => flipPage(page))
   }

   for (const bookmark of bookmarks)
   {
      bookmark.addEventListener("click", async function(e)
      {
         e.stopPropagation();

         let bookmarkIndex = pages.indexOf(this.parentElement);
         let currentPageIndex = pages.indexOf(book.querySelector(this.parentElement.classList.contains("flipped") ? LeftOpenPageSelector : RightOpenPageSelector))

         let betweenPages = pages.slice(Math.min(bookmarkIndex, currentPageIndex), Math.max(bookmarkIndex, currentPageIndex) +1)

         if (currentPageIndex > bookmarkIndex)
         {
            for (let i=betweenPages.length-1; i>0; i-=2)
            {
               flipPage(betweenPages[i])
               await sleep(bookmarkFlipSpeed);
            }
         }
         else
         {
            for (let i=0; i<betweenPages.length-1; i+=2)
            {
               flipPage(betweenPages[i])
               await sleep(bookmarkFlipSpeed);
            }
         }
      })
   }
}


function flipPage(mainPage, safe=true)
{
   if (safe && (mainPage?.matches(LeftOpenPageSelector) || mainPage?.matches(RightOpenPageSelector)))
   {
      return new Promise(async resolve =>
      {
         const pages = mainPage.parentElement.getElementsByClassName("page");
         const mainPageIndex = Array.from(pages).indexOf(mainPage);

         let otherPage = mainPageIndex % 2 == 0 ? mainPage.nextElementSibling : mainPage.previousElementSibling;
         let bothPages = [mainPage, otherPage];

         /* console.log(`Flipping page ${mainPageIndex+1}`); */

         for (let page of bothPages)
         {
            page.classList.toggle("flipped");
            page.classList.add("flipping");
            page.style.zIndex = -page.style.zIndex;
         }

         mainPage.addEventListener("transitionend", e =>
         {
            for (let page of bothPages)
            {
               page.classList.remove("flipping");
            }

            resolve(e);
         }, {once: true});
      });
   }
}

function sleep(ms)
{
   return new Promise(resolve => setTimeout(resolve, ms));
}