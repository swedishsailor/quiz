import axios from "axios";

const url: string = "https://quiz-jsonserver.herokuapp.com";

 export const getData = axios.get(url + '/qa')
        .then(response => {
            console.log('Fetched Data :',response.data);
            return response.data;
        })
        .catch(error => console.log(error))