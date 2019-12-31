fetch("http://localhost:8080/qoutes")
        .then((data) => data.json())
        .then((posts) => {
            console.log(posts)
            let allPosts = document.querySelector('.allPosts')
            let post
            posts.reverse()
            for (let i = 0; i < posts.length; i++) {
                post = posts[i]
                let div = document.createElement('div')
                div.classList.add('post')
                let h3 = document.createElement('h3')
                let p = document.createElement('p')
                let small = document.createElement('small')
                h3.textContent = post.name.trim()
                p.textContent = post.content.trim()
                small.textContent = post.created
                div.appendChild(h3)
                div.appendChild(p)
                div.appendChild(small)
                allPosts.appendChild(div)
            }
        })