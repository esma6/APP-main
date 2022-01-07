import { ActivistModel } from './../models/activistModel';
import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';
import SintropContract from '../contracts/abis/SintropContract.json';
import ProducerPool from '../contracts/abis/ProducerPool.json';
import SATtoken from '../contracts/abis/SatTokenERC20.json';
import { ProducerModel } from '../models/producerModel';
import { EventService } from './event.service';

declare const window: any;
declare const ethereum: any;
declare const require: any;
declare const IpfsHttpClientLite: any;
declare const Web3: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  web3js: any;
  account: any;
  sintropContract: any;
  producerPoolContract: any;
  accDetails: any;
  SATContract: any;

  constructor() {
    //this.loadWeb3();
  }

  async loadWeb3() {
    let provider: any = await detectEthereumProvider();

    if (window.ethereum) {
      const chainId = await provider.request({
        method: 'eth_chainId',
      });
      console.log(chainId);
      this.web3js = new Web3(provider);
      await window.ethereum.enable().then(() => {
        return this.connectMetaMaskAccount();
      });
    } else if (window.web3) {
      this.web3js = new Web3(window.ethereum);
    } else {
      console.log('Carteira não instalada');
    }
  }

  async connectMetaMaskAccount() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      this.account = await ethereum.request({ method: 'eth_requestAccounts' });
      localStorage.setItem('metaToken', this.account[0]);
      EventService.get('accountStatus').emit(true);
      console.log(this.account[0]);
    }
    return this.account;
  }

  async disconnectMetaMaskAccount() {
    this.account = null;
    return true;
  }

  async loadAbisContract() {
    const networkId = await ethereum.request({ method: 'net_version' });
    console.log(networkId);

    const sintropContract: any = SintropContract;
    const _producerPoolContract: any = ProducerPool;
    const _SATContract: any = SATtoken;
    const netWorkData = sintropContract.networks[networkId];
    const _producerPoolNetwork = _producerPoolContract.networks[networkId];
    const _satTokensNetwork = _SATContract.networks[networkId];

    if (netWorkData) {
      console.log(Web3);
      this.sintropContract = await new this.web3js.eth.Contract(
        sintropContract.abi,
        netWorkData.address
      );
      this.producerPoolContract = await new this.web3js.eth.Contract(
        _producerPoolContract.abi,
        _producerPoolNetwork.address
      );

      this.SATContract = await new this.web3js.eth.Contract(
        _SATContract.abi,
        _satTokensNetwork.address
      );

      console.log(this.sintropContract.methods);
      console.log(this.producerPoolContract.methods);
      console.log(this.SATContract.methods);
    }
  }

  async getUser() {
    const user = await this.sintropContract.methods
      .getUser(this.account[0])
      .call()
      .then((e: any) => {
        return e;
      });

    return user;
  }

  async getCategories() {
    const categoriesCount = await this.sintropContract.methods
      .getCategories()
      .call()
      .then((e: any) => {
        return e;
      });

    return categoriesCount;
  }

  async createCategories(
    category: string,
    description: string,
    totallySustainable: string,
    partiallySustainable: string,
    neutro: string,
    partiallyNotSustainable: string,
    totallyNotSustainable: string
  ) {
    return await this.sintropContract.methods
      .addCategory(
        category,
        description,
        totallySustainable,
        partiallySustainable,
        neutro,
        partiallyNotSustainable,
        totallyNotSustainable
      )
      .send({ from: this.account[0] })
      .on('transactionHash', (hash: any) => {
        if (hash) {
          return hash;
        } else {
          return false;
        }
      });
  }

  async categoryVote(categoryName: string) {
    return await this.sintropContract.methods
      .vote(categoryName)
      .send({ from: this.account[0] })
      .on('transactionHash', (hash: any) => {
        if (hash) {
          return hash;
        } else {
          return false;
        }
      });
  }

  async producerExists() {
    const categoriesCount = await this.sintropContract.methods
      .producerExists(this.account[0])
      .call()
      .then((e: any) => {
        return e;
      });

    return categoriesCount;
  }

  async getProducer(walletAcc?: any) {
    let accountWallet = this.account[0];
    if (walletAcc) {
      accountWallet = walletAcc;
    }
    const producer = await this.sintropContract.methods
      .getProducer(accountWallet)
      .call()
      .then((e: any) => {
        if (e) {
          this.accDetails = e;
          EventService.get('accountDetails').emit(e);
        }
        return e;
      });

    return producer;
  }

  async getActivist(walletAcc?: any) {
    let accountWallet = this.account[0];
    if (walletAcc) {
      accountWallet = walletAcc;
    }
    const activist = await this.sintropContract.methods
      .getActivist(accountWallet)
      .call()
      .then((e: any) => {
        if (e) {
          this.accDetails = e;
          EventService.get('accountDetails').emit(e);
        }
        return e;
      });

    return activist;
  }

  async activistExists() {
    const categoriesCount = await this.sintropContract.methods
      .activistExists(this.account[0])
      .call()
      .then((e: any) => {
        return e;
      });

    return categoriesCount;
  }

  async addProducer(producer: any) {
    console.log(producer);

    return await this.sintropContract.methods

      .addProducer(
        producer.name,
        producer.document,
        producer.document_type,
        producer.country,
        producer.state,
        producer.city,
        producer.cep
      )
      .send({ from: this.account[0] })
      .on('transactionHash', (hash: any) => {
        if (hash) {
          return hash;
        } else {
          return false;
        }
      });
  }

  async addActivist(activist: any) {
    return await this.sintropContract.methods
      .addActivist(
        activist.name,
        activist.document,
        activist.document_type,
        activist.country,
        activist.state,
        activist.city,
        activist.cep
      )
      .send({ from: this.account[0] })
      .on('transactionHash', (hash: any) => {
        if (hash) {
          return hash;
        } else {
          return false;
        }
      });
  }

  public async getInspections() {
    const inspections = await this.sintropContract.methods
      .getInspections()
      .call()
      .then((e: any) => {
        console.log(e);
        return e;
      });

    return inspections;
  }

  public async acceptInspection(id: any) {
    return await this.sintropContract.methods
      .acceptInspection(id)
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  public async requestInspection() {
    return await this.sintropContract.methods
      .requestInspection()
      .send({ from: this.account[0] })
      .on('transactionHash', (hash: any) => {
        if (hash) {
          return hash;
        } else {
          return false;
        }
      });
  }

  public async realizeInspection(inspection: any) {
    return await this.sintropContract.methods
      .realizeInspection(inspection.inspectionId, inspection.isa)
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  public async getInspection(inspection: any) {
    const activists = await this.sintropContract.methods
      .getInspection(inspection.inspectionId)
      .call()
      .then((e: any) => {
        console.log(e);
        return e;
      });

    return activists;
  }

  public async getActivists() {
    const activists = await this.sintropContract.methods
      .getActivists()
      .call()
      .then((e: any) => {
        console.log(e);
        return e;
      });

    return activists;
  }

  public async getProducers() {
    const producers = await this.sintropContract.methods
      .getProducers()
      .call()
      .then((e: any) => {
        console.log(e);
        return e;
      });

    return producers;
  }

  public async getInspectionsHistory() {
    const inspections = await this.sintropContract.methods
      .getInspectionsHistory(this.account[0])
      .call()
      .then((e: any) => {
        console.log(e);
        return e;
      });

    return inspections;
  }

  // ProducerPoll Methods

  public async allowance() {
    const allowance = await this.producerPoolContract.methods
      .allowance()
      .call()
      .then((e: any) => {
        return e;
      });

    return allowance;
  }

  public async approve() {
    console.log(this.account[0])
    const approve = await this.producerPoolContract.methods
      .approve()
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );

    return approve;
  }

  public async withDraw() {
    const withDraw = await this.producerPoolContract.methods
      .withDraw()
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );

    return withDraw;
  }

  //SATContract Methods


  public async producerFundsAddress() {
    const producerFundsAddress = await this.SATContract.methods
      .producerFundsAddress()
      .call()
      .then((e: any) => {
        return e;
      });

    return producerFundsAddress;
  }

  public async activistFundsAddress() {
    const activistFundsAddress = await this.SATContract.methods
      .activistFundsAddress()
      .call()
      .then((e: any) => {
        return e;
      });

    return activistFundsAddress;
  }

  public async approveWith(addressFrom:any,addressDelegate:any) {
    const approveWith = await this.SATContract.methods
      .approveWith(addressFrom,addressDelegate)
      .call()
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );

    return approveWith;
  }


  public async totalSupply() {
    const totalSupply = await this.SATContract.methods
      .totalSupply()
      .call()
      .then((e: any) => {
        return e;
      });

    return totalSupply;
  }

  public async balanceOf() {
    const balanceOf = await this.SATContract.methods
      .balanceOf(this.account[0])
      .call()
      .then((e: any) => {
        return e;
      });

    return balanceOf;
  }

  public async transfer(addressReceiver:any,amount:any) {
    const transfer = await this.SATContract.methods
      .transfer(addressReceiver,amount)
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );

    return transfer;
  }

  public async satApprove(value:any) {
    console.log(value)
    const satApprove = await this.SATContract.methods
      .approve(this.account[0],value)
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );

    return satApprove;
  }

  public async SATAllowance() {
    const allowance = await this.SATContract.methods
      .allowance(this.account[0],this.account[0])
      .call()
      .then((e: any) => {
        return e;
      });

    return allowance;
  }

  public async transferFrom(addressOwner:any,addressBuyer:any,numTokens:any) {

    const transferFrom = await this.SATContract.methods
      .transferFrom(addressOwner,addressBuyer,numTokens)
      .send({ from: this.account[0] })
      .on(
        'transactionHash',
        (hash: any) => {
          if (hash) {
            return hash;
          } else {
            return false;
          }
        },
        (err: any) => {
          console.log(err);
        }
      );

    return transferFrom;
  }
}
