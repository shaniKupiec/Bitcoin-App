export default {
  save,
  load,
}

function save(key, val) {
  const str = JSON.stringify(val)
  localStorage.setItem(key, str)
}

function load(key) {
  const str = localStorage.getItem(key)
  const val = JSON.parse(str)
  return val
}