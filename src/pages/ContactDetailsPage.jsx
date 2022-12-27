import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getContactById } from "../store/actions/contactActions";
import { spendBalance } from "../store/actions/userActions";

import { TransferFund } from "../components/TransferFund";
import { MoveList } from "../components/MoveList";

import arrowLeft from "../assets/images/icons/arrow-left.png";

export class _ContactDetailsPage extends Component {
  state = {
    contact: null,
    loggedInUser: null,
    showTransCmp: false,
  };

  componentDidMount() {
    this.loadContact();
    this.loadLoggedInUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact();
      this.loadLoggedInUser();
    }
  }

  loadContact = async () => {
    const contact = await this.props.getContactById(this.props.match.params.id);
    this.setState({ contact });
  };

  loadLoggedInUser = () => {
    const { loggedInUser } = this.props;
    this.setState({ loggedInUser });
  };

  onBack = () => {
    this.props.history.push("/contact");
  };

  onTransferCoins = (amount) => {
    this.props.spendBalance(this.state.contact, amount);
    this.loadContact();
    this.loadLoggedInUser();
  };

  render() {
    const { contact, loggedInUser, showTransCmp } = this.state;
    if (!loggedInUser || !contact) return <div>Loading...</div>;
    return contact ? (
      <main className="details-cmp add-margin">
        <div className="details-cmp__btns">
          <img src={arrowLeft} alt="" title="Back" onClick={this.onBack} className="back" />
          <Link to={`/contact/edit/${contact._id}`}>
            <i className="fa-solid fa-pen-to-square" title="Edit"></i>
          </Link>
        </div>
        <section className="contact-det1">
          <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det1__img" />
          <section className="details">{contact.name}</section>
        </section>
        <div className="contact-det2">
          <div className="row">
            <i className="fa-solid fa-envelope icon"></i>
            <span>{contact.email}</span>
          </div>
          <div className="row">
            <i className="fa-solid fa-phone icon"></i>
            <span>{contact.phone}</span>
          </div>
        </div>

        {
          showTransCmp ? 
          <TransferFund contact={this.state.contact} maxCoins={loggedInUser.coins} onTransferCoins={this.onTransferCoins} />
          :
          <button className="add-trans" onClick={() => this.setState({ showTransCmp: true })}>Add Transaction</button>
        }
        <MoveList movesList={loggedInUser.moves.filter((m) => m.toId === contact._id)} title="My Moves" />
      </main>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  getContactById,
  spendBalance,
};

export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage);
