import React, { Component } from 'reactn'
import LinearProgress from '@mui/material/LinearProgress'
import './Setup.css'
import onde from '../../Assets/onde.svg'
import { Api, persistState } from '../../Services'
import { Background, Loader } from '../../Components'
import logobigwhite from '../../Assets/logobigwhite.svg'

class Setup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chunk: 0,
      downloaded: false,
      installed: false,
      loading: false,
      docker: false
    }
  }

  async componentDidMount () {
    this.intervalServices()

    try {
      window.require('electron').ipcRenderer.on('download-progress', async (event, arg) => {
        const { chunk, docker } = arg.data
        this.setState({ chunk, docker })

        if (chunk === 100) {
          this.setState({ downloaded: true, loading: false })
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  async intervalServices () {
    let proceedToLogin = false
    while (true) {
      const data = await Api.checkDaemonsAuthentication()

      if (data.authenticated) {
        proceedToLogin = true
        break
      }

      const running = await this.checkServices()
      if (running) {
        this.setState({ downloaded: true, loading: false, installed: true })
        break
      } else {
        await this.wait(2000)
      }
    }

    if (proceedToLogin) {
      await this.continue()
    }
  }

  wait (milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  async checkServices (goto) {
    try {
      if (goto) {
        this.gotoServices()
      }
      return (await Api.servicesStatus()).success
    } catch (error) {
      return false
    }
  }

  async gotoServices () {
    this.setState({ loading: true, downloaded: true, installed: false })
  }

  async downloadDaemons () {
    this.setState({ loading: true })
    window.require('electron').ipcRenderer.send('download-daemons', 'void')
  }

  async continue () {
    const { refresh } = this.global
    clearInterval(refresh)

    this.setState({ loading: true })
    await this.setGlobal({ setup: true }, persistState)
    await this.props.postSetup()
  }

  async handleKeyDown (event) {
    if (event.keyCode === 13) {
      await this.continue()
    }
  }

  render () {
    const { chunk, downloaded, installed, loading, docker } = this.state

    return (
      <Background
        backgroundColor='rgba(30, 30, 30, 1)'
        backgroundImage={onde}
      >
        <div className='setpage' tabIndex='0' onKeyDownCapture={e => this.handleKeyDown(e)}>
          <div className='setheader'>
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
          <div className='setbody'>
            <h1>Setup page</h1>
            {
              !downloaded &&
                <>
                  <span>Welcome to the Elemento Setup board!</span><br /><br />
                  <span>Before using the Elemento app we must to setup some services useful to connect you to the Elemento Cloud services.</span><br />
                  <span>Please, click on Download button and next open the installer file. Then come here again and proceed to the next step!</span><br /><br />
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {!loading && <button className='downloadbutton' onClick={async () => await this.downloadDaemons()}>Download services</button>}
                    {!loading && <button className='downloadbutton' style={{ marginLeft: 20 }} onClick={async () => await this.checkServices(true)}>Check services</button>}
                  </div>
                  {loading && chunk === 0 && <Loader />}
                </>
            }
            {
              chunk > 0 && !downloaded &&
                <div className='setdownload'>
                  <LinearProgress variant='determinate' value={chunk} className='setbar' />
                  {chunk}%
                </div>
            }
            {
              downloaded && !installed && !docker &&
                <>
                  <span>Daemon software has been downloaded in the Downloads folder.<br />Please, run the service and then log into the ElectrOS App.</span><br /><br />
                  <Loader />
                </>
            }
            {
              downloaded && !installed && docker &&
                <>
                  <span>Please, download and execute the docker-compose file to run the daemon service,<br />then log into the ElectrOS App.</span><br /><br />
                  <Loader />
                </>
            }
            {
              installed &&
                <>
                  <span>Great, all the services are installed correctly!</span><br />
                  <span style={{ marginLeft: 20, fontSize: 40, marginTop: 40 }}>Ready. Set. Cloud. 🏁🚀☁️</span><br /><br />
                  {!loading && <button className='downloadbutton' onClick={async () => await this.continue()}>Continue</button>}
                  {loading && <Loader />}
                </>
            }
          </div>
        </div>
      </Background>
    )
  }
}

export default Setup
