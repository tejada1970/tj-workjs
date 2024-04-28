import { motion } from 'framer-motion';
import { FadeIn } from '@/utils/scripts-js/variants';
import Image from "next/image";
import { FaShoppingCart } from 'react-icons/fa';

const ArrayProducts = (props) => {
  /* Extrae las props necesarias para los array */
  const { array, images, imagesPaths } = props;
  return (
    <div 
      className='
        grid grid-cols-1 gap-20 place-items-center h-[100%]
        max-w-[1400px] mx-auto md:grid-cols-2 
        lg:grid-cols-3 lg:px-3 xl:grid-cols-4 xl:px-7
      '
    >
      {props.children}
      {array.map((item, index) => (
        <div key={index}>
          <div className={props.cardClassName} id={item.idProduct}>
            <div className={props.cardHeaderClassName}>
                <Image
                  src={images(imagesPaths[index])}
                  alt={`image product ${[index + 1]}`}
                  width={'100%'}
                  height={'100%'}
                  priority
                  className='w-full h-[250px] object-fill'
                />
            </div>
            <div className={props.cardBodyClassName}>
                <div>
                <motion.p
                  variants={FadeIn('up', 0.2)}
                  initial='hidden'
                  whileInView='show'
                  viewport={{ once: true, amount: 0.5 }}
                  className='text-lg my-2'
                >
                  {item.name} {[index + 1]}
                </motion.p>
                <motion.p
                  variants={FadeIn('up', 0.5)}
                  initial='hidden'
                  whileInView='show'
                  viewport={{ once: true, amount: 0.5 }}
                  className='text-md'
                >
                  {item.description}
                </motion.p>
                <motion.p
                  variants={FadeIn('up', 0.8)}
                  initial='hidden'
                  whileInView='show'
                  viewport={{ once: true, amount: 0.5 }}
                  className='text-md mt-2'
                >
                  {item.price}
                </motion.p>
              </div>
            </div>
            <button className=
              {`
                w-full mt-4 text-md p-2 bg-orange-600 
                text-slate-200 group-hover:bg-blue-700
                ${props.buttonBuy}
              `}
            >
              <FaShoppingCart size='22px' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ArrayProducts