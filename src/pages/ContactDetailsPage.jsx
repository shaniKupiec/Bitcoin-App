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
    const { contact, loggedInUser } = this.state;
    if (!loggedInUser || !contact) return <div>Loading...</div>;
    return contact ? (
      <main className="details-cmp add-margin">
        <div className="details-cmp__btns">
          <img src={arrowLeft} alt="" title="Back" onClick={this.onBack} className="back" />
          <Link to={`/contact/edit/${contact._id}`}>
            <i className="fa-solid fa-pen-to-square" title="Edit"></i>
          </Link>
        </div>
        <section className="contact-det">
          <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det__img" />
          <section className="details">
            <div className="details__name">{contact.name}</div>
            <div className="details__info">
              <div className="details__info__row">
                <i className="fa-solid fa-envelope icon"></i>
                <span>{contact.email}</span>
              </div>
              <div className="details__info__row">
                <i className="fa-solid fa-phone icon"></i>
                <span>{contact.phone}</span>
              </div>
            </div>
          </section>
        </section>

        <TransferFund contact={this.state.contact} maxCoins={loggedInUser.coins} onTransferCoins={this.onTransferCoins} />
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
