const allPostContainer = document.getElementById('all-posts-container');
const readCounter = document.getElementById('read-count');
const readCounteContainer = document.getElementById('read-count-container');
const latestPostContainer = document.getElementById('latest-post-container');

let readCount = 0;

const allPosts = async (searchCatagory) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchCatagory}`);
    const data = await res.json();
    const posts = data.posts;
    allPostContainer.innerText = '';
    posts.forEach((post) =>{
        // console.log(post)
       
        const div = document.createElement('div');
        div.className = 'bg-[#797dfc1a] rounded-3xl p-6 my-6';
        div.innerHTML = `
        <div class="flex flex-col gap-4 lg:flex-row">
                            <div class="flex flex-col lg:flex-row gap-6">
                               
                                <div class=" relative">
                                    <img src="${post.image}"  class="rounded-2xl w-[72px] h-[72px]"/>

                                    <div id="" class="absolute w-3 h-3 bg-green-500 rounded-full left-[62px]  lg:left-[55px]  top-0"></div>
                                  </div>
                                  



                                  <div>

                                    <div class="flex  gap-6">
                                        <p># ${post.category}</p>
                                        <p>Author : ${post.author.name}</p>
                                    </div>
                                    <h5 class="text-[20px] font-mulish font-bold">${post.title}</h5>
                                    <p class="py-6 text-[#12132d99]">${post.description}</p>


                                    <hr class="my-5 border-dotted bg-[#12132d40] ">


                                    <div class="flex justify-between">
                                        <div class="flex gap-3 lg:gap-5">
                                            <div class="flex justify-center items-center gap-1 lg:gap-3">
                                                <img src="images/tabler-icon-message-2.svg" alt="">
                                                <p>${post.comment_count}</p>
                                            </div>
                                            <div class="flex justify-center items-center gap-1 lg:gap-3">
                                                <img src="images/tabler-icon-eye.svg" alt="">
                                                <p>${post.view_count}</p>
                                            </div>
                                            <div class="flex justify-center items-center  lg:gap-3">
                                                <img src="images/tabler-icon-clock-hour-9.svg" alt="">
                                                <p>${post.posted_time} min</p>
                                            </div>
                                        </div>
            
                                        <button onclick="markRead('${post?.title.replace(/'/g, "")}', '${post.view_count}')" id="mark-read">
                                            <img src="images/email 1.svg" alt="">
                                        </button>
                                    </div>

                                  </div>    
                            </div>
                        </div>
        
        `

        
        allPostContainer.appendChild(div)
        
    })

    loadingSpinner(false);

    
}
const markRead = (title, view)=>{
    readCount = readCount + 1;
    readCounter.innerText = readCount;
    const div = document.createElement('div');
    div.className = 'bg-white flex p-4 rounded-2xl justify-between my-4';
    div.innerHTML = `
    <div>
                            <h5 class="text-[#12132D] font-medium font-mulish">${title}</h5>
                        </div>
                        <div class="flex justify-center items-center gap-1">
                            <img src="images/tabler-icon-eye.svg" alt="">
                            <p>${view}</p>
                        </div>
    
`
readCounteContainer.appendChild(div) 

}


const latestPost = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data);


    data.forEach((post)=>{
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl ">
        <figure class="px-10 pt-10">
          <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body  text-left">
            
            <div class="flex gap-1">
                <img src="images/frame-box.svg" alt="">
                <p>${post.author?.posted_date || "No Publish Date"}</p>
            </div>
          <p class="text-[#12132D] font-extrabold text-[18px]">${post.title}</p>

          <p>${post.description} </p>

          <div class="flex gap-4 items-center">
            <div>
                <img src="${post.profile_image}" class="w-[44px] h-[44px] rounded-full" />
            </div>
            <div>
                <div><p>${post.author.name}</p></div>
                <div> <p>${post.author?.designation || "Unknown"}</p></div>
            </div>
               
          </div>
          
        </div>
      </div>
        
        `
        latestPostContainer.appendChild(div);
       

    })
}


const handleSearch = ()=>{
    loadingSpinner(true)
 
   
    const inputField = document.getElementById('input-field');
    const searchCatagory = inputField.value;
        setTimeout(()=>{
            allPosts(searchCatagory);
        }, 2000)
    
    
}

const loadingSpinner = (isLoading) =>{
    const spinner = document.getElementById('spineer');
    if(isLoading){
        
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden')
    }
}

latestPost();


allPosts("comedy");