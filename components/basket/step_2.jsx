import React, {useContext, useState} from 'react';
import styles from '../../styles/basket.module.css';
import {Button, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {paymentSignIn} from "../../store/payment/actions";
import {t, validateArmenianOrRussianPhoneNumber} from "../../utils/utils";
import RateContext from "../../providers/rateContext";

const Step2 = ({total,prevStep,next,setValues,region}) => {
    const [currentStep, setCurrentStep] = useState(2);
    const [activeId, setActiveId] = useState(1)
    const {price, currentRate} = useContext(RateContext)

    function checkSelect(){
        setValues((prev)=>{
            return {
                ...prev,
                paymentType:activeId
            }
        });

        next(3)
    }
    function clickItem(id){
        setActiveId(id)

    }
    return (
        <div>
            <div className={styles.row}>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 1 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>1</span>
                </div>
                <div className={styles.line}/>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 2 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>2</span>
                </div>
                <div className={styles.line}/>
                <div
                    className={`${styles.circleNumber} ${currentStep >= 3 ? styles.active : ''}`}
                >
                    <span className={styles.radius}>3</span>
                </div>
            </div>


                    <div className={styles.shoppingLast}>
                        <div className={styles.shoppingResult}>
                                    <span>{t("pricesTotal")}:</span>
                                    <span> {price(total)} {currentRate?.current}</span>
                        </div>
                    </div>
                <div className={styles.buttonsForm}>
                    <Button onClick={prevStep} type="primary" htmlType="button">
                        {t('back')}
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={checkSelect}>
                        {t('next')}
                    </Button>
                </div>
            </div>

    );
};

export default Step2;
