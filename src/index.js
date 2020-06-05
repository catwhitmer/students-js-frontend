const app = new App()

API.getTeachers() 
.then(data => {
    data.forEach(teacher => {
    document.querySelector("#teacher_id").innerHTML += `
     <option value= ${teacher.id}>${teacher.name}</option>
     `
    });
})
