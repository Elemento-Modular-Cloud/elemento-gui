import React, { Component } from 'reactn'
import { Api, clearState, persistState } from '../../Services'
import { Config } from '../../Global'
import { Background, Button, Daemons } from '../../Components'
import onde from '../../Assets/onde.svg'
import logobigwhite from '../../Assets/logobigwhite.svg'
import './Home.css'
import { ReactComponent as Pc } from '../../Assets/main/pc.svg'
import { ReactComponent as License } from '../../Assets/main/license.svg'
import { ReactComponent as Storage } from '../../Assets/main/storage.svg'
import { ReactComponent as Network } from '../../Assets/main/network.svg'
import { ReactComponent as Logout } from '../../Assets/utils/logout.svg'
import { ReactComponent as Help } from '../../Assets/utils/help.svg'
import swal from 'sweetalert'

class Home extends Component {
  async navigate () {
    await this.setGlobal({}, persistState)
    this.props.history.push('/calendar')
  }

  async componentDidMount () {
    await this.checkLoggedIn()
  }

  async checkLoggedIn () {
    try {
      const { username, password } = this.global
      Api.createClient(Config.API_URL_AUTHENT)
      const res = await Api.get('/login', { username, password })
      if (!res.ok) {
        swal('Error', 'Could not login to the services. Please, try again later.', 'error', {
          buttons: false,
          timer: 3000
        }).then(async () => {
          await this.setGlobal({ loggedIn: false, setup: false }, persistState)
          await clearState()
          window.location.reload()
        })
      }
    } catch (error) {
      swal('Error', 'Could not connect to remote services', 'error', {
        buttons: false,
        timer: 3000
      }).then(async () => {
        await this.setGlobal({ loggedIn: false, setup: false }, persistState)
        await clearState()
        window.location.reload()
      })
    }
  }

  async logout () {
    Api.createClient(Config.API_URL_AUTHENT)
    const res = await Api.post('/logout', {})

    if (res.ok) {
      await this.setGlobal({ loggedIn: false }, persistState)
      await clearState()
      window.location.reload()
    } else {
      swal('Error', 'Could not logout from services', 'error', {
        buttons: false,
        timer: 3000
      })
    }
  }

  async openExternalLink () {
    window.require('electron').ipcRenderer.send('open-external-link', 'https://github.com/elemento-Modular-Cloud/helpcenter')
  }

  render () {
    return (
      <Background
        backgroundColor='rgba(30, 30, 30, 1)'
        backgroundImage={onde}
      >
        <div className='homepage'>
          <div className='homeheader'>
            <div
              className='logobigwhite'
              style={{
                backgroundImage: `url(${logobigwhite})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain'
              }}
            />
          </div>
          <div className='homebody'>
            <div className='homebuttons'>
              <Button Icon={Storage} page='/storage' name='Storage' text='Volumes creation to mount in your virtual machines' />
              <Button Icon={Pc} page='/vmlist' name='Virtual Machines' text='Virtual machines management and visualization' />
              <Button Icon={Network} page='/network' name='Network' text='Network Management' />
              <Button Icon={License} page='/licences' name='Licences' text='License management of Elemento Cloud' />
            </div>

            <div className='homefooter'>
              <div className='btnlogout' onClick={() => this.logout()}>
                <Logout />
                <span>Logout</span>
              </div>

              <div className='btnhelp' onClick={() => this.openExternalLink()}>
                <Help />
                <span>Help</span>
              </div>
            </div>
          </div>

          <Daemons />
        </div>
      </Background>
    )
  }
}

export default Home
