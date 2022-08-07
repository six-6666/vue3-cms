module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  // plugins: [
  //   ['@babelugin-proposal-optional-chaining'],
  //   ['@babelugin-proposal-nullish-coalescing-operator']
  // ]
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-nullish-coalescing-operator']
  ]
}
