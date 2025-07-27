import React, { useState, useEffect } from 'react'
import { PlayArrow } from '@mui/icons-material'
import 'animate.css'
import Navbar from '../../components/Navbar'

const heroData = [
    {
    image: "/assets/DSC_3875.jpg",
    title: "Welcome to the LOGIC Church Port Harcourt",
    desc: "Here we preach the love of God for Us alone"
  },
  {
    image: "/assets/DSC_1869.jpg",
     title: "Worship in Spirit and Truth",
    desc: "Come as you are and experience the transforming power of worship"
  },
  {
    image: "/assets/DSC_4518.jpg",
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },

   {
    image: "/assets/DSC_3738.jpg",
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },
   {
    image: "/assets/DSC_9900.jpeg",
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },
   {
    image: "/assets/DSC_4518.jpg",
    title: "Experience God's Love Together",
    desc: "Join our community in worship and fellowship every Sunday"
  },
  
]

export default function HomeIndex() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [progress, setProgress] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [loadedImages, setLoadedImages] = useState(new Set())

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroData.length)
      setDisplayedText('')
      setProgress(0)
    }, 10000)

    return () => clearInterval(slideInterval)
  }, [])

  useEffect(() => {
    const currentDesc = heroData[currentSlide].desc
    let index = 0
    setDisplayedText('')
    
    const textInterval = setInterval(() => {
      if (index < currentDesc.length) {
        setDisplayedText(currentDesc.slice(0, index + 1))
        index++
      } else {
        clearInterval(textInterval)
      }
    }, 50)

    return () => clearInterval(textInterval)
  }, [currentSlide])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 1
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [currentSlide])

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroData.map((item, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]))
            resolve(img)
          }
          img.onerror = reject
          img.src = item.image
        })
      })

      try {
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.warn('Some images failed to preload:', error)
        setImagesLoaded(true) // Still show content even if some images fail
      }
    }

    preloadImages()
  }, [])

  return (
    <>
    <Navbar />
    <div className="relative h-screen w-full overflow-hidden">
      {/* Loading Placeholder */}
      {!imagesLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-semibold">Loading ...</p>
          </div>
        </div>
      )}

      {/* Background Images */}
      {heroData.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            style={{
              filter: loadedImages.has(index) ? 'none' : 'blur(10px)',
              transform: loadedImages.has(index) ? 'scale(1)' : 'scale(1.1)',
              transition: 'all 0.6s ease-out'
            }}
          />
          
          {/* Individual image loading overlay */}
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6 transition-opacity duration-500 ${
        imagesLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Title */}
          <h1 
            key={`title-${currentSlide}`}
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight animate__animated animate__fadeInUp"
          >
            {heroData[currentSlide].title}
          </h1>

          {/* Animated Description */}
          <p 
            key={`desc-${currentSlide}`}
            className="text-xl md:text-2xl lg:text-3xl text-gray-200 min-h-[2.5rem] md:min-h-[3rem] animate__animated animate__fadeInUp animate__delay-1s"
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Buttons */}
          <div  className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button className="bg-gradient-red text-white px-8 py-4 animate__animated animate__fadeInUp rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Join us this Sunday
            </button>
            <button className="flex items-center gap-2 animate__animated animate__fadeInUp backdrop-blur-sm bg-white/10 border border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              <PlayArrow className="text-2xl" />
              Watch Live
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div
          className="h-full bg-gradient-red transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>


    </div>

     </>
  )
}
