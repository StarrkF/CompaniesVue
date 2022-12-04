import axios from "axios";

const baseURL = "http://laravel-api.test:8000/api/"

export default function useApi(){



    const getData = async (model) => {
        let response = await axios.get(baseURL+model)
        return response.data
    }

    const showData = async (model,id) => {
        let response =  await axios.get(baseURL+model+'/'+id)
        return response.data
    }

    const insertData = async (model,data) => {
        let response = await axios.post(baseURL+model,data)
        return response.data
    }

    const updateData = async (model,id,data) => {
        let response = await axios.put(baseURL+model+'/'+id,data)
        return response.data
    }

    const deleteData = async (model,id) => {
        await axios.delete(baseURL+model+'/'+id)
    }


      return {
        getData,
        showData,
        insertData,
        updateData,
        deleteData
      }
}

