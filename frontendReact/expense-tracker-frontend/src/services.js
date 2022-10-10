import axios from 'axios'

const baseUrl = "http://127.0.0.1:8000"
export const getCategories=async()=>{

    const url = `${baseUrl}/expense/category/`;
    const response = await axios.get(url)
    console.log(response)
    if(response.status === 200){
        return response.data
    }
    else return []

}

export const getSubCategories = async(cateoryId)=>{
    const url = `${baseUrl}/expense/sub_category/subcategory_by_category/`;
    const response = await axios.get(url, {
      params: {
        category_id: cateoryId,
      },
    });
    if(response.status === 200){
        return response.data
    }
    return []
}

export const getPaymentTypes = async ()=>{
    const url = `${baseUrl}/expense/payment_type/`
    const response = await axios.get(url)
    if(response.status === 200){
        return response.data
    }
    return []
}

export const postPaymentDetails = async (data) =>{
    const url = `${baseUrl}/expense/payment/`
    const response = await axios.post(
        url,
        data   
    )
    if(response.status === 201){
        return response.data
    }
    return false
}

export const getExpenses = async()=>{
    const url = `${baseUrl}/expense/payment/`
    const response = await axios.get(url)
    if(response.status===200){
        return response.data
    }
    return []
}

export const deletePayment =async(paymentId)=>{
    const url = `${baseUrl}/expense/payment/${paymentId}`
    const response = await axios({
        method: 'delete',
        url: url
    })

    if(response.status === 200)
    {
        console.log('deleted successfully')
        console.log(response)
    }
}

export const updateExpense = async (expenseObj)=>{
    const url = `${baseUrl}/expense/payment/${expenseObj?.id}`
    let response = await axios.put(url,
        expenseObj)
    return response
}