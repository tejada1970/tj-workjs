import Link from 'next/link';

const MyLinkLocal = ({ linkUrl, linkOnClick, linkText }) => {
  return (
    <div>
      <Link 
        href={linkUrl}
        target='_self'
        onClick={linkOnClick}
        className='
        group relative overflow-hidden z-10 min-w-[150px] max-w-[150px] 
        my-3 flex justify-center items-center rounded-full bg-gray-200 
        active:scale-90'
      >
        <div className='
        text-slate-700 absolute opacity-0 z-20 left-[-40%] 
        group-hover:opacity-[10] group-hover:left-[75%] ease-in-out duration-300'
        >
          <svg 
            xmlns='http://www.w3.org/2000/svg' width='35' height='35' 
            fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'
          >
            <path 
              fillRule='evenodd' 
              d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0
               .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z' 
            />
          </svg>
        </div>
        <span className='
        text-slate-700 relative z-10 left-[0%] py-1 text-lg 
        font-semibold group-hover:left-[-10%] ease-in duration-300'
        >
          {linkText}
        </span>
      </Link>
    </div>
  )
}

const MyLinkWeb = ({ linkUrl, divClassName, linkText, leftValue, linkClassName, classNameText }) => {
  return (
    <div className={divClassName}>
      <Link 
        href={linkUrl}
        target='_blank'
        className=
        {`
          group relative overflow-hidden z-10 w-[250px] h-[40px] 
          flex justify-center items-center flex-wrap rounded-full
          active:scale-90 ${linkClassName}
        `}
        rel='noreferrer noopener'
      >
        <div className=
          {`
            text-slate-200 absolute opacity-0 z-20 left-[-40%]
            group-hover:opacity-[10] ${leftValue}
            ease-in-out duration-300
          `}
        >
          <svg 
            xmlns='http://www.w3.org/2000/svg' width='35' height='35' 
            fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd' 
              d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0
               .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z' 
            />
          </svg>
        </div>
        <span className=
        {`
          text-slate-200 relative z-10 left-[0%] py-1 
          group-hover:left-[-7%] ease-in duration-300
          ${classNameText}
        `}
        >
          {linkText}
        </span>
      </Link>
    </div>
  );
}

export { MyLinkLocal, MyLinkWeb }