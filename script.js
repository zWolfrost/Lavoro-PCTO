for (const book of document.getElementsByClassName("book"))
{
   const pages = Array.from(book.getElementsByClassName("page"));

   for (let i=0; i<pages.length; i++)
   {
      const footer = document.createElement("footer");
      footer.innerHTML = `${(i+1).toString().padStart(2, "0")} / ${pages.length}`;

      pages[i].appendChild(footer);
   }
}