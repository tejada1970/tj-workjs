import { MyLinkLocal } from '@/components/MyLink';
import { textObject } from '@/utils/scripts-js/textObject';

export const metadata = {
  title: 'Not Found', 
}

const NotFound = () => {
  return (
    <div className='
      relative z-20 min-h-screen flex flex-col justify-center 
      items-center font-bold text-2xl text-slate-700'
    >
      <div className='mb-5'>
      <h3>{textObject.notFound.title}</h3>
      </div>
      <div className='bg-[#111] p-4 rounded-lg'>
        <MyLinkLocal
          linkUrl='/'
          linkText = {textObject.notFound.btnText}
        />
      </div>
    </div>
  )
}
export default NotFound