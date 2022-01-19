export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => {
        console.log(response)
        response.json()
      })
}