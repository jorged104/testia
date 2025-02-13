import axios from "axios"

const bpmapi : axios = axios.create({
    baseURL : `${import.meta.env.VITE_CORE_URL}`,
    headers: {
        "Content-Type": "application/json",
      }

})

export default bpmapi
