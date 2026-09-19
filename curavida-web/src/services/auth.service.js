import api from './api'

const authService = {
       register: (data) => api.post('/auth/register', data),
       login: (data) => api.post('/auth/login', data),
       getMe: () => api.get('/auth/me'), // token vai pelo interceptor agora
       updateMe: (data) => api.put('/auth/me', data),
}

export default authService