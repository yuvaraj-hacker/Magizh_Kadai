import { Download, Gift, Share, ShieldAlert, Sparkles, Star, Trophy, Zap } from 'lucide-react'
import moment from 'moment/moment'
import { useRef } from 'react'

export default function Spingame(props) {
  const { segments, wheelRef, isSpinning, loading, data, alreadySpinned, currentRotation, result, setShowForm, showForm, formData, submitted, setSubmitted, handleSpin,
    handleFormSubmit, handleInputChange, handleShare, handleDownload, imageRef } = props

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#024a34] via-emerald-600 to-[#83b45c]
 overflow-hidden relative'>
      <div className="absolute inset-0 overflow-hidden">
        {/* <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div> */}
        {/* <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div> */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-20 left-20 text-yellow-400 w-6 h-6 animate-bounce" style={{ animationDelay: '0s' }} />
        <Star className="absolute top-32 right-32 text-pink-400 w-5 h-5 animate-bounce" style={{ animationDelay: '1s' }} />
        <Gift className="absolute bottom-32 left-32 text-green-400 w-6 h-6 animate-bounce" style={{ animationDelay: '2s' }} />
        <Trophy className="absolute bottom-20 right-20 text-orange-400 w-5 h-5 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <Zap className="absolute top-1/2 left-10 text-blue-400 w-5 h-5 animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {(!showForm && !alreadySpinned) ? (
          <div className="text-center">
            {/* Header */}
            <article className="mb-8">
              <img src="/images/Logo/Logo.png" alt="" className="w-[150px] lg:w-[200px] mx-auto mb-5 bg-white p-3 rounded-2xl" />
              <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-300 drop-shadow-lg shadow-yellow-50 bg-clip-text text-transparent mb-4 animate-bounce ">
                SPIN TO WIN!!
              </h1>
              <p className="lg:text-xl text-gray-300 mb-2">Try your luck and win amazing discounts!</p>
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm">Get up to Flat <span className='font-semibold text-base'> ₹50</span> OFF</span>
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className='text-sm text-gray-200 pt-3 -mb-5'><span className='text-red-400'>*</span>Note: Valid only on spend above <span className='text-base text-white font-semibold'>₹299</span> </p>
            </article>

            {/* Spin Wheel Container */}
            <div className="relative mb-8">
              {/* Wheel Glow Effect */}
              <div className="absolute flex justify-center inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg opacity-30 scale-110 animate-pulse"></div>

              {/* Pointer */}
              <div className="absolute -bottom-5 right-1/2 transform translate-x-1/2 z-20">
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-[40px] border-l-transparent border-r-transparent border-b-white shadow-lg"></div>
              </div>

              {/* Spin Wheel */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto">
                <svg
                  ref={wheelRef}
                  className="w-full h-full transform transition-transform duration-[5s] ease-out"
                  style={{ transform: `rotate(${currentRotation + 30}deg)` }}
                  viewBox="0 0 200 200"
                >
                  {segments?.map((segment, index) => {
                    const angle = (360 / segments.length) * index
                    const nextAngle = (360 / segments.length) * (index + 1)
                    const startAngleRad = (angle * Math.PI) / 180
                    const endAngleRad = (nextAngle * Math.PI) / 180

                    const x1 = 100 + 90 * Math.cos(startAngleRad)
                    const y1 = 100 + 90 * Math.sin(startAngleRad)
                    const x2 = 100 + 90 * Math.cos(endAngleRad)
                    const y2 = 100 + 90 * Math.sin(endAngleRad)

                    const largeArcFlag = (nextAngle - angle) > 180 ? 1 : 0

                    const pathData = [
                      `M 100 100`,
                      `L ${x1} ${y1}`,
                      `A 90 90 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ]?.join(' ')

                    const textAngle = angle + (360 / segments.length) / 2
                    const textX = 100 + 60 * Math.cos((textAngle * Math.PI) / 180)
                    const textY = 100 + 60 * Math.sin((textAngle * Math.PI) / 180)

                    return (
                      <g key={index}>
                        <defs>
                          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={segment?.color?.split(' ')[1]?.split('-')[1] === 'red' ? '#ef4444' :
                              segment.color?.split(' ')[1]?.split('-')[1] === 'blue' ? '#3b82f6' :
                                segment.color?.split(' ')[1]?.split('-')[1] === 'green' ? '#10b981' :
                                  segment.color?.split(' ')[1]?.split('-')[1] === 'purple' ? '#8b5cf6' :
                                    segment.color?.split(' ')[1]?.split('-')[1] === 'yellow' ? '#f59e0b' :
                                      segment.color?.split(' ')[1]?.split('-')[1] === 'pink' ? '#ec4899' :
                                        segment.color?.split(' ')[1]?.split('-')[1] === 'indigo' ? '#6366f1' : '#f97316'} />
                            <stop offset="100%" stopColor={segment.color?.split(' ')[3]?.split('-')[1] === 'red' ? '#dc2626' :
                              segment.color?.split(' ')[3]?.split('-')[1] === 'blue' ? '#2563eb' :
                                segment.color?.split(' ')[3]?.split('-')[1] === 'green' ? '#059669' :
                                  segment.color?.split(' ')[3]?.split('-')[1] === 'purple' ? '#7c3aed' :
                                    segment.color?.split(' ')[3]?.split('-')[1] === 'yellow' ? '#d97706' :
                                      segment.color?.split(' ')[3]?.split('-')[1] === 'pink' ? '#db2777' :
                                        segment.color?.split(' ')[3]?.split('-')[1] === 'indigo' ? '#4f46e5' : '#ea580c'} />
                          </linearGradient>
                        </defs>
                        <path
                          d={pathData}
                          fill={`url(#gradient-${index})`}
                          stroke="white"
                          strokeWidth="2"
                          className="drop-shadow-lg"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize={typeof segment.Offer === 'number' ? '14' : '10'}
                          // fontSize={index < 3 ? ["12", "10", "12"][index] : "14"}
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className={`pointer-events-none select-none drop-shadow-md`}
                        >
                          {segment.Offer}{typeof segment.Offer === 'number' ? '%' : ''}
                        </text>
                        <text
                          x={textX}
                          y={textY + 15}
                          fill="white"
                          fontSize="16"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="pointer-events-none select-none"
                        >
                          {segment?.icon}
                        </text>
                      </g>
                    )
                  })}

                  {/* Center Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="20"
                    fill="url(#centerGradient)"
                    stroke="white"
                    strokeWidth="3"
                    className="drop-shadow-lg"
                  />
                  <defs>
                    <linearGradient id="centerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning || (result && result?.Offer == 'Better Luck')}
              className={`relative overflow-hidden px-12 py-4 rounded-full text-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${isSpinning
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-2xl'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
              <span className="relative z-10">
                {isSpinning ? 'SPINNING...' : 'SPIN NOW!'}
              </span>
            </button>

            {/* Result Display */}
            {result && (
              <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-4xl mb-2">{result.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{result?.Offer == 'Better Luck' ? 'Oops!' : 'Congratulations!'}</h3>
                  {result?.Offer === "Better Luck" ? (
                    <p className="text-lg text-red-400 mb-2">😞 Better luck next time!</p>
                  ) : result?.Offer ? (
                    <div>
                      <p className="text-lg text-yellow-400 mb-2">  You won {result?.Offer}{typeof result?.Offer === "number" && "% OFF!"} </p>
                      <p className="text-sm text-gray-100 animate-pulse"> 🎉 Claim form will appear shortly... </p>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Claim Form */
          <div className="w-full max-w-md mx-auto">
            {submitted == 'Success' ? (
              /* Success Message */
              <>
                <div ref={imageRef} id='qr-container' className='bg-gradient-to-br from-gray-900/85 to-gray-800/85' style={{ backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '24px', padding: '2rem', boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)', textAlign: 'center', color: 'white', }} >
                  <div className="w-20 h-20 bg-gradient-to-r from-lime-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <img src={data?.qrCode} alt="QR Code" className='mx-auto rounded-2xl mb-5 h-56 w-56 shadow-2xl' loading='lazy' />
                  <div className='text-xl lg:text-3xl mb-2'> 🎉
                    <span className=" font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-teal-400 mb-2 animate-pulse">
                      Congratulations!
                    </span> 🎊
                  </div>
                  <h2 className="text-2xl font-light text-white mb-4">{data?.Name} 🤩</h2>
                  <p className="text-gray-100 mb-4">
                    Your <span className='font-semibold text-xl text-lime-300'>{result?.Offer}{typeof result?.Offer === 'number' ? '% OFF' : ''}</span> is ready to be claimed!
                  </p>
                  <hr className='w-1/2 mx-auto opacity-30 border-gray-300' />
                  <div className="pt-3 lg:pt-5 text-gray-300 text-sm">
                    <em>{moment(data?.createdAt).format('D MMMM YYYY, hh:mm A')}</em>
                  </div>
                  <div className="mt-3 lg:mt-5 flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-6 mx-auto justify-center">
                  {/* <button
                    onClick={handleShare}
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
                  >
                    <Share className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Share</span>
                  </button> */}
                  {/* <a href={`${apiurl()}/${data?.Image}} download={${data.Name}-SpinGame-Contest.png`} className="group">   */}
                  <button
                    onClick={handleDownload}
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 active:scale-95"
                  >
                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
                    <span>Download</span>
                  </button>
                  {/* </a> */}
                </div>
              </>
            ) : submitted == 'Failed' ? (
              // already registered
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <ShieldAlert className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{"Invalid Mobile Number"}</h2>
                <p className="text-gray-200 mb-4">
                  The number you entered doesn't appear to be valid. Please check and try again.
                </p>
                <p className="text-sm text-gray-200">
                  If you believe this is a mistake or you need further assistance, please contact our support team.
                </p>
                <div className="mt-6">
                  <button
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-semibold shadow-md hover:scale-105 transition-transform"
                    onClick={() => { setShowForm(true), setSubmitted(null) }} // Or handle appropriately
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-2xl">
                <form onSubmit={handleFormSubmit}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Claim Your Offer!</h2>
                    <p className="text-gray-300">You won <span className='text-gray-100 font-semibold'>{result?.Offer}{typeof result?.Offer == 'number' && '% OFF'} </span>  Fill in your details to claim.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <input type="text" placeholder="Full Name" value={formData.Name} onChange={(e) => handleInputChange('Name', e.target.value)} required className="w-full px-4 py-4 bg-white/5 border border-white/40 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <div className="relative">
                        <input type="number" placeholder="Mobile Number" value={formData.Mobile} onChange={(e) => handleInputChange('Mobile', e.target.value)} required className="w-full px-4 py-4 bg-white/5 border border-white/40 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <button type='submit' className="w-full py-4 bg-gradient-to-r from-purple-600/70 to-blue-600/70  text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden" >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10">{loading ? `Loading...` : `🎁 CLAIM MY ${result?.Offer}${typeof result?.Offer == 'number' ? '% OFF' : ''}`}</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-200 text-center mt-4">
                    * By claiming this offer, you agree to receive promotional updates
                  </p>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div >
  )
}

