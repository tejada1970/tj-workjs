import Budget from '@/components/Budget';

export const metadata = {
  title: 'Work JS | Budget',
}

const BudgetPage = () => {
  return (
    <div>
      <div className='relative z-20 bg-slate-100 overflow-hidden xl:bg-pc bg-cover bg-bottom bg-no-repeat bg-fixed'>
        <div className='
          xl:absolute top-0 left-0 w-full h-full z-10 bg-black/10'
        >
          {/* capa background */}
        </div>
        <Budget />
      </div>
    </div>
  )
}

export default BudgetPage