import React, { Component } from 'react'
import { Api } from '../../Services'
import { Config } from '../../Global'
import { Sidebar } from '../../Components'
import './Licences.css'
import swal from 'sweetalert'

class Licences extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      licenses: []
    }
  }

  async componentDidMount () {
    this.setState({ loading: true })

    Api.createClient(Config.API_URL_AUTHENT)
    const res = await Api.get('/license/list')

    if (res.ok) {
      this.setState({ licenses: res.data.licenses })
    }
    this.setState({ loading: false })
  }

  async armLicense (licenseKey) {
    Api.createClient(Config.API_URL_AUTHENT)
    const res = await Api.post('/license/arm', {
      license_key: licenseKey
    })

    if (res.ok) {
      swal('Success!', 'Licese armed successfully', 'success', {
        buttons: false,
        timer: 3000
      })
    } else {
      swal('Error', 'Could not arm the selected license', 'error', {
        buttons: false,
        timer: 3000
      })
    }
  }

  async deleteLicense (licenseKey) {
    Api.createClient(Config.API_URL_AUTHENT)
    const res = await Api.post('/license/delete', {
      license_key: licenseKey
    })

    if (res.ok) {
      swal('Success!', 'Licese deleted successfully', 'success', {
        buttons: false,
        timer: 3000
      })
    } else {
      swal('Error', 'Could not delete the selected license', 'error', {
        buttons: false,
        timer: 3000
      })
    }
  }

  render () {
    const { loading, licenses } = this.state

    return (
      <div className='licpage'>
        <Sidebar selected='licences' />
        <div className='licbody'>
          <hr />

          <div className='licheader'>
            <span>Licences</span>
            <a href='/'>Back</a>
          </div>

          {loading && <div className='lds-roller'><div /><div /><div /><div /><div /><div /><div /><div /></div>}

          <div className='lictables'>
            <table className='lictable' style={{ display: loading ? 'none' : 'block' }}>
              <thead className='lictablehead'>
                <tr>
                  <td>License Key</td>
                  <td>Duration</td>
                  <td>Activated</td>
                  <td>Expire Date</td>
                  <td>Expire</td>
                  <td>Arm License</td>
                  <td>Delete License</td>
                </tr>
              </thead>
              <tbody className='lictablebody'>
                {
                  licenses && licenses.length > 0 && licenses.map((license, i) => {
                    return (
                      <tr key={i}>
                        <td>{license.license_key}</td>
                        <td>{license.duration}</td>
                        <td>
                          <div className='licarmed' style={{ backgroundColor: license.is_armed ? 'rgba(80 , 160, 80)' : 'rgba(200, 68, 75)' }}>
                            <span>{license.is_armed ? 'ACTIVATED' : 'NOT ARMED'}</span>
                          </div>
                        </td>
                        <td>{license.expire_date}</td>
                        <td>{new Date(license.expire * 1000).toDateString()}</td>
                        <td>
                          <button className='bn632-hover bn22' disabled={license.is_armed} onClick={async () => await this.armLicense(license.license_key)}>Arm</button>
                        </td>
                        <td>
                          <button className='bn632-hover bn28' onClick={async () => await this.deleteLicense(license.license_key)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Licences