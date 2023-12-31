/**
 * @param {Date} dob The date of birth, in format yyyy-mm-dd
 * @returns {number} The age of the person
 */
export function age(dob) {
  let today = new Date()
  let birthDate = new Date(dob)
  let age = today.getFullYear() - birthDate.getFullYear()
  let m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
  return age
}