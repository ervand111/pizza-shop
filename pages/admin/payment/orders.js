import React, { useEffect, useState } from "react";
import { Button, Form, Table, Typography, Space, Popover, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import App from "../layouts/app";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { filterPayments, getOrders, doneOrInProgress } from "../../../store/payment/actions";
import { jsonToExcel } from "../../../utils/utils";
import styles from '../../../styles/orders.module.css'
const { RangePicker } = DatePicker;
const { Text } = Typography;

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.payment?.orders) || [];
    const [total, setTotal] = useState(0);

    const sendDone = (id, done) => {
        dispatch(doneOrInProgress.request({ id, done }));
    };

    const renderProductPopover = (products) => {
        let parsedProducts = [];
        try {
            parsedProducts = JSON.parse(products);
        } catch (error) {
            console.error("Error parsing products:", error);
            return <div>Invalid product data</div>;
        }

        if (!Array.isArray(parsedProducts)) {
            console.error("Parsed products is not an array");
            return <div>Invalid product data</div>;
        }

        return (
          <Space direction="vertical">
              {parsedProducts.map((product) => (
                <Popover
                  key={product.id}
                  content={
                      <div className={styles.productContainer}>
                          <div>
                              <a
                                className={styles.productTitle}
                                href={`https://www.alekspizza.ru/product/${product.id}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                  {product.title}
                              </a>

                              -
                              ( {product.quantity} шт.)
                          </div>
                          <div className={styles.productInfo}>
                              <strong>Size:</strong> {product?.variants?.map((elm) => elm.value).join(", ")}
                          </div>
                          <div className={styles.productInfo}>
                              <strong>Price:</strong> {product?.variants?.map((elm) => elm.price).join(", ")}
                          </div>
                      </div>

                  }
                  title="Product Details"
                  trigger="hover"
                >
                    <a href={`https://www.alekspizza.ru/product/${product.id}`} target="_blank" rel="noreferrer">
                        {product.title} ({product.model}) - {product.price} - ( {product.quantity} шт. )
                    </a>
                </Popover>
              ))}
          </Space>
        );
    };


    const columns = [
        {title: "Id", dataIndex: "id", key: "id", width: 100},
        {title: "Name", dataIndex: "name", key: "name", width: 100},
        {title: "Surname", dataIndex: "surname", key: "surname", width: 120 },
        { title: "Email", dataIndex: "email", key: "email", width: 200 },
        { title: "Phone", dataIndex: "phone", key: "phone", width: 200 },
        { title: "Address", dataIndex: "address", key: "address", width: 200 },

        {
            title: "Products",
            dataIndex: "products",
            key: "products",
            width: 400,
            render: renderProductPopover,
        },
        { title: "Delivery Amount", dataIndex: "total", key: "total", width: 200 },

        { title: "Message", dataIndex: "message", key: "message", width: 200 },
        { title: "Region", dataIndex: "region", key: "region", width: 200 },
        {
            title: "Date",
            dataIndex: "created_at",
            key: "created_at",
            width: 200,
            render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: "Done Status",
            dataIndex: "done",
            key: "done",
            width: 200,
            render: (done, record) => (
              <Button onClick={() => sendDone(record.id, done)}>
                  {done === 0 ? "New" : done === 1 ? "In progress" : "Done"}
              </Button>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getOrders.request());
    }, [dispatch]);

    useEffect(() => {
        const totalSum = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);
        setTotal(totalSum);
    }, [orders]);

    const onFinish = (values) => {
        const [startDate, endDate] = values.dateRange;
        dispatch(
          filterPayments.request({
              startDate: startDate.format("YYYY-MM-DD"),
              endDate: endDate.format("YYYY-MM-DD"),
          })
        );
    };

    const downloadExcel = () => {
        if (Array.isArray(orders) && orders.length > 0) {
            jsonToExcel(orders);
        } else {
            console.error("No data available for download or invalid data format");
        }
    };

    return (
      <>
          <App>
              <Form onFinish={onFinish}>
                  <Form.Item
                    name="dateRange"
                    label="Date Range"
                    rules={[{ required: true, message: "Please select a date range!" }]}
                  >
                      <RangePicker />
                  </Form.Item>
                  <Form.Item>
                      <Button type="primary" htmlType="submit">
                          Filter Payments
                      </Button>
                  </Form.Item>
              </Form>
              <Button onClick={downloadExcel} type="primary" style={{ marginBottom: 16 }}>
                  Download XML
              </Button>
              <Table
                className={styles.tableContainer}
                dataSource={orders}
                columns={columns}
                scroll={{ y: true }}
                rowKey="id"
              />
              <div className={styles.totalAmountContainer}>
                  <Text strong>Total Delivery Amount: </Text>
                  <Text>{total.toFixed(2)}</Text>
              </div>

              <div style={{ marginTop: 16 }}>
                  <Text strong>Total Delivery Amount: </Text>
                  <Text>{total.toFixed(2)}</Text>
              </div>
          </App>
      </>
    );
};

export default Orders;