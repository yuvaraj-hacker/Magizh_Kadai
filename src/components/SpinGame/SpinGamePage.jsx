import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Spingame from '../../shared/Components/SpinGame/SpinGame'
import { toBlob } from 'html-to-image'
import apiurl from '../../shared/services/apiendpoint/apiendpoint'

export default function SpinGamePage() {

    const [isSpinning, setIsSpinning] = useState(false)
    const [loading, setloading] = useState(false)
    const [data, setData] = useState({})
    const [alreadySpinned, setAlreadySpin] = useState(false)
    const [currentRotation, setCurrentRotation] = useState(-30)
    const [result, setResult] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({})
    const [submitted, setSubmitted] = useState(null)
    const wheelRef = useRef(null)
    const imageRef = useRef(null)
    const segments = [
        { Offer: '₹50 Off', color: 'from-red-500 to-red-600', icon: '🎯' },
        { Offer: 'Better Luck', color: 'from-purple-500 to-purple-600', icon: '🥹' },
        { Offer: '₹30 Off', color: 'from-blue-500 to-blue-600', icon: '💸' },
        { Offer: '₹35 Off', color: 'from-yellow-500 to-yellow-600', icon: '🎁' },
        { Offer: '₹40 Off', color: 'from-green-500 to-green-600', icon: '💫' },
        { Offer: '₹45 Off', color: 'from-pink-500 to-pink-600', icon: '🏆' },
    ]

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem('Mk_spingame'))
        const finished = JSON.parse(localStorage.getItem('Mk_spingame2'))
        if (finished) {
            setData(finished)
            setSubmitted('Success')
            setAlreadySpin(true)
            setResult(item)
        } else if (item) {
            setResult(item)
            item.Offer != 'Better Luck' && setAlreadySpin(true)
        }
    }, [])


    const handleSpin = () => {
        if (isSpinning || alreadySpinned) return
        setIsSpinning(true)
        setResult(null)
        setShowForm(false)
        const randomRotation = Math.random() * 1800 + 1800
        const finalRotation = currentRotation + randomRotation
        setCurrentRotation(finalRotation)
        setTimeout(() => {
            const normalizedRotation = finalRotation % 360
            const segmentAngle = 360 / segments.length
            // const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length
            const segmentIndex = Math.floor((360 - normalizedRotation + segmentAngle) / segmentAngle) % segments.length
            const selectedSegment = segments[segmentIndex]
            setResult(selectedSegment)
            localStorage.setItem('Mk_spingame', JSON.stringify(selectedSegment))
            setTimeout(() => {
                if (selectedSegment && selectedSegment.Offer != 'Better Luck') {
                    setShowForm(true)
                    setIsSpinning(false)
                }
            }, 3000)
        }, 5000)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        const res = await fetch(`${apiurl()}/spingame/apispin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ formData }),
        });
        const dt = await res.json();
        if (dt?.message == 'Success') {
            setData(dt)
            setSubmitted('Success')
            setloading(false)
            localStorage.setItem('Mk_spingame2', JSON.stringify(dt))
            // if (dt.qrCode) {
            //     setTimeout(async () => {
            //         const shopNumber = '919677664197';
            //         const message = `Hi, I am ${formData.Name}. I just claimed my ${formData.Offer}${typeof formData.Offer == 'number' ? '%' : ''} OFF offer! 🎉\nHere is my mobile No: ${formData.Mobile}\nURL:${dt?.qrCode}`;
            //         const whatsappURL = `https://wa.me/${shopNumber}?text=${encodeURIComponent(message)}`;
            //         window.open(whatsappURL, '_blank');
            //     }, 3000);
            // }
        } else {
            setSubmitted('Failed')
            setloading(false)
        }
        setFormData({})
    }

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, Offer: result?.Offer, [field]: value }))
    }

    const handleShare = () => {
        const shopNumber = '919677664197';
        const formattedOffer = /^\d+$/.test(data.Offer) ? `${data.Offer}% OFF` : `${data.Offer} OFF`;
        const message = `Hi, I am ${data.Name}. I just claimed my ${formattedOffer} offer!\nHere is my mobile No: ${data.Mobile}\nURL: ${apiurl()}/${data?.Image}`;
        const whatsappURL = `https://wa.me/${shopNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    const handleDownload = async () => {
        const blob = await toBlob(imageRef.current);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.Name}-SpinGame-Contest.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    const shareTo = async () => {
        const newFile = await toBlob(imageRef.current);
        const data = {
            files: [
                new File([newFile], 'image.png', {
                    type: newFile.type,
                }),
            ],
            title: 'Image',
            text: 'image',
        };
        try {
            if (!navigator.canShare(data)) {
                console.error("Can't share");
            }
            await navigator.share(data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Spingame wheelRef={wheelRef} segments={segments} isSpinning={isSpinning} loading={loading} data={data} alreadySpinned={alreadySpinned} currentRotation={currentRotation} result={result} handleShare={handleShare} handleDownload={handleDownload} imageRef={imageRef}
                setShowForm={setShowForm} showForm={showForm} formData={formData} submitted={submitted} setSubmitted={setSubmitted} handleSpin={handleSpin} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} />
        </>
    )
}
