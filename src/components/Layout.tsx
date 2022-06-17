import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './layout.scss';
import useWallet, { request } from '../useWallet';
import networks from "../config/networks.json";
import { AiOutlineLinkedin } from "react-icons/ai";

const ERR_INSTALL = '🦊 You must install Metamask into your browser: https://metamask.io/download.html'
const ERR_NOACCOUNTS = '🦊 No selected address.'
const ERR_CHAINID = '🦊 Invalid chain id #:chainId'
const DISCONNECTED = 'disconnected';
const CONNECTING = 'connecting';
const CONNECTED = 'connected';

const Layout = (props: any) => {
    const G = useSelector((state: BridgeTypes) => state);
    const U = useWallet();
    const [isLoading, setIsLoadking] = React.useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoadking(false);
        }, 5000)
    }, [])
    const L = G.L;
    const connectWallet = async (accounts?: string) => {
        let err = '';
        try {
            const { ethereum } = window
            U.update({ status: CONNECTING, err: '' })
            if (ethereum) {
                if (accounts === undefined) accounts = await ethereum.request({ method: 'eth_requestAccounts' })

                if (accounts && accounts.length) {
                    const chainId = Number(await ethereum.request({ method: 'eth_chainId' }));//wallet connected chainId
                    if (chainId === networks[G.chain].chainId) {
                        U.update({ status: CONNECTED, address: accounts[0], err: '' })
                        return
                    } else {
                        err = ERR_CHAINID.replace(':chainId', String(chainId))
                    }
                } else {
                    err = ERR_NOACCOUNTS
                }
            } else {
                err = ERR_INSTALL
            }
        } catch (error: any) {
            err = '🦊 ' + error.message
        }
        U.update({ status: DISCONNECTED, address: '', err })
    }

    return (<>
        {
            isLoading
                ? <div className='isloading'>
                    <div className='loading-img justify'>
                        <img src='/img/flash-logo.png' width={'70px'} className='' alt='' />
                        <span style={{ fontSize: '30px', fontWeight: 'bold', color: '#e7c766' }}>FLASH</span>
                    </div>

                </div>
                : <>
                    <header className="dis-f jc-sb ai-c pr2">
                        <Link className="title justify" to="/">
                            <div>
                                <img src="/flash-logo.png" style={{ width: 50, height: 'auto' }} alt="logo" />
                            </div>
                            <div className="dis-f">
                                <span className="h3" style={{ marginTop: '-7px' }}>{L['chain']}</span>
                            </div>
                            {/* <span className="badge">{L['bridge']}</span> */}
                        </Link>

                        <button onClick={() => { connectWallet() }} className='wallet-connect-btn'>
                            {
                                G.address ? G.address.slice(0, 5) + '...' + G.address.slice(G.address.length - 5, G.address.length) : 'Connect Wallet'
                            }
                        </button>

                    </header>
                    <main>
                        {props.children}
                    </main>
                    <footer className="footer-section">
                        <nav className="social-list">
                            <a href="https://twitter.com/Flash_Techno_Of" target='_blank'> <img src="/social/twitter.svg" alt="twitter" /> </a>
                            <a href="https://www.facebook.com/flashtechnologiesoff" target='_blank'> <img src="/social/facebook.svg" alt="facebook" /> </a>
                            <a href="https://www.reddit.com/r/FlashTechnologies/" target='_blank'> <img src="/social/reddit.svg" alt="reddit" /> </a>
                            <a href="https://t.me/flashtokenenglish" target='_blank'> <img src="/social/telegram.svg" alt="telegram" /> </a>
                            <a href="mailto:contact@flash-bridge.com" target='_blank'> <img src="/social/mail.svg" alt="mail" /> </a>
                            <a href="https://discord.gg/kkGDbGtTFz" target='_blank'> <img src="/social/discord.svg" alt="discord" /> </a>
                            <a href="https://www.youtube.com/channel/UCbNApPsnWrYixnri4hwUUyA" target='_blank'> <img src="/social/youtube.svg" alt="youtube" /> </a>
                            <a href="https://www.linkedin.com/company/flash-technologies-off/" target='_blank'> <AiOutlineLinkedin color="white" fontSize={'27px'} /> </a>
                        </nav>
                        <div className="dis-f ai-c jc-c w10 tc pb3"> © Copyright FLASH 2022&nbsp;,&nbsp; <a className="" href="https://linktr.ee/FlashTechnologies" style={{ color: '#f0b90b' }}>FLASH LINK</a></div>
                    </footer>
                </>
        }
    </>);
}

export default Layout;