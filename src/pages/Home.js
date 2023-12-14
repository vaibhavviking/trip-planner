import React, { useEffect } from 'react'
import img1 from '../assets/india_gate.png'
import img2 from '../assets/red_fort.png'
import sql from '../assets/qutub_minar.png'
import Project from '../components/Project'
import { useState } from 'react'

export default function Projects() {

    const [data, setData] = useState([]);

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
                        console.log('hide all done')
                    }
                    panel.style.height = '-moz-fit-content';
                    panel.style.height = '-webkit-fit-content';
                }
            });
        }
        fetch('../data/data.json')
                .then((response) => response.json())
                .then((json) => setData(json));
    }, [])


    return (
        <div className="tw-pt-12 projects">
            <h1 className="tw-text-[2rem] tw-my-[3rem]">My Projects</h1>
            <div className="projectacc tw-w-[80%] tw-m-auto tw-text-left" >
                

                {data.forEach(obj => {
                    return (<Project title={obj['place']} img={obj['img']} desc={obj['description']} open={obj['opens']} close={obj['closes']} distance={obj['distance']} time={obj['time_spent']} exp={obj['expenditure']} />);
                })}
                
            </div>
        </div>
    )
}