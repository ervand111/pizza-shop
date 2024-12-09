import React, { useEffect, useState } from 'react';
import styles from "../../styles/header.module.css";
import Item from "../Products/Item";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../store/products/actions";
import { Input, Form } from "antd";
import { t } from "../../utils/utils";

const SearchBox = ({ onClose }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const filteredSearch = useSelector((state) => state?.product?.searchResult?.data);
    const [searchTimeout, setSearchTimeout] = useState(null);
    useEffect(() => {
        if (searchTerm !== '') {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            const timeoutId = setTimeout(() => {
                dispatch(searchProducts.request({ query: searchTerm }));
            }, 500);
            setSearchTimeout(timeoutId);
        }
    }, [dispatch, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
      <div>
          <div className={styles.boxSearch}>
              <div className={styles.containerSearch}>
                  <label htmlFor="">{t("name")}</label>
                  <Form.Item
                    name="search"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a search term!',
                            min: 3,
                        },
                    ]}
                    validateTrigger="onChange"
                  >
                      <Input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder={t("search")}
                      />
                  </Form.Item>
                  <div
                    style={{
                        height: filteredSearch?.length > 0 ? "550px" : "auto",
                        overflowY: filteredSearch?.length > 0 ? "scroll" : "auto",
                        paddingBottom: filteredSearch?.length > 0 ? "200px" : "auto",
                    }}
                    className={styles.searchResult}
                  >
                      {filteredSearch?.length > 0
                        ? filteredSearch?.map((item) => <Item key={item.id} item={item} />)
                        : searchTerm.length > 0 ? <h4 style={{ textAlign: 'center', width: '100%' }}>{t("result_none")}</h4> : null}
                  </div>
              </div>
          </div>
          <div onClick={onClose} className={styles.searchBoxBack} />
      </div>
    );
};

export default SearchBox;
