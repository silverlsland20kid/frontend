import React from 'react'
import Slide from './Slide'


const products = [
    {
        img: "/images/2025-8-26_event(5).jpg",
        name: "밤이 통통 케이크",
        category: "Cake",
    },
    {
        img: "/images/2025-8-26_event(2).jpg",
        name: "카라멜부케",
        category: "Cake",
    },
    {
        img: "/images/2025-4-8_event(5).jpg",
        name: "스트로베리 퀸",
        category: "Cake",
    },
]

export default function Main1() {
    return (
        <div className='main-container'>
            <div className='main-section'>
                <div className='left-slide'>
                    <Slide/>
                </div>
                <div className='right-products'>
                    <div className='product-main'>
                        <img src={products[0].img} alt={products[0].name}/>
                        <h4>{products[0].name}</h4>
                        <span>{products[0].category}</span>
                    </div>

                    <div className='product-side'>
                        {/* slice(1)은 배열의 두 번째(index 1)부터 끝까지 잘라서 반환 */}
                        {/* 즉, products[1], products[2]만 순회하게 됨 */}
                        {products.slice(1).map((p, i) => (
                            <div key={i} className='side-item'>
                                <img src={p.img} alt={p.name}/>
                                <h4>{p.name}</h4>
                                <span>{p.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 하단배너 */}
            <div className='bottom-banner'>
                <div className='bottom-content'>
                        <img src="./images/main_section_banner.jpg"/>
                </div>
            </div>
        </div>
    )
}
