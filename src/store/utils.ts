export const getRandomPrice = () => {
  return (Math.random() * (100 - 50) + 50).toFixed(2)
}

export const getlocaleDateString = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
