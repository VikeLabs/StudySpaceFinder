export const getCurrentDay = () => {
  return new Date().toLocaleDateString('en-ca', { weekday: 'long' });
}