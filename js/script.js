'use strict';

/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active'); 

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active'); 
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    console.log(optTitleListSelector);

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles', articles);
    console.log(articles);

    for (const article of articles){

        /* [DONE] get the article id */

        const articleId = article.getAttribute('id');
        console.log(articleId);

        /* [DONE] find the title element */
        /* [DONE] get the title from the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

        /* create HTML of the link */

        /* insert link into titleList */
    }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}