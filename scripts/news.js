
'https://newsapi.org/v2/everything?q=Apple&from=2022-12-09&sortBy=popularity&apiKey=afebf1ea55464655b8d6b44367a09353'
'https://newsapi.org/v2/top-headlines?country=us&apiKey=afebf1ea55464655b8d6b44367a09353'
'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=afebf1ea55464655b8d6b44367a09353'


const base_url = "https://newsapi.org/v2/"
const api_key = "afebf1ea55464655b8d6b44367a09353"
let q = "Apple&from=2022-12-09"
let sortBy = "popularity"
let country = "us"
let sources = "bbc-news"
let default_new_image = "https://puducherry-dt.gov.in/wp-content/themes/district-theme-2/images/news.jpg"

const GetNews = () => {

    let url = `${base_url}top-headlines?country=${country}&apiKey=${api_key}`
    
    var req = new Request(url);
    fetch(req)
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);

            renderNews(responseJSON.articles)
        })
}


const renderNews = (news) => {
    const news_container = document.getElementById("news_container")

    if(!news_container) {
        console.log("news_container not found")
        return
    }

    news_container.innerHTML = ''

    news.forEach(item => {
        news_container.appendChild(makeNewsCard(item))
    });
}

const makeNewsCard = (news_item) => {
    let new_el = document.createElement("div")
    new_el.classList.add("news_card")
    new_el.classList.add("shadow")

    new_el.innerHTML = `
        <div class="news_image_container">
            <img src="${news_item?.urlToImage ? news_item?.urlToImage : default_new_image}" alt="">
        </div>
        <div class="news_card_content">
            <div class="news_card_text">${news_item?.description?.substring(0, 70)}...</div>
            <div class="flex between i_center">
                <div>21 Jan, 2022</div>
                <a href="${news_item?.url}" target="_blank">More</a>
            </div>
        </div>
    `

    return new_el
}


export {GetNews}