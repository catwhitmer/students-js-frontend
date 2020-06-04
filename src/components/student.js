class Student {
    constructor(data) {
      this.id = data.id
      this.name = data.name
      this.house = data.house
      this.blood_status = data.blood_status
      this.patronus = data.patronus
      this.teacher_id = data.teacher_id
    }

    editButtonClick(){
      const editButton = document.querySelectorAll(".edit-button")
      
      for (editButton of editButtons){
          editButton.addEventListener("click", function() {
            console.log('clicked')
          })
      } 
  }

    //renderStudentData() {
      //return 
       //<li>
          //<h3>
            //${student.name}
            //${student.house}
            //${student.blood_status}
            //${student.patronus}
            //<button data-id=${student.id}>edit</button>
          //</h3>
        //</li>`
      //}
}
