const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
};

'use strict';

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

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';
const optCloudClassCount = '4';
const optCloudClassPrefix = 'tag-size-';
const optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

const calculateTagsParams = function(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

const calculateTagClass = function(count, params) {
  const normalizedMax = params.max - params.min;
  const normalizedCount = count - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
};

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for(let article of articles){

    /* [DONE] find tags wrapper */

    const articleTagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* [DONE] generate HTML of the link */

      // const linkHTML = '<li><a href="#tag-' + tag + '"><span>'+ tag +'</span></a></li>';
      const linkHTMLData = {tag: tag};
      const linkHTML = templates.articleTag(linkHTMLData);

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */

      if(!allTags[tag]) {

        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* [DONE] END LOOP: for each tag */
    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    articleTagsWrapper.innerHTML = html;

  /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class=' + calculateTagClass(allTags[tag], tagsParams) + ' href="#tag-' + tag + '">' + tag + '</a></li>';

    allTagsHTML += tagLinkHTML;

  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allTagsHTML to tagList */

  tagList.innerHTML = allTagsHTML;

}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for (let activeTag of activeTags) {

    /* [DONE] remove class active */

    activeTag.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {

    /* [DONE] add class active */

    tagLink.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){

  /* [DONE] find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */

  for(let tagLink of tagLinks){

    /* [DONE] add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

  /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  /* [NEW] create a new variable allAuthors with an empty array */

  let allAuthors = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find author wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get author from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */

    const linkHTMLData = {author: articleAuthor};
    const linkHTML = templates.articleAuthor(linkHTMLData);

    /* [DONE] add generated code to html variable */

    html += linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */

    if (!allAuthors[articleAuthor]){

      /* [NEW] add author to allAuthors object */

      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* [DONE] insert HTML of all the links into the authors wrapper */

    authorWrapper.innerHTML = html;

    /* [DONE] END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */

  const authorsList = document.querySelector(optAuthorsListSelector);

  /* [NEW] creat variable for all links HTML code */

  let allAuthorsHTML = ' ';

  /* [NEW] START LOOP: for each author in allAuthors */

  for (let author in allAuthors){

    /* [NEW] generate code of a link and add it to allAuthorsHTML */

    allAuthorsHTML += `<li><a href="#author-${author}" "${allAuthors[author]}"> ${author} (${allAuthors[author]})</a></li>`;

    /* [NEW] END LOOP: for each author in allAuthors */
  }

  /* [NEW] add HTML from allAuthorsHTML to AuthorsList */

  authorsList.innerHTML = allAuthorsHTML;

}

generateAuthors();

function authorClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');

  /* [DONE] find all tag links with class active */

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* [DONE] START LOOP: for each active tag link */

  for (let activeAuthor of activeAuthors) {

    /* [DONE] remove class active */

    activeAuthor.classList.remove('active');

  /* [DONE] END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for (let authorLink of authorLinks) {

    /* [DONE] add class active */

    authorLink.classList.add('active');

  /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){

  /* [DONE]  find all links to tags */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE]  START LOOP: for each link */

  for(let authorLink of authorLinks){

    /* [DONE]  add tagClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

  /* [DONE]  END LOOP: for each link */
  }
}

addClickListenersToAuthors();
