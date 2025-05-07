import axios from 'axios'

const api = axios.create ({
	baseURL: 'https://cdsconsulting.com.br/usuarios/'
})

export default api