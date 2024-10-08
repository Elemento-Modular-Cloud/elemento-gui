import React, { Component } from 'reactn'
import { Api } from '../../Services'
import { Config } from '../../Global'
import { Back, Daemons, Loader, Sidebar } from '../../Components'
import './Licences.css'
import swal from 'sweetalert'

class Licences extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      lock: false,
      licenses: [],
      file: null
    }
  }

  async componentDidMount () {
    await this.refreshData()
  }

  async refreshData () {
    this.setState({ loading: true, lock: true, file: null })

    Api.createClient(Config.API_URL_AUTHENT)
    const res = await Api.get('/license/list')

    if (res.ok) {
      this.setState({ licenses: res.data.licenses })
    }
    this.setState({ loading: false, lock: false })
  }

  async armLicense (licenseKey) {
    this.setState({ loading: true, file: null })
    Api.createClient(Config.API_URL_AUTHENT)
    const res = await Api.post('/license/arm', {
      license_key: licenseKey
    })

    if (res.ok) {
      swal('Success!', 'Licese armed successfully', 'success', {
        buttons: false,
        timer: 3000
      }).then(() => {
        const file = res.data && res.data.license ? res.data.license.file : ''
        this.setState({ file })

        this.saveLicenceLocally(file)
      })
      await this.refreshData()
    } else {
      swal('Error', 'Could not arm the selected license', 'error', {
        buttons: false,
        timer: 3000
      })
    }
    this.setState({ loading: false })
  }

  async deleteLicense (licenseKey) {
    this.setState({ loading: true, toBeDeleted: licenseKey })
    Api.createClient(Config.API_URL_AUTHENT)
    const res = await Api.delete('/license/delete', {
      license_key: licenseKey
    })

    if (res.ok) {
      swal('Success!', 'License deleted successfully', 'success', {
        buttons: false,
        timer: 3000
      })
      await this.refreshData()
    } else {
      swal('Error', 'Could not delete the selected license', 'error', {
        buttons: false,
        timer: 3000
      })
    }
    this.setState({ loading: false, toBeDeleted: null })
  }

  async saveLicenceLocally (file) {
    window.require('electron').ipcRenderer.send('save-licence', file)

    swal('Success!', 'The license has been successfully saved under ~/Downloads folder.', 'success', {
      buttons: false,
      timer: 3000
    })
  }

  render () {
    const { loading, licenses, lock, file, toBeDeleted } = this.state

    return (
      <div className='licpage'>
        <Sidebar selected='licences' />
        <div className='lbody licbody'>
          <hr />

          <div className='licheader'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <span>Licences</span>
              {loading && <Loader />}
            </div>
            <Back page='/' refresh={async () => await this.refreshData()} />
          </div>

          <div className='lictables'>
            <table className='lictable'>
              <thead className='lictablehead'>
                <tr>
                  <td>License Key</td>
                  <td>Duration</td>
                  <td>Activated</td>
                  <td>Expire Date</td>
                  <td>Expire</td>
                  <td>Activate License</td>
                  <td>Delete License</td>
                </tr>
              </thead>
              <tbody className='lictablebody'>
                {
                  licenses && licenses.length > 0
                    ? licenses.map((license, i) => {
                      return (
                        <tr key={i} style={{ backgroundColor: toBeDeleted === license.license_key ? '#898C8A99' : '' }}>
                          <td>{license.license_key}</td>
                          <td>{license.duration}</td>
                          <td>
                            <div className='licarmed' style={{ backgroundColor: license.is_armed ? 'rgba(80 , 160, 80)' : '#eb3941' }}>
                              <span>{license.is_armed ? 'ACTIVATED' : 'NOT ACTIVATED'}</span>
                            </div>
                          </td>
                          <td>{license.expire_date}</td>
                          <td>{license.expire === null ? 'N/A' : new Date(license.expire * 1000).toDateString()}</td>
                          <td>
                            <button className={license.is_armed ? 'bn40' : 'bn632-hover bn22'} disabled={license.is_armed || lock} onClick={async () => await this.armLicense(license.license_key)}>{license.is_armed ? 'Activated' : 'Activate'}</button>
                          </td>
                          <td>
                            <button className='bn632-hover bn28' disabled={lock} onClick={async () => !toBeDeleted && await this.deleteLicense(license.license_key)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                    : (
                      <tr><td style={{ border: 'none' }}><p style={{ marginLeft: 10 }}>ⓘ No licences to be displayed</p></td></tr>
                      )
                }
              </tbody>
            </table>
            {
              file &&
                <div className='filebox'>
                  <span>Please save this license as a file named atomos.license and place it in /etc/elemento/atomos.license in your licensed AtomOS server.</span><br />
                  <span>The cloning of the same license file in multiple servers will end up causing the blacklisting of the license and the subsequent deactivation of all premium features.</span>
                  <textarea className='filearea' rows={20} cols={100}>
                    {file}
                  </textarea>
                </div>
            }
          </div>
        </div>

        <Daemons />
      </div>
    )
  }
}

export default Licences
