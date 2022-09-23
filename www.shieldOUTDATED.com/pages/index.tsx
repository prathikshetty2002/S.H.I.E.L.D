import { LazyMotion, m } from "framer-motion";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

// import { SwiperSlide, Swiper } from "swiper/react"; //install npm swiper
// import 'swiper/css'; //swiper styles, add more based upon features used

// import { IKImage } from "imagekitio-react";


const Footer = dynamic(() => import("../components/Footer"));

const Home: NextPage = () => {
  
  // const slides: any[] = []; //slides array to go in SwiperSlide
  // [1,2,3,4,5].forEach((d) => {
  //     slides.push(
  //         <SwiperSlide tag="li" key={`drink-${d.name}`}>
  //             <div>
  //                 <IKImage
  //                     loading="lazy"
  //                     path={`/d`}
  //                     width="348"
  //                     height="523"
  //                     transformation={[
  //                         {
  //                             width: 348,
  //                             height: 523,
  //                             radius: 25,
  //                             quality: 75,
  //                         },
  //                     ]}
  //                     className="mx-auto w-full list-none rounded-[25px]"
  //                     alt={`drink ${d.name}`}
  //                 />
  //             </div>
  //         </SwiperSlide>
  //     );
  // }); 

  
  return (
        <m.div
            initial={{
                opacity: 0,
                y: -50,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 50,
            }}
        >
            <main>
                {/* Container for swiper */}
            {/* <div className="w-11/12 md-w-full relative z-0"> 
                <Swiper
                    tag="section"
                    wrapperTag="ul"
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {slides}
                </Swiper>
            </div> */}
              <h1>Home</h1>
            </main>

            <Footer />
        </m.div>
    );
};

export default Home;
