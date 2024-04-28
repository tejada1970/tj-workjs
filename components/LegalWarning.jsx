import BtnBack from '@/components/BtnBack';
import { textObject } from '@/utils/scripts-js/textObject';

const LegalWarning = () => {
  return (
    <div>
      <div className='p-10 mt-[70px]'>
        <h1 className='text-blue-700 text-2xl'>
          {textObject.legalWarning.pageTitle}
        </h1>
      </div>
      <div className='pb-10 text-lg'>
        <p>
        {textObject.legalWarning.pageParagraph}
        </p>
      </div>
      <BtnBack 
        divClassName='bg-[#111] p-4 rounded-lg flex justify-center items-center w-96 m-auto'
        btnClassName='text-white font-bold text-lg tracking-widest hover:text-green-500'
        btnText={textObject.legalWarning.pageBtnText}
      />
    </div>
  )
}

export default LegalWarning