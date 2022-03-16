import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "../../css/MainSlider.module.css";
import logo from "../../img/logo.png"
import bg1080 from "../../img/bg1080.png";


export default function MainSlider() {
    const settings = {
        dots : true,
        infinite: true,
        arrows : false,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <div className={styles.slider}>
            <Slider {...settings}>
                <div className={styles.slider_items}>
                    <img className={logo.img} src={logo}></img>
                </div>
                <div className={styles.slider_items}>
                    <h1>react-slick Slider Test</h1>
                </div>
                <div className={styles.slider_items}>
                    <h1>react-slick Slider Test</h1>
                </div>
                <div className={styles.slider_items}>
                    <h1>react-slick Slider Test</h1>
                </div>
            </Slider>
        </div>
    );
}