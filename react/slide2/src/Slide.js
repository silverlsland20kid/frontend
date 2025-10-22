import React, { useEffect, useRef, useState } from 'react'
import './Slide.css';
import './Main1.css';

const slideData = [
    {
    img: 'https://picsum.photos/400/400?randam=1',
    text: '민생회복\n소비쿠폰\n사용 가능합니다',
  },
  {
    img: 'https://picsum.photos/400/400?randam=2',
    text: '민생회복\n소비쿠폰\n사용 가능합니다',
  },
  {
    img: 'https://picsum.photos/400/400?randam=3',
    text: '민생회복\n소비쿠폰\n사용 가능합니다',
  },
]

export default function Slide() {

    const [current, setCurrent] = useState(0); // 현재 슬라이드 인덱스
    const [isPlying, setisPlying] = useState(true); // 자동재생 여부
    const intervalRef = useRef(null); // 인터벌 id 저장(리렌더와 무관하게 유지). 참조(ref)

    // 자동재생 로직: isPlaying이 바뀔 때마다 인터벌을 재설정
    // 의존성 배열([isPlying])에 포함된 값이 변경될 때마다 이 안의 콜백이 다시 실행됨=> 
    useEffect(() => {
        if(isPlying) {
            intervalRef.current = setInterval(()=>{
                // 모듈로(%) 연산: 마지막 다음은 0으로 순환(loop)
                // prev 콜백: 최신 state를 안전하게 참조. prev는 우리가 만든 게 아니라, React가 “이전 상태값”을 자동으로 콜백 인자로 넘겨주는 약속된 구조
                // 그래서 setCurrent(prev => prev + 1)처럼 쓰면 비동기 상황에서도 항상 최신 상태로 안전하게 업데이트 가능. 걍 외워
                setCurrent(prev => (prev+1) % slideData.length);
            },3000);
        }
        return () => clearInterval(intervalRef.current);
    },[isPlying])// 의존성 배열: isPlying이 true ↔ false로 바뀔 때마다 effect 재실행


    // 수동 슬라이드 (도트 클릭 등으로 특정 인덱스로 이동)
    const goToSlide = (index) => {
        setCurrent(index);
    }

    // 재생&일시정지 토글 버튼
    const togglePlay = () => {
        setisPlying(!isPlying); // 현재 상태 반대로 변경 (true → false / false → true)
    }

    return (
        <div className='slide-area'>
            {/* slideData 배열 순회 */}
            {slideData.map((slide, index) => (
                <div key={index} className={`slide ${index === current ? 'active' : ''} `}> 
                {/* ↑ 배열을 JSX로 변환할 땐 key가 필수, 백틱기호로 작성해야 변수로 인식함. *삼항연산자 조건: index === current면 active 클래스 추가*/}

                    <img src={slide.img}/>
                    <div className='slide-text'>
                        <h2>
                            {/* \n 기준으로 줄바꿈 처리 */}
                            {/* split('\n'): 문자열을 \n 단위로 잘라 배열로 반환 */}
                            {/* map((line,i))로 각 줄을 <span>요소로 감싸 렌더링 */}
                            {slide.text.split('\n').map((line,i)=><span key={i}>{line}<br/></span>)}
                        </h2>
                    </div>
                </div>
            ))}

            {/* 하단 페이지 버튼(도트 + 재생버튼) */}
            <div className='pager'>
                {/* 도트: 현재 슬라이드(current)와 일치하면 active 클래스 부여 */}
                {slideData.map((_, idx)=>(
                    <button 
                    key={idx} 
                    className={`pager-dot ${idx === current ? 'active' : ''}`} 
                    onClick={() => goToSlide(idx)}> {/* 이벤트 핸들러: 콜백 함수 형태 */} 
                    </button>
                ))}
                <button className='stop-btn' onClick={togglePlay}>
                    {isPlying ? '⏸' : '▶'}
                </button>
            </div>
        </div>
    )
}
