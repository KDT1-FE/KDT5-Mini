export let dateFormatter = selected => {
  return (
    selected.getFullYear() +
    '-' +
    (selected.getMonth() + 1 < 9
      ? '0' + (selected.getMonth() + 1)
      : selected.getMonth() + 1) +
    '-' +
    (selected.getDate() < 9 ? '0' + selected.getDate() : selected.getDate()) +
    'T' +
    '09:00:00' +
    'Z'
  )
}
