import Axios from 'axios';

export function Login(){
    Axios.post("http://192.168.1.46:3005/users", {
          Name: usernameReg,
          userEmail: emailReg,
          contactNo: contactNoReg
        }).then((response) => {
          console.log(response);
        });
  }