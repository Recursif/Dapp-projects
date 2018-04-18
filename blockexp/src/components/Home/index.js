import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Web3 from 'web3';

// Set the provider
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block_ids: [],
      block_hashes: [],
      curr_block: null
    }
  }

  componentWillMount() {
    const getPromise = async () => {
      var curr_block_no  = await web3.eth.getBlockNumber()

      this.setState({
        curr_block: curr_block_no
      });

      await this.getBlocks(curr_block_no);
    }
    getPromise();

  }

  getBlocks(curr_block_no) {
    const block_ids = this.state.block_ids.slice();
    const block_hashes = this.state.block_hashes.slice();
    var max_blocks = 10;
    console.log(curr_block_no)
    if (curr_block_no < max_blocks) max_blocks =  curr_block_no;

    const getPromise = async (curr_block_no) => {
      for (var i = 0; i < max_blocks; i++, curr_block_no--) {
        var currBlockObj = await web3.eth.getBlock(curr_block_no);

        block_ids.push(currBlockObj.number);
        block_hashes.push(currBlockObj.hash);
        this.setState({
          block_ids: block_ids,
          block_hashes: block_hashes
        });
      }
    }
    getPromise(curr_block_no);
  }
  render() {
    var tableRows = (this.state.block_ids).map((value, index) =>
        <tr key={this.state.block_hashes[index]}>
          <td className="tdCenter"> {this.state.block_ids[index]}</td>
          <td><Link to={`/block/${this.state.block_hashes[index]}`}>{this.state.block_hashes[index]}</Link></td>
        </tr>
    );
    return (
        <div className="Home">
          <h2>Home page</h2>
            Current Block: {this.state.curr_block}
          <table>
            <thead><tr>
              <th>Block No</th>
              <th>Hash</th>
            </tr></thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
    );
  }
}

export default Home;
