import axios from "axios";

const url: string = "https://quiz-jsonserver.herokuapp.com";

let importedData;

 export const getData = axios.get(url + '/qa')
        .then(response => {
            importedData = response.data;
            console.log(importedData);
            return response.data;
        })
        .catch(error => console.log(error))