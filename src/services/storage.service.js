export default {
  save,
  load,
}

function save(key, val) {
  const str = JSON.stringify(val)
  console.log('saving value ', val, ' for key ', key);
  localStorage.setItem(key, str)
}

function load(key) {
  const str = localStorage.getItem(key)
  const val = JSON.parse(str)
  return val
}