import React, { getGlobal } from 'reactn'
import { useNavigate } from 'react-router-dom'
import './css/Sidebar.css'
import { ReactComponent as LogoInlineWhite } from '../Assets/logoinlinewhite.svg'
import { ReactComponent as User } from '../Assets/utils/user.svg'
import { ReactComponent as Pc } from '../Assets/main/pc.svg'
import { ReactComponent as License } from '../Assets/main/license.svg'
import { ReactComponent as Storage } from '../Assets/main/storage.svg'
// import { ReactComponent as Network } from '../Assets/main/network.svg'
import { ReactComponent as Settings } from '../Assets/main/settings.svg'

const Sidebar = ({ selected }) => {
  const { username } = getGlobal()
  const navigate = useNavigate()

  return (
    <div className='sidebar'>
      <div className='sidelogo' onClick={() => navigate('/')}>
        <LogoInlineWhite />
      </div>

      <div className='sideuserbox'>
        <User />
        <div className='usernamebox'>
          <span className='usernameemail'>{username.split('@')[0]}</span><br />
          <span className='usernamedomain'>@{username.split('@')[1]}</span>
        </div>
      </div>

      <div className={selected === 'storage' ? 'sideitemboxselected' : 'sideitembox'} onClick={() => navigate('/storage')}>
        <Storage />
        <span>Storage</span>
      </div>
      <div className={selected === 'vms' ? 'sideitemboxselected' : 'sideitembox'} onClick={() => navigate('/vmlist')}>
        <Pc />
        <span>Virtual Machines</span>
      </div>
      {/* <div className={selected === 'network' ? 'sideitemboxselected' : 'sideitembox'} onClick={() => navigate('/network')}>
        <Network />
        <span>Network</span>
      </div> */}
      <div className={selected === 'licences' ? 'sideitemboxselected' : 'sideitembox'} onClick={() => navigate('/licences')}>
        <License />
        <span>Licenses</span>
      </div>
      <div className={selected === 'settings' ? 'sideitemboxselected' : 'sideitembox'} onClick={() => navigate('/settings')}>
        <Settings />
        <span>Settings</span>
      </div>
    </div>
  )
}

export default Sidebar
