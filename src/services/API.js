class API {
    constructor() {
      this.baseUrl = "http://localhost:3000/api/v1/students"
    }

    getStudents() {
      return fetch(this.baseUrl).then(resp => resp.json())
      }
    }
}