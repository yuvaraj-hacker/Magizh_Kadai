import SwiperMin from '../Home/SwiperMin'
import { frequent } from './Frequent'


function BoughtTogether() {
    return (
        <>
            <section className='px-5 mx-auto'>
                <div>
                    <div>
                        <SwiperMin product={frequent} title="Frequently Bought Together" />
                    </div>
                </div>
            </section>
        </>
    )
}
export default BoughtTogether



