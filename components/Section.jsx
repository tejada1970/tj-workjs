const Section = (props) => {
  return (
    <section 
      className={props.classDivSection} id={props.idSection}
    >
      {/* Titulo de la Sección */}
      <div 
        className={props.classContainerTitleSection} 
      >
        <div 
          className={props.classDivTitleSection}
        >
          <span 
            className={props.classSpanTitleSection}
            aria-hidden='true'
          >
            {/* 'skew' del titulo */}
          </span>
          <h2 
            className={props.classTitleSection}
          >
            {props.textTitleSection}
          </h2>
        </div>
      </div>
      {props.children}
    </section>
  )
}
export default Section