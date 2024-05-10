"use client"

const BtnBack = ({ divClassName, btnClassName, btnText }) => {
  const btnBack = () => {
    // Navega atrás en la historia del navegador
    window.history.back();
  }
  return (
    <div className={`${divClassName}`}>
      <button 
        type='button'
        className={`${btnClassName}`}
        onClick={btnBack}
      >
        { btnText }
      </button>
    </div>
  )
}
export default BtnBack
