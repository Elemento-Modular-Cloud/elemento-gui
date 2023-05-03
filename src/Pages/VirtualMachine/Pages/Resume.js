import React, { Component } from 'reactn'
import { ReactComponent as CheckGreen } from '../../../Assets/utils/checkgreen.svg'
import { ReactComponent as CheckRed } from '../../../Assets/utils/checkred.svg'
import '../css/Pages.css'
import { Utils } from '../../../Global'

class Resume extends Component {
  constructor (props) {
    super(props)
    this.state = {
      advancedSetup: null,
      loading: false
    }
  }

  componentDidMount () {
    const { advancedSetup } = this.global
    this.setState({ advancedSetup })
  }

  render () {
    const { advancedSetup: x, loading } = this.state
    const compactName = Utils.compactString(x.name)

    return (
      <div className='resbody'>
        <h2>Resume</h2>

        {
          x &&
            <div className='resitems'>
              <div className='resitembox'>
                <span className='resitemtitle'>Name</span><span className='resitemvalue'>{x.name}</span>
              </div>

              <div className='resitembox'>
                <span className='resitemtitle'>Cores</span><span className='resitemvalue'>{x.cores}</span>
              </div>
              <div className='resitembox'>
                <span className='resitemtitle'>Overprovision</span><span className='resitemvalue'>{x.overprovision}</span>
              </div>
              <div className='resitembox'>
                <span className='resitemtitle'>Architectures</span><span className='resitemvalue'>{x.archsList && x.archsList.lenght > 0 ? x.archsList.map(arch => arch.value).join(', ') : 'None'}</span>
              </div>
              <div className='resitembox'>
                <span className='resitemtitle'>Flags</span><span className='resitemvalue'>{x.flags ? x.flags.join(', ') : 'None'}</span>
              </div>
              <div className='resitembox'>
                <span className='resitemtitle'>Memory</span><span className='resitemvalue'>{x.size}</span>
              </div>
              <div className='resitembox'>
                <span className='resitemtitle'>ECC RAM</span><span className='resitemvalue'>{x.ecc ? <CheckGreen style={{ width: 30, height: 30 }} /> : <CheckRed style={{ width: 30, height: 30 }} />}</span>
              </div>
              <div className='resitembox'>
                <span className='resitemtitle'>Volumes</span><span className='resitemvalue'>{x.volumeIds && x.volumeIds.length > 0 ? x.volumeIds.map(vol => vol.vid).join(', ') : 'None'}</span>
              </div>
              <div className='resitembox'>
                <span className='resitemtitle'>PCI</span><span className='resitemvalue'>{x.pci && x.pci.length > 0 ? x.pci.map(pci => `${pci.vendor} - ${pci.model}`).join(', ') : 'None'}</span>
              </div>

              <div className='restoplogo' style={{ backgroundColor: Utils.toRGB(compactName) }}>
                <div className='reslogo'>
                  <div className='resspec'><span>{x.cores}C</span><span>{x.size}</span></div><br />
                  <span className='resspectitle'>{compactName}</span><br />
                  <span className='resspecname'>{x.name}</span>
                </div>
              </div>
            </div>
        }

        {!loading &&
          <button
            className='btnregister'
            onClick={async () => {
              this.setState({ loading: true })
              await this.props.register()
            }}
          >
            Register
          </button>}
        {loading && <div className='lds-roller'><div /><div /><div /><div /><div /><div /><div /><div /></div>}
      </div>
    )
  }
}

export default Resume
