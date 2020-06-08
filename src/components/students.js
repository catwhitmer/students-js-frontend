class Students {
    constructor() {
        this.students = []
        this.service = new API()
        this.bindEventListeners()
        this.fetchStudents()
    }

    bindEventListeners() {
        this.studentContainer = document.getElementById("students-container")
        this.teacherId = document.getElementById("teacher_id")
        this.studentName = document.getElementById("name")
        this.studentHouse = document.getElementById("house")
        this.studentBloodStatus = document.getElementById("blood_status")
        this.studentPatronus = document.getElementById("patronus")
        this.studentForm = document.getElementById("student-form")
        this.studentForm.addEventListener('submit', this.createStudent.bind(this))
        //this.studentForm.addEventListener('submit', this.editDeleteButtonClick.bind(this))
        this.studentContainer.addEventListener('click', this.editDeleteButtonClick.bind(this))
    }
    
    createStudent(e) {
     
        const teacherIdValue = this.teacherId.value 
        const nameValue = this.studentName.value 
        const houseValue = this.studentHouse.value 
        const bloodValue = this.studentBloodStatus.value 
        const patronusValue = this.studentPatronus.value

      if (e.target.dataset.action === "create") {
        e.preventDefault()
        
        this.service.createStudent(teacherIdValue, nameValue, houseValue, bloodValue, patronusValue).then(student => {
            this.students.push(new Student(student))
                this.teacherId.value = ''
                this.studentName.value = ''
                this.studentHouse.value = ''
                this.studentBloodStatus.value = ''
                this.studentPatronus.value = ''   
                this.render()
        })
      } else if (e.target.dataset.action === "update") {
            const id = e.target.dataset.id //id of form
            this.service.updateStudent(teacherIdValue, nameValue, houseValue, bloodValue, patronusValue, id)
              .then(data => {
              console.log(data)
              })
      } 
    }

    editDeleteButtonClick(e) {
        e.preventDefault()
        if (e.target.className === "edit-button") {
         
            const [name, house, blood_status, patronus] = e.target.parentElement.querySelectorAll("span")
    
            this.studentName.value = name.innerText
            this.studentHouse.value  = house.innerText
            this.studentBloodStatus.value  = blood_status.innerText
            this.studentPatronus.value = patronus.innerText  

            document.querySelector("#teacher_id").value = e.target.parentElement.dataset.teacher// id of teacher
            document.querySelector(".btn").value = "Edit Student"    //button change
            this.studentForm.dataset.id = e.target.parentElement.id //id of the form
          
            this.studentForm.dataset.action = "update" //change action

        } else if (e.target.className === "delete-button") {
            const Id = e.target.parentElement.id
            console.log("delete", Id)
            this.service.deleteStudent(Id)
            .then(() => {
              this.fetchStudents()
              })
        }
    }

    fetchStudents() {
        this.students = []
        this.service
          .getStudents()
          .then(students => {
            students.forEach(student => this.students.push(new Student(student)))
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        this.studentContainer.innerHTML = ""
        this.studentContainer.innerHTML = this.students.map(student => 
        `<div class="student-data" id="${student.id}" data-teacher="${student.teacher_id}">
            <h4><p>Student Name: <span>${student.name}</span></p>
            <p>Student House: <span>${student.house}</span></p>
            <p>Student Blood Status: <span>${student.blood_status}</span></p>
            <p>Student Patronus: <span>${student.patronus}</span></p>
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button></h4>
            <br>
            <br>
        </div>`
        ).join("")}
}