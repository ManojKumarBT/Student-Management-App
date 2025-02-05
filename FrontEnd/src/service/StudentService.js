import axios from "axios";

const BASE_URL = "http://localhost:8080/StudentApp/v1";


class StudentService {

  
  addStudent(student){
    return axios.post(BASE_URL + '/addStudent', student);
  }

  getStudents(){
    return axios.get(BASE_URL + '/students');
  }

  getStudentByName(name){
    return axios.get(BASE_URL + '/student', {
        params: {name: name}
    })
  }

  updateStudent(student){
    return axios.put(BASE_URL + '/update/student', student);
  }

  deleteStudent(name){
    return axios.delete(BASE_URL + '/delete/student', {
        params: {name: name}
    })
  }


}


export default new StudentService();