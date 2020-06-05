class API {
    constructor() {
      this.baseUrl = "http://localhost:3000/api/v1/students"
    }

    getStudents() {
      return fetch(this.baseUrl).then(resp => resp.json())
    }

    static getTeachers() {
      return fetch("http://localhost:3000/api/v1/teachers").then(resp => resp.json())
    }

    createStudent(teacherIdValue, nameValue, houseValue, bloodValue, patronusValue) {
      const student = {
        teacher_id: teacherIdValue,
        name: nameValue,
        house: houseValue,
        blood_status: bloodValue,
        patronus: patronusValue
    } 
      return fetch(this.baseUrl,{
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ student }),
      }).then(resp => resp.json())
    }

    updateStudent(value, id) {
      const student = {
        teacher_id: teacherIdValue,
        name: nameValue,
        house: houseValue,
        blood_status: bloodValue,
        patronus: patronusValue
    } 
    return fetch(`${this.baseUrl}/id`,{
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ student }),
      }).then(resp => resp.json())
    }
}
