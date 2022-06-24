import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './layout.scss';
import useWallet_, { request } from '../useWallet';
import { useWallet } from '../hooks/useWallet';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';

import networks from "../config/networks.json";
import { AiOutlineLinkedin, AiOutlineClose } from "react-icons/ai";

const ERR_INSTALL = '  You must install Metamask into your browser: https://metamask.io/download.html'
const ERR_NOACCOUNTS = '  No selected address.'
const ERR_CHAINID = '  Invalid chain id #:chainId'
const DISCONNECTED = 'disconnected';
const CONNECTING = 'connecting';
const CONNECTED = 'connected';

const Layout = (props: any) => {
    const { active, connect, chainId } = useWallet();
    const U = useWallet_();
    const { account } = useWeb3React();
    const { activate, connector } = useWeb3React();

    const G = useSelector((state: BridgeTypes) => state);
    const [isLoading, setIsLoadking] = React.useState(true);
    React.useEffect(() => {
        setTimeout(() => {
            setIsLoadking(false);
        }, 5000)
    }, [])

    React.useEffect(() => {
        let err = '';
        try {
            if (account && account.length) {
                U.update({ status: CONNECTED, address: account, err: '' })
                if (chainId === networks[G.chain].chainId) {
                    return
                } else {
                    err = ERR_CHAINID.replace(':chainId', String(chainId))
                    U.update({ status: DISCONNECTED, address: '', err })
                }
            } else {
                U.update({ status: DISCONNECTED, err: '' })
                err = ERR_NOACCOUNTS
                return
            }
        } catch (error: any) {
            err = '  ' + error.message
        }

    }, [account])

    const L = G.L;

    const handleConnect = async (key: string) => {
        try {
            if (account && account.length > 0) {
                U.update({ account: account, walletModal: !G.walletModal, status: CONNECTED });
            }
            await connect(key);
            U.update({ walletModal: !G.walletModal });
            // if (account !== undefined) {
            //     dispatch({
            //         type: "disconnect_able",
            //         payload: true
            //     });
            // } else {
            //     dispatch({
            //         type: "disconnect_able",
            //         payload: false
            //     });
            // }
            //wallet modal cancel
        } catch (err) {
            console.log({ err });
        }
    };

    const WalletModal = () => {
        return (
            <div className='modal-continer' >
                <div className='modal-back' onClick={() => U.update({ walletModal: false })}></div>

                <div className="modal-body wallet-modal" >
                    <div className='dis-f w10' style={{ justifyContent: 'flex-end' }}>
                        <AiOutlineClose className='cu-po' onClick={() => U.update({ walletModal: false })} fontSize={'25px'} />
                    </div>
                    <div className='dis-f w10'>
                        <text className='grey mt1 mb2' style={{ fontSize: '25px' }}>Connect Wallet</text>
                    </div>
                    <div className='justify fd-c'>
                        <div className='wallet-icon-hover'>
                            <a onClick={() => { handleConnect('injected'); U.update({ walletSelect: '/img/metamask.png' }) }}>
                                <div className='wallet-option-box'>
                                    <h4 className=''>
                                        MetaMask
                                    </h4>
                                    <img src={'/img/metamask.png'} className='justify wallet-imgs' alt='Metamask' />
                                </div>
                            </a>
                        </div>
                        <div className='wallet-icon-hover'>
                            <a onClick={() => { handleConnect('walletconnect'); U.update({ walletSelect: '/img/walletconnect.svg' }) }}>
                                <div className='wallet-option-box'>
                                    <h4 className=''>
                                        WalletConnect
                                    </h4>
                                    <img src={'/img/walletconnect.svg'} className='justify wallet-imgs' alt='WalletConnect' />
                                </div>
                            </a>
                        </div>
                        <div className='justify'>
                            <div className='wallet-icon-hover'>
                                <a onClick={() => { handleConnect('walletlink'); U.update({ walletSelect: '/img/coinbase.png' }) }}>
                                    <div className='wallet-option-box'>
                                        <h4 className=''>
                                            Coinbase Wallet
                                        </h4>
                                        <img src={'/img/coinbase.png'} className='justify wallet-imgs' alt='Coinbase' />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                    <div className='dis-f fd-c' style={{ height: '100%' }}>
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
                            {
                                G.status !== DISCONNECTED ?
                                    <button onClick={() => { U.update({ walletModal: false, status: DISCONNECTED }) }} className='wallet-connect-btn'>
                                        {
                                            'Disconnect'
                                        }
                                    </button>
                                    :
                                    <button onClick={() => { U.update({ walletModal: true }) }} className='wallet-connect-btn'>
                                        {
                                            G.status === DISCONNECTED ? 'Connect Wallet' : account && account.slice(0, 5) + '...' + account.slice(account.length - 5, account.length)
                                        }
                                    </button>
                            }

                        </header>
                        <main className='dis-f flex1 fd-c'>
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
                            <div className="dis-f ai-c jc-c w10 tc pb3">© Copyright Flash Technologies 2022&nbsp;,&nbsp; <a className="" href="https://linktr.ee/FlashTechnologies" style={{ color: '#f0b90b' }}>FLASH LINK</a></div>
                        </footer>
                    </div>
                    {G.walletModal === true
                        ? <WalletModal />
                        : <></>
                    }
                </>
        }
    </>);
}

export default Layout;