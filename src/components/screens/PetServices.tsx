import React from 'react';
import BackGround from '../layout/BackGround';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import PetSitter from '../layout/PetSitter';

export default function PetServices(){
    return(
        <div className='Container
        '>
            <BackGround>
                <div className='InerContainer'>
                    <Header/>
                        <PetSitter/>
                    <Footer/>
                </div>
            </BackGround>
        </div>
    );
};
