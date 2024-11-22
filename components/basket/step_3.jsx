import React, {useEffect, useState} from 'react';
import styles from '../../styles/basket.module.css';
import {Button, Form, Input, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {paymentSignIn} from "../../store/payment/actions";
import {t, validateArmenianOrRussianPhoneNumber} from "../../utils/utils";
import {LoadingOutlined} from "@ant-design/icons";

const Step3 = ({prevStep,inputValues, setValues, submitForm,handleSendEmail,handleSubmitMail }) => {
    const [currentStep, setCurrentStep] = useState(3);
    const [isRequest, setIsRequest] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            phone: inputValues.phone,
            address: inputValues.address,
        })
    }, [form, inputValues.address, inputValues.paymentType, inputValues.phone]);

    const handleSubmit = (values) => {
        setValues((prev)=>{
            return {
                ...prev,
                values
            }
        });
        setIsRequest(true)
        submitForm()
    };
    return (
      <div>

          <div className={styles.row}>
              <div
                className={`${styles.circleNumber} ${currentStep >= 1 ? styles.active : ''}`}>
                  <span className={styles.radius}>1</span>
              </div>
              <div className={styles.line}></div>
              <div
                className={`${styles.circleNumber} ${currentStep >= 3 ? styles.active : ''}`}>
                  <span className={styles.radius}>2</span>
              </div>
          </div>
          <div className={styles.formStepLast}>
              <Form form={form} onFinish={handleSubmit}>
                  <div className={styles.lastPage}>
                      <div className={styles.regInputs}>
                          <div>
                              <label htmlFor="">{t('phone')}*</label>
                              <Form.Item
                                name="phone"
                                rules={[
                                    {required: true, message: t("contact_field_error_phone_1")},
                                    {
                                        validator: validateArmenianOrRussianPhoneNumber,
                                        message: t("contact_field_error_phone_2")
                                    },
                                ]}
                              >
                                  <Input disabled placeholder={'+37477123456'}/>
                              </Form.Item>
                          </div>
                          <div>
                          </div>
                      </div>
                      <div className={styles.regInputs}>
                          <div>
                              <label htmlFor="">{t('address')}*</label>
                              <Form.Item
                                name="address"
                                rules={[
                                    {required: true, message: t("contact_field_error_address")}
                                ]}
                              >
                                  <Input disabled/>
                              </Form.Item>
                          </div>
                          <div>
                          </div>
                      </div>

                      <div className={styles.buttonsForm}>
                          <Button
                            onClick={handleSubmitMail}
                            type="primary"
                            htmlType="submit"
                            icon={isRequest ? <LoadingOutlined /> : null}
                          >
                              {isRequest ? "Подождите" : "Отправить"}
                          </Button>

                      </div>

                  </div>
              </Form>
          </div>
      </div>
    );
};

export default Step3;