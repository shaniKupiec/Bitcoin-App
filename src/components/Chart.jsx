import { React, Component } from 'react'
import { Sparklines, SparklinesLine, SparklinesBars, SparklinesSpots } from 'react-sparklines'
import bitcoinService from '../services/bitcoin.service'

export class Chart extends Component {
  state = {
    MPdata: null,
    CTdata: null,
  }

  componentDidMount() {
    this.loadDataMarketPrice()
    this.loadDataConfirmedTransactions()
  }

  loadDataMarketPrice = async () => {
    const data = await bitcoinService.getMarketPrice()
    var newData = []
    data.forEach((element) => {
      // newData.push(element.x)
      newData.push(element.y)
    })
    this.setState({ MPdata: newData })
  }
  
  loadDataConfirmedTransactions = async () => {
    const data = await bitcoinService.getConfirmedTransactions()
    var newData = []
    data.forEach((element) => {
      // newData.push(element.x)
      newData.push(element.y)
    })
    this.setState({ CTdata: newData })
  }

  render() {
    const { MPdata, CTdata } = this.state
    const { title, data, description, color } = this.props
    if (!MPdata || !CTdata) return <div>Loading...</div>
    return (
      <div>
        <section>
          {data === 'marketprice' && (
            <div>
              <h1>{title}</h1>
              <h4>{description}</h4>
              <section>
                <Sparklines data={MPdata} margin={6}>
                  <SparklinesLine style={{ strokeWidth: 3, stroke: '#336aff', fill: { color } }} />
                  <SparklinesSpots size={4} style={{ stroke: '#336aff', strokeWidth: 3, fill: { color } }} />
                </Sparklines>
              </section>
            </div>
          )}
          {data === 'confirmedtransactions' && (
            <div>
              <h1>{title}</h1>
              <h4>{description}</h4>
              <section>
                <Sparklines data={CTdata}>
                  <SparklinesBars color={color} />
                </Sparklines>
              </section>
            </div>
          )}
        </section>
      </div>
    )
  }
}
