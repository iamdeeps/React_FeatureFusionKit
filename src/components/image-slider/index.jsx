import React, { useEffect, useState } from "react"
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'
import './styles.css'

export const ImageSlider = ({url, limit = 5, page = 1}) => {
    const [imageData, setImagesData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [error, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchImages = async (getUrl) => {
        try {
            setLoading(true)
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`)
            const data = await response.json()
            if(data){
                setImagesData(data)
                setLoading(false)
            } 
        } catch (error) {
            setErrorMsg(error.message)
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if(url){
            fetchImages(url)
        }
    },[url])

    const handlePrevious = () => {
        setCurrentSlide(currentSlide === 0 ? imageData.length - 1 : currentSlide - 1)
    }

    const handleNext = () => {
        setCurrentSlide(currentSlide === (imageData.length - 1) ? 0 : currentSlide + 1)
    }

    return (
        <div className="container">
            {
                loading && <div>Loading Data! Please wait</div>
            }
            {
                error && <div>Error Occured! {error}</div>
            }
            {
                !loading && imageData.length && (
                    <div className="image-slider">
                        <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left"/>
                        {
                            imageData.map((image, index) => {
                                return (
                                    <img
                                        key={index}
                                        alt={image.download_url}
                                        src={image.download_url}
                                        className={currentSlide === index ? "current-image" : "current-image hide-current-image"}
                                    />
                                )
                            })
                        }
                        <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right"/>
                        <span className="circle-indicators">
                            {
                                imageData && imageData.length ?
                                imageData.map((_,index) => <button
                                key={index}
                                className={currentSlide === index ? "current-indicators" : "current-indicators inactive-indicators"}
                                onClick={() => setCurrentSlide(index)}
                                ></button>) : null
                            }
                        </span>
                    </div>
                )
            }
        </div>
    )
}