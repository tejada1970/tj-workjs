"use client"
import React from 'react';
import Section from '@/components/Section';
import { textObject } from '@/utils/scripts-js/textObject';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';

const objDays = {
  "30": 15,
  "60": 10,
  "90": 5,
}

const objExtras = {
  extraBase: 15,
  extraCover: 10,
  extraCase: 25,
  extraColor: 20,
}

const Budget = () => {
  /* 
    hook useMemo -> para mantener el objeto 'objProducts' estable
    y evitar que se recalcule en cada renderizado.
  */
  const objProducts = useMemo(
    () => [
      { id: 'product-1', name: `${textObject.budget.budgetData.productSelect.selectName1}`, price: 150 },
      { id: 'product-2', name: `${textObject.budget.budgetData.productSelect.selectName2}`, price: 90 },
      { id: 'product-3', name: `${textObject.budget.budgetData.productSelect.selectName3}`, price: 25.9 },
    ],
    []
  );

  const { register, handleSubmit, formState: {errors}, watch, setValue } = useForm();

  const productSelect = watch('productSelect');
  const deliveryTime = watch('deliveryTime');
  const priceExtras = watch('priceExtras', 0);

  /* Constante, para pintar los extras */
  const extras = Object.keys(objExtras);

  /* Actualiza el precio del producto */
  useEffect(() => {
    if (productSelect) {
      const priceProductObj = objProducts.find(product => product.id === productSelect);
      const priceProduct = priceProductObj ? priceProductObj.price : 0;
      setValue('priceProduct', priceProduct);
      calculatePvpTotal();
    }
    else {
      setValue('priceProduct', 0);
      calculatePvpTotal();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [productSelect, objProducts, setValue]);

  /* Acumula, actualiza y muestra el precio de los extras seleccionados */
  const handleChange = (e) => {
    const { name, checked } = e.target;
    const extraValue = objExtras[name];
    const currentTotalPrice = watch('priceExtras', 0);
    const updatedPriceExtras = checked ? currentTotalPrice + extraValue : currentTotalPrice - extraValue;
    setValue('priceExtras', updatedPriceExtras);
  };
  
  /* Actualiza el precio total de los extras */
  useEffect(() => {
    setValue('priceExtras', priceExtras);
    calculatePvpTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceExtras, setValue]);

  /* Actualiza la suma: del precio del producto + el total de los extras */
  useEffect(() => {
    const priceProduct = watch('priceProduct', 0);
    const priceExtras = watch('priceExtras', 0);
    const productExtrasSum = (parseFloat(priceProduct) + parseFloat(priceExtras)).toFixed(2);
    setValue('priceProductExtras', productExtrasSum);
  }, [watch, setValue, productSelect, priceExtras, deliveryTime]);

  /* Actualiza el descuento según el tiempo de entrega */
  useEffect(() => {
    const discount = objDays[deliveryTime] || 0;
    setValue('discount', discount);
    calculatePvpTotal();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryTime, setValue]);

  /* Calcula todas las operaciones para el precio final del presupuesto */
  const calculatePvpTotal = () => {
    const priceProduct = watch('priceProduct', 0);
    const priceExtras = watch('priceExtras', 0);
    const discount = watch('discount', 0);
    const result = parseFloat(priceProduct) + parseFloat(priceExtras);
    const discountedResult = parseFloat(result * (1 - discount / 100)).toFixed(2);
    setValue('pvpFinal', discountedResult)
  }
 
  /* onSubmit (enviar formulario) */
  const onSubmit = (formData) => {
    const selectedExtras = Object.keys(formData).filter(key => extras.includes(key) && formData[key]);
    if (selectedExtras.length === 0) {
      Swal.fire({
        title: `${textObject.budget.messageSwal.swalError.title}`,
        text:  `${textObject.budget.messageSwal.swalError.text}`,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff',
        backdrop: false,
        scrollbarPadding: false,
        icon: "error",
      })
    } else {
      const selectedProduct = objProducts.find(product => product.id === watch("productSelect"));
      const productName = selectedProduct ? selectedProduct.name : '';
      const productPrice = selectedProduct ? selectedProduct.price : 0;
      const priceExtras = parseFloat(watch('priceExtras') || 0);
      const priceProductExtras = parseFloat(productPrice) + priceExtras;
      const deliveryTime = watch('deliveryTime') || 0;
      const discount = watch('discount') || 0;
      const estimatedBudget = parseFloat(priceProductExtras * (1 - discount / 100)).toFixed(2);
      
      const selectedExtrasNames = extras.filter(extraName => selectedExtras.includes(extraName)).map(extraName => {
        if (extraName === 'extraBase') return `${textObject.budget.budgetData.extras.extrasName.extraBaseText}`;
        if (extraName === 'extraCover') return `${textObject.budget.budgetData.extras.extrasName.extraCoverText}`;
        if (extraName === 'extraCase') return `${textObject.budget.budgetData.extras.extrasName.extraCaseText}`;
        if (extraName === 'extraColor') return `${textObject.budget.budgetData.extras.extrasName.extraColorText}`;
        return '';
      });

      const personalData = `
        ${textObject.budget.personalData.name}: ${watch('name')}<br />
        ${textObject.budget.personalData.surnames}: ${watch('surnames')}<br />
        ${textObject.budget.personalData.phone}: ${watch('phone')}<br />
        ${textObject.budget.personalData.email}: ${watch('email')}<br />
      `;
    
      const confirmationData = `
        ${textObject.budget.budgetData.productSelect.selectName0}:
        ${productName}<br /><br />

        ${textObject.budget.budgetData.productPriceText}: ${productPrice}<br /><br />

        ${textObject.budget.budgetData.extras.title}:
        ${selectedExtrasNames.join(',\n')}<br /><br />

        ${textObject.budget.budgetData.extras.priceExtrasText}: ${priceExtras}<br /><br />

        ${textObject.budget.budgetData.extras.priceProductExtrasText}: ${priceProductExtras}<br /><br />

        ${textObject.budget.budgetData.deliveryTime.title}:<br /><br />
        ${deliveryTime} ${textObject.budget.budgetData.deliveryTime.text}<br /><br />

        ${textObject.budget.budgetData.discountText}: ${discount}<br /><br />

        ${textObject.budget.budgetData.estimatedBudgetText}:
        ${estimatedBudget}
      `;
    
      const fullMessage = `
        ${personalData}<br />
        ${confirmationData}
      `;
    
      Swal.fire({
        title: `${textObject.budget.messageSwal.swalWarning.title}`,
        html: fullMessage,
        icon: 'warning',
        backdrop: false,
        scrollbarPadding: false,
        showCancelButton: true,
        width: '1000px',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: `${textObject.budget.messageSwal.swalWarning.buttons.cancel}`,
        confirmButtonText: `${textObject.budget.messageSwal.swalWarning.buttons.accept}`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${textObject.budget.messageSwal.swalSuccess.title}`,
            text: `${textObject.budget.messageSwal.swalSuccess.text}`,
            icon: "success",
            backdrop: false,
            scrollbarPadding: false,
            showCancelButton: false,
          }).then(() => {
            console.log(`
              ${fullMessage.replace(/<br\s*\/?>/gi, " ")}
            `);
          });
        } else {
          Swal.fire({
            title: `${textObject.budget.messageSwal.swalInfo.title}`,
            text: `${textObject.budget.messageSwal.swalInfo.text}`,
            icon: "error",
            backdrop: false,
            scrollbarPadding: false,
          });
        }
      })
    }
  }

  /* Datos Personales */
  const renderPersonalData = () => {
    return (
      <div>
        {/* Datos Personales */}
        <fieldset className='p-2'>
          <legend 
            className='
              w-full text-lg spanOrange mb-5 
              pl-2 border-2 border-gray-400
            '
          >
            {textObject.budget.personalData.title}
          </legend>
          <div className='flex flex-col gap-6 md:ml-5 md:flex-row md:justify-around md:gap-x-28'>
            <div className='flex flex-col gap-6'>
              {/* Nombre */}
              <div>
                <label 
                  htmlFor='nameId' 
                  className='inline-block w-24 text-blue-700'
                >
                  {textObject.budget.personalData.name}
                </label>
                <input 
                  type='text'
                  id='nameId'
                  name='name'
                  autoComplete='off'
                  className='
                    w-60 bg-transparent outline-none 
                    focus:border-b-blue-700 focus:border-b-2
                  '
                  autoFocus
                  placeholder='nombre'
                  {...register('name', {
                    required: {
                      value: true,
                      message: `${textObject.budget.messageInputs.messageRequire}`
                    },
                    pattern: {
                      value: /^[a-zA-Z \u00C0-\u017F]{2,15}$/,
                      message: `${textObject.budget.messageInputs.messagePatternName}`
                    }
                  })}
                />
                { errors.name && 
                  <span className='text-red-700 text-sm w-[100%] block'>
                    { errors.name.message }
                  </span>
                }
              </div>
              {/* Apellidos */}
              <div>
                <label 
                  htmlFor='surnamesId'
                  className='inline-block w-24 text-blue-700'
                >
                  {textObject.budget.personalData.surnames}
                </label>
                <input 
                  type='text'
                  id='surnamesId'
                  name='surnames'
                  autoComplete='off'
                  className='
                    w-60 bg-transparent outline-none
                    focus:border-b-blue-700 focus:border-b-2
                  '
                  placeholder='apellidos'
                  {...register('surnames', {
                    required: {
                      value: true,
                      message: `${textObject.budget.messageInputs.messageRequire}`
                    },
                    pattern: {
                      value: /^[a-zA-Z \u00C0-\u017F]{2,40}$/,
                      message: `${textObject.budget.messageInputs.messagePatternSurnames}`
                    }
                  })}
                />
                { errors.surnames && 
                  <span className='text-red-700 text-sm w-[100%] block'>
                    { errors.surnames.message }
                  </span>
                }
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              {/* Teléfono */}
              <div>
                <label 
                  htmlFor='phoneId' 
                  className='inline-block w-24 text-blue-700'
                >
                  {textObject.budget.personalData.phone}
                </label>
                <input 
                  type='tel'
                  id='phoneId'
                  name='phone'
                  autoComplete='off'
                  className='
                    w-60 bg-transparent outline-none
                    focus:border-b-blue-700 focus:border-b-2
                  '
                  placeholder='teléfono'
                  {...register('phone', {
                    required: {
                      value: true,
                      message: `${textObject.budget.messageInputs.messageRequire}`
                    },
                    pattern: {
                      value: /^(6|7|8|9)[0-9]{8}$/,
                      message: `${textObject.budget.messageInputs.messagePatternPhone}`
                    }
                  })}
                />
                { errors.phone && 
                  <span className='text-red-700 text-sm w-[100%] block'>
                    { errors.phone.message }
                  </span>
                }
              </div>
              {/* Email */}
              <div>
                <label 
                  htmlFor='emailId' 
                  className='inline-block w-24 text-blue-700'
                >
                  {textObject.budget.personalData.email}
                </label>
                <input 
                  type='email'
                  id='emailId'
                  name='email'
                  autoComplete='off'
                  className='
                    w-60 bg-transparent outline-none
                    focus:border-b-blue-700 focus:border-b-2
                  '
                  placeholder='tucorreo@gmail.com'
                  {...register('email', {
                    required: {
                      value: true,
                      message: `${textObject.budget.messageInputs.messageRequire}`
                    },
                    pattern: {
                      value: /\w+@\w+\.[a-z]{2,4}/,
                      message: `${textObject.budget.messageInputs.messagePatternEmail}`
                    }
                  })}  
                />
                { errors.email && 
                  <span className='text-red-700 text-sm w-[100%] block'>
                    { errors.email.message }
                  </span>
                }
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    );
  };

  /* Presupuesto */
  const renderBudgetData = () => {
    return (
      <div>
        {/* Presupuesto */}
        <fieldset className='mt-7 p-2'>
          <legend 
            className='
              w-full text-lg spanOrange mb-5
              pl-2 border-2 border-gray-400
            '
          >
            {textObject.budget.budgetData.title}
          </legend>
          <div className='flex flex-col gap-y-4 md:ml-5 md:flex-row md:justify-between md:gap-x-26'>
            <div>
              {/* Productos */}
              <div className='flex flex-col gap-5'>
                {/* Selecciona producto */}
                <div className='flex flex-col'>
                  <label 
                    htmlFor='productSelectId' 
                    className='leading-loose pr-2 text-blue-700'
                  >
                    {textObject.budget.budgetData.productSelect.selectTitle}
                  </label>
                  <select 
                    id='productSelectId'
                    name='productSelect'
                    className='bg-transparent md:text-[16px] outline-none w-[170px]'
                    {...register('productSelect', {
                      required: {
                        value: true,
                        message: `${textObject.budget.messageInputs.messageRequire}`
                      }
                    })}
                  >
                    <option className='text-sm' value=''>{textObject.budget.budgetData.productSelect.selectName0}</option>
                    <option className='text-sm' value='product-1'>{textObject.budget.budgetData.productSelect.selectName1}</option>
                    <option className='text-sm' value='product-2'>{textObject.budget.budgetData.productSelect.selectName2}</option>
                    <option className='text-sm' value='product-3'>{textObject.budget.budgetData.productSelect.selectName3}</option>
                  </select>
                  { errors.productSelect && 
                    <span className='text-red-700 text-sm w-[100%] block'>
                      { errors.productSelect.message }
                    </span>
                  }
                </div>
                {/* Mostrar precio del producto */}
                <div>
                  <label 
                    htmlFor='priceProductId' 
                    className='leading-loose pr-2 text-blue-700'
                  >
                    {textObject.budget.budgetData.productPriceText}
                  </label>
                  <input 
                    type='number'
                    id='priceProductId'
                    name='priceProduct'
                    value={watch('priceProduct') || 0}
                    disabled
                    className='
                      bg-transparent outline-none w-[25%]
                      focus:border-b-blue-700 focus:border-b-2 
                    ' 
                    {...register('priceProduct')}
                  />
                </div>
              </div>
              {/* Extras */}
              <div className=''>
                {/* Selecciona extras */}
                <div>
                  <p className='text-blue-700 pb-2 mt-4'>
                    {textObject.budget.budgetData.extras.title}
                  </p>
                </div>
                <div className='flex flex-col gap-3'>
                  {extras.map((extraName) => (
                    <div className='flex items-center' key={extraName}>
                      <input
                        type='checkbox'
                        id={`${extraName}Id`}
                        name={extraName}
                        {...register(extraName)}
                        onChange={handleChange}
                      />
                      <label htmlFor={`${extraName}Id`} className='pl-2'>
                        {extraName === 'extraBase'
                        ? `${textObject.budget.budgetData.extras.extrasName.extraBaseText}`
                        : extraName === 'extraCover'
                        ? `${textObject.budget.budgetData.extras.extrasName.extraCoverText}`
                        : extraName === 'extraCase'
                        ? `${textObject.budget.budgetData.extras.extrasName.extraCaseText}`
                        : `${textObject.budget.budgetData.extras.extrasName.extraColorText}`}
                      </label>
                    </div>
                  ))}
                </div>
                {/* Mostrar precio total: de los extras */}
                <div>
                  <label 
                    htmlFor='priceExtrasId' 
                    className='leading-loose pr-2 text-blue-700'
                  >
                    {textObject.budget.budgetData.extras.priceExtrasText}
                  </label>
                  <input 
                    type='number'
                    id='priceExtrasId'
                    name='priceExtras'
                    value={watch('priceExtras') || 0}
                    disabled
                    className='
                      bg-transparent outline-none w-[25%] mt-5
                      focus:border-b-blue-700 focus:border-b-2 
                    ' 
                    {...register('priceExtras')}
                  />
                </div>
                {/* Mostrar precio total: de producto + extras */}
                <div>
                  <label 
                    htmlFor='priceProductExtrasId' 
                    className='leading-loose pr-2 text-blue-700'
                  >
                    {textObject.budget.budgetData.extras.priceProductExtrasText}
                  </label>
                  <input 
                    type='number'
                    id='priceProductExtrasId'
                    name='priceProductExtras'
                    value={(watch('priceProductExtras') || 0)}
                    disabled
                    className='
                      bg-transparent outline-none w-[25%] mt-5
                      focus:border-b-blue-700 focus:border-b-2 
                    ' 
                    {...register('priceProductExtras')}
                  />
              </div>
              </div>
            </div>
            <div>
              {/* Tiempo de entrega */}
              <div className='flex flex-col'>
              <div>
                <label 
                  htmlFor='deliveryTimeId'
                  className='leading-loose pr-2 text-blue-700'
                >
                  {textObject.budget.budgetData.deliveryTime.title}
                </label>
              </div>
              <div className='flex gap-x-6'>
                <input 
                  type='number'
                  id='deliveryTimeId'
                  name='deliveryTime'
                  step='30' max='90' min='30'
                  className='
                    focus:border-b-blue-700 focus:border-b-2 
                    border-b border-b-slate-700 outline-none
                    bg-transparent
                  '
                  {...register('deliveryTime', {
                    required: {
                      value: true,
                      message: `${textObject.budget.messageInputs.messageRequire}`
                    }
                  })}
                />
                <p className='leading-loose pl-2'>{textObject.budget.budgetData.deliveryTime.text}</p>
                { errors.deliveryTime && 
                  <span className='text-red-700 text-sm w-[100%] block'>
                    { errors.deliveryTime.message }
                  </span>
                }
              </div>
              {/* Mostrar descuento */}
              <div className='mt-5'>
                <label 
                  htmlFor='discountId' 
                  className='leading-loose pr-2 text-blue-700'
                >
                  {textObject.budget.budgetData.discountText}
                </label>
                <input 
                  type='number'
                  id='discountId'
                  name='discount'
                  value={watch('discount') || ''}
                  disabled
                  className='
                    bg-transparent outline-none w-[25%]
                    focus:border-b-blue-700 focus:border-b-2 
                  ' 
                  {...register('discount')}
                />
              </div>
              </div>       
              {/* Mostrar presupuesto estimado pvp/€ */}
              <div>
                <label 
                  htmlFor='pvpFinalId' 
                  className='leading-loose pr-2 text-blue-700'
                >
                  {textObject.budget.budgetData.estimatedBudgetText}
                </label>
                <input
                  type='number'
                  id='pvpFinalId'
                  name='pvpFinal'
                  value={`${watch("pvpFinal") || 0}`}
                  disabled
                  className='
                    bg-transparent outline-none w-[25%] mt-4 md:mt-7
                    focus:border-b-blue-700 focus:border-b-2 md:w-[20%] 
                  '
                  {...register('pvpFinal')}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    );
  };

  /* 
    Aceptación de Condiciones,
    Envio y reseteo del formulario
  */
  const renderAcceptanceConditions = () => {
    return (
      <div>
        {/* Aceptación de Condiciones */}
        <fieldset className='mt-7 p-2'>
          <legend 
            className='
              w-full text-lg spanOrange mb-5 
              pl-2 border-2 border-gray-400
            '
          >
            {textObject.budget.acceptanceConditions.title}
          </legend>
          <div className='privacy flex-col'>
            <label 
              htmlFor='privacyId' 
              className='pr-2'
            >
              {textObject.budget.acceptanceConditions.text}
            </label>
            <input 
              type='checkbox'
              id='privacyId'
              name='privacy'
              className='outline-none'
              {...register('privacy', {
                required: {
                  value: true,
                  message: `${textObject.budget.messageInputs.messageRequire}`
                }
              })} 
            />
           
          </div>
          { errors.privacy && 
            <span className='text-red-700 text-sm w-[100%] block'>
              { errors.privacy.message }
            </span>
          }
        </fieldset>
        {/* Envio del formulario */}
        <div className='
          flex justify-center gap-12 mt-3 bgDark text-slate-200'
        >
          <input 
            type='submit' 
            value={textObject.budget.acceptanceConditions.submitReset.submitValue} 
            name='submit' 
            id='submit' 
            className='hover:scale-110 hover:text-green-400 cursor-pointer p-3 tracking-widest'
          />
        </div>
      </div>
    );
  };

  return (
    <Section
      classDivSection='
        section-budgetWorkjs h-[100%] w-[100%] mx-auto
      '
      idSection='budgetWorkjs'
      classDivTitleSection='relative pt-16 max-w-[400px] mx-auto'
      classContainerTitleSection='relative w-full'
      classSpanTitleSection=''
      classTitleSection='
        relative z-20 text-center font-bold
        text-2xl text-blue-700 underline p-10
      '
      textTitleSection={textObject.titleSections.budget}
    >
    <div className='flex flex-col justify-center items-center mb-10 relative z-20'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-[100%] max-w-[700px] bg-slate-200 p-4'>
        {renderPersonalData()}
        {renderBudgetData()}
        {renderAcceptanceConditions()}
      </form>
    </div>
   </Section>
  )
}

export default Budget