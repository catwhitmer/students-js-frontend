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
        this.studentContainer.addEventListener('click', this.editDeleteButtonClick.bind(this))
    }
    
    createStudent(e) {
        e.preventDefault()
        const teacherIdValue = this.teacherId.value 
        const nameValue = this.studentName.value 
        const houseValue = this.studentHouse.value 
        const bloodValue = this.studentBloodStatus.value 
        const patronusValue = this.studentPatronus.value

        this.service.createStudent(teacherIdValue, nameValue, houseValue, bloodValue, patronusValue).then(student => {
            this.students.push(new Student(student))
                this.teacherId.value = ''
                this.studentName.value = ''
                this.studentHouse.value = ''
                this.studentBloodStatus.value = ''
                this.studentPatronus.value = ''   
                this.render()
        })
        
    }

    editDeleteButtonClick(e) {
        if (e.target.className === "edit-button") {
         
            const [name, house, blood_status, patronus] = e.target.parentElement.querySelectorAll("span")
        
            this.studentName.value = name.innerText
            this.studentHouse.value  = house.innerText
            this.studentBloodStatus.value  = blood_status.innerText
            this.studentPatronus.value = patronus.innerText  

            document.querySelector("#teacher_id").value = e.target.parentElement.dataset.teacher
            document.querySelector(".btn").value = "Edit Student"
debugger
            const id = e.target.parentElement.id

            this.service.updateStudent(name.innerText, house.innerText, blood_status.innerText, patronus.innerText, id)

        } else if (e.target.className === "delete-button") {
            console.log("delete")
        }
    }

    fetchStudents() {
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
        //const studentContainer = document.getElementById("students-container")
        this.studentContainer.innerHTML = this.students.map(student => 
        `<div class="student-data" id="${student.id}" data-teacher="${student.teacher_id}">
            <p>Student Name: <span>${student.name}</span></p>
            <p>Student House: <span>${student.house}</span></p>
            <p>Student Blood Status: <span>${student.blood_status}</span></p>
            <p>Student Patronus: <span>${student.patronus}</span></p>
            <button class="edit-button">edit</button>
            <button class="delete-button">delete</button>
            <br>
            <br>
        </div>`
        ).join("")}
    
}