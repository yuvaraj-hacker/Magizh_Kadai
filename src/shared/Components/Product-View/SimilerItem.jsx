import SwiperMin from '../Home/SwiperMin'


function SimilerItem({ similarItems }) {
    return (
        <>
            <section className='px-2 mx-auto'>
                <div>
                    <div>
                        <SwiperMin product={similarItems} title="Similar Items" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SimilerItem
