// 匹配规则
export const rules = {
  num: [
    { required: true, message: '手机号是必传的', trigger: 'blur' },
    {
      pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
      message: '手机号输入错误',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '验证码是必传的', trigger: 'blur' }]
}
