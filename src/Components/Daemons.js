import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import './css/Daemons.css'
import { ReactComponent as Help } from '../Assets/utils/settings.svg'
import { ReactComponent as CheckGreen } from '../Assets/utils/checkgreen.svg'
import { ReactComponent as CheckRed } from '../Assets/utils/checkred.svg'
import { Api } from '../Services'

const Daemons = () => {
  const [modal, setModal] = useState(false)
  const [m, setM] = useState(false)
  const [s, setS] = useState(false)
  const [n, setN] = useState(false)
  const [a, setA] = useState(false)

  const checkStatus = async () => {
    try {
      const status = await Api.servicesStatus()
      setM(status.matcher)
      setS(status.storage)
      setN(status.network)
      setA(status.authent)
    } catch (error) {}
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className='daemonbtn' onClick={() => setModal(!modal)}>
      <Help />
      Services Status

      <Modal
        isOpen={modal}
        style={customStyle}
        className='netmodal'
        onRequestClose={() => setModal(!modal)}
      >
        <h2>Services Status</h2>
        <div className='statbox'>
          <span>Matcher Status</span>
          {m ? <CheckGreen style={{ width: 30, height: 30 }} /> : <CheckRed style={{ width: 30, height: 30 }} />}
        </div>
        <div className='statbox'>
          <span>Storage Status</span>
          {s ? <CheckGreen style={{ width: 30, height: 30 }} /> : <CheckRed style={{ width: 30, height: 30 }} />}
        </div>
        <div className='statbox'>
          <span>Network Status</span>
          {n ? <CheckGreen style={{ width: 30, height: 30 }} /> : <CheckRed style={{ width: 30, height: 30 }} />}
        </div>
        <div className='statbox'>
          <span>Authent Status</span>
          {a ? <CheckGreen style={{ width: 30, height: 30 }} /> : <CheckRed style={{ width: 30, height: 30 }} />}
        </div>
      </Modal>
    </div>
  )
}

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    position: 'absolute',
    zIndex: 999999999999999,
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white'
  },
  outline: 'none'
}

export default Daemons
