"use client"
import { useRouter } from 'next/navigation';

const BtnBack = ({ divClassName, btnClassName, btnText }) => {
  const router = useRouter();
  const btnBack = () => {
    router.back();
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