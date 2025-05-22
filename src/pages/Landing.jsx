import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Autoplay from 'embla-carousel-autoplay'
import companies from '../data/companies.json'
import faq from '../data/faq.json'

// Animation variant for fade-in
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const Landing = () => {
  const imageRef = useRef(null)

  // Scroll-based transform for horizontal image movement
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      
      {/* Title */}
      <motion.section
        className='text-center'
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h1 className='gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4'>
          "Launch Your Career Today <br /> Apply Now!"
        </h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>
          Search. Hire. Succeed – All in One Platform
        </p>
      </motion.section>

      {/* Buttons */}
      <motion.div
        className='flex gap-6 justify-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link to="/jobs">
          <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>
        <Link to="/post-job">
          <Button size="xl" variant="destructive">Post Jobs</Button>
        </Link>
      </motion.div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img src={path} alt={name} className='h-9 sm:h-14 object-contain' />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>

      {/* Scroll-Animated Image */}
      <motion.img
        ref={imageRef}
        className='w-full h-240 object-cover'
        src="./benner.jpg"
        alt="banner"
        style={{ x }}
      />

      {/* FAQ Accordion */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Accordion type="single" collapsible>
          {faq.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>
    </main>
  )
}

export default Landing
