class Students {
    constructor() {
        this.students = []
        this.service = new API()
        this.bindEventListeners()
        this.fetchStudents()
    }

    bindEventListeners() {
        this.studentsList = document.getElementById("students-container")
        this.studentForm = document.getElementById("student-form")
        this.studentForm.addEventListener('submit', this.createStudent)
    }

    createStudent(e) {
        e.preventDefault()
        console.log("student created")
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
        this.studentsList.innerHTML = this.students.map(student => student.renderLi()).join('')
    }
}