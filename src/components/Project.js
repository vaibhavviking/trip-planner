import React, { useEffect } from 'react';

export default function Project({ title, img, desc, open, close, dist, time, exp }) {
    useEffect(() => {

        let acc = document.getElementsByClassName("accordion");
        let i, j;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                console.log(i);
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.height == '0px') {
                    panel.style.height = null;
                }
                if (panel.style.height) {
                    panel.style.height = '0px';
                } else {
                    for (j = 0; j < acc.length; j++) {
                        acc[j].classList.remove('active');
                        let temppanel = acc[j].nextElementSibling;
                        temppanel.style.height = '0px';
                        // console.log('hide all done')
                    }

                    panel.style.height = '-moz-fit-content';
                    panel.style.height = '-webkit-fit-content';
                }
            });
        }
    });
    return (
        <div className="punit tw-mx-0 tw-my-8" >
            <button className="accordion tw-rounded-lg">{title}</button>
            <div style={{height:"0px"}} className="panel tw-py-0 tw-px-[18px] tw-bg-white tw-overflow-hidden tw-text-center md:tw-flex md:tw-text-left">
                <div className="pimg tw-max-w-[400px] tw-my-5 tw-mx-auto">
                    <img className="tw-w-[100%]" src={img} />
                </div>
                <div className="tw-p-[2%] md:tw-max-w-[60%] tw-mx-auto">
                    <p>{desc}</p>
                    <p>Opening time: {open}</p>
                    <p>Closing time: {close}</p>
                    <p>Distance from you: {dist}</p>
                    <p>Time needed to explore: {time}</p>
                    <p>Estimated expenditure: {exp}</p>
                </div>
            </div>
        </div>
    )
}