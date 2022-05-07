import React from 'react';
import s from '../css/Footer.module.css'
import { UilGithubAlt } from '@iconscout/react-unicons'
import { UilEnvelopeAlt } from '@iconscout/react-unicons'


//하단 표현
const Footer = () => {
    return (
        <div className={s.footer}>
            <div className={s.footerContainer}>
                <div>
                    <h1 className={s.footerTitle}>Let's Be CEO</h1>
                    <p>Commercial Area Analysis Service.</p>
                </div>
                
                <div className={s.footerLink}>
                    <div className={s.footerLinkTitle}>
                        <h1 className={s.linkTitle}>Contact Us</h1>
                    </div>
                    <div className={s.footerLinkIcon}>
                        <h1 className={s.linkTitle}><UilGithubAlt/></h1>
                        <h1 className={s.linkTitle}><UilEnvelopeAlt/></h1>
                    </div>
                    {/* <Link to ='www.naver.com'></Link> */}
                </div>
            </div>
            <p class={s.footerCopy}>&#169; Let's Be CEO. All right reserved</p>           
        </div>
    );
};

export default Footer;