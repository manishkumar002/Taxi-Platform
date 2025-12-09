import React, { useState, useEffect } from "react";
import refer from "./images/icon.svg";

import { VscCopy } from "react-icons/vsc";
import { BsShare } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {
    FacebookShareButton,
    EmailShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
} from 'react-share';
import { FaFacebook, FaEnvelope, FaWhatsapp, FaLinkedin, FaTelegram, FaTwitter } from 'react-icons/fa';
import { Button } from "@mui/material";
import Config from "../Config/Config";

// modify the models css
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    bgcolor: "background.paper",
    boxShadow: 20,
    p: 4,
    borderRadius: 8,  
    border: "1px solid #ccc",
  };
  
const Referearn = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let locaStorageData = JSON.parse(localStorage.getItem("AccessLogin")) ?? {};
    const [copied, setCopied] = useState(false);

    const shareUrl = Config.BASE_URL;
    const title = 'Book Your Ride and Earn Rewards with My Referral Code!';
    const description = `Planning to book a cab? Use my referral code and get exclusive discounts on your ride! Whether you're commuting to work, heading to the airport, or exploring the city, make your journey more affordable and rewarding. Don't miss out on this opportunity to save on your next ride. Click the link below and enter the referral code to enjoy your discount. Safe travels!';`
    const referralCode = locaStorageData.referral_code
    const emailBody = `${description} ${shareUrl}?ref=${referralCode}`;
  


    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500); // Reset copied state after 1.5 seconds
    };

    return (
        <>
            <div className="wd_dashcontent">
                <div className="container bookingpg">
                    <div className="row">
                        <h3>Refer & Earn</h3>
                    </div>
                    <div className="row refrimg">
                        <img src={refer} />
                        <p>Refer Your Friend</p>
                        <div className="codeshr">
                            <CopyToClipboard
                                text={locaStorageData.referral_code}
                                onCopy={handleCopy}
                            >
                                <p
                                    className="rcode"
                                    style={{ border: copied ? "2px solid green" : "" }}
                                >
                                    {locaStorageData.referral_code} <VscCopy />
                                    <span>{copied ? "Copied!" : "Tap to copy"}</span>
                                </p>
                            </CopyToClipboard>

                            <Button onClick={handleOpen} className="yelwbtn">
                                Share <BsShare />
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-7 m-auto shrtable">
                            <table>
                                {/* <tr>
                                    <th>Sno.</th>
                                    <th>Referer</th>
                                    <th>Amount</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ankit Singh</td>
                                    <td className="grn">+100</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ankit Singh</td>
                                    <td className="grn">+100</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ankit Singh</td>
                                    <td className="grn">+100</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ankit Singh</td>
                                    <td className="grn">+100</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Ankit Singh</td>
                                    <td className="grn">+100</td>
                                </tr> */}
                                <tr>
                                    <td>Data not available</td>
                                    <td>Data not available</td>
                                    <td className="grn">Data not available</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Handle the share models here */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" style={{textAlign:'center'}} component="h2">
                            Share Referral code with Social Media && Friends
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }} style={{display:'flex' , alignItems:'center' , justifyContent:'space-between'}}>
                            <FacebookShareButton url={`${shareUrl}?ref=${referralCode}`} quote={`${title} - Use my referral code: ${referralCode}`}>
                                <FaFacebook size={32} />
                            </FacebookShareButton>
                            <EmailShareButton url={`${shareUrl}?ref=${referralCode}`} subject={title} body={`${description}\n\nUse my referral code: ${referralCode}\n\n${shareUrl}?ref=${referralCode}`}>
                                <FaEnvelope size={32} />
                            </EmailShareButton>
                            <WhatsappShareButton url={`${shareUrl}?ref=${referralCode}`} title={`${title} - Use my referral code: ${referralCode}`}>
                                <FaWhatsapp size={32} />
                            </WhatsappShareButton>
                            <LinkedinShareButton url={`${shareUrl}?ref=${referralCode}`} title={title} summary={`${description} - Use my referral code: ${referralCode}`}>
                                <FaLinkedin size={32} />
                            </LinkedinShareButton>
                            <TelegramShareButton url={`${shareUrl}?ref=${referralCode}`} title={`${title} - Use my referral code: ${referralCode}`}>
                                <FaTelegram size={32} />
                            </TelegramShareButton>
                            <TwitterShareButton url={`${shareUrl}?ref=${referralCode}`} title={`${title} - Use my referral code: ${referralCode}`}>
                                <FaTwitter size={32} />
                            </TwitterShareButton>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};
export default Referearn;
