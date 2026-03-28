// all blog page - related blogs section

document.addEventListener("DOMContentLoaded", function () {
    fetch('../assets/js/blogs.json')
        .then(response => response.json())
        .then(data => {
            if (document.getElementById("blogContainer")) {
                relatedShowBlogs(data);
            }

            if (document.getElementById("accessblogContainer")) {
                allblogs(data);
            }

            if (document.getElementById("resourceblogContainer")) {
                renderBlogs(data);
            }

            if (document.getElementById("blogContainerIndex")) {
                indexBlogPage(data);
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
});

function relatedShowBlogs(blogs) {

    const blogContainer = document.getElementById("blogContainer");

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const relatedblogs = shuffleArray([...blogs]).slice(0, 3);

    relatedblogs.forEach(blog => {
        const blogHTML = `
                    <div class="col-xl-4 col-md-6 pb-xl-0 pb-3">
                        <a href="../${blog.link}">
                            <div class="blog3-card h-100">
                                <div class="blog3-card__thumb hover-img">
                                    <img src="../${blog.img}" alt="${blog.title}">
                                </div>
                                <div class="blog3-card__content">
                                    <div class="blog3-card__content-meta">
                                        <span class="text-black">${blog.date}</span>
                                    </div>
                                    <h3>
                                        <a class="blog3-card__content-title" href="../${blog.link}">
                                            ${blog.title}
                                        </a>
                                    </h3>
                                    <p class="blog-desc">${blog.desc}</p>
                                
                                    <div class="blog3-card__content-btn-wrapper">
                                        <a class="theme-btn blog-btn" href="../${blog.link}">
                                            <span>
                                            <img class="svg-img bg-white"
                                                src="../assets/images/access-computech/icon/blog-arrow.png" alt="arrow">
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
        blogContainer.insertAdjacentHTML("beforeend", blogHTML);
    });


}


// index page


function indexBlogPage(blogs) {

    const blogIndex = blogs.slice(0, 3);

    const blogContainer = document.getElementById("blogContainerIndex");

    blogIndex.forEach(blog => {
        const blogHTML = `
                <div class="col-xl-4 col-md-6 pb-xl-0 pb-3">
                    <a href="${blog.link}">
                        <div class="blog3-card h-100">
                        <div class="blog3-card__thumb hover-img">
                            <img src="${blog.img}" alt="${blog.title}">
                        </div>
                        <div class="blog3-card__content">
                            <div class="blog3-card__content-meta">
                            <span class="text-black">${blog.date}</span>
                            </div>
                            <h3>
                            <p class="blog3-card__content-title">
                                ${blog.title}
                            </p>
                            </h3>
                            <p class="blog-desc">${blog.desc}</p>
                            <div class="blog3-card__content-btn-wrapper">
                                <p class="theme-btn blog-btn">
                                    <span>
                                    <img class="svg-img bg-white"
                                        src="assets/images/access-computech/icon/blog-arrow.png" alt="arrow">
                                    </span>
                                </p>
                            </div>
                        </div>
                        </div>
                    </a>
                </div>
            `;
        blogContainer.insertAdjacentHTML("beforeend", blogHTML);
    });
}



// access library page

function allblogs(blogs) {



    const blogContainer = document.getElementById("accessblogContainer");
    const categoryFilter = document.getElementById("categoryFilter");

    // Get unique categories
    // const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
    const categories = [
        ...new Set(
            blogs.flatMap(blog => blog.category || [])
        )
    ];

    // Populate dropdown with categories
    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    function accessrenderBlogs(filteredBlogs) {
        blogContainer.innerHTML = '';
        filteredBlogs.forEach(blog => {
            const blogHTML = `
                    <div class="col-xl-4 col-md-6 pb-xl-0 pb-3">
                        <a href="${blog.link}">
                            <div class="blog3-card h-100">
                                <div class="blog3-card__thumb hover-img">
                                    <img src="${blog.img}" alt="${blog.title}">
                                </div>
                                <div class="blog3-card__content">
                                    <div class="blog3-card__content-meta">
                                        <span class="text-black">${blog.date}</span>
                                    </div>
                                    <h3>
                                        <a class="blog3-card__content-title" href="${blog.link}">
                                            ${blog.title}
                                        </a>
                                    </h3>
                                    <p class="blog-desc">${blog.desc}</p>
                                
                                    <div class="blog3-card__content-btn-wrapper">
                                        <a class="theme-btn blog-btn" href="${blog.link}">
                                            <span>
                                            <img class="svg-img bg-white"
                                                src="assets/images/access-computech/icon/blog-arrow.png" alt="arrow">
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            blogContainer.insertAdjacentHTML("beforeend", blogHTML);
        });
    }

    function filterBlogs() {
        const selectedCategory = categoryFilter.value;
        let filtered = blogs;
        if (selectedCategory !== 'all') {
            // filtered = blogs.filter(blog => blog.category === selectedCategory);
            filtered = blogs.filter(blog =>
                blog.category && blog.category.includes(selectedCategory)
            );
        }
        accessrenderBlogs(filtered);
    }

    categoryFilter.addEventListener('change', filterBlogs);

    // Initial render
    filterBlogs();
}


// resource page

function renderBlogs(blogs) {


    const container = document.getElementById("resourceblogContainer");

    const limitedBlogs = blogs.slice(0, 4);

    const first = limitedBlogs[0];

    let html = `
            <div class="col-lg-5">
                <div class="blog3-card bg-white">
                    <div class="blog3-card__thumb hover-img">
                        <img src="${first.img}" alt="thumb">
                    </div>
                    <div class="blog3-card__content px-0">
                        <div class="blog3-card__content-meta">
                            <span class="text-black">${first.date}</span>
                        </div>
                        <h3>
                            <a class="blog3-card__content-title fs-28 lh-34" href="${first.link}">
                                ${first.title}
                            </a>
                        </h3>
                        <p class="blog-desc lh-base">${first.desc}</p>
                    </div>
                </div>
            </div>
            `;

    html += `<div class="col-xl-6 offset-xl-1 col-lg-7">`;

    limitedBlogs.slice(1).forEach((blog, index) => {
        html += `
            <div class="blog3-card border-bottom-access ms-lg-3 ${index === 0 ? 'pb-4' : 'py-4'} row bg-white">
                <div class="col-lg-4 col-md-6">
                    <div class="blog3-card__thumb hover-img">
                        <img src="${blog.img}" alt="thumb">
                    </div>
                </div>
                <div class="blog3-card__content col-lg-8 col-md-6 blog-side-title py-0">
                    <h3>
                        <a class="blog3-card__content-title fs-20 mh-0 lh-sm" href="${blog.link}">
                            ${blog.title}
                        </a>
                    </h3>
                    <p class="blog-desc line-clamp-2 pb-0">${blog.desc}</p>
                    <div class="contact-link pt-2">
                        <a href="${blog.link}">
                            Read more 
                            <span>
                                <img class="svg-img bg-white" src="assets/images/access-computech/icon/arrow.svg" alt="arrow">
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            `;
    });

    html += `</div>`;

    container.innerHTML = html;
}
