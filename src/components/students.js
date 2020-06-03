class Students {
    constructor() {
        this.students = []
        this.service = new API()
        //this.bindEventListeners()
        this.fetchStudents()
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
        const studentsList = document.getElementById("students-container")
        studentsList.innerHTML = this.students.map(student => `<li>${student.name}</li>`).join('')
    }
}