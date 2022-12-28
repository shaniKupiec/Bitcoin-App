import { Component } from "react";
import { connect } from "react-redux";

import { removeContact, saveContact, getContactById } from "../store/actions/contactActions";

import arrowLeft from "../assets/images/icons/arrow-left.png";
import trashIcon from "../assets/images/icons/trash.png";

export class _ContactEditPage extends Component {
  state = {
    contact: null,
  };

  componentDidMount() {
    this.loadContact();
  }

  componentDidUpdate(prevProps, prevState) {
    // relevant for the NEXT feature
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact();
    }
  }

  loadContact = async () => {
    const contact = this.props.match.params.id
      ? await this.props.getContactById(this.props.match.params.id)
      : {
          name: "",
          email: "",
          phone: "",
        };
    this.setState({ contact });
  };

  handleChange = async ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }));
  };

  onSave = async (ev) => {
    ev.preventDefault();
    this.props.saveContact(this.state.contact);
    this.onBack();
  };

  onRemove = async () => {
    this.props.removeContact(this.state.contact._id);
    this.onBack(false);
  };

  onBack = (toContacts = true) => {
    this.state.contact._id && toContacts ? this.props.history.push(`/contact/${this.state.contact._id}`) : this.props.history.push(`/contact`);
  };

  render() {
    const { contact } = this.state;
    return contact ? (
      <main className="edit-cmp add-margin">
        <div className="edit-cmp__btns">
          <img src={arrowLeft} alt="" title="Back" onClick={this.onBack} className="back" />
          {contact._id && <img src={trashIcon} alt="" title="Remove" className="trash" onClick={this.onRemove} />}
        </div>
        <section className="contact-det">
          <img src={`https://robohash.org/set_set5/${contact._id}.png`} alt="" className="contact-det__img" />
          <form className="edit" onSubmit={this.onSave}>
            <span className="edit__row">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" onChange={this.handleChange} name="name" value={contact.name} placeholder="Name" />
            </span>

            <span className="edit__row">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" onChange={this.handleChange} name="email" value={contact.email} placeholder="Email" />
            </span>

            <span className="edit__row">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" onChange={this.handleChange} name="phone" value={contact.phone} placeholder="Phone" />
            </span>

            <button className="edit__save">Save</button>
          </form>
        </section>
      </main>
    ) : (
      <div>Loading...</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  removeContact,
  saveContact,
  getContactById,
};

export const ContactEditPage = connect(mapStateToProps, mapDispatchToProps)(_ContactEditPage);
