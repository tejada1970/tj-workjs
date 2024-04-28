import LegalWarning from "@/components/LegalWarning";

export const metadata = {
  title: 'Work JS | Legal', 
}

const legalWarningPage = () => {
  return (
    <div>
      <main className='
        bg-[#f5f5f5] overflow-hidden text-center min-h-[100vh]
      '
      >
        <LegalWarning />
      </main>
    </div>
  )
}
    
export default legalWarningPage