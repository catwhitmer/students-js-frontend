class Student {
    constructor(studentJSON) {
      this.id = studentJSON.id
      this.name = studentJSON.name
      this.house = studentJSON.house
      this.blood_status = studentJSON.blood_status
      this.patronus = studentJSON.patronus
      this.teacher_id = studentJSON.teacher_id
    }

    renderLi() {
      return `<li>${this.name}</li>`
    }
}
