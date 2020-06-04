class Students {
    constructor() {
        this.students = []
        this.service = new API()
        this.bindEventListeners()
        this.fetchStudents()
    }

    bindEventListeners() {
        this.teacherId = document.getElementById("teacher_id")
        this.studentName = document.getElementById("name")
        this.studentHouse = document.getElementById("house")
        this.studentBloodStatus = document.getElementById("blood_status")
        this.studentPatronus = document.getElementById("patronus")
        this.studentForm = document.getElementById("student-form")
        this.studentForm.addEventListener('submit', this.createStudent.bind(this))
        this.editButton = document.getElementById("editButton")
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
        console.log(this.students)
         const studentContainer = document.getElementById("students-container")
         studentContainer.innerHTML = this.students.map(student => 
            `<p><h3 id="studentData">
                <span>Student Name: ${student.name}</span><br>
                <span>House: ${student.house}</span><br>
                <span>Blood Status: ${student.blood_status}</span><br>
                <span>Patronus: ${student.patronus}</span><br>
                <button id="editButton" data-id=${student.id}>edit</button>
            </h3></p>`
        )
    }
}