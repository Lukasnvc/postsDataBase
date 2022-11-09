// fetch('https://testapi.io/api/lukasnvc/resource/test',
//     {
//         method: 'GET',
//         // headers: {
//         //     'Content-Type': 'application/json'
//         // },
//         // body: JSON.stringify({
//         //     name: 'Tomas',
//         //     lastname: 'Vyrukas',
//         //     email: 'tomukas@gmail.com'
//         // })
//     }
// )
//     .then((response) => {
//         if (response.ok) {
//           console.log(response)
//             return response.json();
//         }
//     })
//     .then((result) => {
//         console.log(result);
//     })

fetch('https://testapi.io/api/lukasnvc/resource/practice')
.then((response) => {
  if (response.ok) {
    return response.json();
  }
})
.then((data) => {
  draw(data.data)
})

const deleteItem = (id) => {
  console.log(id)
  fetch(`https://testapi.io/api/lukasnvc/resource/practice/${id}`,
  {
    method: 'DELETE'
  })
  location.reload()
}

const editPost = (valueTitle, valueContent, idEdit) => {
  const formEdit = document.querySelector('#edit');
  const editTitle = document.querySelector('#editTitle');
  const editContent = document.querySelector('#editContent');
  editTitle.setAttribute('placeholder', `${valueTitle}`);
  editContent.setAttribute('placeholder', `${valueContent}`);

  formEdit.addEventListener('submit', (e)=> {
    e.preventDefault()
    editing(editTitle.value||valueTitle, editContent.value||valueContent, idEdit)
  })
}
  const editing = (eTitle, eContent, eId) => {
    console.log(eTitle, eContent, eId);
  fetch(`https://testapi.io/api/lukasnvc/resource/practice/${eId}`,
  {
    method: 'PUT',
    headers: {
      'Content-Type':
      'application/json'
    },
    body: JSON.stringify({
      title: `${eTitle}`,
      content: `${eContent}`
    }) 
  })
  .then((response) => {
    if (response.ok) {
      console.log(response);
      return response.json()
    }
  })
  .then((result) => {
    console.log(result);
    location.reload();
  })
}
 

const post = (valueTitle, valueContent) => {
  fetch('https://testapi.io/api/lukasnvc/resource/practice',
{
  method: 'POST',
  headers: {
    'Content-Type':
    'application/json'
  },
  body: JSON.stringify({
    title: `${valueTitle}`,
    content: `${valueContent}`
  }) 
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
  location.reload();
})
}

const title = document.querySelector('#title');
const content = document.querySelector('#content');
const form = document.querySelector('form');
const posts = document.querySelector('#posts');

form.addEventListener('submit', (e) => {
e.preventDefault();
post(title.value, content.value);

})

const draw = (data) => {
  data.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'card');

    const title = document.createElement('h3');
    title.setAttribute('class', 'title');
    title.textContent= element.title;

    const p = document.createElement('p');
    p.setAttribute('class', 'time');
    p.textContent= element.createdAt

    const content= document.createElement('p');
    content.setAttribute('class', 'content');
    content.textContent= element.content;

    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'editBtn');
    editBtn.textContent= 'Edit post';
    editBtn.addEventListener('click', () => {
      const editForm = document.querySelector('#edit');
      editForm.style.display= 'block';
      editPost(element.title, element.content, element.id)
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.textContent= 'Delete';
    deleteBtn.addEventListener('click', (e)=> {
      e.preventDefault();
      deleteItem(element.id)
    })

    div.appendChild(title);
    div.appendChild(p);
    div.appendChild(content);
    div.appendChild(editBtn)
    div.appendChild(deleteBtn);

    const posts = document.querySelector('#posts');
    posts.appendChild(div);
  });
}



