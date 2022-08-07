let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:4000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:4001'
} else {
  BASE_URL = 'http://152.136.185.210:4002'
}

export { BASE_URL }
