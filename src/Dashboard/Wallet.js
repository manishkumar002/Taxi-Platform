import React, { useContext, useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { BeatLoader } from 'react-spinners';
import { AlertContext } from "../Context/AlertsPopusContext";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import AlertPopupMessage from "../ErrorPopus/AlertPopus";
import axios from "axios";
import Config from "../Config/Config";

const Wallet = () => {
    const { message, setMessage, status, setStatus } = useContext(AlertContext);
    const LoginUsers = JSON.parse(localStorage.getItem('AccessLogin')) || {};
    const [amount, setAmount] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [generateId, setGenerateId] = useState({});
    const [rechargeResponse, setRespone] = useState();
    const [snniper, setSnniper] = useState(false);
    const [walletHistory, setWallet] = useState([]);
    const [historySniperStatus, setStatusHistory] = useState(false);
    const [paymentUpdate, setUpdatePayment] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(1);
    const recordsPerPage = 5;


    const handleRechargePlan = (e) => {
        e.preventDefault();
        if (amount <= 0) {
            setMessage({
                status: false,
                message: `Please Enter the Gather Amount greater than 0`
            });
            setStatus(true);
            let timer = setTimeout(() => {
                setStatus(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
        setSnniper(true);
        let GenIdPayLoads = {
            "user_id": LoginUsers._id,
            "amount": `${amount}`,
            "online_charge": "2.33"
        };
        axios.post(`${Config.API_URL}/api/customer/generate_order_id`, GenIdPayLoads, {
            headers: {
                Authorization: `${Config.API_ACCESS_TOKEN}`
            }
        })
            .then((response) => {
                if (response.data.status) {
                    setGenerateId(response.data.data);
                    const options = {
                        key: `${Config.ROZAR_PAY_KEY}`,
                        amount: response.data.data.amount,
                        currency: 'INR',
                        image: `${LoginUsers.profile_image}`,
                        description: "this is test transaction ",
                        name: 'Buzzway Payment',
                        handler: function (response) {
                            setRespone(response);
                        },
                        prefill: {
                            name: `${LoginUsers.full_name}`,
                            email: `${LoginUsers.email_id}`,
                            contact: `${LoginUsers.mobile_no}`,
                        },
                        theme: {
                            color: '#F37254',
                        }
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();
                } else {
                    setGenerateId({});
                }
            })
            .catch(err => {
                setGenerateId({});
                console.log(err);
            });
    };

    useEffect(() => {
        if (Object.entries(generateId).length > 0) {
            const payloads = {
                "user_id": `${generateId.user_id}`,
                "orderid": `${generateId.orderid}`,
                "razor_payid": `${rechargeResponse.razorpay_payment_id}`
            };
            axios.post(`${Config.API_URL}/api/customer/capture_amount`, payloads, {
                headers: {
                    Authorization: `${Config.API_ACCESS_TOKEN}`
                }
            })
                .then((response) => {
                    setSnniper(false);
                    setShow(false);
                    if (response.data.status) {
                        setUpdatePayment(response.data);
                        LoginUsers['wallet_balance'] = LoginUsers.wallet_balance + amount;
                        localStorage.removeItem('AccessLogin');
                        localStorage.setItem('AccessLogin', JSON.stringify(LoginUsers));
                        setMessage({
                            status: true,
                            message: `${response.data.message}`
                        });
                        setStatus(true);
                        let timer = setTimeout(() => {
                            setStatus(false);
                        }, 3000);
                        return () => clearTimeout(timer);
                    }
                    setMessage({
                        status: false,
                        message: `${response.data.message}`
                    });
                    setStatus(true);
                    let timer = setTimeout(() => {
                        setStatus(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                })
                .catch(err => {
                    console.log(err);
                    setSnniper(false);
                    setMessage({
                        status: false,
                        message: `${err.message}`
                    });
                    setStatus(true);
                    let timer = setTimeout(() => {
                        setStatus(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                });
        }
    }, [rechargeResponse]);

    const TransactionHistory = (page = 1) => {
        setStatusHistory(true);
        let Payloads = {
            "user_id": `${LoginUsers._id}`,
            "from": "",
            "to": ``,
            "pageno": `${page}`
        };
        axios.post(`${Config.API_URL}/api/customer/wallet_history`, Payloads, {
            headers: {
                Authorization: `${Config.API_ACCESS_TOKEN}`
            }
        })
            .then((response) => {
                setStatusHistory(false);
                if (response.data.status) {
                    setWallet(response.data.data);
                    setTotalRecords(response.data.TotalRecords);
                } else {
                    setWallet([]);
                }
            })
            .catch(err => {
                setStatusHistory(false);
                setWallet([]);
            });
    };

    useEffect(() => {
        TransactionHistory(currentPage);
    }, [paymentUpdate, currentPage]);

    const totalPages = Math.ceil(totalRecords / recordsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <AlertPopupMessage />
            <div className="wd_dashcontent">
                <div className="container bookingpg">
                    <div className="row">
                        <h3>My Wallet</h3>
                    </div>
                    <div className="row walletwrpr">
                        <div className="waltamnt_add">
                            <p className="balnc">Balance: ₹{LoginUsers.wallet_balance}</p>
                            <a href="#" className="yellwbtn" onClick={handleShow}>Add Money</a>
                        </div>
                        <div className="transctions">
                            {
                                historySniperStatus ?
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                        <BeatLoader color="#185dcc" />
                                    </div>
                                    : walletHistory.length > 0 ?
                                        walletHistory.map((result, key) => (
                                            <div key={key} className="trnsrow">
                                                <div className="trnsid">
                                                    <span>Transaction ID:</span>
                                                    <p>{result.order_id}</p>
                                                </div>
                                                <div className="trnscd">
                                                    {
                                                        result.credit_debit === 'credit' ?
                                                            <p className="cr">{result.amount} <BsArrowUp /></p>
                                                            : <p className="dbt">{result.amount} <BsArrowDown /></p>
                                                    }
                                                    <span>{result.added_on}, {result.credit_debit}</span>
                                                </div>
                                            </div>
                                        ))
                                        : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                            <h2>No transaction history available</h2>
                                        </div>
                            }
                        </div>
                        <div className="d-flex align-items-center justify-content-evenly mt-3 mb-3">
                            <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
                            <span>Page {currentPage} of {totalPages} Total Records of {totalRecords}</span>
                            <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal className='farepop' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Money</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => handleRechargePlan(e)}>
                        <Form.Group className="mb-3 position-relative" controlId="">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </Form.Group>
                        <p>(Or) Select Amount</p>
                        <div className="chooseamntrow">
                            <Link onClick={() => setAmount(100)} className="chsamnt">₹100</Link>
                            <Link onClick={() => setAmount(500)} className="chsamnt">₹500</Link>
                            <Link onClick={() => setAmount(1000)} className="chsamnt">₹1000</Link>
                            <Link onClick={() => setAmount(2000)} className="chsamnt">₹2000</Link>
                            <Link onClick={() => setAmount(5000)} className="chsamnt">₹5000</Link>
                            <Link onClick={() => setAmount(10000)} className="chsamnt">₹10000</Link>
                        </div>
                        {
                            snniper ? <Button variant="primary" style={{ width: '100%', background: 'green' }} disabled>
                                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                Loading...
                            </Button>
                                : <Button className="sitebtn grnbtn" type="submit">
                                    Pay Now
                                </Button>
                        }
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Wallet;
