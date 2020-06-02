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
            students.forEach(student => this.students.push(student))
        })
        .then(() => {
            this.render()
        })
    }

    render() {
      const studentsContainer = document.getElementById("list-of-students")
      studentsContainer.innerHTML = 'my students'
    }
}