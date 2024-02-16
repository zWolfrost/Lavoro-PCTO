for (const book of document.getElementsByClassName("book"))
{
   const pages = Array.from(book.getElementsByClassName("page"));

   for (let i=1; i<pages.length-1; i++)
   {
      const footer = document.createElement("footer");
      footer.innerHTML = i.toString().padStart(2, "0");

      pages[i].appendChild(footer);
   }
}