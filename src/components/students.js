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
        this.studentContainer.addEventListener('click', this.editButtonClick.bind(this))
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

    editButtonClick(e) {
        const editButton = e.target
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
        `<div id="student-data">
            <h3>Student Name: ${student.name}</h3>
            <h4>House: ${student.house}</h4>
            <h4>Blood Status: ${student.blood_status}</h4>
            <h4>Patronus: ${student.patronus}</h4>
            <button id="edit-button">edit</button>
        </div>`
        )}
}