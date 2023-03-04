// category name start  
let newArray = []
const categoryNameLoad = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayShowCategoryName(data.data.news_category)
    } catch (error) {
        console.log(error.message)
    }
}
categoryNameLoad()
// category name end 
// category show in display ui 
const displayShowCategoryName = (categories) => {
    try {
        const categoryContainer = document.getElementById('category-container');
        console.log(categories)
        categories.forEach(category => {
            const { category_id, category_name } = category;
            const p = document.createElement('p');
            p.innerHTML = `
            <a onclick="categoriesData('${category_id}','${category_name}')" class="text-base bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 font-medium" href="#">${category_name}</a>
            `
            categoryContainer.appendChild(p)
        });

    } catch (error) {
        console.log(error.message)

    }
}

const categoriesData = async (category_id, category_name) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        const res = await fetch(url);
        const data = await res.json();
        newArray = data.data;
        showDisplayNews(data.data, category_name)
    } catch (error) {
        console.log(error.message)
    }
}

const showDisplayNews = (news, category_name) => {

    const newsAlert = document.getElementById('newsAlert');
    newsAlert.innerHTML = `
    <p class="text-base"><span>${news.length}</span> items found for category <span>${category_name}</span></p>
    `
    const newFeedContainer = document.getElementById('newFeed-container');
    newFeedContainer.textContent = '';
    news.forEach(newsdata => {
        console.log(newsdata)
        const { title, details, others_info, author, total_view, _id, rating, thumbnail_url } = newsdata;
        const { img, name, published_date } = author;
        const { badge, number } = rating;
        const newsCard = document.createElement('div');
        newsCard.classList.add('card', 'p-5', 'card-side', 'bg-white', 'shadow-xl','md:flex-row', 'flex-col','md:gap-8','gap-4')
        newsCard.innerHTML = `
                    <figure class="md:w-[30%] max-w-full"><img class="object-cover" src=${thumbnail_url} alt="Movie" /></figure>
                    <div class="card-body md:w-[70%] gap-5 max-w-full py-4 px-0 justify-between">
                        <div class="space-y-2">
                            <h2 class="card-title md:text-2xl font-semibold">${title}
                            </h2>
                            <p>${details.length > 300 ? details.slice(0, 300) + '...' : details}
                            </p>
                            ${others_info.is_trending && '<div class="badge badge-warning font-semibold text-lg px-2 py-2 text-black">trending...</div>'}
                            
                        </div>
                        <div class="flex flex-wrap gap-3 md:justify-between items-center">
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="w-14">
                                        <img class="object-cover rounded-full" src=${img && img} />
                                    </div>

                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold">${name ? name : 'not available'}</h4>
                                    <p> ${published_date ? dateConvert(published_date) : 'not available'}  </p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                ${total_view ? '<i class="fa-solid fa-eye"></i>' : '<i class="fa-solid fa-eye-slash"></i>'}
                                <span class="font-semibold">${total_view ? total_view + "M" : "no views"}</span>
                            </div>
                            <div class="flex items-center gap-2">
                            <div class="text-yellow-500">
                            ${ratingTraker(number)}
                            </div>
                            <span class="font-semibold">${number ? number : "no rating"}</span>
                            </div>
                            <div>
                                <label for="my-modal-5"  onclick="singleDataLoad('${_id}')" class="text-2xl cursor-pointer font-semibold"><i class="fa-solid fa-arrow-right"></i></label>
                            </div>
                        </div>
                    </div>
        
        `
        newFeedContainer.appendChild(newsCard)
    })
}



// ${viewTraker(total_view)}

// // view count 
// const viewTraker = (totalView) => {
//     if (totalView) {
//         return '<i class="fa-solid fa-eye"></i>'
//     }
//     else {
//         return '<i class="fa-solid fa-eye-slash"></i>'
//     }
// }

// ratting count 
const ratingTraker = (rate) => {
    let rateIcon = ''
    for (let i = 0; i < Math.floor(rate); i++) {
        rateIcon += '<i class="fa-solid fa-star"></i>';
    }
    console.log();
    if (rate - parseInt(rate) > 0) {
        rateIcon += ' <i class="fa-solid fa-star-half-stroke"></i>'
        console.log('object');
    }
    return rateIcon;
}


categoriesData('08', "All News")



const singleDataLoad = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const res = await fetch(url);
    const data = await res.json();
    displaySingleData(data.data[0])

}

const displaySingleData = (newsData) => {
    const { title, details, others_info, author, total_view, _id, rating, thumbnail_url, image_url } = newsData;
    const { img, name, published_date } = author;
    const { badge, number } = rating;
    document.getElementById('newS-photo').setAttribute('src', `${image_url}`)
    document.getElementById('newsTitle').innerText = title;
    document.getElementById('newsDetails').innerText = details;
    document.getElementById('isTrending').innerHTML = ` ${others_info.is_trending && '<div class="badge badge-warning font-semibold text-lg px-2 py-2 text-black">trending...</div>'}`;
    document.getElementById('rateBadge').innerText = `${badge ? badge : 'not available'}`
    document.getElementById('authorImg').setAttribute('src', `${img}`)
    document.getElementById('authorTitle').innerText = `${name ? name : 'not available'}`;
    document.getElementById('authorPera').innerText = `${published_date ? dateConvert(published_date) : 'not available'}`;
    document.getElementById('newView').innerHTML = `${total_view ? '<i class="fa-solid fa-eye"></i>' + `<span class="font-semibold">${total_view}M</span>` : '<i class="fa-solid fa-eye-slash"></i>' + `<span class="font-semibold">${total_view}M</span>`}`;
    document.getElementById('ratings').innerHTML = ` ${ratingTraker(number)}`;
    document.getElementById('ratingNumber').innerText = `${number}`;


}


const dateConvert = (published_date) => {
    const dateConvert = new Date(published_date);
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const date = `${month[dateConvert.getMonth()]} ${dateConvert.getDate()}, ${dateConvert.getFullYear()}`;
    return date;
}







const todayPicker = () => {
    const todayPickerArr = newArray.filter(data => data?.others_info?.is_todays_pick);
    if (todayPickerArr.length === 0) {
        alert('sorry no today picker')
        return
    }

    showDisplayNews(todayPickerArr, "Today Picker");
}

const trendingNews = () => {
    const trendingNewsRest = newArray.filter(data => data?.others_info?.is_trending);
    showDisplayNews(trendingNewsRest, "Trending News")
}


document.getElementById('sorterValue').addEventListener('change', (e) => {
    const eventValue = e.target.value;
    if (eventValue === 'h2l') {
        newArray.sort(function (a, b) { return b.total_view - a.total_view });
        console.log(newArray);
        showDisplayNews(newArray, 'sorting')
    }
    if (eventValue === 'l2h') {
         newArray.sort(function (a, b) { return a.total_view - b.total_view });

         console.log(newArray);
         showDisplayNews(newArray, 'sorting')

    }
    // console.log(eventValue);


})