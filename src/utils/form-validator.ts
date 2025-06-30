export const validateEmail = (email: string): boolean => {
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhone = (phone: string): boolean => {
  return !/^(\(\d{2}\)\s?\d{1}\s?\d{4}-\d{4}|\(\d{2}\)\s?\d{5}-\d{4})$/.test(phone)
}

export const validateCEP = (cep: string): boolean => {
  return !/^\d{5}-\d{3}$/.test(cep)
}
